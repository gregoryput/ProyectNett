import styled from "styled-components";



export const TablaStyled = styled.table`
  border-collapse: collapse;
  overflow-x: auto;
`;

export const Th = styled.th`
  padding: 8px;
  text-align: center;
  font-weight: 400;
  border-left: 1px solid lightgray;
  color: gray;
`;
export const Tha = styled.th`
  padding: 8px;
  text-align: center;
`;
export const Td = styled.td`
  padding: 8px;
  text-align: left;
  position: relative;
  border-bottom: 1px solid lightgray;
`;

export const Tda = styled.td`
  padding: 1px;
  text-align: left;
  position: relative;
  border-right: 1px solid lightgray;
  min-width: 150px;
`;

export const Barra = styled.div`
  position: absolute;
  top: 2;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: green;
  height: 20px;
  align-items: center;
`;