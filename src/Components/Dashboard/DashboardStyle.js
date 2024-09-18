import styled from 'styled-components';

export const DashboardContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
   
    background-image: url('textura.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    box-sizing: border-box;
    padding: 50px 30px 200px 30px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1000px){
        flex-direction: column;
        justify-content: center;
        padding: 40px 20px 100px 20px;
    }
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



export const SaldacoesUsuario = styled.div` 
    width: 100%;
    margin-top: 20px;

    span{
        color: #4CC9F0;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
        font-weight: 600;
        font-size: 36px;
    }

    @media (max-width: 1000px){
        margin-top: 30px;

        span{
            font-size: 22px;
        }
    
    }
`;

export const ContainerContent = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 800px){
        flex-direction: column;
        gap: 20px;
    }
`;


export const FlexDivs = styled.div`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 40px;

    @media(max-width: 900px){
        flex-direction: column;
    }
`;

export const DivsGeneral = styled.div`
    width: 30%;
    height: 120px;
    box-sizing: border-box;
    box-shadow: 6px 6px 6px #32004f;
    border-radius: 8px;
    background: linear-gradient(-25deg, #11001c, #190028, #220135, #32004f, #32004f, #220135, #190028, #11001c);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    
    h1, p{
        margin: 0;
        padding: 0;
        font-size: 26px;
        text-align: center;
    }

    h1{
        color: #FFFFFF;
        font-weight: 600;

    }

    p{
        font-weight: 500;
        color: #4CC9F0;
    }

    @media(max-width: 900px){
        width: 100%;

        h1,p{
            font-size: 22px;
        }
    }
`;

export const SeusContratos = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    align-items: center;

    h1{
        padding: 0;
        margin: 0;
        font-size: 32px;
        color: #FFFFFF;
        font-weight: 800;
        text-shadow: 0 0 5px rgba(0,0,0,0.6);
    }
`;

export const ContratosArrayContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    gap: 20px;
    max-height: 600px;
    overflow: auto;
`;


export const ContratoMoldelo = styled.div`
    width: 100%;
    // height: 250px;
    border-radius: 8px;
    box-shadow: 3px 3px 6px rgba(0,0,0,0.6);
    background: linear-gradient(-25deg, #faf5fc, #eadaf0, #ddc1e8, #eadaf0, #faf5fc, #ddc1e8);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px 30px;
    box-sizing: border-box;
    cursor: pointer;
    transition: .3s;

    p, span{
        margin: 0;
        color: #000000;
    }

    .ValorContrato{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;

        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p{
                font-size: 28px;
                font-weight: 800;
            }

            span{
                font-size: 22px;
                font-weight: 600;
                color: #4361EE;
            }
        }

    }

    .InformacoesContrato{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 40px;
        gap: 20px;
    }

    .divExemplo{
        width: 30%;
        display: flex;
        flex-direction: column;
        text-align: center;

        p{
            font-size: 26px;
            font-weight: 600;
        }

        span{
            font-weight: 500;
            font-size: 22px;
            color: #4361EE;

        }
    }

    &:hover{
        transform: scale(0.95);
    }

    @media(max-width: 1000px){
        padding: 30px 15px;

        .InformacoesContrato{
            display: none;
        }

        .ValorContrato{
            gap: 25px;

            div{
                p{
                    font-size: 22px;
                    font-weight: 800;
                }

                span{
                    font-size: 20px;
                    font-weight: 600;
                    color: #4361EE;
                }
            }

        }
    }
`;

export const RendimentoObtidoTitle = styled.div`
    width: 100%;
    display: flex;
    margin-top: 40px;
    justify-content: center;

    p{
        margin: 0;
        font-size: 26px;
        text-align: center;
        font-weight: 800;
    }

    @media(max-width: 1000px){
        p{
            font-size: 22px;
        }
    }
`;

export const RendimentoObtido = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 20px;
  margin-top: 10px;
  position: relative;
    border: 1px solid rgba(0,0,0,0.2);


`;

export const BarraPreenchida = styled.div`
  background-color: #4caf50; /* Cor verde para a barra preenchida */
  height: 100%;
  border-radius: 8px;
  width: ${props => props.porcentagem}%; /* Porcentagem de preenchimento */
  transition: width 0.3s ease-in-out;
`;


export const Status = styled.p`
    margin: 0;
    font-weight: 800;
    padding-top: 20px;
    font-size: 22px;

    @media(max-width: 1000px){
        font-size: 18px;
    }
`;

// export const nome = styled.div``;

// export const nome = styled.div``;

// export const nome = styled.div``;


