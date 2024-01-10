import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Skeleton,
  message,
} from "antd";
import {
  ContainerForm,
  ContainerFormAntd,
  ModalFormPerson,
} from "../../../components";
import { OutsideClick } from "outsideclick-react";

import { MdImageNotSupported, MdHelpOutline } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGetPersonasIfoPersonalQuery } from "../../../redux/Api/personasApi";
import { IPersona, PersonaInfoPersonalDTO } from "../../../interfaces";
import dayjs from "dayjs";
import { useCreateEntitieMutation } from "../../../redux/Api/entitiesApi";
import toast from "react-hot-toast";
import { DivAreaFoto } from "./Steps/steps.styled";

interface IFormClientesProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormClientsEmpresas = (props: IFormClientesProps) => {
  const [animacion, setAnimacion] = React.useState<boolean>(false);

  const [selectedPerson, setSelectedPerson] = React.useState<
    PersonaInfoPersonalDTO | undefined
  >();

  // Estado para controlar si se van a crear o editar datos personales:
  const [dataEditPersona, setDataEditPersona] = React.useState<
    IPersona | undefined
  >(undefined);

  const fecthClientes = useGetPersonasIfoPersonalQuery();

  const [openModalFP, setOpenModalFP] = React.useState<boolean>(false);
  React.useEffect(() => {
    dataEditPersona != undefined && dataEditPersona == undefined
      ? setDataEditPersona(undefined)
      : null;
  }, [openModalFP, dataEditPersona]);

  const [form] = Form.useForm();

  //Observar el valor idPais del form:
  //const idPersona = Form.useWatch("IdPersona", form);

  //Funcion peticion para el create/insert de Producto:
  const [
    createEntitie,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateEntitieMutation();
  // MOSTRAR MENSAJE DE LOADING: -------------------------------------------------------------------------------- --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (isLoadingCreate) {
      toast.loading(
        `Guardando datos de la nueva entidad cliente persona física`,
        {
          id: "tSavinPerson",
        }
      );
      //setCerrableModal(false); // <<-- hacer que el modal no sea cerrable mientras se esta guardando
    } else {
      toast.dismiss("tSavinPerson");
      //!cerrableModal ? setCerrableModal(true) : null; // <<-- hacer que el modal sea cerrable cuando deje de cargar el guardado
    }
  }, [isLoadingCreate]);

  // // MOSTRAR MENSAJE DE GUARDADO/ACTUALIZADO CORRECTAMENTE: --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("tSavinPerson");
      toast.success(
        `Los datos del cliente han sido actualizados correctamente`,
        {
          id: "tSucc",
        }
      );
      form.resetFields();
      setIdPersona(null);
      setDataEditPersona(undefined);
      setOpenModalFP(false);
    }
  }, [isCreateSuccess]);

  // // MOSTRAR MENSAJE DE ERROR DE GUARDADO/ACTUALZADO: --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (isErrorCreate) {
      toast.dismiss("tSavinPerson");
      toast.error("Error al guardar los datos del cliente persona física", {
        id: "tError",
      });
    }
  }, [isErrorCreate]);

  React.useEffect(() => {
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [props.toggle, setAnimacion]);

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return `${text.substring(0, maxLength)}...`;
    }
  }

  const [IdPersona, setIdPersona] = React.useState<number | null>(null);

  const dataSubmit = (data) => {
    const dataS = {
      IdEntidad: 0,
      NombreEntidad: data.NombreEntidad,
      IdTipoEntidad: 1,

      EntidadRolEntidad: {
        IdEntidadRolEntidad: 0,
        IdEntidad: 0,
        IdRolEntidad: 1,
      },

      EntidadPersonaFisica: {
        IdEntidadPersonaFisica: 0,
        IdEntidad: 0,
        IdPersona: IdPersona,
      },

      EntidadPersonaFisicaRepresentante: {
        IdEPFR: 0,
        IdEntidadPersonaFisica: 0,
        IdRepresentanteActual: IdPersona,
        IdRolRepresentante: 1,
      },

      ClienteEntidad: {
        IdCliente: 0,
        Codigo: data.Codigo,
        IdEntidad: 0,
        FechaInicioCliente: data.FechaInicioCliente,
      },
    };

    createEntitie({ ...dataS });

    // Crear: -----------------------------------------------------
  };

  return (
    <ContainerForm
      animacion={animacion}
      display={props.toggle}
      layout={"vertical"}
    >
      <OutsideClick>
        {isLoadingCreate ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <ContainerFormAntd
            layout={"vertical"}
            onFinish={dataSubmit}
            form={form}
          >
            <div style={{ marginTop: "15px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <h3
                  style={{
                    width: "100%",
                    background: "#5592E7",
                    borderRadius: "8px",
                    textAlign: "center",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  Información de identificación del cliente
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  name={"NombreEntidad"}
                  label={<strong>Nombre de identificación (opcional):</strong>}
                  style={{ width: "29%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={"Codigo"}
                  label={<strong>Código del cliente:</strong>}
                  style={{ width: "29%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={"FechaInicioCliente"}
                  label={<strong>Fecha de inicio como cliente:</strong>}
                  style={{ width: "29%" }}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>

            <div style={{ marginTop: "15px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "30px",
                  width: "100%",
                }}
              >
                <h3
                  style={{
                    width: "50%",
                    background: "#5592E7",
                    borderRadius: "8px",
                    textAlign: "center",
                    color: "white",
                    marginRight: "5px",
                  }}
                >
                  Información personal del cliente
                </h3>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Form.Item name={"fotoCliente"}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <DivAreaFoto>
                        {selectedPerson?.Data != null &&
                        selectedPerson?.Data != undefined &&
                        IdPersona != null ? (
                          <Image
                            src={`data:${selectedPerson?.ContentType};base64,${selectedPerson?.Data}`}
                            alt={`Imagen-${selectedPerson?.FileName}`}
                            style={{
                              maxHeight: "80px",
                              minWidth: "80px",
                              borderRadius: "45px",
                            }}
                          />
                        ) : (
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <MdImageNotSupported size={25} color="#90BFD9" />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                style={{ fontWeight: "bold", color: "#C6C6C6" }}
                              >
                                No img
                              </span>
                            </div>
                          </div>
                        )}
                      </DivAreaFoto>
                    </div>
                  </Form.Item>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                  }}
                >
                  <Form.Item
                    style={{
                      width: "100%",
                    }}
                    name={"IdPersona"}
                    label={
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <strong style={{ marginRight: "10px" }}>
                          Cédula - Nombre
                        </strong>{" "}
                        <MdHelpOutline size={20} color={"#D4D4D8"} />
                      </div>
                    }
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={
                        (input, option) =>
                          option
                            ? option.label
                                ?.toString()
                                ?.toLowerCase()
                                ?.includes(input.toLowerCase()) ?? false // Devuelve false si la opción no cumple la condición
                            : false // Devuelve false si la opción es null o undefined
                      }
                      options={fecthClientes.data?.Result?.map((client) => ({
                        value: client.IdPersona,
                        label: `${client.Cedula} - ${client.Nombres} ${client.Apellidos}`,
                      }))}
                      onChange={(value: number | null) => {
                        const dataSelectedPerson =
                          fecthClientes.data?.Result.find(
                            (client) => client.IdPersona === value
                          );

                        if (
                          dataSelectedPerson != undefined &&
                          dataSelectedPerson.YaEstaAsociado == false
                        ) {
                          setSelectedPerson(
                            fecthClientes.data?.Result.find(
                              (client) => client.IdPersona === value
                            )
                          );

                          setIdPersona(value);
                        } else {
                          toast.error(
                            "La persona seleccionada ya está asociada a un cliente"
                          );
                          form.setFieldValue("IdPersona", null);
                          form.resetFields();
                          setIdPersona(null);
                          setSelectedPerson(undefined);
                        }
                      }}
                      placeholder="Seleccionar cliente"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      {/*BOTON NUEVO ---------------------------------------------------------*/}
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={() => setOpenModalFP(true)}
                      >
                        <FaAddressCard />{" "}
                        <span style={{ marginLeft: "5px" }}>Nuevo</span>
                      </a>

                      {/*BOTON EDITAR ---------------------------------------------------------*/}
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (selectedPerson != undefined) {
                            setDataEditPersona({
                              IdPersona: selectedPerson.IdPersona,
                              Nombres: selectedPerson.Nombres,
                              Apellidos: selectedPerson.Apellidos,
                              Cedula: selectedPerson.Cedula,
                              Telefono1: selectedPerson.Telefono1,
                              Telefono2: selectedPerson.Telefono2,
                              Correo: selectedPerson.Correo,
                              FechaDeNacimiento:
                                selectedPerson.FechaDeNacimiento,
                              IdSexo: selectedPerson.IdSexo,
                              IdPais: selectedPerson.IdPais,
                              IdCiudad: selectedPerson.IdCiudad,
                              Direccion: selectedPerson.Direccion,

                              PersonaTiposPersona:
                                selectedPerson.PersonaTiposPersona,

                              DataImagenPersona: {
                                Imagen: {
                                  IdImagen: selectedPerson.IdImagen || 0,
                                  FileName: selectedPerson.FileName || "",
                                  ContentType: selectedPerson.ContentType || "",
                                  FileSize: selectedPerson.FileSize || 0,
                                  Data: selectedPerson.Data as string,
                                },
                                PersonaImagen: {
                                  IdImagen: selectedPerson.IdImagen as number,
                                  IdPersona: selectedPerson.IdPersona,
                                  IdPersonaImagen:
                                    selectedPerson.IdPersonaImagen,
                                },
                              },
                            });
                            setOpenModalFP(true);
                          } else {
                            message.info("no ha seleccionado ninguna persona");
                            setDataEditPersona(undefined);
                            setOpenModalFP(true);
                          }
                        }}
                      >
                        <FaUserEdit
                          color={
                            selectedPerson != undefined ? "#398FFF" : "#CCCCCC"
                          }
                        />{" "}
                        <span
                          style={{
                            marginLeft: "5px",
                            color: `${
                              selectedPerson != undefined
                                ? "#398FFF"
                                : "#CCCCCC"
                            }`,
                          }}
                        >
                          Editar info
                        </span>
                      </a>

                      {/*BOTON CAMBIAR ---------------------------------------------------------*/}
                      <a
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          selectedPerson != undefined
                            ? message.info("se va cambiar")
                            : message.error(
                                "No ha seleccionado datos personales"
                              )
                        }
                      >
                        <MdOutlinePersonSearch
                          color={
                            selectedPerson != undefined ? "#398FFF" : "#CCCCCC"
                          }
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                            color: `${
                              selectedPerson != undefined
                                ? "#398FFF"
                                : "#CCCCCC"
                            }`,
                          }}
                        >
                          Cambiar
                        </span>
                      </a>
                    </div>
                  </Form.Item>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "40%",
                    maxWidth: "40%",
                    marginBottom: "15px",
                    textAlign: "left",
                  }}
                >
                  <strong>Nombre completo:</strong>
                  <span>{selectedPerson?.Nombres || "-"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <strong>Cédula:</strong>
                    <span>{selectedPerson?.Cedula || "-"}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    textAlign: "right",
                  }}
                >
                  <strong>Fecha nacimiento:</strong>
                  <span>
                    {selectedPerson?.FechaDeNacimiento
                      ? dayjs(selectedPerson?.FechaDeNacimiento).format(
                          "DD/MM/YYYY"
                        )
                      : "-"}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "40%",
                    maxWidth: "40%",
                    marginBottom: "15px",
                    textAlign: "left",
                  }}
                >
                  <strong>Correo:</strong>
                  <span>{selectedPerson?.Correo || "-"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <strong> Tel:</strong>
                    <span>{selectedPerson?.Telefono1 || "---"}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    textAlign: "right",
                  }}
                >
                  <strong>Tel2:</strong>
                  <span>{selectedPerson?.Telefono2 || "-"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "40%",
                    maxWidth: "40%",
                    marginBottom: "15px",
                    textAlign: "left",
                  }}
                >
                  <strong>Pais:</strong>
                  <span>{selectedPerson?.PaisNombre || "-"}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <strong>Ciudad:</strong>
                    <span>
                      {selectedPerson?.CiudadNombre
                        ? truncateText(selectedPerson?.CiudadNombre || "", 10)
                        : "-"}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "29%",
                    maxWidth: "29%",
                    marginBottom: "15px",
                    textAlign: "right",
                  }}
                >
                  <strong>Sexo:</strong>
                  <span>{selectedPerson?.SexoNombre || "-"}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: "10px",
                boxShadow: " 0 4px 8px rgba(201, 219, 243, 0.3)",
                borderBottom: "0.1px solid #F0F0F5",
                width: "100%",
                marginTop: "40px",
              }}
            >
              <div>
                <Button onClick={() => message.info("Limpiar campos")}>
                  Cancelar
                </Button>
              </div>

              <div>
                <Button htmlType="submit" type="primary">
                  Guardar
                </Button>
              </div>
            </div>
          </ContainerFormAntd>
        )}
      </OutsideClick>

      <ModalFormPerson
        openModalFP={openModalFP}
        setOpenModalFP={setOpenModalFP}
        dataEditPersona={dataEditPersona}
        setDataEditPersona={setDataEditPersona}
        formCPF={form}
        setIdPersona={setIdPersona}
      />
    </ContainerForm>
  );
};

export default FormClientsEmpresas;
