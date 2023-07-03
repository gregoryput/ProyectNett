import {
  InputFor,
  LabelFor,
  Option,
  Select,
  Button,
  ContainerFormPrueba,
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

import { JwtUtils } from "../../../utils";

import { useCreateClientMutation } from "../../../redux/Api/clientsApi";

import { useSelector } from "react-redux";

import { useForm, useFieldArray } from "react-hook-form";
import React from "react";

import { message } from "antd";

export default function InformacionEmpresas(props) {
  //Tomar las ciudades
  const cities = useSelector((state) => state.cities.cities.cities);
  const countries = useSelector((state) => state.countries.countries.countries);

  //Funcion para el create/insert de Cliente
  const [createClient, { isSuccess: isCreateSuccess }] =
    useCreateClientMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "Empresas",
  });

  //Funcion para insertar, enviar los datos a  la api:
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");

    //DataEncabezado de cliente:
    const dataHead = {
      idCliente: 0,
      idCreadoPor: parseInt(JwtUtils.getUserIdByToken(token)),
      fechaCreacion: "2023-07-03T00:32:52.139Z",
      idModificadoPor: 0,
      fechaModificacion: "2023-07-03T00:32:52.139Z",
      idEstadoRegistro: 0,
    };

    //Armar el objeto persona
    const persona = { ...dataHead, ...props.dataValues };

    //Arreglar formato de la fecha:
    const fecha = new Date(persona.FechaNacimiento);
    const fechaFormateada = fecha.toISOString();
    persona.FechaDeNacimiento = "2023-07-03T00:32:52.139Z";

    //Quitar el objeto empresas del objet persona
    delete persona.Empresas;
    delete persona.idCliente;

    //Armar el objeto empresas
    const empresas = data.Empresas;

    empresas.forEach((empresa) => {
      empresa.idCreadoPor = parseInt(JwtUtils.getUserIdByToken(token));
      empresa.fechaCreacion = "2023-07-03T00:32:52.139Z";
      empresa.idModificadoPor = 0;
      empresa.fechaModificacion = "2023-07-03T00:32:52.139Z";
      empresa.idEstadoRegistro = 0;
    });

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

  //
  React.useEffect(() => {
    if (isCreateSuccess) {
      console.log("creado correctamente");
      message.success({
        content: "Informacion del cliente guardada correctamente",
        duration: 2,
      });
    }
  }, [isCreateSuccess]);

  React.useEffect(() => {
    reset(props.dataValues);
  }, []);

  return (
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

      <div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "grid",
              gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
              gap: 5,
              marginTop: 20,
            }}
          >
            <LabelFor>
              Nombre Empresa
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
                {...register(`Empresas.${index}.RNC`, {
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
                {...register(`Empresas.${index}.Pais`, {
                  ...minValue(1, "Debe seleccionar el pais"),
                })}
              >
                <Option disabled={true} value={0} selected>
                  -- Seleccione el pais --
                </Option>
                {countries?.map((country, index) => (
                  <Option key={index} value={parseInt(country.idPais)}>
                    {country.paisNombre}
                  </Option>
                ))}
              </Select>
              {errors.Empresas && errors.Empresas[index] && (
                <span style={{ color: "red", fontSize: 10 }}>
                  {errors.Empresas[index].Pais &&
                    errors.Empresas[index].Pais.message}
                </span>
              )}
            </LabelFor>

            <LabelFor>
              {" "}
              Ciudad
              <Select
                {...register(`Empresas.${index}.IdCiudad`, {
                  ...minValue(1, "Debe seleccionar la ciudad"),
                })}
              >
                <Option disabled={true} value={0} selected>
                  -- Seleccione la ciudad --
                </Option>
                {cities?.map((citie, index) => (
                  <Option key={index} value={parseInt(citie.idCiudad)}>
                    {citie.ciudadNombre}
                  </Option>
                ))}
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
              {errors.Empresas && errors.Empresas[index] && (
                <span style={{ color: "red", fontSize: 10 }}>
                  {errors.Empresas[index].Direccion &&
                    errors.Empresas[index].Direccion.message}
                </span>
              )}
            </LabelFor>
          </div>
        ))}
        <br />
        <button type="button" onClick={() => append({})}>
          Agregar nueva empresa
        </button>
        <br />
        <br />

        <button type="button" onClick={irAtras}>
          Atras
        </button>
        <br />
        <Button type="submit">Guardar</Button>
      </div>
    </ContainerFormPrueba>
  );
}
