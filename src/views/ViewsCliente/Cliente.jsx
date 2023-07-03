import { useState } from "react";
import { Space, Table, Skeleton } from "antd";
import {
  ContainerButton,
  DivAnimetor,
  ViewContainerPages,
} from "../../components";

import { FormClientes } from "./Form";
import { useGetClientsQuery } from "../../redux/Api/clientsApi";

import { IoChevronDownSharp, IoCloseCircleOutline } from "react-icons/io5";

export default function Cliente() {
  const [toggle, setToggle] = useState(true);

  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery("");

  console.log(clientesData);

  return (
    <ViewContainerPages>
      <ContainerButton onClick={() => setToggle(!toggle)}>
        <h4>Crear nuevo cliente</h4>
        <DivAnimetor>
          <IoChevronDownSharp style={{ width: 20, height: 20 }} />
        </DivAnimetor>
      </ContainerButton>

      <FormClientes toggle={toggle} />

      {isLoadingClients ? <Skeleton active /> : <Tabla data={clientesData?.result} />}
    </ViewContainerPages>
  );
}

const { Column } = Table;

function Tabla(props) {
  return (
    <div
      style={{
        margin: 30,
        border: "1px solid #e2e2e2",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <Table dataSource={props.data}>
        <Column title="Nombres" dataIndex="nombres" key="nombres" />
        <Column title="Apellidos" dataIndex="apellidos" key="apellidos" />
        <Column title="Teléfono 1" dataIndex="telefono1" key="telefono1" />
        <Column title="Correo" dataIndex="correo" key="correo" />
        <Column title="Celular" dataIndex="telefono1" key="telefono1" />

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
