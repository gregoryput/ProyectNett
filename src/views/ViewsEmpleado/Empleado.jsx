import { useState, useEffect } from "react";
//import "animate.css";
import { message } from "antd";
import {
  ContainerButton,
  ViewContainerPages,
  ButtonNext,
} from "../../components";

import { FormEmpleado, TablaComponent } from "./Form";

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
import {
  useDeleteEmployeMutation,
  useGetEmployeQuery,
  useRestoreEmployeMutation,
} from "../../redux/Api/employeeApi";

export default function Empleado() {
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
  ] = useDeleteEmployeMutation();

  const [
    restoreClient,
    {
      isLoading: isLoadinRestore,
      isSuccess: isRestoreSuccess,
      isError: isErrorRestore,
    },
  ] = useRestoreEmployeMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      message.success("Cliente eliminando correctamente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);
  //isErrorDelete ----------
  useEffect(() => {
    if (isErrorDelete) {
      message.success("Ha ocurrido un error al intentar eliminar al empleado");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isRestoreSuccess) {
      message.success("Empleado activado correctamente");
      setIsModalOpen(false);
    }
  }, [isRestoreSuccess]);
  //isErrorRestore ----------
  useEffect(() => {
    if (isErrorRestore) {
      message.success("Ha ocurrido un error al intentar activar al Empleado");
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
    data: Data,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetEmployeQuery("");

  useEffect(() => {
    if (isClientsSuccess) {
      message.success("Listado de Empleado obtenido correctamente!");
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
          Gestion de Empleado
        </h2>
        <ContainerButton
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <p>
            <b>Formulario</b>
          </p>
        </ContainerButton>

        <FormEmpleado
          setLoadingSave={setLoadingSave}
          toggle={toggle}
          setToggle={setToggle}
          dataClientEdit={dataClientEdit}
          setDataClientEdit={setDataClientEdit}
        />

        <TablaComponent
          Data={Data}
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
                    } este registro `}
                  </SavingText>
                </StyledSpinSubContainer>
              </StyledSpinContainer>
            </p>
          ) : (
            <p>{`Estas seguro de eliminar  ${selectedClient?.nombres} ${selectedClient?.apellidos}?`}</p>
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
