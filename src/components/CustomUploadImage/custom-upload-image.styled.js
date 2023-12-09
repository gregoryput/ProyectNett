import { Image } from "antd";
import styled from "styled-components";

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
  border: 2px solid #8cbcd6;
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


export const ContainerPrincipal = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.width ? props.width : "11%")};
`;

export const ContainerSubPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageAntd = styled(Image)`
  max-height: 80px;
  min-width: 80px;
  border-radius: 45px;
`;

export const DivUtilNoImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
