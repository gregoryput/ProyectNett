import styled from "styled-components";
import { Colores } from "../../components/GlobalColor";

export const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px;
`;
export const ButtonIconBorder = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px 15px;

  &:hover {
    background-color: ${Colores.Grispastel};
    border-radius: 10px;

  }
  &:active {
    background-color: ${Colores.AzulMar};
    border-radius: 10px;

    color: ${Colores.Grispastel};
  }
`;

export const ButtonSelect = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Colores.AzulMar};
  display: flex;

  &:hover {
    background-color: ${Colores.Grispastel};
    border-radius: 10px;

  }
  &:active {
    background-color: ${Colores.AzulMar};
    border-radius: 10px;

    color: ${Colores.Grispastel};
  }
`;
export const ButtonSelectProyecto = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  border-radius: 5px;

  background-color: ${(props) =>
    props.isSelected ? Colores.Grispastel : "white"};
  color: ${(props) => (props.isSelected ?  Colores.AzulMar : "black")};
  border-left: 5px solid ${(props) => (props.isSelected ?  Colores.AzulMar : "transparent")};

  &:hover {
    background-color: ${Colores.fondo};
    border-radius: 5px;
    border-left: 5px solid ${Colores.Grispastel};
  }

`;

export const ButtonIconDelete = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${Colores.AzulMar};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 5px;
`;
export const ButtonIconMenuTalba = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  cursor: pointer;
  color: ${Colores.AzulMar};
  display: flex;
  margin: 1px;
  flex-direction: row;
  padding: 5px;
  &:hover {
    background-color: ${Colores.Grispastel};
    color: ${Colores.AzulMar};
    border-radius: 4px;
  }

  &:active {
    background-color: ${Colores.AzulMar};
    border-radius: 4px;

    color: ${Colores.Blanco};
  }
`;
