import React from "react";
import { ContainerForm } from "../../../components";
import { FuncUtils } from "../../../utils";
import { message } from "antd";
import InformacionPersonal from "../Components/InformacionPersonal";
import InformacionEmpresas from "../Components/InformacionEmpresas";

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
import { useCreateMutation, useUpdateMutation } from "../../../redux/Api/ProveedorApi";

export default function FormComponent(props) {
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

  //Funcion peticion para el create/insert :
  const [
    create,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateMutation();

  //Funcion peticion para el update :
  const [
    update,
    {
      isLoading: isLoadingUpdate,
      isSuccess: isUpdateSuccess,
      isError: isErrorUpdate,
    },
  ] = useUpdateMutation();

  //.. INSERT
  //.. INSERT
  //.. CUANDO EL INSERT (CREATE) SE LLEVE A CABO CORRECTAMENTE:
  React.useEffect(() => {
    if (isCreateSuccess === true) {
      message.success({
        content: "Información del Proveedor guardada correctamente",
        duration: 3,
      });
      setPosicionActual(1);
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/proveedores");
    }
  }, [isCreateSuccess]);
  //.. CUANDO EL INSERT TENGA UN ERROR:
  React.useEffect(() => {
    if (isErrorCreate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar guardar los datos del Proveedor",
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
        content: "Información del Proveedor actualizada correctamente",
        duration: 3,
      });
      setPosicionActual(1);
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/Proveedores");
    }
  }, [isUpdateSuccess]);
  //.. CUANDO EL UPDATE TENGA UN ERROR:
  React.useEffect(() => {
    if (isErrorUpdate === true) {
      message.error({
        content:
          "Ha ocurrido un error al intentar actualizar los datos del Proveedor",
        duration: 4,
      });
    }
  }, [isErrorUpdate]);
  const clearFields = () => {
    props.setToggle(false);
    setDatosFormulario({});
    props.setDataEdit({});
    setPosicionActual((prevState) => prevState - 1);
  };
  //Funcion para insertar, enviar los datos a la api:
  const handleSubmit = (data) => {
    let dataHead;
    const fecha = new Date(); // Obtén la fecha actual

    // Formatea la fecha en el formato deseado
    const fechaFormateada = fecha.toISOString();
    //DataEncabezado :
    data?.IdProveedor !== 0 && data?.IdProveedor !== undefined
      ? (dataHead = {
          IdProveedor: data?.IdProveedor,
          IdModificadoPor: userId,
          fechaCreacion: fechaFormateada,
          idModificadoPor: 1,
          fechaModificacion: fechaFormateada,
          idEstadoRegistro: 1,
        })
      : (dataHead = {
        IdProveedor: 0,
          IdCreadoPor: userId,
          fechaCreacion: fechaFormateada,
          idModificadoPor: 1,
          fechaModificacion: fechaFormateada,
          idEstadoRegistro: 1,
        });

        let dataExtra = {
          idCreadoPor: userId,
          fechaCreacion: fechaFormateada,
          idModificadoPor: 1,
          fechaModificacion: fechaFormateada,
          idEstadoRegistro: 1,
        };

    //Armar el objeto persona
    const persona = { ...datosFormulario, IdPersona: data.IdPersona, Edad: 18, ...dataExtra };
    //Quitar el objeto empresas del objet persona y 
    delete persona.Empresas;
    delete persona.IdProveedor;
//Armar el objeto 
  const empresas = data.Empresas.map((datas) => {  
  return {
    ...datas,
    idCreadoPor: userId,
    fechaCreacion: fechaFormateada,
    idModificadoPor: 1,
    fechaModificacion: fechaFormateada,
    idEstadoRegistro: 1,
  };
});

    //Armar la data submit (el objeto puede ser de dos formas):
   let dataJson;
    !empresas?.length > 0
      ? // -- Forma 1 (Cuando no hayan empresas):
        (dataJson = {
          ...dataHead,
          persona,
          empresas:[]
        })
      : // -- Forma 2 (Cuando hayan empresas):
        (dataJson = {
          ...dataHead,
          persona,
          empresas: empresas,
        });
        console.log(dataJson);

    data?.IdProveedor === 0 || data?.IdProveedor === undefined
      ? (create({ ...dataJson }),clearFields())
      : (update({ ...dataJson }),clearFields());
  };

  useEffect(() => {
    if (props.dataEdit !== null) {
      //props.dataClientEdit.InitialCedulaEdit = props.dataClientEdit.Cedula;
      setDatosFormulario({
        ...FuncUtils.capitalizePropertyKeys(props.dataEdit),
        InitialCedulaEdit: props.dataEdit.cedula, // <-- c minuscula porque esta antes de convertir con el Utils
      });
    }
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
      props.setDataEdit(null);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [
    props.dataEdit,
    props.setDataEdit,
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
                dataEdit={props.dataEdit}
                setDataEdit={props.setDataEdit}
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
                setDataEdit={props.setDataEdit}
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
FormComponent.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  setLoadingSave: PropTypes.func.isRequired,
  dataEdit: PropTypes.object, // Cambia el tipo según corresponda
  setDataEdit: PropTypes.func.isRequired,
};
