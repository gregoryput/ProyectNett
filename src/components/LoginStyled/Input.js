import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const Input = styled.input`
  background-color: ${Colores.BlancoGris};
  color: ${Colores.AzulOscuro};
  border: 1px solid ${(props) => (props.Error ? "red" : Colores.Gris)};
  height: 50px;
  width: 250px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  border-radius: 5px;
  font-size: 14px;
  transition: transform 0.3s ease;

  &:focus {
    outline: none;
    border: 1.5px solid ${(props) => (props.Error ? "red" : Colores.AzulMar)};
    transform: scale(1.1);
  }

  &::placeholder {
    color: ${Colores.Gris};
  }
`;
