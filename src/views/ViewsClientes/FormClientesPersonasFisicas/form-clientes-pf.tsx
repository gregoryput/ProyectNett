import React from "react";
import { Button, DatePicker, Form, Image, Input, Select, message } from "antd";
import {
  ContainerForm,
  ContainerFormAntd,
  ModalFormPerson,
} from "../../../components";
import { OutsideClick } from "outsideclick-react";

import { MdImageNotSupported, MdHelpOutline } from "react-icons/md";
import { DivAreaFoto } from "./steps.styled";

import { FaAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGetPersonasIfoPersonalQuery } from "../../../redux/Api/personasApi";
import { PersonaInfoPersonalDTO } from "../../../interfaces";
import dayjs from "dayjs";
import { useCreateEntitieMutation } from "../../../redux/Api/entitiesApi";

interface IFormClientesProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormClientsPersonsFi = (props: IFormClientesProps) => {
  const [animacion, setAnimacion] = React.useState<boolean>(false);

  const [selectedClient, setSelectedClient] =
    React.useState<PersonaInfoPersonalDTO>();

  const fecthClientes = useGetPersonasIfoPersonalQuery();

  //const fetchEntities = useCreateEntitieMutation();

  const [openModalFP, setOpenModalFP] = React.useState<boolean>(false);

  const [form] = Form.useForm();

  //Funcion peticion para el create/insert de Producto:
  const [
    createEntitie,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateEntitieMutation();

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

  const [IdPersona, setIdPersona] = React.useState<number>(0);

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
  // },
  // }
  //   "IdEntidad": 0,
  //   "NombreEntidad": "string",
  //   "IdTipoEntidad": 0,
  //   "IdCreadoPor": 0,
  //   "FechaCreacion": "2023-12-16T08:11:23.825Z",
  //   "IdModificadoPor": 0,
  //   "FechaModificacion": "2023-12-16T08:11:23.825Z",
  //   "IdEstadoRegistro": 0,
  //   "EntidadRolEntidad": {
  //     "IdEntidadRolEntidad": 0,
  //     "IdEntidad": 0,
  //     "IdRolEntidad": 0,
  //     "IdCreadoPor": 0,
  //     "FechaCreacion": "2023-12-16T08:11:23.825Z",
  //     "IdModificadoPor": 0,
  //     "FechaModificacion": "2023-12-16T08:11:23.825Z",
  //     "IdEstadoRegistro": 0
  //   },
  //   "EntidadPersonaFisica": {
  //     "IdEntidadPersonaFisica": 0,
  //     "IdEntidad": 0,
  //     "IdPersona": 0,
  //     "IdCreadoPor": 0,
  //     "FechaCreacion": "2023-12-16T08:11:23.825Z",
  //     "IdModificadoPor": 0,
  //     "FechaModificacion": "2023-12-16T08:11:23.825Z",
  //     "IdEstadoRegistro": 0
  //   },
  //   "EntidadPersonaFisicaRepresentante": {
  //     "IdEPFR": 0,
  //     "IdEntidadPersonaFisica": 0,
  //     "IdRepresentanteActual": 0,
  //     "IdRolRepresentante": 0,
  //     "FechaInicioRepresentante": "2023-12-16T08:11:23.825Z",
  //     "FechaFinRepresentante": "2023-12-16T08:11:23.825Z",
  //     "IdCreadoPor": 0,
  //     "FechaCreacion": "2023-12-16T08:11:23.825Z",
  //     "IdModificadoPor": 0,
  //     "FechaModificacion": "2023-12-16T08:11:23.825Z",
  //     "IdEstadoRegistro": 0
  //   },
  //   "ClienteEntidad": {
  //     "IdCliente": 0,
  //     "Codigo": "string",
  //     "IdEntidad": 0,
  //     "FechaInicioCliente": "2023-12-16T08:11:23.825Z",
  //     "IdCreadoPor": 0,
  //     "FechaCreacion": "2023-12-16T08:11:23.825Z",
  //     "IdModificadoPor": 0,
  //     "FechaModificacion": "2023-12-16T08:11:23.825Z",
  //     "IdEstadoRegistro": 0
  //   }
  // }
  //};

  return (
    <ContainerForm
      animacion={animacion}
      display={props.toggle}
      layout={"vertical"}
    >
      <OutsideClick>
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
                      {selectedClient?.Data !== null ? (
                        <Image
                          src={`data:${selectedClient?.ContentType};base64,${selectedClient?.Data}`}
                          alt={`Imagen-${selectedClient?.FileName}`}
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
                    filterOption={(input, option) =>
                      option
                        ? option.label
                            ?.toString()
                            ?.toLowerCase()
                            ?.includes(input.toLowerCase())
                        : null
                    }
                    options={fecthClientes.data?.Result?.map((client) => ({
                      value: client.IdPersona,
                      label: `${client.Cedula} - ${client.Nombres} ${client.Apellidos}`,
                    }))}
                    onChange={(value: number | null) => {
                      setSelectedClient(
                        fecthClientes.data?.Result.find(
                          (client) => client.IdPersona === value
                        )
                      );

                      setIdPersona(value as number);
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
                    <a
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FaUserEdit />{" "}
                      <span style={{ marginLeft: "5px" }}>Editar info</span>
                    </a>
                    <a
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <MdOutlinePersonSearch />
                      <span style={{ marginLeft: "5px" }}>Cambiar</span>
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
                <span>{selectedClient?.Nombres || "-"}</span>
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
                  <span>{selectedClient?.Cedula || "-"}</span>
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
                  {selectedClient?.FechaDeNacimiento
                    ? dayjs(selectedClient?.FechaDeNacimiento).format(
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
                <span>{selectedClient?.Correo || "-"}</span>
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
                  <strong>Tel1:</strong>
                  <span>{selectedClient?.Telefono1 || "-"}</span>
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
                <span>{selectedClient?.Telefono2 || "-"}</span>
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
                <span>{selectedClient?.PaisNombre || "-"}</span>
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
                    {selectedClient?.CiudadNombre
                      ? truncateText(selectedClient?.CiudadNombre || "", 10)
                      : null}
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
                <span>{selectedClient?.SexoNombre || "-"}</span>
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
      </OutsideClick>

      <ModalFormPerson
        openModalFP={openModalFP}
        setOpenModalFP={setOpenModalFP}
      />
    </ContainerForm>
  );
};

export default FormClientsPersonsFi;
