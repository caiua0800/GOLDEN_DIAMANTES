
import { addMonths, differenceInDays } from 'date-fns';
import { db, doc, getDoc } from '../database/firebaseConfig'
import axios from 'axios';
import CryptoJS from 'crypto-js'

export const formatNumber = (number) => {

    const formattedNumber = number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formattedNumber;
};

export const parseDateBrazilianFormat = (dateString) => {
    return false;
};



export const consultarALLOWSELL = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today < inputDate;
}

export function abreviarNome(nomeCompleto) {
    // Divide o nome completo em partes
    const partes = nomeCompleto.split(' ');

    // Se há menos de três partes, não há nomes intermediários para abreviar
    if (partes.length <= 2) {
        return nomeCompleto;
    }

    // Mantém o primeiro e o último nome inteiros
    const primeiroNome = partes[0];
    const ultimoNome = partes[partes.length - 1];

    // Abrevia os nomes intermediários
    const nomesIntermediariosAbreviados = partes.slice(1, -1).map(nome => nome.charAt(0) + '.');

    // Concatena o resultado
    return [primeiroNome, ...nomesIntermediariosAbreviados, ultimoNome].join(' ');
}

export const gerarStringAleatoria = () => {
    let tamanho = 4;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let resultado = '';
    for (let i = 0; i < tamanho; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
};


export function isDateAfterToday(dateString) {

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const providedDate = parseDate(dateString);
    return providedDate > today;
}

export const formatarMoedaDollar = (valor) => {

    valor = parseInt(valor);

    const formatador = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL', // Usa o código da moeda como referência
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatador.format(valor).replace('R$', 'U$');
}

export const formatDateSystem = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        return null;
    }
};

export const calcularLucroAcumulado = (dataDaCompra, mesesDeContrato, valorInvestido, lucroTotalContrato) => {


    if (typeof mesesDeContrato === 'string')
        mesesDeContrato = parseFloat(mesesDeContrato)

    if (typeof valorInvestido === 'string')
        valorInvestido = parseFloat(valorInvestido)

    if (typeof lucroTotalContrato === 'string')
        lucroTotalContrato = parseFloat(lucroTotalContrato)

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    // Função para calcular a diferença em dias entre duas datas
    const differenceInDays = (date1, date2) => {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round((date2 - date1) / oneDay);
    };

    const dataCompra = parseDate(dataDaCompra);
    const dataAtual = new Date();

    const dataFimContrato = new Date(dataCompra);
    dataFimContrato.setMonth(dataFimContrato.getMonth() + mesesDeContrato);

    const totalDiasContrato = differenceInDays(dataCompra, dataFimContrato);

    const lucroDiario = lucroTotalContrato / totalDiasContrato;

    const diasPassados = differenceInDays(dataCompra, dataAtual < dataFimContrato ? dataAtual : dataFimContrato);

    const lucroAcumulado = lucroDiario * diasPassados;
    return (lucroAcumulado);
};

export const ULLT = (valor, valor2) => {
    if (valor && valor2) {
        if (typeof valor != 'string') {
            valor = valor.toString();
        }
        let res = parseFloat(valor.replace(',', '.')) - valor2;
        res = formatarMoedaDollar(res.toFixed(2).replace('.', ','));
        return (res);
    }
    if (!valor2 && valor) {
        if (typeof valor != 'string') {
            valor = valor.toString();
        }
        let res = parseFloat(valor.replace(',', '.'));
        res = formatNumber(res);

        return res
    }
    return 0
}

export const ULLTNUMBER = (valor, valor2) => {

    if (valor && valor2) {
        if (typeof valor != 'string') {
            valor = valor.toString();
        }
        let res = parseFloat(valor.replace(',', '.')) - valor2;
        res = (res);

        return (res);
    }
    if (!valor2 && valor) {
        if (typeof valor != 'string') {
            valor = valor.toString();
        }
        let res = parseFloat(valor.replace(',', '.'));

        res = (res);
        return res
    }

    return 0;
}

/**
 * Calcula o lucro diário e o valor total do lucro com base na quantidade de meses, valor inicial e valorização percentual.
 * @param {number} months - A quantidade de meses.
 * @param {number} initialValue - O valor inicial.
 * @param {number} percentage - A porcentagem de valorização.
 * @returns {object} - Um objeto contendo o lucro diário e o valor total do lucro.
 */
export const calculateProfit = (months, initialValue, percentage) => {
    const now = new Date();
    const futureDate = addMonths(now, months);
    const totalDays = differenceInDays(futureDate, now);

    const totalProfit = initialValue * (percentage / 100);
    const finalValue = initialValue + totalProfit;

    // Calcula o lucro diário
    const dailyProfit = totalProfit / totalDays;

    return {
        dailyProfit: dailyProfit,
        totalProfit: (dailyProfit * totalDays),
        finalValue: finalValue,
        totalDays: totalDays
    };
};

export const verifyLogin = async (cpf, username, password) => {
    try {
        if (!cpf || !username || !password) {
            return { success: false, message: 'CPF, nome de usuário e senha são necessários.' };
        }
        if (typeof cpf !== 'string' || cpf.trim() === '') {
            return { success: false, message: 'CPF inválido.' };
        }
        const docRef = doc(db, 'USERS', cpf);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.USERNAME === username && userData.PASSWORD === password) {
                return { success: true, message: 'Login confirmado. Compra realizada com sucesso.' };
            } else {
                return { success: false, message: 'Usuário ou senha incorretos.' };
            }
        } else {
            return { success: false, message: 'Usuário não encontrado.' };
        }
    } catch (error) {
        console.error('Erro ao verificar login:', error);
        return { success: false, message: 'Erro ao verificar login. Tente novamente.' };
    }
};

export const retornaResposta = (dado) => {
    switch (dado.STATUS) {
        case 1:
            return 'VALORIZANDO';
        case 2:
            return 'Contrato Finalizado';
        case 3:
            return 'CANCELADO';
        case 4:
            return 'PENDENTE';
        default:
            return 'Status Desconhecido';
    }
};


export const preventCurrentIncome = (valorLucro, valorGasto) => {
    if (valorLucro === "indefinido" || !valorLucro || valorGasto === "indefinido" || !valorGasto)
        return 0;

    const lucro = parseFloat(valorLucro.toString().replace(',', '.'));
    const gasto = parseFloat(valorGasto.toString().replace(',', '.'));

    if (isNaN(lucro) || isNaN(gasto) || gasto === 0)
        return 0;

    const percentage = (lucro / gasto) * 100;
    return parseFloat(percentage.toFixed(2));
};

export const mapFieldNameToFirebase = (fieldName) => {
    const fieldMapping = {
        nome: 'NAME',
        usuario: 'USERNAME',
        email: 'EMAIL',
        contato: 'CONTACT',
        endereco: 'ADRESS',
        bairro: 'NEIGHBORHOOD',
        cep: 'POSTALCODE',
        cidade: 'CITY',
        estado: 'STATE',
        profissao: "JOBTITLE"
    };

    return fieldMapping[fieldName] || fieldName;
};

export const formatCPF = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/\.(\d{3})(\d)/, '.$1.$2') // Adiciona ponto após 3 dígitos
        .replace(/\.(\d{3})(\d)/, '.$1-$2') // Adiciona hífen após 3 dígitos
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita a 11 dígitos
};

export const formatTelefone = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen
        .replace(/(-\d{4})\d+?$/, '$1'); // Limita a 11 dígitos
};

export const formatCEP = (value) => {
    return value
        .replace(/\D/g, '') // Remove tudo o que não é dígito
        .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen após 5 dígitos
        .replace(/(-\d{3})\d+?$/, '$1'); // Limita a 8 dígitos
};

export const removeFormatting = (type, value) => {
    switch (type) {
        case 'cpf':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        case 'telefone':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        case 'cep':
            return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        default:
            return value; // Retorna o valor sem alterações se o tipo não corresponder a nenhum dos casos
    }
};

const url_base = process.env.REACT_APP_BASE_ROUTE;
const url_gerar_pix = process.env.REACT_APP_GERAR_PIX;
const url_gerar_boleto = process.env.REACT_APP_GERAR_BOLETO;

export const GeneratePIX_MP = async (body) => {
    return await axios.post(`${url_base}${url_gerar_pix}`, body)
}

export const GenerateBOLETO_MP = async (body) => {
    return await axios.post(`${url_base}${url_gerar_boleto}`, body)
}

export function separarNome(nomeCompleto) {
    // Dividir o nome completo em partes usando espaço como delimitador
    const partes = nomeCompleto.trim().split(" ");

    // O primeiro nome é a primeira parte
    const primeiroNome = partes[0];

    // O restante do nome é o restante da array, juntando com um espaço
    const restoDoNome = partes.slice(1).join(" ") || ''; // Se não houver resto, retorna uma string vazia

    // Retornar um array com o primeiro nome e o resto do nome
    return [primeiroNome, restoDoNome];
}

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY_CRYPT;

export function encrypt(text) {
    try {
        return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    } catch (error) {
        console.error('Erro ao criptografar:', error);
        return null;
    }
}


export function decrypt(text) {
    try {
        const bytes = CryptoJS.AES.decrypt(text, SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (originalText) {
            return originalText
        } else {
            throw new Error('Texto descriptografado vazio');
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}

export function decrypt2(ciphertext) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, "GoldenBrasil");
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText) {
            return originalText;
        } else {
            console.log(originalText)
            throw new Error('Texto descriptografado vazio');
        }
    } catch (error) {

        console.error('Erro ao descriptografar:', error);
        return null;
    }
}

export const handleGetNewInfo = async (data, reloadUserData) => {

    try {
        const response = axios.post(`${process.env.REACT_APP_BASE_ROUTE}${process.env.REACT_APP_EDITAR_CLIENTE_MAIS_CAMPOS_INFO}`, {
            docId: data.docId,
            updates: data.updates
        }).then(res => {
            console.log(res);
            reloadUserData();
        }).catch(err => {
            console.log(err)
        });

    } catch (error) {
        console.log(error.message);
    }
}

export function passou365Dias(dataString) {
    const [data, hora] = dataString.split(" ");
    const [dia, mes, ano] = data.split("-");
    const dataInicial = new Date(`${ano}-${mes}-${dia}T${hora}`);
    const dataAtual = new Date();
    const diferençaMilliseconds = dataAtual - dataInicial;
    const diferençaDias = diferençaMilliseconds / (1000 * 60 * 60 * 24);
    return diferençaDias >= 365;
}

export const calcularPorcentagem = (valor, lucroAtual, lucroFinal) => {
    const valorTotal = valor * lucroFinal;
    const valorAtual = valor * lucroAtual;
    return (valorAtual / valorTotal) * 100;
};

export const handleStatusContrato = (number) => {
    number = parseFloat(number);

    switch (number) {
        case 1:
            return "Valorizando"
        case 2:
            return "Finalizadp"
        case 3:
            return "Cancelado"
        case 4:
            return "Pendente"
        default:
            return "Indefinido"
    }
}