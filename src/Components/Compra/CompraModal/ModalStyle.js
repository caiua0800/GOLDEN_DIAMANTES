import styled from "styled-components";

export const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.6);
  z-index: 9999;
  box-sizing: border-box;
`;

export const ModalBox = styled.div`
    width: 80%;
    height: 80%;
    box-sizing: border-box;
    background-color: rgba(255,255, 255, 1);
    border-radius: 8px;
    position: relative;
    box-shadow: 3px 3px 2px rgba(0,0,0,0.7);
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    position: relative;
    align-items: center;

    @media (max-width: 1000px) {
      width: 100%;
      height: 100%;
      padding: 10px 20px 120px 20px;
    }
`;

export const FecharModalBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  
  span {
    cursor: pointer;
    color: rgba(0,0,0,1);
    transition: .3s;
    font-weight: 800;

    &:hover {
      color: rgba(0,0,0,0.9);
      transform: scale(0.95);
    }
  }

`;

export const TitleContrato = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  font-size: 28px;
  color: black;
  margin-top: 60px;

`;

export const ModalPDFContainer = styled.div`
  width: max-content;
  box-sizing: border-box;
  height: 500px;
  overflow-y: auto;
  box-shadow: 3px 3px 6px rgba(0,0,0,0.7);
`;

export const AssinarContrato = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 20px;

  button{
    width: 200px;
    height: 40px;
    border: 0;
    cursor: pointer;
    box-shadow: 3px 3px 4px rgba(0,0,0,0.6);
    font-size: 16px;
    transition: .3s;

    &:hover{
      transform: scale(1.05);
    }
  }
`;

export const PayFormDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
  gap: 5px;
  p{
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }

  select{
    width: 200px;
    height: 30px;
  }
`;


export const ConfirmarLogin = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    flex-direction: column;
    text-align: center;
    font-weight: 500;
    
    button{
        width: 100%;
        margin-top: 20px;
        height: 40px;
        cursor: pointer;
        transition: .3s;

        &:hover{
            transform: scale(0.99);
        }
    }
`;

export const LoginBoxTitle = styled.div`
  margin-top: 20px;
  font-size: 22px;
`;

export const LoginBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;

    input{
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 3px 3px 1px rgba(0,0,0,0.3);
        box-sizing: border-box;
        padding-left: 20px;
        color: rgba(0,0,0,0.7);
        font-size: 18px;
        background-color: rgba(244, 244, 244, 1);
    }
`;

// export const nome = styled.div``;
// export const nome = styled.div``;
// export const nome = styled.div``;