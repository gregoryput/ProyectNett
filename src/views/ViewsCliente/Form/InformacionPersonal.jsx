import {
  InputFor,
  LabelFor,
  Option,
  Select,
  ContainerFormPrueba,
  ButtonNext,
} from "../../../components";

import { useForm } from "react-hook-form";

import React from "react";

import {
  required,
  minLength,
  maxLength,
  phoneNumber,
  email,
  cedualaDominicana,
  minValue,
} from "../../../utils/validations";

//Consultas de datos (para los select)
import { useGetCitiesQuery } from "../../../redux/Api/citiesApi";
import { useGetSexesQuery } from "../../../redux/Api/sexesApi";
import { useGetCountriesQuery } from "../../../redux/Api/countriesApi";
import { useDispatch } from "react-redux";
import { setCities } from "../../../redux/Slice/citiesSlice";
import { setCountries } from "../../../redux/Slice/countriesSlice";

export default function InformacionPersonal(props) {
  const dispatch = useDispatch();

  const [IdPaisSeleccionado, setIdPaisSeleccionado] = React.useState(
    props?.datavalues?.IdPais ? parseInt(props?.datavalues?.IdPais) : 0
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm();

  //Traer las ciudades
  const {
    data: citiesData,
    isSuccess: isCitiesSuccess,
    isLoading: isLoadingCities,
  } = useGetCitiesQuery("");

  const optionsSelectCities = citiesData?.result
    ?.filter((ct) => ct.idPais === IdPaisSeleccionado)
    ?.map((citie) => {
      return {
        value: citie?.idCiudad,
        label: citie?.ciudadNombre,
      };
    });

  //Traer los sexos
  const {
    data: sexesData,
    isSuccess: isSexesSuccess,
    isLoading: isLoadingSexes,
  } = useGetSexesQuery("");

  //Traer los paises
  const {
    data: countriesData,
    isSuccess: isCountriesSuccess,
    isLoading: isLoadingCountries,
  } = useGetCountriesQuery("");

  // Llenar el estado global cities, para usarlo en el paso Informacion de empresas y no tener que volver a hacer la peticion al backend
  const dispatchCities = React.useCallback(() => {
    if (
      !isLoadingCities &&
      citiesData?.result != "" &&
      citiesData?.result != null
    ) {
      dispatch(
        setCities({
          cities: citiesData?.result,
        })
      );
    }
  }, [dispatch, isLoadingCities, citiesData?.result]);

  // Llenar el estado global Countries, para usarlo en el paso Informacion de empresas y no tener que volver a hacer la peticion al backend
  const dispatchCountries = React.useCallback(() => {
    if (
      !isLoadingCountries &&
      countriesData?.result != "" &&
      countriesData?.result != null
    ) {
      dispatch(
        setCountries({
          countries: countriesData?.result,
        })
      );
    }
  }, [dispatch, isLoadingCities, citiesData?.result]);

  //Funcion para navegar al paso Informacion Empresas
  const irAdelante = () => {
    const dataInformacionPersnal = getValues();
    props.nextPart(dataInformacionPersnal); // Pasar al siguiente paso enviandole los datos del paso actual
  };

  //Llenar los campos(sirve para llenar los campos al cambiar de paso y tambien para el edit)
  React.useEffect(() => {
    reset(props.dataValues);
    setIdPaisSeleccionado(parseInt(props.dataValues.IdPais));
    dispatchCities();
    dispatchCountries();
  }, []);

  return (
    <ContainerFormPrueba onSubmit={handleSubmit(irAdelante)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 50,
          borderBottom: "1px solid #cecece ",
        }}
      >
        <h3>Información personal </h3>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
          gap: 5,
          marginTop: 20,
        }}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <LabelFor>
          {" "}
          Nombres
          <InputFor
            {...register("Nombres", {
              ...required("Este campo es requerido"),
              ...minLength(2),
              ...maxLength(40),
            })}
            placeholder="Ingrese los nombres"
          />
          {errors.Nombres && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Nombres.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          Apellidos
          <InputFor
            {...register("Apellidos", {
              ...required("Este campo es requerido"),
              ...minLength(2),
              ...maxLength(40),
            })}
            placeholder="Ingrese los apellids"
          />
          {errors.Apellidos && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Apellidos.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          Teléfono 1
          <InputFor
            {...register("Telefono1", {
              ...required("Este campo es requerido"),
              ...phoneNumber(),
            })}
            placeholder="Ingrese el #"
          />
          {errors.Telefono1 && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Telefono1.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          Teléfono 2 (Opcional)
          <InputFor
            {...register("Telefono2", {
              ...phoneNumber(),
            })}
            placeholder="Ingrese el #"
          />
          {errors.Telefono2 && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Telefono2.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          {" "}
          Dirección
          <InputFor
            {...register("Direccion", {
              ...required("Este campo es requerido"),
              ...minLength(3),
              ...maxLength(60),
            })}
            placeholder="Ingrese la dirección"
          />
          {errors.Direccion && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Direccion.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          {" "}
          Correo
          <InputFor
            {...register("Correo", {
              ...required("Este campo es requerido"),
              ...email(),
            })}
            placeholder="Ingrese el correo"
          />
          {errors.Correo && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Correo.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          {" "}
          Cédula
          <InputFor
            {...register("Cedula", {
              ...required("Este campo es requerido"),
              ...cedualaDominicana(),
            })}
            placeholder="Ingrese la cédula"
          />
          {errors.Cedula && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Cedula.message}
            </span>
          )}
        </LabelFor>

        {/*SELECT OPTION IDSEXO*/}
        <LabelFor>
          {" "}
          Sexo
          <Select
            isLoading={isLoadingSexes}
            {...register("IdSexo", {
              ...minValue(1, "debe seleccionar el sexo"),
            })}
          >
            <Option disabled={true} value={0} selected>
              -- Seleccione el sexo --
            </Option>
            {sexesData?.result.map((sex, index) => (
              <Option key={index} value={parseInt(sex.idSexo)}>
                {sex.sexoNombre}
              </Option>
            ))}
          </Select>
          {errors.IdSexo && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.IdSexo.message}
            </span>
          )}
        </LabelFor>

        {/*---------SELEC OPTION IDPAIS*/}
        <LabelFor>
          {" "}
          País
          <Select
            isLoading={isLoadingCountries}
            {...register("IdPais", {
              ...minValue(1, "Debe seleccionar el País"),
            })}
            onChange={(event) => {
              setValue("IdPais", parseInt(event.target.value));
              trigger("IdPais");
              setValue("IdCiudad", 0);
              setIdPaisSeleccionado(parseInt(event.target.value));
            }}
          >
            <Option disabled={true} value={0} selected>
              -- Seleccione el país --
            </Option>
            {countriesData?.result.map((country, index) => (
              <Option key={index} value={parseInt(country.idPais)}>
                {country.paisNombre}
              </Option>
            ))}
          </Select>
          {errors.IdPais && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.IdPais.message}
            </span>
          )}
        </LabelFor>

        {/*----SELEC OPTION IDCIUDAD*/}
        <LabelFor>
          {" "}
          Ciudad
          <Select
            defaultValue={0}
            isLoading={isLoadingCities}
            {...register("IdCiudad", {
              ...minValue(1, "Debe seleccionar la ciudad"),
            })}
            s
            option
          >
            <Option disabled={true} value={0} selected>
              -- Seleccione la ciudad --
            </Option>
            {optionsSelectCities?.map((option, index) => (
              <Option key={index} value={parseInt(option.value)}>
                {option.label}
              </Option>
            ))}
          </Select>
          {errors.IdCiudad && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.IdCiudad.message}
            </span>
          )}
        </LabelFor>
        <LabelFor>
          {" "}
          Fecha de nacimiento
          <InputFor type="date" {...register("FechaDeNacimiento")} />
        </LabelFor>
      </div>
      <br />
      <ButtonNext htmlType="submit">Siguiente</ButtonNext>
    </ContainerFormPrueba>
  );
}
