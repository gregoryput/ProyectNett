import { useState } from "react";
import { Space, Table, Pagination } from "antd";
import {
  ContainerButton,
  DivAnimetor,
  SpinnerTables,
  ViewContainerPages,
} from "../../components";

import { FormClientes } from "./Form";
import { useGetClientsQuery } from "../../redux/Api/clientsApi";

import { IoChevronDownSharp, IoCloseCircleOutline } from "react-icons/io5";
import { useEffect } from "react";

export default function Cliente() {
  const [toggle, setToggle] = useState(true);
  const [dataClients, setDataClients] = useState();

  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery("");

  useEffect(() => {
    if (isClientsSuccess) {
      setDataClients(clientesData);
      console.log("dataclients", dataClients)
    }
  }, [isClientsSuccess]);

  return (
    <ViewContainerPages>
      <ContainerButton onClick={() => setToggle(!toggle)}>
        <h4>Crear nuevo cliente</h4>
        <DivAnimetor>
          <IoChevronDownSharp style={{ width: 20, height: 20 }} />
        </DivAnimetor>
      </ContainerButton>

      <FormClientes toggle={toggle} />

      {isLoadingClients ? (
        <SpinnerTables />
      ) : (
        <Tabla data={clientesData?.result} dataClients={clientesData} />
      )}
    </ViewContainerPages>
  );
}

const { Column } = Table;

function Tabla({ data, dataClients }) {
  return (
    <div
      style={{
        margin: 15,
        border: "1px solid #e2e2e2",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <h3 style={{ marginTop: 5, marginBottom: 20 }}>Registro de clientes</h3>
      <Table dataSource={data}>
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
        <Pagination
          current={4}
          pageSize={30}
          total={3}
          //onChange={handleChangePage}
        />
      </Table>
    </div>
  );
}
