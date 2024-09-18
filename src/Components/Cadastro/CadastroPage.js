import React, { useState } from "react";
import * as S from './CadastroPageStyle';
import { formatCPF, formatCEP, formatTelefone, removeFormatting } from "../../assets/utils";
import { getAuth } from "firebase/auth";
import MessageBox from "./MessageBox";
import { usePulse } from "../../context/LoadContext";
import { db, auth } from "../../database/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, setDoc, doc, getDoc } from "firebase/firestore";


export default function CadastroPage() {
    // Estados para os inputs
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [pais, setPais] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [resposta, setResposta] = useState(null); // Estado para a resposta do servidor
    const { showPulse, hidePulse } = usePulse()


    // Função para verificar se todos os campos foram preenchidos e senhas coincidem
    const handleCadastro = async () => {

        if (!nome || !cpf || !dataNascimento || !telefone || !pais || !endereco || !bairro || !cidade || !cep || !usuario || !senha || !confirmarSenha || !email) {
            setResposta({ message: 'Por favor, preencha todos os campos.', type: 'error' });
            return;
        }

        if (senha !== confirmarSenha) {
            setResposta({ message: 'As senhas não coincidem.', type: 'error' });
            return;
        }

        showPulse();

        try {
            // Verifica se já existe um documento com o mesmo CPF
            const cpfDocRef = doc(db, "USERS", removeFormatting('cpf', cpf));
            const cpfDocSnapshot = await getDoc(cpfDocRef);
            if (cpfDocSnapshot.exists()) {
                setResposta({ message: 'Já existe uma conta com esse CPF.', type: 'error' });
                return;
            }

            // Crie o usuário no Firebase Authentication
            const { user } = await createUserWithEmailAndPassword(auth, email, senha);

            // Atualize o perfil do usuário com o "Username" como "DisplayName" e o "DocId" como CPF
            await updateProfile(user, {
                displayName: removeFormatting('cpf', cpf)
            });

            // Crie o documento no Firestore
            const clientData = {
                CPF: removeFormatting('cpf', cpf),
                ADRESS: endereco.toUpperCase(),
                CITY: cidade.toUpperCase(),
                COUNTRY: pais.toUpperCase(),
                EMAIL: email.toLowerCase(),
                STATE: estado.toUpperCase(),
                POSTALCODE: cep,
                NAME: nome.toUpperCase(),
                NEIGHBORHOOD: bairro,
                PASSWORD: senha,
                USERNAME: usuario,
                CONTACT: removeFormatting('telefone', telefone),
            };
            await setDoc(doc(db, "USERS", removeFormatting('cpf', cpf)), clientData);

            setResposta({ message: 'Cadastro realizado com sucesso!', type: 'success' });
        } catch (error) {
            setResposta({ message: 'Erro ao criar a conta. Tente novamente.', type: 'error' });
            console.error(error);
        } finally {
            hidePulse();
        }
    };

    return (
        <S.CadastroContainer>
            <S.GetBackButton onClick={() => { window.location.href = '/' }}>Voltar</S.GetBackButton>
            <S.CadastroBox>
                <S.CadastroTitle>
                    Seja bem vindo(a) a Golden Brasil
                </S.CadastroTitle>
                <S.LogoBox>
                    <img src='logo-golden.png' alt="Brand Logo" />
                </S.LogoBox>
            </S.CadastroBox>

            <S.CaixaDeCadastro>
                <S.CaixaDeInformacao>
                    <h2>Seu nome Completo</h2>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu CPF</h2>
                    <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={cpf}
                        onChange={(e) => setCpf(formatCPF(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Sua data de nascimento</h2>
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu telefone de contato</h2>
                    <input
                        type="text"
                        placeholder="(00) 99999-9999"
                        value={telefone}
                        onChange={(e) => setTelefone(formatTelefone(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>País da atual residência</h2>
                    <input type="text" placeholder="Brasil" value={pais} onChange={(e) => setPais(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Seu endereço e Nº</h2>
                    <input type="text" placeholder="Rua, Nº" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Bairro</h2>
                    <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Estado</h2>
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>Cidade</h2>
                    <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>CEP</h2>
                    <input
                        type="text"
                        placeholder="00000-000"
                        value={cep}
                        onChange={(e) => setCep(formatCEP(e.target.value))}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacao>
                    <h2>EMAIL</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </S.CaixaDeInformacao>

                <S.CaixaDeInformacaoLogin>
                    <h2>Crie seu nome de usuário</h2>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </S.CaixaDeInformacaoLogin>

                <S.CaixaDeEscolherSenha>
                    <div>
                        <span>Crie uma senha</span>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div>
                        <span>Confirme a senha</span>
                        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                    </div>
                </S.CaixaDeEscolherSenha>

                <S.CriarCadastro>
                    <button onClick={handleCadastro}>CRIAR CONTA</button>
                </S.CriarCadastro>
            </S.CaixaDeCadastro>
            {resposta && <MessageBox message={resposta.message} type={resposta.type} />}
        </S.CadastroContainer>
    );
}