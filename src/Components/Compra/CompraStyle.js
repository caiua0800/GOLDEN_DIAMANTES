
import styled, { keyframes } from "styled-components";

// Definir a animação de deslizamento
const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

export const CompraContainer = styled.div`
    width: 100%;
    // height: max-content;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding: 50px 30px 40px 30px;
    display: flex;
    flex-direction: column;
    position: relative;


`;

export const LoginBehind = styled.div`
    position: fixed; 
    top: 0; 
    z-index: 1;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    // background: linear-gradient(20deg, #480CA8, #3A0CA3, #3F37C9, #4361EE, #480CA8, #480CA8);
    background: linear-gradient(
        20deg,
        rgba(72, 12, 168, 0.9),
        rgba(58, 12, 163, 0.9),
        rgba(63, 55, 201, 0.9),
        rgba(67, 97, 238, 0.9),
        rgba(72, 12, 168, 0.9),
        rgba(72, 12, 168, 0.9)
    );

    img{
        width: 350px;
        opacity: 0.5;
    }
`;

export const PrincipalContent = styled.div`
    z-index: 2;
`;


export const CompraTitle = styled.div`
    font-size: 32px;
    text-shadow: 3px 4px 1px rgba(0,0,0,0.2);
    font-weight: 800;
    @media (max-width: 1000px){
        font-size: 14px;
    }
`;

export const ContratosGolden = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
    align-items: center;
`;

export const Contratos = styled.div`
    margin-top: 80px;   
    width: 100%;
    overflow: hidden;
    background-color: rgba(3, 4, 94, 0.4);
    transition: .4s;
    border-radius: 8px;
    box-shadow: 6px 6px 4px rgba(0,0,0,0.6);
    display: flex;
    padding: 40px 30px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    h1{
        margin: 0;
        font-size: 28px;
        color: white;
        font-weight: 800;
        text-shadow: 3px 3px 2px rgba(0,0,0,0.6);
        width: 100%;
        text-align: center;
    }
`;

export const ContratosDivs = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: center;
`;

export const ContratoModel = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    box-sizing: border-box;
    align-items: center;

    h2, p, span{
        margin: 0;
    }

    h2{
        width: 100%;
        text-align: center;
        font-size: 22px;
        border-bottom: 4px solid white;
        margin-bottom: 20px;
        color: white;
    }

    .infoContrato{
        width: 100%;
        display: flex;
        gap: 10px;

        p{
            font-size: 20px;
            font-weight: 600;
            color: white;
        }

        span{
            font-size: 20px;
            color: #ade8f4;
            font-weight: 600;
        }
    }

    .seletorQuantidade{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 5px;

        .quantidade{
            width: 60px;
            height: 40px;
            background-color: white;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
        }

        .btn{
            width: 30px;
            height: 40px;
            background-color: white;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            cursor: pointer;
            transition: .3s;

            &:hover{
                background-color: rgba(255, 255, 255, 0.6);
            }
        }

    }
`;

export const ValorFinal = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    gap: 5px;
    h3, h4{
        margin: 0;
    }

    h3{
        font-size: 22px;
        color: white;
        border-bottom: 3px solid white;
    }

    h4{
        font-size: 22px;
        color: white;
    }

    button{
        width: 300px;
        height: 40px;
        font-size: 16px;
        cursor: pointer;
        background: linear-gradient(to right, #bfd200, #eeef20);
        border: 0;
        box-shadow: 3px 3px 4px rgba(0,0,0,0.6);
        transition: .3s;

        &:hover{
            transform: scale(0.97);
        }
    }
`;