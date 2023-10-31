import { useState, useEffect } from "react";
//import "animate.css";
import { Modal, message } from "antd";
import {
  ContainerButton,
  ViewContainerPages,
  ButtonNext,
} from "../../components";

import { FormComponent, TablaComponent } from "./Form";


//icons
import { IoTrashOutline } from "react-icons/io5";
import { MdRestore } from "react-icons/md";
// modal creado por mi
import { useDeleteEmployeMutation, useGetEmployeQuery, useRestoreEmployeMutation } from "../../redux/Api/employeeApi";

export default function Cliente() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState();
  const [action, setAction] = useState("");

  const [
    deleteEmploye,
    {
      isLoading: isLoadinDelete,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
    },
  ] = useDeleteEmployeMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      message.success("Empleado eliminando correctamente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);
  //isErrorDelete ----------
  useEffect(() => {
    if (isErrorDelete) {
      message.success("Ha ocurrido un error al intentar eliminar al Empleado");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);

  const [
    restoreEmploye,
    {
      isLoading: isLoadinRestore,
      isSuccess: isRestoreSuccess,
      isError: isErrorRestore,
    },
  ] = useRestoreEmployeMutation();
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
    data: dataEmpleado,
    isSuccess: isSuccess,
    isLoading: isLoading,
  } = useGetEmployeQuery("");

  useEffect(() => {
    if (isSuccess) {
      message.success("Listado de Empleado obtenido correctamente!");
    }
  }, [isSuccess]);

  //Onclick de editar:
  const editar = (data) => {
    setToggle(true);
    setDataEdit(data);
  };

  const scrollToTop = ()=> {
    // Scroll suave hacia la parte superior de la página
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  return (
    <>
      <ViewContainerPages className="animate__animated animate__fadeIn">
        {/* <h2 style={{ marginLeft: 15, marginBottom: 40 }} id="titleTop">
          Gestion de Empleado
        </h2> */}
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

        <FormComponent
          setLoadingSave={setLoadingSave}
          toggle={toggle}
          setToggle={setToggle}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />

        <TablaComponent
          data={dataEmpleado}
          isLoading={isLoading}
          loadingSave={loadingSave}
          editar={editar}
          handleOpenModal={handleOpenModal}
          goSectionUp={scrollToTop}
          setSelected={setSelected}
          setAction={setAction}
        />

        <Modal open={isModalOpen}
          footer={null}
          onCancel={handleCloseModal}
          title={"Confirma la accion"}
          centered

        >
          {isLoadinDelete || isLoadinRestore ? (
            <></>
          ) : (
            <p>

              {selected != undefined && selected.nombreEstado === "Activo" ? (
                "Esta seguro de desactivar a este Empleado"
              ) :
                ("Esta seguro de activar a este Empleado")
              }
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
                action === "Activar"
                  ? restoreEmploye(selected.idEmpleado)
                  : deleteEmploye(selected.idEmpleado)
              }
            >
              {action === "Desactivar" ? (
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
      </ViewContainerPages>
    </>
  );
}
