import styled from "styled-components";
import { Colores } from "../GlobalColor"

export const ButtonNext = styled.button`
background-color: ${Colores.AzulMar};
color: white;
height: 30px;
width: 100px;
border: none;
border-radius: 5px;
font-size: 12px;
display: flex;
justify-content: center;
align-items: center;

&:hover {
    background-color: ${Colores.Azulclaro};
    cursor: pointer;
    color:${Colores.Blanco}
  }

&:active {
    transform: scale(0.98);
}
`;
  