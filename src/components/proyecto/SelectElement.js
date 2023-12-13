import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const BtnSelect = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  transform: scale(0.97);
  background-color: ${(props) =>
    props.isSelected ? Colores.AzulMar : "white"};
  color: ${(props) => (props.isSelected ? Colores.Blanco : "black")};

  transition: transform 0.5s;
  border-radius: 5px;

  &:hover {
    border-radius: 5px;
    transform: scale(1);
    background-color: ${Colores.fondo};
    color: black;
  }
  &:active {
    background-color: ${Colores.BlancoGris};
    border-radius: 5px;
  }
`;
export const BtnSelectt = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 8px 10px;
  transform: scale(0.97);
  background-color: ${(props) =>
    props.isSelected ? Colores.AzulMar : Colores.fondo };
  color: ${(props) => (props.isSelected ? Colores.Blanco : "black")};

  transition: transform 0.5s;
  border-radius: 5px;


  &:hover {
    border-radius: 5px;
    transform: scale(1);
    background-color: #B3B4ED;
  }
  &:active {
    background-color: ${Colores.BlancoGris};
    border-radius: 5px;
  }
`;
