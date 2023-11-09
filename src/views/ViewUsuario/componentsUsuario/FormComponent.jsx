import { ContainerForm2 } from "../../../components";
import { useEffect, useState, } from "react";
import PropTypes from "prop-types";
import { OutsideClick } from "outsideclick-react";
import { JwtUtils } from "../../../utils";
import InformacionUsuario from "./InformacionUsuario";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation, useUpdateUserMutation } from "../../../redux/Api/usersApi";




export default function FormComponent(props) {
  const token = localStorage.getItem("token");
  const userId = parseInt(JwtUtils.getUserIdByToken(token), 10);
  const [animacion, setAnimacion] = useState(false);
  
  const navigate = useNavigate();
  //Funcion peticion para el create/insert de Cliente:
  const [
    createUser,
    {
      // isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateUserMutation();

  //Funcion peticion para el update de Cliente:
  const [
    updateUser,
    {
      // isLoading: isLoadingUpdate,
      isSuccess: isUpdateSuccess,
      isError: isErrorUpdate,
    },
  ] = useUpdateUserMutation();

  //.. INSERT
  //.. INSERT
  //.. CUANDO EL INSERT (CREATE) SE LLEVE A CABO CORRECTAMENTE:
useEffect(() => {
    if (isCreateSuccess === true) {
      message.success({
        content: "Información del Usuario guardada correctamente",
        duration: 3,
      });
      props.setToggle(false);
      navigate("/usuarios");
    }
  }, [isCreateSuccess]);
  //.. CUANDO EL INSERT TENGA UN ERROR:
  useEffect(() => {
    if (isErrorCreate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar guardar los datos del Usuario",
        duration: 4,
      });
    }
  }, [isErrorCreate]);

  //.. UPDATE
  //.. UPDATE
  //.. CUANDO EL UPDATE SE LLEVE A CABO CORRECTAMENTE:
  useEffect(() => {
    if (isUpdateSuccess === true) {
      message.success({
        content: "Información del Usuario actualizada correctamente",
        duration: 3,
      });
      props.setToggle(false);
      navigate("/usuarios");
    }
  }, [isUpdateSuccess]);
  //.. CUANDO EL UPDATE TENGA UN ERROR:
  useEffect(() => {
    if (isErrorUpdate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar actualizar los datos del Usuario",
        duration: 4,
      });
    }
  }, [isErrorUpdate]);
 
  useEffect(() => {
   
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
      props.setDataEdit(null);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [props.dataEdit, props.toggle, setAnimacion]);

 //Funcion para insertar, enviar los datos a la api:
 const handleSubmit = (data) => {
 
  delete data.Empleado;
  delete data.Confirmar
  delete data.NombreEstado
  delete data.NombreRol

  let dataHead;
  const fecha = new Date(); // Obtén la fecha actual

  // Formatea la fecha en el formato deseado
  const fechaFormateada = fecha.toISOString();
  //DataEncabezado de usuario:
  data?.IdUsuario !== 0 && data?.IdUsuario !== undefined
    ? (dataHead = {
      IdUsuario: data?.IdUsuario,
        IdModificadoPor: userId,
        FechaModificacion: fechaFormateada,
        IdCreadoPor: userId,
        idEstadoRegistro: 1
      }
      )
    : (dataHead = {
        IdUsuario: 0,
        IdCreadoPor: userId,
        FechaCreacion: fechaFormateada,
      });


  //Armar el objeto persona
 
  //Quitar el objeto empresas del objet persona
  
  //Armar la data submit (el objeto puede ser de dos formas):
  let dataJson;

      dataJson = {
        ...dataHead,
        ...data,
      }

      
    data?.IdUsuario === 0 || data?.IdUsuario === undefined
      ? createUser({ ...dataJson })
      : updateUser({ ...dataJson });

      
      console.log(dataJson);
    

};


  return (
    <ContainerForm2 animacion={animacion} display={props.toggle}>
      <OutsideClick>
          <div>
             <InformacionUsuario
                toggle={props.toggle}
                setToggle={props.setToggle}
                dataEdit={props.dataEdit}
                setDataEdit={props.setDataEdit}
                handleSubmit={handleSubmit}
              />
          </div>
      </OutsideClick>
    </ContainerForm2>
  );
}

// Definir PropTypes para las props del componente
FormComponent.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  dataEdit: PropTypes.array, // Cambia el tipo según corresponda
  setDataEdit: PropTypes.func.isRequired,
};
