import React, { useContext, useState, useEffect } from 'react';
import * as D from './DashboardStyle';
import { AuthContext } from '../../context/AuthContext';
import { abreviarNome, decrypt, formatNumber, handleStatusContrato, calcularPorcentagem } from '../../assets/utils';
import { usePulse } from '../../context/LoadContext';
import SideBarBox from '../Sidebar/SideBarBox';
import { encrypt } from '../../assets/utils';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import MensagemSchema from '../Mensagem/MensagemSchema';
import Modal from '../CompletarCadastroModal/Modal'
import moment from 'moment/moment';
import assets from '../../assets/assets';



export default function Dashboard() {
  const { userData, reloadUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { showPulse, hidePulse } = usePulse();
  const [messageExists, setMessageExists] = useState(null);

  const loadUserData = async () => {
    showPulse();
    await reloadUserData();
    hidePulse();
    setLoading(false);
  };


  useEffect(() => {
    if (userData) {
      setLoading(false);
    } else {
      loadUserData();
    }

  }, [userData, reloadUserData, showPulse, hidePulse]);



  return (
    <SideBarBox>
      <D.DashboardContainer>


        <D.LoginBehind>
          <img src='logo-golden.png' />
        </D.LoginBehind>


        <D.PrincipalContent>

          <D.SaldacoesUsuario>
            <span>OLÁ {abreviarNome((userData?.NAME || '').toUpperCase())}</span>
          </D.SaldacoesUsuario>


          <D.ContainerContent>

            <D.FlexDivs>
              <D.DivsGeneral>
                <h1>Lucro diário</h1>
                <p>R$ 180,00</p>
              </D.DivsGeneral>
              <D.DivsGeneral>
                <h1>Contratos Ativos</h1>
                <p>3</p>
              </D.DivsGeneral>
              <D.DivsGeneral>
                <h1>Valor de Compra</h1>
                <p>R$28.541,00</p>
              </D.DivsGeneral>
              <D.DivsGeneral>
                <h1>Lucro Total Ganho</h1>
                <p>R$29.174,14</p>
              </D.DivsGeneral>
              <D.DivsGeneral>
                <h1>Lucro Disponível</h1>
                <p>R$24.174,14</p>
              </D.DivsGeneral>
              <D.DivsGeneral>
                <h1>Lucros Futuros</h1>
                <p>R$12.057,33</p>
              </D.DivsGeneral>
            </D.FlexDivs>

            <D.SeusContratos>
              <h1>Suas Compras</h1>

              <D.ContratosArrayContainer>
                {userData.CONTRATOS && userData.CONTRATOS.map(ctr => (
                  <D.ContratoMoldelo key={ctr.ID}>

                    <div className='ValorContrato'>
                      <div>
                        <p>ID</p>
                        <span>{ctr.ID}</span>
                      </div>
                      <div>
                        <p>valor</p>
                        <span>R${formatNumber(ctr.VALOR)}</span>
                      </div>

                    </div>

                    <div className='InformacoesContrato'>

                      <div className='divExemplo'>
                        <p>data da compra</p>
                        <span>28/10/2023</span>
                      </div>

                      <div className='divExemplo'>
                        <p>data de recompra</p>
                        <span>28/10/2023</span>
                      </div>

                      <div className='divExemplo'>
                        <p>lucro final</p>
                        <span>{ctr.LUCRO_FINAL * 100}%</span>
                      </div>

                      <div className='divExemplo'>
                        <p>qtd. contratos</p>
                        <span>{ctr.QUANTIDADE}</span>
                      </div>

                      <div className='divExemplo'>
                        <p>valor uni.</p>
                        <span>R${formatNumber(ctr.VALOR_UNIDADE)}</span>
                      </div>

                      <div className='divExemplo'>
                        <p>lucro obtido</p>
                        <span>R${formatNumber(ctr.LUCRO_ATUAL*ctr.VALOR)}</span>
                      </div>

                    </div>

                    <D.RendimentoObtidoTitle><p>{calcularPorcentagem(ctr.VALOR, ctr.LUCRO_ATUAL, ctr.LUCRO_FINAL)}% do Contrato</p></D.RendimentoObtidoTitle>
                    <D.RendimentoObtido>
                      <D.BarraPreenchida porcentagem={calcularPorcentagem(ctr.VALOR, ctr.LUCRO_ATUAL, ctr.LUCRO_FINAL)} />
                    </D.RendimentoObtido>

                    <D.Status>{handleStatusContrato(ctr.STATUS)}</D.Status>
                  </D.ContratoMoldelo>
                ))}

              </D.ContratosArrayContainer>
            </D.SeusContratos>

          </D.ContainerContent>
        </D.PrincipalContent>
      </D.DashboardContainer>
    </SideBarBox >
  );
}
