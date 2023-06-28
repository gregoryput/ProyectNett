import { useState } from "react";
import { Space, Table } from "antd";
import {
  ContainerButton,
  DivAnimetor,
  ViewContainerPages,
} from "../../components";

import { FormClientes } from "./Form";

import { IoChevronDownSharp, IoCloseCircleOutline } from "react-icons/io5";

export default function Cliente() {
  const [toggle, setToggle] = useState(true);

  return (
    <ViewContainerPages>
      <ContainerButton onClick={() => setToggle(!toggle)}>
        <h4>Crear nuevo cliente</h4>
        <DivAnimetor>
          <IoChevronDownSharp style={{ width: 20, height: 20 }} />
        </DivAnimetor>
      </ContainerButton>

      <FormClientes toggle={toggle} />

      <Tabla />
    </ViewContainerPages>
  );
}

const { Column } = Table;

function Tabla() {
  const data = [
    {
      key: "1",
      Nombre: "John",
      Apellido: "Brown",
      "Telefono 1": "123456789",
      "Telefono 2": "987654321", // Opcional
      Direccion: "New York No. 1 Lake Park",
      Correo: "john@example.com",
      Celular: "9876543210",
      Edad: 32,
      Sexo: "Masculino",
      Pais: "Estados Unidos",
      Ciudad: "Nueva York",
    },
    {
      key: "2",
      Nombre: "Jim",
      Apellido: "Green",
      "Telefono 1": "987654321",
      "Telefono 2": "", // Opcional (dejar en blanco)
      Direccion: "London No. 1 Lake Park",
      Correo: "jim@example.com",
      Celular: "1234567890",
      Edad: 42,
      Sexo: "Masculino",
      Pais: "Reino Unido",
      Ciudad: "Londres",
    },
    {
      key: "3",
      Nombre: "Joe",
      Apellido: "Black",
      "Telefono 1": "555555555",
      "Telefono 2": "999999999", // Opcional
      Direccion: "Sydney No. 1 Lake Park",
      Correo: "joe@example.com",
      Celular: "1231231234",
      Edad: 32,
      Sexo: "Masculino",
      Pais: "Australia",
      Ciudad: "Sídney",
    },
  ];

  return (
    <div
      style={{
        margin: 30,
        border: "1px solid #e2e2e2",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <Table dataSource={data}>
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column title="Apellido" dataIndex="Apellido" key="Apellido" />
        <Column title="Teléfono 1" dataIndex="Telefono 1" key="Telefono 1" />
        <Column title="Correo" dataIndex="Correo" key="Correo" />
        <Column title="Celular" dataIndex="Celular" key="Celular" />

        <Column
          title="Accion"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button>Invite {record.lastName}</button>
              <button>
                <IoCloseCircleOutline />
              </button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
