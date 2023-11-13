import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const BtnSelect = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  transform: scale(0.97);

  transition: transform 0.5s;
  border-radius: 5px;

  &:hover {
    border-radius: 5px;
    transform: scale(1);
    background-color: ${Colores.fondo};
  }
  &:active {
    background-color: ${Colores.BlancoGris};
    border-radius: 5px;
  }
`;
