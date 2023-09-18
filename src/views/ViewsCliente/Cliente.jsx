import { useState, useEffect } from "react";
//import "animate.css";
import { message } from "antd";
import {
  ContainerButton,
  ViewContainerPages,
  ButtonNext,
} from "../../components";

import { FormClientes, TablaComponent } from "./Form";
import { useGetClientsQuery } from "../../redux/Api/clientsApi";

//icons
import { IoTrashOutline } from "react-icons/io5";
// modal creado por mi
import ModalStyled from "../../layout/ModalStyled";

export default function Cliente() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [dataClientEdit, setDataClientEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  } = useGetClientsQuery({
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (isClientsSuccess) {
      message.success("Listado de clientes obtenido correctamente!");
    }
  }, [isClientsSuccess]);

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
  };

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

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
          Gestion de clientes
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
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          isLoadingClients={isLoadingClients}
          loadingSave={loadingSave}
          editarCliente={editarCliente}
          handleOpenModal={handleOpenModal}
          goSectionUp={scrollToSection}
        />

        <ModalStyled isOpen={isModalOpen} onClose={handleCloseModal}>
          <p>Estas seguro de eliminar el cliente?</p>

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
            >
              <IoTrashOutline size={20} style={{ marginRight: 5 }} /> Confirmar
            </ButtonNext>
          </div>
        </ModalStyled>
      </ViewContainerPages>
    </>
  );
}
