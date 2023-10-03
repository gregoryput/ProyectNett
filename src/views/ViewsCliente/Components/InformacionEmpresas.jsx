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
  numberOnly,
  phoneNumber,
  email,
  validateUrl,
  minValue,
} from "../../../utils/validations";

import { Spinner } from "../../../components";

import { Collapse, Tooltip } from "antd";

const isLoadingCreate = false;

import { IoClose } from "react-icons/io5";

import { useSelector } from "react-redux";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import React from "react";
import { message } from "antd";
import { useGetCompaniesByIdClienteQuery } from "../../../redux/Api/companiesApi";

import { FuncUtils } from "../../../utils";

import { IoTrashBinSharp, IoArrowBackSharp } from "react-icons/io5";
import { BsFillBuildingsFill } from "react-icons/bs";
import { TiInfo } from "react-icons/ti";
import { BsBuildingAdd } from "react-icons/bs";
import { FiSave } from "react-icons/fi";

import PropTypes from "prop-types";
import { Colores } from "../../../components/GlobalColor";
import { useEffect } from "react";

import {
  SavingText,
  StyledSpinContainer,
  StyledSpinSubContainer,
} from "../../../components/StylesCustomLoading/loading-custom.styled";
import { Spin } from "antd";

export default function InformacionEmpresas(props) {
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
    name: "Empresas",
  });

  //Observar los valores del FieldArray
  const watchedValues = useWatch({ control });

  const [pressedonSave, setPressedonSave] = React.useState(false);
  const [activeKeyPanel, setActiveKeyPanel] = React.useState(-1);

  //Tomar las ciudades:
  const cities = useSelector((state) => state.cities.cities.cities);
  const countries = useSelector((state) => state.countries.countries.countries);

  //Funcion para filtrar select ciudad:
  const filterSelectCiudad = (IdPais) => {
    return cities
      ?.filter((ct) => ct.idPais === IdPais)
      ?.map((citie) => {
        return {
          value: citie?.idCiudad,
          label: citie?.ciudadNombre,
        };
      });
  };

  // Traer las empresas solo cuando se este en modo editar:
  const {
    data: companiesClientData,
    isSuccess: isCompaniesClientSuccess,
    isError: isErrorCompanies,
    isLoading: isLoadingCompaniesClient,
  } = useGetCompaniesByIdClienteQuery(
    { clienteId: props.dataValues.IdCliente, estadoId: 1 },
    {
      skip:
        props.dataValues.IdCliente === null ||
        props.dataValues.IdCliente === undefined,
    }
  );

  const clearFields = () => {
    props.setToggle(false);
    reset();
    props.setDatosFormulario({});
    props.setDataClientEdit({});
    props.setPosicionActual((prevState) => prevState - 1);
  };


  
  //Obserar si hay empresas y mapearlas en el fieldArray:
  React.useEffect(() => {
    if (
      !props?.dataValues?.Empresas //&& props?.dataValues?.Empresas?.length === 0
    ) {
      if (
        companiesClientData !== null &&
        companiesClientData !== undefined &&
        isCompaniesClientSuccess
      ) {
        companiesClientData?.result?.length > 0
          ? message.success({
              content: "Lista de empresas del cliente cargada correctamente",
              duration: 3,
            })
          : message.info({
              content:
                "Información obtenida; el cliente no tiene empresas registradas",
              duration: 4,
            });
        props.dataValues.Empresas = companiesClientData?.result.map(
          (empresa) => {
            return FuncUtils.capitalizePropertyKeys(empresa);
          }
        );
        reset(props.dataValues);
      }
    } else {
      reset(props.dataValues);
    }
  }, [companiesClientData, isCompaniesClientSuccess]);

  //Obserar si hay validaciones disparadas en algun campo de una de las empresas, si es asi, desplegar la ultima empresa con validaciones disparadas:
  useEffect(() => {
    let indice = 0;
    if (errors?.Empresas?.length > 0) {
      errors?.Empresas?.forEach((element, index) => {
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
    props.dataValues.Empresas = data.Empresas;
    props.handleSubmit(data);
  };

  //Funcion para regresar al paso InformacionPersnal
  const irAtras = () => {
    const dataInformacionEmpresas = getValues();
    props.backPart(dataInformacionEmpresas); // Regresar al paso Informacion personal y a su vez enviar los datos del paso informacion empresas
  };

  //Si hay un error trayendo los datos de las empresas:
  React.useEffect(() => {
    isErrorCompanies
      ? message.error({
          content:
            "Error al consultar la información, recargue la pagina e intente de nuevo",
          duration: 4,
        })
      : null;
  }, [isErrorCompanies]);

  //Funcion para remover empresa:
  const handleRemoveCompany = (index) => {
    remove(index);
  };

  InformacionEmpresas.propTypes = {
    dataValues: PropTypes.object.isRequired,
    backPart: PropTypes.func.isRequired,
    setPosicionActual: PropTypes.func.isRequired,
    setDatosFormulario: PropTypes.func.isRequired,
    setSaveIsSucces: PropTypes.func.isRequired,
    setToggle: PropTypes.bool.required,
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
              <h2 style={{ marginBottom: 40 }}>Datos de empresa </h2>
            </div>

            {isLoadingCompaniesClient ? (
              <StyledSpinContainer>
                <StyledSpinSubContainer>
                  <Spin size="large" />
                  <SavingText isSaving={isLoadingCompaniesClient}>
                    Cargando información de empresas del cliente
                  </SavingText>
                </StyledSpinSubContainer>
              </StyledSpinContainer>
            ) : (
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
                              <BsFillBuildingsFill
                                size={18}
                                style={{ marginRight: "4px" }}
                              />
                              <span>
                                <strong>Empresa:</strong>{" "}
                                {watchedValues?.Empresas ? (
                                  watchedValues?.Empresas[index]?.NombreEmpresa
                                    ?.length > 0 ? (
                                    watchedValues?.Empresas[index]
                                      ?.NombreEmpresa
                                  ) : (
                                    <span
                                      style={{
                                        borderBottom: "1px solid #000",
                                        display: "inline-block",
                                        width: "100px",
                                      }}
                                    >
                                      {Array(20).fill("\u00A0").join("")}
                                    </span>
                                  )
                                ) : (
                                  ""
                                )}
                              </span>

                              {watchedValues?.Empresas ? (
                                !watchedValues?.Empresas[index]?.NombreEmpresa
                                  ?.length > 0 ? (
                                  <Tooltip title="Debe asignar un nombre a la empresa, despliegue el panel y llene los campos">
                                    <TiInfo color="orange" size={20} />
                                  </Tooltip>
                                ) : null
                              ) : (
                                ""
                              )}
                            </div>
                          </span>

                          <IoTrashBinSharp
                            style={{ marginRight: 4 }}
                            size={20}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemoveCompany(index);
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
                          Nombre Empresa:
                          <InputFor
                            {...register(`Empresas.${index}.NombreEmpresa`, {
                              ...required("Este campo es requerido"),
                              ...minLength(2),
                              ...maxLength(60),
                            })}
                            placeholder="Ingrese el nombre"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].NombreEmpresa &&
                                errors.Empresas[index].NombreEmpresa.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          RNC
                          <InputFor
                            {...register(`Empresas.${index}.Rnc`, {
                              ...required("Este campo es requerido"),
                              ...numberOnly(),
                              ...minLength(9),
                              ...maxLength(9),
                            })}
                            placeholder="Ingrese el RNC"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].Rnc &&
                                errors.Empresas[index].Rnc.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          Correo de la empresa
                          <InputFor
                            {...register(`Empresas.${index}.Correo`, {
                              ...required("Este campo es requerido"),
                              ...email(),
                            })}
                            placeholder="Ingrese el correo"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].Correo &&
                                errors.Empresas[index].Correo.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          Teléfono 1
                          <InputFor
                            {...register(`Empresas.${index}.Teléfono1`, {
                              ...required("Este campo es requerido"),
                              ...phoneNumber(),
                            })}
                            placeholder="Ingrese el #"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].Teléfono1 &&
                                errors.Empresas[index].Teléfono1.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          Teléfono 2 (Opcional)
                          <InputFor
                            {...register(`Empresas.${index}.Teléfono2`, {
                              ...phoneNumber(),
                            })}
                            placeholder="Ingrese el #"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].Teléfono2 &&
                                errors.Empresas[index].Teléfono2.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          Sitio web
                          <InputFor
                            {...register(`Empresas.${index}.SitioWeb`, {
                              ...required("Este campo es requerido"),
                              ...validateUrl(),
                            })}
                            placeholder="Ingrese la Url"
                          />
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].SitioWeb &&
                                errors.Empresas[index].SitioWeb.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          {" "}
                          Pais
                          <Select
                            defaultValue={0}
                            {...register(`Empresas.${index}.IdPais`, {
                              ...minValue(1, "Debe seleccionar el pais"),
                            })}
                          >
                            <Option disabled value={0}>
                              -- Seleccione el pais --
                            </Option>
                            {countries?.map((country, index) => (
                              <Option
                                key={index}
                                value={parseInt(country.idPais)}
                              >
                                {country.paisNombre}
                              </Option>
                            ))}
                          </Select>
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].IdPais &&
                                errors.Empresas[index].IdPais.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          {" "}
                          Ciudad
                          <Select
                            defaultValue={0}
                            {...register(`Empresas.${index}.IdCiudad`, {
                              ...minValue(1, "Debe seleccionar la ciudad"),
                            })}
                          >
                            <Option disabled value={0}>
                              -- Seleccione la ciudad --
                            </Option>
                            {watchedValues?.Empresas !== undefined
                              ? filterSelectCiudad(
                                  parseInt(
                                    watchedValues?.Empresas[index]?.IdPais
                                  )
                                )?.map((option, index) => (
                                  <Option
                                    key={index}
                                    value={parseInt(option?.value)}
                                  >
                                    {option?.label}
                                  </Option>
                                ))
                              : null}
                          </Select>
                          {errors.Empresas && errors.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].IdCiudad &&
                                errors.Empresas[index].IdCiudad.message}
                            </span>
                          )}
                        </LabelFor>

                        <LabelFor>
                          Dirección
                          <InputFor
                            {...register(`Empresas.${index}.Dirección`, {
                              ...required("Este campo es requerido"),
                              ...minLength(3),
                              ...maxLength(60),
                            })}
                            placeholder="Ingrese la dirección"
                          />
                          {errors?.Empresas && errors?.Empresas[index] && (
                            <span style={{ color: "red", fontSize: 10 }}>
                              {errors.Empresas[index].Direccion &&
                                errors.Empresas[index].Direccion.message}
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
                    <BsBuildingAdd size={15} />
                    <span style={{ marginLeft: "3px" }}>
                      Agregar nueva empresa
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
            )}
          </ContainerFormPrueba>
        </>
      )}
    </>
  );
}
