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
import { useDesactivarMutation, useGetQuery, useRestoreMutation } from "../../redux/Api/ProveedorApi";

export default function Proveedores() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState();
  const [action, setAction] = useState("");

  const [
    Desactivar,
    {
      isLoading: isLoadinDelete,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
    },
  ] = useDesactivarMutation();


  const [
    restore,
    {
      isLoading: isLoadinRestore,
      isSuccess: isRestoreSuccess,
      isError: isErrorRestore,
    },
  ] = useRestoreMutation();

  useEffect(() => {
    if (isRestoreSuccess) {
      message.success("Proveedor activado correctamente");
      setIsModalOpen(false);
    }
  }, [isRestoreSuccess]);
  //isErrorRestore ----------
  useEffect(() => {
    if (isErrorRestore) {
      message.success("Ha ocurrido un error al intentar activar al Proveedor");
      setIsModalOpen(false);
    }
  }, [isErrorRestore]);

  useEffect(() => {
    if (isDeleteSuccess) {
      message.success("Proveedor eliminando correctamente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);
  //isErrorDelete ----------
  useEffect(() => {
    if (isErrorDelete) {
      message.success("Ha ocurrido un error al intentar eliminar al Proveedor");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //Estado redux api para obtener la lista 
  const {
    data: getData,
    isSuccess: isClientsSuccess,
    isLoading: isLoading,
  } = useGetQuery("");


  useEffect(() => {
    if (isClientsSuccess) {
      message.success("Listado de Proveedores obtenido correctamente!");
    }
  }, [isClientsSuccess]);

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
          Gestion de proveedores
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
          data={getData}
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
             
              { selected !=undefined &&  selected.nombreEstado === "Activo" ? (
                "Esta seguro de desactivar a este proveedor"
              ):
              ("Esta seguro de activar a este proveedor")
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
                  ? restore(selected.idProveedor)
                  : Desactivar(selected.idProveedor)
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
