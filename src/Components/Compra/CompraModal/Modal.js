import React, { useState, useContext, useEffect } from "react";
import * as M from './ModalStyle';
import { AuthContext } from "../../../context/AuthContext";
import PDFGenerator from "./PDFGenerator";

export default function Modal({ setModalState, modalState, contratosAdicionados }) {
    const { userData, reloadUserData } = useContext(AuthContext);
    const [assinatura, setAssinatura] = useState("")
    const [metodoPagamento, setMetodoPagement] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    if (!modalState) return null;

    return (
        <M.ModalContainer>
            <M.ModalBox>
                <M.FecharModalBtn>
                    <span onClick={() => setModalState(false)}>X</span>
                </M.FecharModalBtn>


                <M.TitleContrato>CONTRATO DE COMPRA</M.TitleContrato>

                <M.ModalPDFContainer>
                    <PDFGenerator ContratoData={null} assinatura={assinatura} />
                </M.ModalPDFContainer>

                <M.AssinarContrato>
                    <button onClick={() => setAssinatura("assinado")}>Assinar Contrato</button>
                </M.AssinarContrato>

                <M.PayFormDiv>
                    <p>MÉTODO DE PAGAMENTO</p>
                    <select onChange={(e) => { setMetodoPagement(e.target.value) }}>
                        <option value="null">SELECIONE</option>
                        <option value="PIX">PIX</option>
                        <option value="BOLETO">BOLETO</option>
                        <option value="DEPOSITO">DEPOSITO</option>
                    </select>
                </M.PayFormDiv>

                {metodoPagamento != "null" && (
                    <>

                        <M.LoginBoxTitle>CONFIRME SUA IDENTIDADE</M.LoginBoxTitle>

                        <M.LoginBox>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="EMAIL" />

                            <input
                                type="password"
                                onChange={(e) => setSenha(e.target.value)}
                                value={senha}
                                placeholder="SENHA" />
                        </M.LoginBox>

                        <M.ConfirmarLogin>
                            <button>CONFIRMAR COMPRA</button>
                        </M.ConfirmarLogin>
                    </>
                )}

            </M.ModalBox>
        </M.ModalContainer>
    );
}
