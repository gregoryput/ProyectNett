
import styled from "styled-components";


export  const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export  const Box1 = styled.div`
  width: 20%;
  min-width: 400px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export  const FlexibleBox = styled.div`
  flex: 1; /* Toma el espacio restante */
  height: 100%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export  const RowItem = styled.div`
  flex: 1 0 100%;

  @media (min-width: 1250px) {
    flex-basis: 70%;
  }
`;

export  const ColumnItem = styled.div`
  flex: 1 0 100%;

  @media (min-width: 1250px) {
    flex: 1 0 25%;
  }
`;

export const ColumnItem2 = styled.div`
  flex: 1 0 100%;

  @media (min-width: 1250px) {
    flex: 1 0 40%;
  }
`;

export const ColumnItem3 = styled.div`
  flex: 1 0 100%;

  @media (min-width: 1250px) {
    flex: 1 0 60%;
  }
`;
