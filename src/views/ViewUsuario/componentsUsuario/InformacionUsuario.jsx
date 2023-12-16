import {
  InputFor,
  LabelFor,
  ContainerFormPrueba,
  ButtonRemove,
  ButtonSave,
  Option,
  Select,
  ButtonAdd,
  BtnSelect,
} from "../../../components";

import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  required,
  minLength,
  maxLength,
  minValue,
  email,
} from "../../../utils/validations";

import PropTypes from "prop-types"; // Importa PropTypes
import {
  useGetEmpleadoNotUserQuery,
  useGetRolesQuery,
} from "../../../redux/Api/usersApi";
import { List, Modal } from "antd";
import { useState } from "react";
import Search from "antd/es/input/Search";

export default function InformacionUsuario(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const {
    data: dataEmpleado,
    isSuccess: isSuccess,
    // isLoading: isLoading,
  } = useGetEmpleadoNotUserQuery("");

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = dataEmpleado?.Result.filter((item) =>
      item.Nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };
  useEffect(() => {
    if (dataEmpleado?.Result !== undefined && isSuccess) {
      setFilteredData(dataEmpleado?.Result);
    }
  }, [dataEmpleado, setFilteredData, isSuccess]);

  //Traer las ciudades
  const {
    data: dataRoles,
    //  isSuccess: isCitiesSuccess,
    // isLoading: isLoading,
  } = useGetRolesQuery("");

  const convertirAtributosAMayusculas = (objeto) =>
    objeto
      ? Object.fromEntries(
          Object.entries(objeto).map(([key, value]) => [
            key.charAt(0).toUpperCase() + key.slice(1),
            value,
          ])
        )
      : {};

  useEffect(() => {
    reset(convertirAtributosAMayusculas(props.dataEdit));
  }, [reset, props.dataEdit]);

  const clearFields = () => {
    props.setDataEdit([]);
    props.setToggle(false);
  };

  useEffect(() => {
    reset();
  }, [props.toggle]);

  //Funcion para insertar, enviar los datos a la api:
  const onSubmit = (data) => {
    let id = props.idEmpleado
    let info = {
      ...data,
      idEmpleado: id ,
    };
    props.handleSubmit(info);
  };
  const llenarCampo = (item) => {
    setValue("Empleado", item.Nombres + " " + item.Apellidos);
    handleCloseModal();

    props.setIdEmpleado(item.IdEmpleado);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // Definir PropTypes para las props del componente
  InformacionUsuario.propTypes = {
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    dataEdit: PropTypes.array, // Cambia el tipo según corresponda
    setDataEdit: PropTypes.func.isRequired,
    dataValues: PropTypes.array,
    idEmpleado: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired,
    setIdEmpleado: PropTypes.func.isRequired,
  };

  return (
    <ContainerFormPrueba onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Datos de usuario </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
          gap: 5,
          marginTop: 20,
        }}
      >
        <LabelFor>
          {" "}
          Nombre de usuario
          <InputFor
            {...register("NombreUsuario", {
              ...required("Este campo es requerido"),
              ...minLength(2),
              ...maxLength(40),
            })}
            placeholder="Ingrese nombre de usuario"
          />
          {errors.NombreUsuario && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.NombreUsuario.message}
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
          Rol de usuario
          <Select
            defaultValue={0}
            {...register("IdRol", {
              ...minValue(1, "debe seleccionar el rol"),
              ...required("Este campo es requerido"),
            })}
          >
            <Option disabled value={0}>
              -- Seleccione el Rol --
            </Option>
            {dataRoles?.Result?.map((data, index) => (
              <Option key={index} value={parseInt(data.IdRol)}>
                {data.NombreRol}
              </Option>
            ))}
          </Select>
          {errors.IdRol && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.IdRol.message}
            </span>
          )}
        </LabelFor>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <LabelFor>
            {" "}
            Empleado
            <InputFor
              {...register("Empleado", {
                ...required("Este campo es requerido"),
              })}
              disabled
            />
            {errors.Empleado && (
              <span style={{ color: "red", fontSize: 10 }}>
                {errors.Empleado.message}
              </span>
            )}
          </LabelFor>
          <ButtonAdd
            style={{ width: 40, marginTop: 16, marginLeft: 5 }}
            type="button"
            onClick={() => handleOpenModal()}
          >
            <IoPersonAddOutline size={18} />
          </ButtonAdd>
        </div>

        <LabelFor>
          {" "}
          Contraseña
          <InputFor
            {...register("Contraseña", {
              ...required("Este campo es requerido"),
              ...minLength(2),
              ...maxLength(40),
            })}
            placeholder="Ingrese los contraseña "
            type="password"
          />
          {errors.Contraseña && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Contraseña.message}
            </span>
          )}
        </LabelFor>

        <LabelFor>
          {" "}
          Confirmar contraseña
          <InputFor
            {...register("Confirmar", {
              ...required("Este campo es requerido"),
              ...minLength(2),
              ...maxLength(40),
              validate: (value) =>
                value === watch("Contraseña") || "Contraseña no es igual ",
            })}
            placeholder="Ingrese los contraseña "
            type="password"
          />
          {errors.Confirmar && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Confirmar.message}
            </span>
          )}
        </LabelFor>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonRemove
          type="button"
          onClick={() => clearFields()}
          style={{ marginLeft: 5 }}
        >
          <IoClose size={18} style={{ marginRight: 2 }} /> Cancelar
        </ButtonRemove>

        <ButtonSave type="submit">
          {/* {isLoadingCreate ? (
                      <Spinner style={{ color: "red" }} />
                    ) : ( */}
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
          {/* )}{" "} */}
        </ButtonSave>
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCloseModal}
        title={"Elige el empleado"}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Search
            placeholder="Buscar empleado..."
            style={{
              width: 304,
              marginTop: 10,
              marginBottom: 40,
            }}
            allowClear
            onSearch={handleSearch}
          />
        </div>

        <List
          pagination={{
            // onChange: (page) => {
            // },
            pageSize: 5,
          }}
          dataSource={filteredData}
          renderItem={(item) => (
            <>
              <BtnSelect
                style={{ width: "100%", justifyContent: "flex-start" }}
                onClick={() => llenarCampo(item)}
              >
                <List.Item>
                  <p>{item.Nombres + " " + item.Apellidos}</p>
                </List.Item>
              </BtnSelect>
            </>
          )}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          {/* <ButtonNext onClick={() => handleCloseModal()} style={{ width: 40 }}>
            No
          </ButtonNext> */}
        </div>
      </Modal>
    </ContainerFormPrueba>
  );
}
