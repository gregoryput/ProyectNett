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
    <div style={{ margin:12 ,border:"1px solid #e2e2e2" ,padding:20,borderRadius:12 }} >  
    <Table dataSource={data} >
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column title="Apellido" dataIndex="Apellido" key="Apellido" />
      <Column title="Teléfono 1" dataIndex="Telefono 1" key="Telefono 1" />
      <Column title="Correo" dataIndex="Correo" key="Correo" />
      <Column title="Celular" dataIndex="Celular" key="Celular" />
 
    <Column
      title="Accion"
      key="action"
     

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
