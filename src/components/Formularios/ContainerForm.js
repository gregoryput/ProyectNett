<<<<<<< HEAD
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


=======
import styled from "styled-components";
import { Colores } from "../GlobalColor"

>>>>>>> 0bf79c873628f10f3254c70c4998e2b1243ed4e8
export  const ContainerForm = styled.div`
    display: ${props => props.display ?  "none": "block"};
    border: 1px  solid  ${Colores.BlancoHueso};
    color: white;
    border-radius: 12px;
    font-size: 14px;
    padding: 25px;
    width: 98%;
    margin: 10px auto;
<<<<<<< HEAD
    color: ${Colores.AzulOscuro};
    animation: ${slideDown} 0.3s ease-out;
  overflow: hidden;
=======
    color: ${Colores.AzulOscuro};  
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
>>>>>>> 0bf79c873628f10f3254c70c4998e2b1243ed4e8
`
