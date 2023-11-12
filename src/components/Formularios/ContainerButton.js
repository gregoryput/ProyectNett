import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const ContainerButton = styled.button`
  border: none;
  border-radius: 12px;
  font-size: 14px;
  height: 50px;
  width: 98%;
  margin: 20px auto 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: ${Colores.Blanco};
  transition: all 0.1s ease-in-out;
  color: #000;
  &:hover {
    background-color: ${Colores.BlancoGris};
  }

  &:active {
    background-color: ${Colores.AzulMar};
    color: ${Colores.Blanco};
    scale: 0.99;
  }
`;
