import styled from "styled-components";
import { Colores } from "../../components/GlobalColor";

export const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color:${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding:5px;
`;
export const ButtonIconBorder = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color:${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding:5px 15px ;

  &:hover {
    background-color: ${Colores.Grispastel};
    border-radius:5px;
  }
  &:active {
    background-color: ${Colores.AzulMar};
    border-radius:5px;
    color:${Colores.Grispastel};
  }


`;




export const ButtonIconDelete = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color:${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding:5px;
`;
export const ButtonIconMenuTalba = styled.button`
  background: transparent;
  border: none;
  width:100%;
  cursor: pointer;
  color:${Colores.AzulMar};
  display: flex;
  margin: 1px;
  flex-direction: row;
  padding:5px;
  &:hover{
    background-color: ${Colores.Grispastel};
    color: ${Colores.AzulMar};
    border-radius:4px;
  }

  &:active{
    background-color: ${Colores.AzulMar};
    border-radius:4px;
   
    color: ${Colores.Blanco};

  }

`;
