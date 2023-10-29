import {
  InputFor,
  LabelFor,
  Option,
  Select,
  ContainerFormPrueba,
  ButtonNext,
  ButtonRemove,
} from "../../../components";

import { useForm } from "react-hook-form";
import { IoArrowForward, IoClose } from "react-icons/io5";
import React, { useEffect } from "react";
import { SavingText } from "../../../components/StylesCustomLoading/loading-custom.styled";

import {
  required,
  minLength,
  maxLength,
  phoneNumber,
  email,
  cedualaDominicana,
  minValue,
  numberOnly
} from "../../../utils/validations";

//Consultas de datos (para los select)
import { useGetCitiesQuery } from "../../../redux/Api/citiesApi";
import { useGetSexesQuery } from "../../../redux/Api/sexesApi";
import { useUqVerificarCedulaUQMutation } from "../../../redux/Api/uQVerificarApi";
import { useGetCountriesQuery } from "../../../redux/Api/countriesApi";
import { useDispatch } from "react-redux";
import { setCities } from "../../../redux/Slice/citiesSlice";
import { setCountries } from "../../../redux/Slice/countriesSlice";
import PropTypes from "prop-types"; // Importa PropTypes

export default function InformacionPersonal(props) {

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    trigger,
    reset,
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const [IdPaisSeleccionado, setIdPaisSeleccionado] = React.useState(
    props?.datavalues?.IdPais ? parseInt(props?.datavalues?.IdPais) : 0
  );

  const [verificarCedula, { data: dataVerify, isLoading: isLoadingVerify }] =
    useUqVerificarCedulaUQMutation();

  //Funcion para navegar al paso Informacion Empresas
  const irAdelante = () => {
    const dataInformacionPersnal = getValues();
    props.nextPart(dataInformacionPersnal); // Pasar al siguiente paso enviandole los datos del paso actual
  };

  const controlVerify = (dataPersonal) => {
    trigger().then((isValid) => {
      if (isValid) {
        let requiereVerificacionCedula = false;
        if (
          !(
            props.dataValues?.InitialCedulaEdit &&
            props.dataValues?.InitialCedulaEdit === dataPersonal.Cedula
          )
        ) {
          verificarCedula(dataPersonal.Cedula);
          requiereVerificacionCedula = true;
        } else {
          requiereVerificacionCedula = false;
        }
        if (!requiereVerificacionCedula) {
          irAdelante();
        }
      } else {
        return;
      }
    });
  };

  // Con este useEffect observo si la cedula existe y si existe no lo dejo avanzar al paso de empresas
  React.useEffect(() => {
    if (dataVerify !== null && dataVerify !== undefined) {
      let cedulaDuplicate = false;
      //
      //VERIFICAR SI EL EMAIL YA EXISTE:
      if (dataVerify?.result[0]?.Existe === true) {
        cedulaDuplicate = true;
        // Si el código existe se dispara una validacion React-Hook-Form
        setError("Cedula", {
          type: "manual",
          message: "Ya hay un registro con esta cédula en la base de datos",
        });
      } else {
        cedulaDuplicate = false;
      }

      //Si la cedula no esta duplicada lo dejo pasar al siguiente paso:
      if (!cedulaDuplicate) {
        irAdelante();
      }
    }
  }, [dataVerify, setError]);

  //Traer las ciudades
  const {
    data: citiesData,
    //  isSuccess: isCitiesSuccess,
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
    // isSuccess: isSexesSuccess,
    isLoading: isLoadingSexes,
  } = useGetSexesQuery("");

  //Traer los paises
  const {
    data: countriesData,
    //isSuccess: isCountriesSuccess,
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
  }, [dispatch, isLoadingCities, citiesData]);

  //Llenar los campos(sirve para llenar los campos al cambiar de paso y tambien para el edit)
  useEffect(() => {
    reset(props.dataValues);
    setIdPaisSeleccionado(parseInt(props.dataValues.IdPais));
  }, [props.dataValues, reset, setIdPaisSeleccionado]);

  useEffect(() => {
    if (citiesData != null && countriesData != null) {
      dispatchCities();
      dispatchCountries();
    }
  }, [citiesData, countriesData, dispatchCountries, dispatchCities]);

  const clearFields = () => {
    reset();
    setIdPaisSeleccionado(0);
    props.setDatosFormulario([]);
    props.setDataEdit([]);
    props.setToggle(false);
  };

  useEffect(()=>{
    reset();
  },[props.toggle]);

 


  // Definir PropTypes para las props del componente
  InformacionPersonal.propTypes = {
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    setLoadingSave: PropTypes.func.isRequired,
    dataEdit: PropTypes.object, // Cambia el tipo según corresponda
    nextPart: PropTypes.func.isRequired,
    dataValues: PropTypes.object.isRequired,
    setDataEdit: PropTypes.func.isRequired,
    setDatosFormulario: PropTypes.func.isRequired,
    datavalues: PropTypes.array,
  };

  return (
    <ContainerFormPrueba onSubmit={handleSubmit(controlVerify)}>
      <div>
        <h2>Datos personales </h2>
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
            placeholder="Ingrese los apellidos"
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
          Edad
          <InputFor
            {...register("Edad", {
              ...required("Este campo es requerido"),
              ...maxLength(2,"Edad real"),
              ...minLength(2,"Edad real"),
              ...numberOnly("Solo numero"),
            })}
            placeholder="Ingrese la edad"
          />
          {errors.Edad && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Edad.message}
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
          {errors.correo && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.correo.message}
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
          {isLoadingVerify ? (
            <SavingText marginTop="0" isSaving={true}>
              Verificando...
            </SavingText>
          ) : null}
        </LabelFor>

        {/*---------SELECT OPTION IDSEXO---------*/}
        <LabelFor>
          {" "}
          Sexo
          <Select
            defaultValue={0}
            isLoading={isLoadingSexes}
            {...register("IdSexo", {
              ...minValue(1, "debe seleccionar el sexo"),
            })}
          >
            <Option disabled value={0}>
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

        {/*-------------INPUT FechaDeNacimiento-------------*/}
        <LabelFor>
          {" "}
          Fecha de nacimiento
          <InputFor type="date" {...register("fechaDeNacimiento",{...required("Este campo es requerido")})} />
          {errors.fechaDeNacimiento && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.fechaDeNacimiento.message}
            </span>
          )}
        </LabelFor>

        {/*---------SELEC OPTION IDPAIS---------*/}
        <LabelFor>
          {" "}
          País
          <Select
            defaultValue={0}
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
            <Option disabled value={0}>
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

        {/*-------------SELEC OPTION IDCIUDAD-------------*/}
        <LabelFor>
          {" "}
          Ciudad
          <Select
            defaultValue={0}
            isLoading={isLoadingCities}
            {...register("IdCiudad", {
              ...minValue(1, "Debe seleccionar la ciudad"),
            })}

            option
          >
            <Option disabled value={0}>
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
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonRemove
          type="button"
          onClick={()=> clearFields() }
          style={{ marginLeft: 5 }}
          disabled={isLoadingVerify}
        >
          <IoClose size={18} style={{ marginRight: 2 }} /> Cancelar
        </ButtonRemove>

        <ButtonNext htmlType="submit" disabled={isLoadingVerify}>
          <IoArrowForward size={18} style={{ marginRight: 4 }} /> Siguiente{" "}
        </ButtonNext>
      </div>
    </ContainerFormPrueba>
  );
}
