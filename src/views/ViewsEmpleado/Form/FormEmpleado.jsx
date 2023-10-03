import React from "react";
import { ContainerForm } from "../../../components";
import { FuncUtils } from "../../../utils";
import { message } from "antd";
import InformacionPersonal from "../Components/InformacionPersonal";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OutsideClick } from "outsideclick-react";

import {
  SavingText,
  StyledSpinContainer,
  StyledSpinSubContainer,
} from "../../../components/StylesCustomLoading/loading-custom.styled";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { JwtUtils } from "../../../utils";
import {
  useCreateEmployeMutation,
  useUpdateEmployeMutation,
} from "../../../redux/Api/employeeApi";

export default function FormEmpleado(props) {
  const token = localStorage.getItem("token");
  const userId = parseInt(JwtUtils.getUserIdByToken(token), 10);

  const navigate = useNavigate();
  const [datosFormulario, setDatosFormulario] = useState({});
  const [animacion, setAnimacion] = useState(false);

  //Funcion peticion para el create/insert de Cliente:
  const [
    createEmploye,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateEmployeMutation();

  //Funcion peticion para el update de Cliente:
  const [
    updateEmploye,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isUpdateSuccess,
      isError: isErrorUpdate,
    },
  ] = useUpdateEmployeMutation();

  //.. INSERT
  //.. INSERT
  //.. CUANDO EL INSERT (CREATE) SE LLEVE A CABO CORRECTAMENTE:
  React.useEffect(() => {
    if (isCreateSuccess === true) {
      message.success({
        content: "Información del cliente guardada correctamente",
        duration: 3,
      });
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/Cliente");
    }
  }, [isCreateSuccess]);
  //.. CUANDO EL INSERT TENGA UN ERROR:
  React.useEffect(() => {
    if (isErrorCreate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar guardar los datos del Empleado",
        duration: 4,
      });
    }
  }, [isErrorCreate]);

  //.. UPDATE
  //.. UPDATE
  //.. CUANDO EL UPDATE SE LLEVE A CABO CORRECTAMENTE:
  React.useEffect(() => {
    if (isUpdateSuccess === true) {
      message.success({
        content: "Información del Empleado actualizada correctamente",
        duration: 3,
      });
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/Cliente");
    }
  }, [isUpdateSuccess]);
  //.. CUANDO EL UPDATE TENGA UN ERROR:
  React.useEffect(() => {
    if (isErrorUpdate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar actualizar los datos del empleado",
        duration: 4,
      });
    }
  }, [isErrorUpdate]);

  //Funcion para insertar, enviar los datos a la api:
  const handleSubmit = (data) => {
    console.log(data);
    let dataHead;
    // DataEncabezado de empleado:
    data?.Idempleado !== 0 && data?.Idempleado !== undefined
      ? (dataHead = {
        Idempleado: data?.Idempleado,
        IdModificadoPor: userId,
        FechaModificacion: new Date(),
      })
      : (dataHead = {
        Idempleado: 0,
        IdCreadoPor: userId,
        FechaCreacion: new Date(),
      });

    //Armar el objeto persona
    const Persona = { ...datosFormulario, IdPersona: data.IdPersona, Edad: 18 };
    //Quitar el objeto empresas del objet persona y clienteId
    delete Persona.Idempleado;

    //Armar la data submit (el objeto puede ser de dos formas):
    let dataEmpleado;

    dataEmpleado = {
      ...dataHead,
      Persona,
    };
    data?.Idempleado === 0 || data?.Idempleado === undefined
      ? createEmploye({ ...dataEmpleado })
      : updateEmploye({ ...dataEmpleado });
  };

  useEffect(() => {
    if (props.dataClientEdit !== null) {
     
      setDatosFormulario({
        ...FuncUtils.capitalizePropertyKeys(props.dataClientEdit),
        InitialCedulaEdit: props.dataClientEdit.cedula, // <-- c minuscula porque esta antes de convertir con el Utils
      });
    }
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
      props.setDataClientEdit(null);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [
    props.dataClientEdit,
    props.setDataClientEdit,
    props.toggle,
    setAnimacion,
  ]);

  useEffect(() => {
    isLoadingCreate
      ? props.setLoadingSave(isLoadingCreate)
      : props.setLoadingSave(isLoadingUpdate);
  }, [isLoadingCreate, isLoadingUpdate]);

  return (
    <ContainerForm animacion={animacion} display={props.toggle}>
      <OutsideClick>
        {isLoadingCreate === false && isLoadingUpdate === false ? (
          <div>
            <InformacionPersonal
              dataValues={datosFormulario}
              setDatosFormulario={setDatosFormulario}
              toggle={props.toggle}
              setToggle={props.setToggle}
              dataClientEdit={props.dataClientEdit}
              setDataClientEdit={props.setDataClientEdit}
              setLoadingSave={props.setLoadingSave}
              handleSubmit={handleSubmit}
            />
          </div>
        ) : (
          <StyledSpinContainer>
            <StyledSpinSubContainer>
              <Spin size="large" />
              <SavingText isSaving={isLoadingCreate || isLoadingUpdate}>
                {isLoadingCreate
                  ? "Guardando información..."
                  : "Actualizando información..."}
              </SavingText>
            </StyledSpinSubContainer>
          </StyledSpinContainer>
        )}
      </OutsideClick>
    </ContainerForm>
  );
}

// Definir PropTypes para las props del componente
FormEmpleado.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  setLoadingSave: PropTypes.func.isRequired,
  dataClientEdit: PropTypes.array, // Cambia el tipo según corresponda
  setDataClientEdit: PropTypes.func.isRequired,
};
