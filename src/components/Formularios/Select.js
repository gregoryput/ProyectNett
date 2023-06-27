import styled from 'styled-components';
import { Colores} from "../GlobalColor"

export const Select = styled.select`
background-color: ${Colores.BlancoGris};
color: ${Colores.AzulOscuro};
border: 1px solid ${props => props.Error ?  "red": Colores.Gris};
height: 30px;
width: 200px;
padding: 5px;
margin: 10px 0;
outline: none;
border-radius: 5px;
font-size: 12px;
`;

export const Option = styled.option``;
