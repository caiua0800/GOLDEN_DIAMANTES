import React, { useState, useEffect, useContext } from "react";
import * as S from './CompraStyle';
import { formatNumber } from "../../assets/utils";
import Modal from "./CompraModal/Modal";
import { AuthContext } from "../../context/AuthContext";
import SideBarBox from "../Sidebar/SideBarBox";
import { usePulse } from '../../context/LoadContext';
import { db } from "../../database/firebaseConfig";
import { getDoc, doc } from "../../database/firebaseConfig";

export default function Compra() {
    const { userData, reloadUserData } = useContext(AuthContext);
    const { showPulse, hidePulse } = usePulse();
    const [contratos, setContratos] = useState(null)
    const [contratosAdicionados, setContratosAdicionados] = useState(null)
    const [valorFinal, setValorFinal] = useState(0);
    const [stateModalCompra, setStateModalCompra] = useState(false)


    useEffect(() => {
        const fetchContratos = async () => {
            try {
                const docRef = doc(db, 'CONFIGURACOES', 'CONTRATOS');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.MODELOS) {
                        const contratos = data.MODELOS.map(contrato => ({
                            ...contrato,
                            QUANTIDADE: 0 // Definindo a quantidade como 0
                        }));

                        setContratos(contratos);

                        // Verifica se userData.MODELOS existe antes de usá-lo
                        setContratosAdicionados(userData.MODELOS || contratos.map(ctr => ({ ...ctr, QUANTIDADE: 0 })));
                    }
                } else {
                    console.log('Documento não encontrado!');
                }
            } catch (error) {
                console.error('Erro ao buscar Contratos: ', error);
            }
        };

        fetchContratos();
    }, []);


    const handleAddContract = (index, tipo) => {
        const novoArray = [...contratosAdicionados]; // Clone o array

        if (tipo === "+") {
            novoArray[index].QUANTIDADE += 1; // Incrementa a quantidade
        } else if (tipo === "-" && novoArray[index].QUANTIDADE > 0) {
            novoArray[index].QUANTIDADE -= 1; // Decrementa a quantidade
        }
        handleGenerateValorFinal();
        setContratosAdicionados(novoArray); // Atualiza o estado
    }

    const handleGenerateValorFinal = () => {
        let soma = 0;
        contratosAdicionados.forEach(c => {
            soma += (c.VALOR * c.QUANTIDADE)
        })
        setValorFinal(soma)
    }

    return (
        <SideBarBox>
            <S.CompraContainer>
                <S.LoginBehind>
                    <img src='logo-golden.png' />
                </S.LoginBehind>

                <Modal setModalState={setStateModalCompra} modalState={stateModalCompra} contratosAdicionados={contratosAdicionados} />

                <S.PrincipalContent>
                    <S.CompraTitle>COMPRA DE CONTRATOS</S.CompraTitle>

                    <S.Contratos>
                        <h1>CONTRATOS DIAMANTE - GOLDEN BRASIL</h1>

                        <S.ContratosDivs>
                            {contratos && contratos.map((contrato, index) => (
                                <S.ContratoModel key={index}>
                                    <h2>R${formatNumber(contrato.VALOR)}</h2>

                                    <div className="infoContrato">
                                        <p>Duração:</p>
                                        <span>{contrato.DURACAO} Meses</span>
                                    </div>

                                    <div className="infoContrato">
                                        <p>Lucro Final:</p>
                                        <span>{contrato.LUCRO_FINAL * 100}% (R${formatNumber(contrato.LUCRO_FINAL * contrato.VALOR)})</span>
                                    </div>

                                    <div className="infoContrato">
                                        <p>Lucro Diário:</p>
                                        <span>{((contrato.LUCRO_FINAL * 100) / (contrato.DURACAO * 30)).toFixed(3)}% (R${(((contrato.LUCRO_FINAL) / (contrato.DURACAO * 30)) * contrato.VALOR).toFixed(2)})</span>
                                    </div>

                                    <div className="infoContrato">
                                        <p>PLUS Anual:</p>
                                        <span>{contrato.PLUS_ANUAL ? contrato.PLUS_ANUAL_VALOR * 100 + "%" : "Não"}</span>
                                    </div>

                                    <div className="seletorQuantidade">
                                        <div className="btn" onClick={() => { handleAddContract(index, "-") }}>-</div>
                                        <div className="quantidade">{contratosAdicionados[index].QUANTIDADE}</div>
                                        <div className="btn" onClick={() => { handleAddContract(index, "+") }}>+</div>
                                    </div>

                                </S.ContratoModel>
                            ))}

                            <S.ValorFinal>
                                {valorFinal > 0 && (
                                    <>
                                        <h3>VALOR FINAL</h3>
                                        <h4>R${formatNumber(valorFinal)}</h4>

                                        <button onClick={() => setStateModalCompra(true)}>CONTINUAR</button>
                                    </>

                                )}
                            </S.ValorFinal>
                        </S.ContratosDivs>
                    </S.Contratos>

                </S.PrincipalContent>
            </S.CompraContainer>
        </SideBarBox>

    );
}
