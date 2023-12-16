import { Button, Select, Tag } from "antd";
import styled from "styled-components";

export const DivUpload = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  background: #f8f5f5;
  border-radius: 45px;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border: 2px solid #e8e4e4;x
`;

export const DivSelectArea = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

export const DivAreaFoto = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  background: #f8f5f5;
  border-radius: 45px;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border: 2px solid #e8e4e4;
`;

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

export const DivContainerCheck = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonClearInputs = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ButtonCancelOp = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DivFooterDrawer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonOperation = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ButtonNewUnit = styled(Button)`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #3e91f6;
  padding: 0;
  &:hover {
    font-weight: bold;
  }
`;

export const DivAddUnits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 314px;
`;

export const DivContainerSelectAddUnits = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SelectAddUnits = styled(Select)`
  min-width: 200px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const DivCreateNewUnit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
`;

export const ContainerUnitsAddes = styled.div`
  display: flex;
  flex-direction: column;
  margintop: 15px;
`;

export const DivCardUnit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const TagCustom = styled(Tag)`
  min-width: 100px;
  font-weight: bold;
  color: black;
  border: 1px solid black;
`;

export const DivEmptyUnits = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;
