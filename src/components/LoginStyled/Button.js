import styled from "styled-components"
import { Colores } from "../GlobalColor"


export  const Button = styled.button`
    background-color: ${Colores.AzulMar};
    color: white;
    height: 50px;
    width: 250px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    margin-top:60px;
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
`
