import { useEffect, useState } from "react";
import { ButtonNext, ContainerButton, ViewContainerPages } from "../../components";
import TablaComponent from "./componentsUsuario/TablaComponent";
import { Modal, message } from "antd";
//icons
import { IoTrashOutline } from "react-icons/io5";
import { MdRestore } from "react-icons/md";
import FormComponent from "./componentsUsuario/FormComponent";
import { useDeleteUserMutation, useGetUsersQuery, useRestoreUserMutation } from "../../redux/Api/usersApi";
export default function Usuario() {
  const [loadingSave, setLoadingSave] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState();
  const [action, setAction] = useState("");
  1
  ///Consulta de datos 

  const {
    data: dataUsuarios,
    // isSuccess: isSuccess,
    isLoading: isLoading,
  } = useGetUsersQuery("");


  const [
    deleteUser,
    {
      isLoading: isLoadinDelete,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
    },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (isDeleteSuccess) {
      message.success("Empleado eliminando correctamente");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);
  //isErrorDelete ----------
  useEffect(() => {
    if (isErrorDelete) {
      message.success("Ha ocurrido un error al intentar eliminar al Usuario");
      setIsModalOpen(false);
    }
  }, [isDeleteSuccess]);

  const [
    restoreUser,
    {
      isLoading: isLoadinRestore,
      isSuccess: isRestoreSuccess,
      isError: isErrorRestore,
    },
  ] = useRestoreUserMutation();
  useEffect(() => {
    if (isRestoreSuccess) {
      message.success("Usuario activado correctamente");
      setIsModalOpen(false);
    }
  }, [isRestoreSuccess]);
  //isErrorRestore ----------
  useEffect(() => {
    if (isErrorRestore) {
      message.success("Ha ocurrido un error al intentar activar al Usuario");
      setIsModalOpen(false);
    }
  }, [isErrorRestore]);


  //Onclick de editar:
  const editar = (data) => {
    setToggle(true);
    setDataEdit(data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  const scrollToTop = () => {
    // Scroll suave hacia la parte superior de la página
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  return (
    <ViewContainerPages>
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
        data={dataUsuarios}
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
          <>
          </>
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
                ? restoreUser(selected.idUsuario)
                : deleteUser(selected.idUsuario)
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
    </ViewContainerPages >
  );
}
