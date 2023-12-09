import React, { useState, useEffect } from "react";
//import "animate.css";
import { Button, Drawer, Form, Input, Modal, message } from "antd";
import {
  ContainerButton,
  ViewContainerPages,
  ButtonNext,
  DropdownActionsNew,
} from "../../components";
import { MdOutlinePerson } from "react-icons/md";
import { MdBusiness } from "react-icons/md";

import { TablaComponent } from "./Form";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
  useRestoreClientMutation,
} from "../../redux/Api/clientsApi";

//icons
import { IoTrashOutline } from "react-icons/io5";
import { MdRestore } from "react-icons/md";
// modal creado por mi

export default function ClienteV2() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataClientEdit, setDataClientEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState();
  const [actionClient, setActionClient] = useState("");

  const [
    deleteClient,
    {
      isLoading: isLoadinDelete,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
    },
  ] = useDeleteClientMutation();
  useEffect(() => {
    if (isDeleteSuccess) {
      message.success("Cliente eliminando correctamente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);
  //isErrorDelete ----------
  useEffect(() => {
    if (isErrorDelete) {
      message.success("Ha ocurrido un error al intentar eliminar al cliente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess, isErrorDelete]);

  const [
    restoreClient,
    {
      isLoading: isLoadinRestore,
      isSuccess: isRestoreSuccess,
      isError: isErrorRestore,
    },
  ] = useRestoreClientMutation();
  useEffect(() => {
    if (isRestoreSuccess) {
      message.success("Cliente activado correctamente");
      setIsModalOpen(false);
    }
  }, [isRestoreSuccess]);
  //isErrorRestore ----------
  useEffect(() => {
    if (isErrorRestore) {
      message.success("Ha ocurrido un error al intentar activar al cliente");
      setIsModalOpen(false);
    }
  }, [isErrorRestore]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Estado redux api para obtener la lista de clientes:
  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery("");

  console.log;

  useEffect(() => {
    if (isClientsSuccess) {
      message.success("Listado de clientes obtenido correctamente!");
    }
  }, [isClientsSuccess]);

  //Onclick de editar:
  const editarCliente = (dataClientEdit) => {
    setToggle(true);
    setDataClientEdit(dataClientEdit);
  };

  const scrollToTop = () => {
    // Scroll suave hacia la parte superior de la página
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [openDrawerForm, setOpenDrawerForm] = React.useState(false);

  return (
    <>
      <ViewContainerPages className="animate__animated animate__fadeIn">
        <ContainerButton
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <p>
            <div>
              {" "}
              <DropdownActionsNew
                Actions={[
                  {
                    Name: "NewCP",
                    Title: "Persona física",
                    Method: () => console.log("a"),
                    Icon: <MdOutlinePerson size={20} />,
                  },
                  {
                    Name: "NewCE",
                    Title: "Empresa",
                    Method: () => console.log("b"),
                    Icon: <MdBusiness size={20} />,
                  },
                ]}
              />
            </div>
          </p>
        </ContainerButton>

        <TablaComponent
          data={clientesData}
          dataClients={clientesData}
          isLoadingClients={isLoadingClients}
          loadingSave={loadingSave}
          editarCliente={editarCliente}
          handleOpenModal={handleOpenModal}
          goSectionUp={scrollToTop}
          setSelectedClient={setSelectedClient}
          setActionClient={setActionClient}
        />
        <Button onClick={() => setOpenDrawerForm(true)}>Abrir</Button>

        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={handleCloseModal}
          title={"Confirma la accion"}
          centered
        >
          {isLoadinDelete || isLoadinRestore ? (
            <></>
          ) : (
            <p>
              {selectedClient != undefined &&
              selectedClient.nombreEstado === "Activo"
                ? "Esta seguro de desactivar a este Cliente"
                : "Esta seguro de activar a este Cliente"}
            </p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <ButtonNext
              onClick={() => handleCloseModal()}
              style={{ width: 40 }}
            >
              No
            </ButtonNext>

            <ButtonNext
              style={{
                marginLeft: 10,
                marginRight: 10,
                backgroundColor: "red",
                paddingInline: 20,
                width: 130,
              }}
              onClick={() =>
                actionClient === "Activar"
                  ? restoreClient(selectedClient.idCliente)
                  : deleteClient(selectedClient.idCliente)
              }
            >
              {actionClient === "Desactivar" ? (
                <IoTrashOutline
                  size={18}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              ) : (
                <MdRestore
                  size={18}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              )}
              Confirmar
            </ButtonNext>
          </div>
        </Modal>

        <Drawer
          open={openDrawerForm}
          onClose={() => setOpenDrawerForm(false)}
          placement="top"
          title="Formulario de registro de clientes -> Nuevo Cliente"
          height={"70%"}
          footer={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <Button>Registrar</Button>
                <Button>Cancelar</Button>
              </div>
            </div>
          }
        >
          <Form>
            <Form.Item>
              <Input />
            </Form.Item>
          </Form>
        </Drawer>
      </ViewContainerPages>
    </>
  );
}
