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
import CargoEmpleado from "../Components/CargoEmpleado";

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
        content: "Información del Empleado guardada correctamente",
        duration: 3,
      });
      setPosicionActual(1);
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/empleado");
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
      setPosicionActual(1);
      setDatosFormulario({});
      props.setToggle(false);
      navigate("/empleado");
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
    const fecha = new Date(); // Obtén la fecha actual

    // Formatea la fecha en el formato deseado
    const fechaFormateada = fecha.toISOString();
    //DataEncabezado de cliente:
    data?.IdEmpleado !== 0 && data?.IdEmpleado !== undefined
      ? (dataHead = {
          idEmpleado: data?.IdEmpleado,
          IdModificadoPor: userId,
          FechaModificacion: fechaFormateada,
        })
      : (dataHead = {
          idEmpleado: 0,
          idCreadoPor: userId,
          fechadDeContratación: fechaFormateada,
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
    const persona = { ...datosFormulario, IdPersona: !data.IdPersona === true ? 0 :  data.IdPersona, ...dataExtra };
    //Quitar el objeto empresas del objet persona
    delete persona.cargos;
    delete persona.CargoEmpleadoDTOs;
    delete persona.InitialCedulaEdit;
    delete persona.IdEmpleado;
    

    //Armar el objeto 
    const Cargo = data.cargos.map((compo) => {
    
      return {
        ...compo,
        idCreadoPor: userId,
        fechaCreacion: fechaFormateada,
        idModificadoPor: 1,
        fechaModificacion: fechaFormateada,
        idEstadoRegistro: 1,
      };
    });
    //Armar la data submit (el objeto puede ser de dos formas):
    let dataJson;
    !Cargo?.length > 0
      ? // -- Forma 1 (Cuando no hayan cargos):
        (dataJson = {
          ...dataHead,
          persona,
        })
      : // -- Forma 2 (Cuando hayan cargos):
        (dataJson = {
          ...dataHead,
          persona,
          Cargos: Cargo,
        });
      data?.IdEmpleado === 0 || data?.IdEmpleado === undefined
        ? createEmploye({ ...dataJson })
        : updateEmploye({ ...dataJson });

      console.log(dataJson)

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
  }, [props.dataEdit, props.setDataEdit, props.toggle, setAnimacion]);

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
              <CargoEmpleado
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
