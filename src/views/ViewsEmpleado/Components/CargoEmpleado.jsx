import {
  InputFor,
  LabelFor,
  Option,
  Select,
  ButtonSave,
  ContainerFormPrueba,
  ButtonNext as ButtonBack,
  ButtonAdd,
  SpinnerTables,
  ButtonRemove,
} from "../../../components";

import {
  required,
  minLength,
  maxLength,

  minValue,
} from "../../../utils/validations";

import { Spinner } from "../../../components";

import { Collapse, message } from "antd";

const isLoadingCreate = false;

import { IoClose } from "react-icons/io5";

import { useForm, useFieldArray } from "react-hook-form";
import React, { useEffect, useState } from "react";


import { IoTrashBinSharp, IoArrowBackSharp } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import PropTypes from "prop-types";
import { Colores } from "../../../components/GlobalColor";
import { useGetCargoIdEmpleadoQuery, useGetCargoQuery } from "../../../redux/Api/cargoApi";
import { FuncUtils } from "../../../utils";



export default function CargoEmpleado(props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cargos",
  });
  const [pressedonSave, setPressedonSave] = React.useState(false);

//  const [cargoState, setCargoState] = useState(null)
 const [select, setSelect] = useState([])
  //Traer las Cargos
  const {
    data: dataCargo,
    isSuccess: isCompaniesClientSuccess,
    isLoading: isLoadingCompaniesClient,
   
  } = useGetCargoIdEmpleadoQuery( { IdEmpleado: props.dataValues.IdEmpleado, estadoId: 1 },
    {
      skip:
        props.dataValues.IdEmpleado === null ||
        props.dataValues.IdEmpleado === undefined,
    },);



    const { data: CargoSelect, isLoading: CargoLoding } = useGetCargoQuery("")

  const [activeKeyPanel, setActiveKeyPanel] = React.useState(-1);

  useEffect(()=>{
    // if(!isLoadingCompaniesClient && dataCargo != undefined) {
    //   setCargoState(dataCargo?.result);

    // }
    if(!CargoLoding && CargoSelect != undefined) {
      setSelect(CargoSelect?.Result);
    }

  },[isLoadingCompaniesClient])

  const clearFields = () => {
    props.setToggle(false);
    reset();
    props.setDatosFormulario({});
    props.setDataEdit({});
    props.setPosicionActual((prevState) => prevState - 1);
  };

  //Obserar si hay empresas y mapearlas en el fieldArray:
  React.useEffect(() => {
    if (
      !props?.dataValues?.cargos //&& props?.dataValues?.Empresas?.length === 0
    ) {
      if (
        dataCargo !== null &&
        dataCargo !== undefined &&
        isCompaniesClientSuccess
      ) {
        dataCargo?.Result?.length > 0
          ? message.success({
              content: "Lista cargada correctamente",
              duration: 3,
            })
          : null;
        props.dataValues.cargos = dataCargo?.Result.map(
          (d) => {
            return FuncUtils.capitalizePropertyKeys(d);
          }
        );
        reset(props.dataValues);
      }
    } else {
      reset(props.dataValues);
    }
  }, [dataCargo, isCompaniesClientSuccess]);

  //Obserar si hay validaciones disparadas en algun campo de una de las empresas, si es asi, desplegar la ultima empresa con validaciones disparadas:
  useEffect(() => {
    let indice = 0;
    if (errors?.cargos?.length > 0) {
      errors?.cargos?.forEach((element, index) => {
        indice = index;
      });
      setActiveKeyPanel(indice);
    }
    setPressedonSave(false);
  }, [pressedonSave, errors]);




  const handlePanelChange = (keys) => {
    setActiveKeyPanel(keys); // Actualizar el estado cuando cambian los paneles
  };

  //Funcion para insertar, enviar los datos a la api:
  const onSubmit = (data) => {
    props.dataValues.cargos = data.cargos;
    props.handleSubmit(data);
  };

  //Funcion para regresar al paso InformacionPersnal
  const irAtras = () => {
    const dataInformacion = getValues();
    props.backPart(dataInformacion); // Regresar al paso Informacion personal y a su vez enviar los datos del paso informacion empresas
  };



  //Funcion para remover:
  const handleRemove = (index) => {
    remove(index);
  };

  CargoEmpleado.propTypes = {
    dataValues: PropTypes.object.isRequired,
    backPart: PropTypes.func.isRequired,
    setPosicionActual: PropTypes.func.isRequired,
    setDatosFormulario: PropTypes.func.isRequired,
    setSaveIsSucces: PropTypes.func.isRequired,
    setToggle: PropTypes.bool.required,
    setDataEdit: PropTypes.func.required,
    handleSubmit: PropTypes.func.isRequired,
  };

  return (
    <>
      {isLoadingCreate ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SpinnerTables />
        </div>
      ) : (
        <>
          {" "}
          <ContainerFormPrueba onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2 style={{ marginBottom: 40 }}>Asignacion de cargo </h2>
            </div>

              <div>
                <Collapse
                  activeKey={activeKeyPanel}
                  onChange={handlePanelChange}
                  accordion
                  style={{
                    backgroundColor: `${Colores.Blanco}`,
                    marginBottom: 40,
                  }}
                >
                  {fields?.map((field, index) => (
                    <Collapse.Panel
                      header={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ marginLeft: "10px" }}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                             <h4>Cargo y descripcion</h4>
                            </div>
                          </span>

                          <IoTrashBinSharp
                            style={{ marginRight: 4 }}
                            size={20}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemove(index);
                            }}
                            color={"red"}
                          />
                        </div>
                      }
                      key={index}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
                          gap: 5,
                          marginTop: 20,
                        }}
                      >
                        <LabelFor>
                          Descripción:
                          <InputFor
                            {...register(`cargos.${index}.Descripcion`, {
                              ...required("Este campo es requerido"),
                              ...minLength(2),
                              ...maxLength(60),
                            })}
                            placeholder="Ingrese la descripción..."
                          />
                          {errors.cargos && errors.cargos[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.cargos[index].descripción &&
                                errors.cargos[index].descripción.message}
                            </span>
                          )}
                        </LabelFor>
                    
                        <LabelFor>
                          {" "}
                          Cargo
                          <Select
                            defaultValue={0}
                            {...register(`cargos.${index}.IdCargo`, {
                              ...minValue(1, "Debe seleccionar el Cargo"),
                            })}
                          >
                            <Option disabled value={0}>
                              -- Seleccione el Cargo --
                            </Option>
                            {select.map((valor, index) => (
                              <Option
                                key={index}
                                value={parseInt(valor.IdCargo)}
                              >
                                {valor.NombreCargo}
                              </Option>
                            ))}
                          </Select>
                          {errors.cargos && errors.cargos[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.cargos[index].IdCargo &&
                                errors.cargos[index].IdCargo.message}
                            </span>
                          )}
                        </LabelFor>

                       
                      
                      </div>
                    </Collapse.Panel>
                  ))}
                </Collapse>
                <br />
                <ButtonAdd
                  style={{ width: 180 }}
                  type="button"
                  onClick={() => {
                    append({});
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ marginLeft: "3px" }}>
                      Agregar nuevo cargo
                    </span>
                  </div>
                </ButtonAdd>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <ButtonRemove
                    type="button"
                    onClick={clearFields}
                    style={{ marginLeft: 5 }}
                  >
                    <IoClose size={18} style={{ marginRight: 2 }} /> Cancelar
                  </ButtonRemove>

                  <ButtonBack htmlType="button" onClick={irAtras}>
                    <IoArrowBackSharp size={18} style={{ marginRight: 5 }} />
                    Atras
                  </ButtonBack>

                  <ButtonSave
                    type="submit"
                    onClick={() => setPressedonSave(true)}
                  >
                    {isLoadingCreate ? (
                      <Spinner style={{ color: "red" }} />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <FiSave size={15} />
                        <span style={{ marginLeft: "3px" }}>Guardar</span>
                      </div>
                    )}{" "}
                  </ButtonSave>
                </div>
              </div>
          </ContainerFormPrueba>
        </>
      )}
    </>
  );
}
