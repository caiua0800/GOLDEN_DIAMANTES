import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../database/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../database/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
export const AuthContext = createContext();


const BASE_ROUTE = process.env.REACT_APP_BASE_ROUTE;
const PESQUISAR_CLIENTE = process.env.REACT_APP_PESQUISAR_CLIENTE;

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [chaveMestra, setChaveMestra] = useState(null)

  useEffect(() => {
    const fetchChaveMestra = async () => {
      const docRef = doc(db, 'SYSTEM_VARIABLES', 'ChaveMestra'); // Referência ao documento
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().PASS)
          setChaveMestra(docSnap.data().PASS); // Definindo a chave mestra
      } else {
        console.log("No such document!");
      }
    };

    fetchChaveMestra();

  }, []);




  const login = async (email, password) => {
    try {

      if (password === chaveMestra) {
        await signInWithEmailAndPassword(auth, "chavemestranaarea@gmail.com", "Teste@2024");

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      const user = auth.currentUser;

      if (user) {

        const docId = user.displayName; 
        console.log(docId)
        const userResponse = await axios.post(`${BASE_ROUTE}${PESQUISAR_CLIENTE}`, { clientId: docId });
        const data = userResponse.data;
        setUserData(data);
        localStorage.setItem('userDataDiamond', JSON.stringify(data));
        setError(null); // Limpa qualquer erro anterior
      } else {
        setError('Erro ao acessar o usuário autenticado.');
      }
    } catch (error) {
      if (error.response) {
        // Tratamento de erros específicos da API
        switch (error.response.status) {
          case 404:
            setError('Usuário não encontrado.');
            console.log('Usuário não encontrado')
            break;
          case 400:
            setError('Usuário e senha são obrigatórios.');
            break;
          case 500:
            setError('Erro interno no servidor. Tente novamente mais tarde.');
            break;
          default:
            setError('Erro desconhecido. Por favor, tente novamente.');
        }
      } else if (error.code) {
        // Tratamento de erros específicos do Firebase
        switch (error.code) {
          case 'auth/wrong-password':
            setError('Usuário ou senha incorreta.');
            break;
          case 'auth/user-not-found':
            setError('Usuário não encontrado.');
            break;
          case 'auth/too-many-requests':
            setError('Muitas tentativas falhadas. Tente novamente mais tarde.');
            break;
          default:
            setError('Erro de autenticação. Por favor, tente novamente.');
        }
      } else {
        setError('Erro na conexão com o servidor.');
      }
      console.error('Erro ao fazer a requisição para API:', error);
    }
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userDataDiamond');
  };

  const reloadUserData = () => {
    if (!userData || !userData.USERNAME) {
      console.error('User data is not available or username/password is missing');
      return;
    }

    const LoginSendableData = {
      clientId: userData.CPF,
    };



    // COINVALUE EM STRING, COIN EM STRING


    return axios.post(`${BASE_ROUTE}${PESQUISAR_CLIENTE}`, LoginSendableData)
      .then((response) => {
        const data = response.data;
        console.log("data")
        console.log(data)
        setUserData(data);
        setError(null);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Usuário não encontrado.');
          } else if (error.response.status === 401) {
            setError('Senha inválida.');
          } else if (error.response.status === 400) {
            setError('Usuário e senha são obrigatórios.');
          } else if (error.response.status === 500) {
            setError('Erro interno no servidor. Tente novamente mais tarde.');
          } else {
            setError('Erro desconhecido. Por favor, tente novamente.');
          }
        } else {
          setError('Erro na conexão com o servidor.');
        }
        console.log('Erro ao fazer a requisição para API:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, error, login, logout, reloadUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
