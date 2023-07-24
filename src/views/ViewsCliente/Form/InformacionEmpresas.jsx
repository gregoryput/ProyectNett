import {
  InputFor,
  LabelFor,
  Option,
  Select,
  Button,
  ButtonSave,
  ContainerFormPrueba,
  ButtonNext as ButtonBack,
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

import { Button as ButtonAntD, Collapse } from "antd";

import { useCreateClientMutation } from "../../../redux/Api/clientsApi";
import { useSelector } from "react-redux";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import React from "react";
import { message, Spin } from "antd";
import { useGetCompaniesByIdClienteQuery } from "../../../redux/Api/companiesApi";

import { FuncUtils } from "../../../utils";

import { IoTrashBinSharp } from "react-icons/io5";

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
    isLoading: isLoadingCompaniesClient,
  } = useGetCompaniesByIdClienteQuery(props.dataValues.IdCliente, {
    skip:
      props.dataValues.IdCliente === null ||
      props.dataValues.IdCliente === undefined,
  });

  console.log(companiesClientData);

  //Obserar si hay empresas y mapearlas en el fieldArray:
  React.useEffect(() => {
    if (!props?.dataValues?.Empresas) {
      if (companiesClientData !== null && companiesClientData !== undefined) {
        message.success({
          content: "Lista de empresas del cliente cargada correctamente",
          duration: 3,
        });
        props.dataValues.Empresas = companiesClientData?.result.map(
          (empresa) => {
            return FuncUtils.capitalizePropertyKeys(empresa);
          }
        );

        reset(props.dataValues);
      }
    }
  }, [companiesClientData]);

  //Funcion para el create/insert de Cliente
  const [
    createClient,
    { isLoading: isLoadingCreate, isSuccess: isCreateSuccess },
  ] = useCreateClientMutation();

  //Funcion para insertar, enviar los datos a  la api:
  const onSubmit = (data) => {
    //DataEncabezado de cliente:
    const dataHead = {
      idCliente: 0,
      idCreadoPor: 0,
    };

    //Armar el objeto persona
    const persona = { ...props.dataValues, edad: 18 };
    //Quitar el objeto empresas del objet persona
    delete persona.Empresas;
    //Armar el objeto empresas
    const empresas = data.Empresas;
    //Armar la data submit:
    const dataClient = { ...dataHead, empresas, persona };
    createClient({ ...dataClient });
    console.log(dataClient);
  };

  //Funcion para regresar al paso InformacionPersnal
  const irAtras = () => {
    const dataInformacionEmpresas = getValues();
    console.log(dataInformacionEmpresas); // Datos del paso paso informacion empresas
    props.backPart(dataInformacionEmpresas); // Regresar al paso Informacion personal y a su vez enviar los datos del paso informacion empresas
  };

  //..
  //..
  //..
  React.useEffect(() => {
    if (isCreateSuccess === true) {
      message.success({
        content: "Información del cliente guardada correctamente",
        duration: 3,
      });
      props.setPosicionActual(1);
      props.setDatosFormulario({});
      props.setSaveIsSucces(true);
    }
  }, [isCreateSuccess]);

  //llenar campos fieldarray
  React.useEffect(() => {
    reset(props?.dataValues);
  }, [props?.dataValues]);

  //Funcion para remover empresa:
  const handleRemoveCompany = (index) => {
    remove(index);
  };

  return (
    <>
      {isLoadingCreate ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" tip="Guardando información del cliente" />
        </div>
      ) : (
        <>
          {" "}
          <ContainerFormPrueba onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 50,
                borderBottom: "1px solid #cecece ",
              }}
            >
              <h3>Información de empresas </h3>
            </div>

            {isLoadingCompaniesClient ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spin
                  tip="Cargando información de empresas"
                  size="large"
                  style={{ margin: "0 auto" }}
                />
              </div>
            ) : (
              <div>
                <Collapse accordion>
                  {fields?.map((field, index) => (
                    <Collapse.Panel
                      header={
                        <div style={{ display: "flex" }}>
                          <IoTrashBinSharp
                            size={20}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleRemoveCompany(index);
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>
                            Empresa # {index}
                          </span>
                        </div>
                      }
                      key={field.id}
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
                              {errors.Empresas[index].RNC &&
                                errors.Empresas[index].RNC.message}
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
                <ButtonAntD
                  type="dashed"
                  htmlType="button"
                  onClick={() => {
                    append({});
                  }}
                >
                  Agregar nueva empresa
                </ButtonAntD>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    width: "310px",
                  }}
                >
                  <ButtonBack htmlType="button" onClick={irAtras}>
                    Atras
                  </ButtonBack>

                  <ButtonSave type="submit">
                    {isLoadingCreate ? <Spinner /> : "Guardar"}{" "}
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
