import styled, { keyframes } from "styled-components";
import { Colores } from "../GlobalColor";

// Definir la animación
const slideDown = keyframes`
  0% {
    height:0;
    transform-origin: top;
  }
  100% {
    height:420px;
    transform-origin: top;
  }
`;
const slideUp = keyframes`
  0% {
    height: 420px;
    transform-origin: top;
  }
  100% {
    height: 0;
    transform-origin: top;
  }
`;

export const ContainerForm = styled.div`
  border: 1px solid ${Colores.BlancoHueso};
  color: white;
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  color: ${Colores.AzulOscuro};
  animation: ${(props) => (props.display ? slideDown : slideUp)} 0.3s ease-out;
  overflow: hidden;
  display: ${(props) => (props.animacion ? "block" : "none")};
`;

export const Container = styled.div`
  border: 1px solid ${Colores.BlancoHueso};
  color: white;
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  color: ${Colores.AzulOscuro};
  overflow: hidden;
`;

export const ContainerDetail = styled.div`
  color: white;
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  color: ${Colores.AzulOscuro};
  overflow: hidden;

  ::-webkit-scrollbar {
    width: 10px; /* Ancho del scroll */
  }

  /* Estilo para el thumb (la barra de scroll) */
  ::-webkit-scrollbar-thumb {
    background-color: #c3c3c3; /* Color del thumb */
    border-radius: 5px; /* Borde del thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #1c3c6d; /* Color del thumb */
    border-radius: 12px; /* Borde del thumb */
  }

  /* Estilo para el track (el área detrás del thumb) */
 ::-webkit-scrollbar-track {
    background-color: #e4e4e4; /* Color del track */
  }
`;
export const ContainerList = styled.div`
  border-radius: 12px;
  font-size: 14px;
  padding: 25px;
  width: 98%;
  margin: 10px auto;
  overflow: hidden;
  background-color: ${Colores.Grispastel};
  color: ${Colores.Azulclaro}
`;

export const ContainerFormPrueba = styled.form`
  display: ${(props) => (props.display ? "none" : "block")};
  color: white;
  border-radius: 12px;
  font-size: 14px;
  color: ${Colores.AzulOscuro};
`;

export const PrincipalContainerForm = styled.div`
  display: ${(props) => (props.display ? "none" : "block")};
  border: 1px solid ${Colores.BlancoHueso};
  color: white;
  border-radius: 12px;
  font-size: 14px;
  width: 90vw;
  margin: 10px auto;
  color: ${Colores.AzulOscuro};
`;
