import styled from "styled-components";
import { Colores } from "../GlobalColor"

export const ButtonSave = styled.button`
background-color: ${Colores.AzulMar};
color: white;
height: 30px;
width: 200px;
border: none;
border-radius: 5px;
font-size: 12px;
display: flex;
justify-content: center;
align-items: center;

&:hover {
    background-color: #61a649;
    cursor: pointer;
    color:${Colores.Blanco}
  }

&:active {
    transform: scale(0.93);
    background-color: #61a649;
}
`;
  