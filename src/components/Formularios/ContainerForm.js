import styled, { keyframes } from 'styled-components';
import { Colores } from "../GlobalColor"

// Definir la animación
const slideDown = keyframes`
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  100% {
    transform: scaleY(1);
    transform-origin: top;
  }
`;


export  const ContainerForm = styled.div`
    display: ${props => props.display ?  "none": "block"};
    border: 1px  solid  ${Colores.BlancoHueso};
    color: white;
    border-radius: 12px;
    font-size: 14px;
    padding: 25px;
    width: 98%;
    margin: 10px auto;
    color: ${Colores.AzulOscuro};
    animation: ${slideDown} 0.3s ease-out;
  overflow: hidden;
`


export  const ContainerFormPrueba = styled.form`
    display: ${props => props.display ?  "none": "block"};
    color: white;
    border-radius: 12px;
    font-size: 14px;
    padding: 25px;
    width: 90vw;
    color: ${Colores.AzulOscuro};
`

export  const PrincipalContainerForm = styled.div`
    display: ${props => props.display ?  "none": "block"};
    border: 1px  solid  ${Colores.BlancoHueso};
    color: white;
    border-radius: 12px;
    font-size: 14px;
    width: 90vw;
    margin: 10px auto;
    color: ${Colores.AzulOscuro};
`