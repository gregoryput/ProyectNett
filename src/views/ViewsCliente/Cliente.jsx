import { useState, useEffect } from "react";
//import "animate.css";
import { message } from "antd";
import {
  ContainerButton,
  ViewContainerPages,
  ButtonNext,
} from "../../components";

import { FormClientes, TablaComponent } from "./Form";
import {
  useDeleteClientMutation,
  useGetClientsQuery,
  useRestoreClientMutation,
} from "../../redux/Api/clientsApi";

import {
  SavingText,
  StyledSpinContainer,
  StyledSpinSubContainer,
} from "../../components/StylesCustomLoading/loading-custom.styled";
import { Spin } from "antd";

//icons
import { IoTrashOutline } from "react-icons/io5";
import { MdRestore } from "react-icons/md";
// modal creado por mi
import ModalStyled from "../../layout/ModalStyled";

export default function Cliente() {
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
  }, [isErrorDelete]);

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
  //Estado redux api para obtener la lista de clientes con paginacion
  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery("");

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

  const scrollToSection = () => {
    // Obtener el titulo de arriba, para cuando se de clic a editar un cliente, si esta muy abajo se desplace hacia arriba automaticamente:
    const targetSection = document.getElementById("titleTop");

    if (targetSection) {
      // Con el scrollIntoView se lleva a cabo el desplazamiento a la sección objetivo (titleTop):
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ViewContainerPages className="animate__animated animate__fadeIn">
        <h2 style={{ marginLeft: 15, marginBottom: 40 }} id="titleTop">
          Gestión de clientes
        </h2>
        <ContainerButton
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <p>
            <b>Formulario</b>
          </p>
          {/* <IoChevronDownSharp style={{ width: 20, height: 20 }} /> */}
        </ContainerButton>

        <FormClientes
          setLoadingSave={setLoadingSave}
          toggle={toggle}
          setToggle={setToggle}
          dataClientEdit={dataClientEdit}
          setDataClientEdit={setDataClientEdit}
        />

        <TablaComponent
          data={clientesData}
          dataClients={clientesData}
          isLoadingClients={isLoadingClients}
          loadingSave={loadingSave}
          editarCliente={editarCliente}
          handleOpenModal={handleOpenModal}
          goSectionUp={scrollToSection}
          setSelectedClient={setSelectedClient}
          setActionClient={setActionClient}
        />

        <ModalStyled isOpen={isModalOpen} onClose={handleCloseModal}>
          {isLoadinDelete || isLoadinRestore ? (
            <p>
              <StyledSpinContainer>
                <StyledSpinSubContainer>
                  <Spin size="large" />
                  <SavingText isSaving={isLoadinDelete || isLoadinRestore}>
                    {`${
                      isLoadinDelete
                        ? "Desactivando"
                        : isLoadinRestore
                        ? "Activando"
                        : ""
                    } al cliente`}
                  </SavingText>
                </StyledSpinSubContainer>
              </StyledSpinContainer>
            </p>
          ) : (
            <p>{`Estas seguro de eliminar al cliente ${selectedClient?.nombres} ${selectedClient?.apellidos}?`}</p>
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
        </ModalStyled>
      </ViewContainerPages>
    </>
  );
}
