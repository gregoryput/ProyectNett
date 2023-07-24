import { useState, useEffect } from "react";
import {
  Space,
  Table,
  Pagination,
  Spin,
  Skeleton,
  Select,
  message,
} from "antd";
import {
  ContainerButton,
  DivAnimetor,
  ViewContainerPages,
  ButtonIcon,
} from "../../components";

import { Colores } from "../../components/GlobalColor";

import { FormClientes } from "./Form";
import { useGetClientsQuery } from "../../redux/Api/clientsApi";

import {
  IoChevronDownSharp,
  IoTrashSharp,
  IoInformationCircle,
} from "react-icons/io5";

import { FaPencilAlt } from "react-icons/fa";

export default function Cliente() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataClientEdit, setDataClientEdit] = useState(null);
  const [isMessageSuccessVisible, setMessageSuccessVisible] = useState(false);

  //Estado redux api para obtener la lista de clientes con paginacion
  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (isClientsSuccess /* && clientesData !== null */) {
      if (!isMessageSuccessVisible) {
        message.success("Listado de clientes obtenido correctamente!");
        setMessageSuccessVisible(true);

        setTimeout(() => {
          setMessageSuccessVisible(false);
        }, 1000);
      }
    }
  }, [isClientsSuccess, clientesData]);

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

  //Onclick de editar:
  const editarCliente = (dataClientEdit) => {
    setToggle(false);
    setDataClientEdit(dataClientEdit);
  };

  return (
    <>
      <Spin size="large" style={{ margin: "0 auto" }} />
      <ViewContainerPages>
        <ContainerButton onClick={() => setToggle(!toggle)}>
          <h4>Crear nuevo cliente</h4>
          <DivAnimetor>
            <IoChevronDownSharp style={{ width: 20, height: 20 }} />
          </DivAnimetor>
        </ContainerButton>

        <FormClientes
          setLoadingSave={setLoadingSave}
          toggle={toggle}
          setToggle={setToggle}
          dataClientEdit={dataClientEdit}
        />

        <Tabla
          data={clientesData}
          dataClients={clientesData}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          isLoadingClients={isLoadingClients}
          loadingSave={loadingSave}
          editarCliente={editarCliente}
        />
      </ViewContainerPages>
    </>
  );
}

const { Column } = Table;

function Tabla({
  data,
  dataClients,
  handlePageChange,
  isLoadingClients,
  loadingSave,
  handlePageSizeChange,
  setToggle,
  editarCliente,
}) {
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

      {isLoadingClients || loadingSave ? (
        <Skeleton />
      ) : (
        <>
          <Table dataSource={dataClients?.result} pagination={false}>
            <Column title="Nombres" dataIndex="nombres" key="nombres" />
            <Column title="Apellidos" dataIndex="apellidos" key="apellidos" />
            <Column title="Teléfono 1" dataIndex="telefono1" key="telefono1" />
            <Column title="Ciudad" dataIndex="ciudadNombre" key="ciudad" />
            <Column title="Correo" dataIndex="correo" key="correo" />
            <Column title="Celular" dataIndex="telefono1" key="telefono1" />

            <Column
              title="Acción"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <ButtonIcon onClick={() => editarCliente(record)}>
                    <FaPencilAlt size={19} color={`${Colores.AzulOscuro}`} />
                  </ButtonIcon>

                  <ButtonIcon>
                    <IoTrashSharp size={21} color={"#FF7676"} />
                  </ButtonIcon>
                  <ButtonIcon>
                    <IoInformationCircle
                      size={21}
                      color={`${Colores.AzulOscuro}`}
                    />
                  </ButtonIcon>
                </Space>
              )}
            />
          </Table>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Pagination
                current={data?.currentPage}
                pageSize={data?.pageSize}
                total={data?.totalItems}
                onChange={handlePageChange}
              />
            </div>

            <div>
              <span style={{ fontSize: "15px" }}>Clientes por página: </span>
              <Select defaultValue={5} style={{ width: "60px" }} onChange={handlePageSizeChange}>
                <Select.Option key={1} value={5}>
                  5
                </Select.Option>
                <Select.Option key={2} value={10}>
                  10
                </Select.Option>
                <Select.Option key={3} value={20}>
                  20
                </Select.Option>
                <Select.Option key={5} value={30}>
                  30
                </Select.Option>
                <Select.Option key={5} value={40}>
                  50
                </Select.Option>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
