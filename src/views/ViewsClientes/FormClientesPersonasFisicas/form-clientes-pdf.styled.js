import styled from "styled-components";

export const DivFooterFoto = styled.div`
  background: #f8f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80px;
  margin: 0 auto;
  border: 2px solid #e8e4e4;
  border-radius: 5px;
`;

/* 1 - ************************** CONTENEDOR PRINCIPAL (Contiene las dos columnas (Info Personal e Info de recnocimiento)) ************************** */
export const DivPrincipalContainerColumns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

/* 1.1 - ********** Columna Info personal: ************************** */
export const DivContainerColumnPersonalInfo = styled.div`
  margin-top: 15px;
  width: 48%;
`;

/* A - - -------- Contener del titulo de la columna Info Personal: ---------------- */
export const DivContainerTitleColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
`;

/* H3 PARA EL TITULO:*/
export const H3TitleColumn = styled.h3`
  width: 100%;
  background: #5592e7;
  border-radius: 8px;
  text-align: center;
  color: white;
  margin-right: 5px;
`;

/* B ---------- Contenedor principal de la info personal (1 - Select de cedula-nombre con foto y PequeñasColumnas para mostrar la info del seleccionado): ---------------- */
export const DivSelectedPerson = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/*DivContenedor del Form.Item FotoCliente*/
export const DivContainerFotoClient = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

// APARTADO DE FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO FOTO

/*DivContenedor del Form.Item FotoCliente*/
export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DivContainerAreaFoto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Contenedor para el area de la foto:
export const DivAreaFoto = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  background: #f8f5f5;
  border: 2px solid #8cbcd6;
  border-radius: 45px;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

// StyledImageAntd:
export const StyledImageAntd = styled.div`
  max-height: 80px;
  min-width: 80px;
  border-radius: 45px;
`;

export const ContainerPrincipalNoImage = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivIconNoImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const DivTextNoImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SpanNoImage = styled.span`
  font-weight: bold;
  color: #c6c6c6;
`;

// --- InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect InputSelect
// --- Contenedor para el Select IdPersona

export const DivContainerInputSelectPerson = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const DivLabelSelectPerson = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DivContainerButtonsSelectPerson = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const BtnSelectPeron = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DivContainerItemsColumnsInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const DivColumnInfOne = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 33%;
  max-width: 36%;
`;

export const DivItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
`;

export const DivColumnTwo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 30%;
  max-width: 30%;
  text-align: right;
`;

export const DivColumnThree = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 33%;
  max-width: 33%;
  text-align: right;
  margin-left: 20px;
`;
