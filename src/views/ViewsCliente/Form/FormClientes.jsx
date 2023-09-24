import React from "react";
import { ContainerForm } from "../../../components";
import { FuncUtils } from "../../../utils";
import { message } from "antd";
import InformacionPersonal from "../Components/InformacionPersonal";
import InformacionEmpresas from "../Components/InformacionEmpresas";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OutsideClick } from "outsideclick-react";

import { useCreateClientMutation } from "../../../redux/Api/clientsApi";
import { useUpdateClientMutation } from "../../../redux/Api/clientsApi";

import {
  SavingText,
  StyledSpinContainer,
  StyledSpinSubContainer,
} from "../../../components/StylesCustomLoading/loading-custom.styled";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

import { JwtUtils } from "../../../utils";

export default function FormClientes(props) {
  const token = localStorage.getItem("token");
  const userId = parseInt(JwtUtils.getUserIdByToken(token), 10);

  const navigate = useNavigate();
  const [posicionActual, setPosicionActual] = useState(1);
  const [datosFormulario, setDatosFormulario] = useState({});
  const [animacion, setAnimacion] = useState(false);

  const siguiente = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual + 1);
  };

  const atras = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual - 1);
  };

  //Funcion peticion para el create/insert de Cliente:
  const [
    createClient,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateClientMutation();

  //Funcion peticion para el update de Cliente:
  const [
    updateClient,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isUpdateSuccess,
      isError: isErrorUpdate,
    },
  ] = useUpdateClientMutation();

  //.. INSERT
  //.. INSERT
  //.. CUANDO EL INSERT (CREATE) SE LLEVE A CABO CORRECTAMENTE:
  React.useEffect(() => {
    if (isCreateSuccess === true) {
      message.success({
        content: "Información del cliente guardada correctamente",
        duration: 3,
      });
      setPosicionActual(1);
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
          "Ha ocurrido un error al intentar guardar los datos del cliente",
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
        content: "Información del cliente actualizada correctamente",
        duration: 3,
      });
      setPosicionActual(1);
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
          "Ha ocurrido un error al intentar actualizar los datos del cliente",
        duration: 4,
      });
    }
  }, [isErrorUpdate]);

  //Funcion para insertar, enviar los datos a la api:
  const handleSubmit = (data) => {
    let dataHead;

    //DataEncabezado de cliente:
    data?.IdCliente !== 0 && data?.IdCliente !== undefined
      ? (dataHead = {
          IdCliente: data?.IdCliente,
          IdModificadoPor: userId,
          FechaModificacion: new Date(),
        })
      : (dataHead = {
          IdCliente: 0,
          IdCreadoPor: userId,
          FechaCreacion: new Date(),
        });

    //Armar el objeto persona
    const Persona = { ...datosFormulario, IdPersona: data.IdPersona, Edad: 18 };
    //Quitar el objeto empresas del objet persona y clienteId
    delete Persona.Empresas;
    delete Persona.IdCliente;

    //Armar el objeto empresas
    const empresas = data.Empresas;
    //Armar la data submit (el objeto puede ser de dos formas):
    let dataClient;
    !empresas?.length > 0
      ? // -- Forma 1 (Cuando no hayan empresas):
        (dataClient = {
          ...dataHead,
          Persona,
        })
      : // -- Forma 2 (Cuando hayan empresas):
        (dataClient = {
          ...dataHead,
          Persona,
          Empresas: empresas,
        });

    data?.ClienteId === 0 || data?.IdCliente === undefined
      ? createClient({ ...dataClient })
      : updateClient({ ...dataClient });
  };

  useEffect(() => {
    if (props.dataClientEdit !== null) {
      //props.dataClientEdit.InitialCedulaEdit = props.dataClientEdit.Cedula;
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
            {posicionActual === 1 && (
              <InformacionPersonal
                nextPart={siguiente}
                dataValues={datosFormulario}
                setDatosFormulario={setDatosFormulario}
                toggle={props.toggle}
                setToggle={props.setToggle}
                dataClientEdit={props.dataClientEdit}
                setDataClientEdit={props.setDataClientEdit}
                setLoadingSave={props.setLoadingSave}
              />
            )}
            {posicionActual === 2 && (
              <InformacionEmpresas
                backPart={atras}
                dataValues={datosFormulario}
                setDatosFormulario={setDatosFormulario}
                toggle={props.toggle}
                setToggle={props.setToggle}
                handleSubmit={handleSubmit}
                setDataClientEdit={props.setDataClientEdit}
                setPosicionActual={setPosicionActual}
              />
            )}
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
FormClientes.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  setLoadingSave: PropTypes.func.isRequired,
  dataClientEdit: PropTypes.object, // Cambia el tipo según corresponda
  setDataClientEdit: PropTypes.func.isRequired,
};
