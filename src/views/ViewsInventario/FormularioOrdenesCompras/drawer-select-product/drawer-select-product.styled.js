import styled from "styled-components";

/*----- div Contenedor Azul donde va la foto: -----*/
export const DivBlueFoto = styled.div`
  background: #1c3c6d;
  width: 117px;
  height: 95px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px 10px 0 0;
  width: 100%;
`;

/*----- div Redondeado para la foto: -----*/
export const DivCircleFoto = styled.div`
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  min-height: 80px;
  border-radius: 100%;
  margin: 0 auto;
  border: 2.5px solid white;
  background: #cbcbcb;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
