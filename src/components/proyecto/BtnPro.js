import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const BtnPro = styled.button`
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  color: ${Colores.AzulMar};
  overflow: hidden;
  background-color: ${Colores.Blanco};
  outline: none;
  cursor: pointer;
  transform: scale(0.99);
  transition: transform 0.2s;

  &:hover {
    border-radius: 12px;

    transform: scale(1);
    background-color: ${Colores.AzulMar};
    color: ${Colores.Blanco};
  }
`;

export const BtnPago = styled.button`
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  color: ${Colores.AzulMar};
  overflow: hidden;
  background-color: ${Colores.Blanco};
  outline: none;
  cursor: pointer;
  transform: scale(0.99);
  transition: transform 0.2s;

  &:hover {
    border-radius: 12px;

    transform: scale(1);
    background-color: #87d068;
    color: ${Colores.Blanco};
  }
`;

export const BtnNavPro = styled.button`
  color: white;
  border: none;
  font-size: 14px;
  padding: 23px;
  width: 99%;
  margin: 10px auto;
  color:${(props) => (props.color ? "white" : `${Colores.AzulMar}`)}; ;
  overflow: hidden;
  background-color: ${(props) => (props.color ? "orange" : "white")};
  outline: none;
  cursor: pointer;
  transition: transform 0.4s;
  height:100%;

  &:hover {

    transform: scale(1.1);
    background-color:  ${Colores.AzulOscuro}  ;
    color: ${Colores.Blanco};
  }
`;

