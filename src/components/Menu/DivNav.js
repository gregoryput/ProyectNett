import styled from "styled-components";
import { Colores } from "../GlobalColor";

export const DivNav = styled.nav`
  display: flex;
  position: fixed;
  height: 70px;
  flex-direction: row;
  align-items: center;
  background-color:#fff;
  width: 100%;
  z-index: 1;
  justify-content: space-between;
  padding:  0 25px 0 100px;
  background-color: ${Colores.fondo}
`;
