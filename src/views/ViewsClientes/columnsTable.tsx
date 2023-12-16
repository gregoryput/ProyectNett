import { ColumnsType } from "antd/es/table";
import React from "react";
import { IClienteDTO } from "../../interfaces";
import DropdownActionsLists from "../../components/DropDownActionsLists/dropdown-actions-lists";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";
import { Avatar, Tag } from "antd";
import { getTagTipoEntidad } from "../../gen-utils";

interface IGetsColumnsTableProps {
  Update: (record: IClienteDTO) => void;
  Delete: (record: IClienteDTO) => void;
  ViewDetail: (record: IClienteDTO) => void;
}

const getColumnsTable = ({
  Update,
  Delete,
  ViewDetail,
}: IGetsColumnsTableProps): ColumnsType<IClienteDTO> => {
  const columns: ColumnsType<IClienteDTO> = [
    {
      title: "Nombre del cliente",
      dataIndex: "NombreEntidad",
      key: "NombreEntidad",
      width: 220,
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div style={{ marginRight: "5px" }}>
            <Avatar src={"a"} />
          </div>
          <div style={{ fontWeight: "bold", color: "#25375B" }}>
            <span>{text}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Código",
      dataIndex: "Codigo",
      key: "Codigo",
      width: 120,
    },
    {
      title: "Tipo de cliente",
      dataIndex: "IdTipoEntidad",
      key: "IdTipoEntidad",
      render: (id, record) => (
        <div style={{ fontWeight: "bold", color: "#25375B" }}>
          {getTagTipoEntidad(id, record.NombreTipoEntidad)}
        </div>
      ),
    },
    {
      title: "Cédula o RNC",
      dataIndex: "Identificacion",
      key: "Identificacion",
      width: 120,
    },
    {
      title: "Teléfono",
      dataIndex: "Telefono",
      key: "Telefono",
      width: 130,
    },
    {
      title: "Correo",
      dataIndex: "Correo",
      key: "Correo",
      width: 10,
      render: (text: string) => (
        <div style={{ maxWidth: "179px" }}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Ciudad",
      dataIndex: "CiudadNombre",
      key: "CiudadNombre",
    },
    {
      title: "País",
      dataIndex: "PaisNombre",
      key: "PaisNombre",
    },
    {
      title: "Acción",
      key: "action",
      align: "center",
      render: (_, record: IClienteDTO, index) => (
        <DropdownActionsLists
          key={index}
          Actions={[
            {
              Name: "ViewDetail",
              Title: "Ver detalles",
              Method: () => ViewDetail(record),
              Icon: <MdOutlineVisibility size={20} color="#25375B" />,
            },
            {
              Name: "Edit",
              Title: "Editar",
              Method: () => Update(record),
              Icon: <MdOutlineEdit size={20} color="#25375B" />,
            },
            {
              Name: "Delete",
              Title: "Desactivar",
              Method: () => Delete(record),
              Icon: <MdDeleteOutline size={20} color="#25375B" />,
            },
          ]}
        />
      ),
    },
  ];
  return columns;
};

export default getColumnsTable;
