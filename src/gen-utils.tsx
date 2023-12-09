import { Tag } from "antd";
import React from "react";

export const getTagTipoEntidad = (
  idTipoEntidad: number,
  nombre: string
): JSX.Element => {
  return (
    <Tag color={idTipoEntidad === 1 ? "#5F6061" : "#485266"}>{nombre}</Tag>
  );
};
