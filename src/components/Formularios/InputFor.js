import { styled } from "styled-components"
import { Colores} from "../GlobalColor"


export  const InputFor = styled.input`
    background-color: ${Colores.BlancoGris};
    color: ${Colores.AzulOscuro};
    border: 1px solid ${props => props.Error ?  "red": Colores.Gris};
    height: 30px;
    width: 200px;
    padding: 10px;
    margin: 10px 0;
    
    border-radius: 5px;
    font-size: 13px;
  


    &:focus {
        outline: none;
        border: 1.5px solid ${props => props.Error ?  "red": Colores.AzulMar};
       
      }

      &::placeholder {
        color: ${Colores.Gris};
      } 
`
