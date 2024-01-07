import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  StepProps,
  Tooltip,
  message,
} from "antd";
import { ContainerFormAntd } from "../../../../components";

import {
  MdHelpOutline,
  MdImageNotSupported,
  MdOutlinePersonSearch,
} from "react-icons/md";
import React from "react";
import FormItem from "antd/es/form/FormItem";
import { IPersona } from "../../../../interfaces";
import { useCreateEntitieMutation } from "../../../../redux/Api/entitiesApi";
import { useGetPersonasIfoPersonalQuery } from "../../../../redux/Api/personasApi";
import { DivAreaFoto } from "./steps.styled";
import toast from "react-hot-toast";
import { FaAddressCard, FaUserEdit } from "react-icons/fa";
import dayjs from "dayjs";

interface IStep2RepresentantesProps {
  setItemsSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  onSuccess: (data: any, step: number) => void;
  onBack: (dataBack: any, step: any) => void;
  data: any;
}

export default function Step2Representantes(props: IStep2RepresentantesProps) {
  const remoteControl = false;

  const [form] = Form.useForm();

  const [IdPersona, setIdPersona] = React.useState<number | null>(null);

  const [selectedEnterprise, setSelectedEnterprise] = React.useState<
    any | undefined
  >();

  const fecthClientes = useGetPersonasIfoPersonalQuery();

  //Funcion peticion para el create/insert de Producto:
  const [
    createEntitie,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateEntitieMutation();

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

  const [openModalFP, setOpenModalFP] = React.useState<boolean>(false);

  // Estado para controlar si se van a crear o editar datos personales:
  const [dataEditPersona, setDataEditPersona] = React.useState<
    IPersona | undefined
  >(undefined);

  React.useEffect(() => {
    dataEditPersona != undefined && dataEditPersona == undefined
      ? setDataEditPersona(undefined)
      : null;
  }, [openModalFP, dataEditPersona]);

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return `${text.substring(0, maxLength)}...`;
    }
  }

  return (
    <ContainerFormAntd layout={"vertical"}>
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
            Designación del representante de la empresa:
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
                  {selectedEnterprise?.Data != null &&
                  selectedEnterprise?.Data != undefined &&
                  IdPersona != null ? (
                    <Image
                      src={`data:${selectedEnterprise?.ContentType};base64,${selectedEnterprise?.Data}`}
                      alt={`Imagen-${selectedEnterprise?.FileName}`}
                      style={{
                        maxHeight: "80px",
                        minWidth: "80px",
                        borderRadius: "45px",
                      }}
                    />
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                        <span style={{ fontWeight: "bold", color: "#C6C6C6" }}>
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
                  const dataSelectedPerson = fecthClientes.data?.Result.find(
                    (client) => client.IdPersona === value
                  );

                  if (
                    dataSelectedPerson != undefined &&
                    dataSelectedPerson.YaEstaAsociado == false
                  ) {
                    setSelectedEnterprise(
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
                    setSelectedEnterprise(undefined);
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
                    if (selectedEnterprise != undefined) {
                      setDataEditPersona({
                        IdPersona: selectedEnterprise.IdPersona,
                        Nombres: selectedEnterprise.Nombres,
                        Apellidos: selectedEnterprise.Apellidos,
                        Cedula: selectedEnterprise.Cedula,
                        Telefono1: selectedEnterprise.Telefono1,
                        Telefono2: selectedEnterprise.Telefono2,
                        Correo: selectedEnterprise.Correo,
                        FechaDeNacimiento: selectedEnterprise.FechaDeNacimiento,
                        IdSexo: selectedEnterprise.IdSexo,
                        IdPais: selectedEnterprise.IdPais,
                        IdCiudad: selectedEnterprise.IdCiudad,
                        Direccion: selectedEnterprise.Direccion,

                        PersonaTiposPersona:
                          selectedEnterprise.PersonaTiposPersona,

                        DataImagenPersona: {
                          Imagen: {
                            IdImagen: selectedEnterprise.IdImagen || 0,
                            FileName: selectedEnterprise.FileName || "",
                            ContentType: selectedEnterprise.ContentType || "",
                            FileSize: selectedEnterprise.FileSize || 0,
                            Data: selectedEnterprise.Data as string,
                          },
                          PersonaImagen: {
                            IdImagen: selectedEnterprise.IdImagen as number,
                            IdPersona: selectedEnterprise.IdPersona,
                            IdPersonaImagen: selectedEnterprise.IdPersonaImagen,
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
                      selectedEnterprise != undefined ? "#398FFF" : "#CCCCCC"
                    }
                  />{" "}
                  <span
                    style={{
                      marginLeft: "5px",
                      color: `${
                        selectedEnterprise != undefined ? "#398FFF" : "#CCCCCC"
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
                    selectedEnterprise != undefined
                      ? message.info("se va cambiar")
                      : message.error("No ha seleccionado datos personales")
                  }
                >
                  <MdOutlinePersonSearch
                    color={
                      selectedEnterprise != undefined ? "#398FFF" : "#CCCCCC"
                    }
                  />
                  <span
                    style={{
                      marginLeft: "5px",
                      color: `${
                        selectedEnterprise != undefined ? "#398FFF" : "#CCCCCC"
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
            <span>{selectedEnterprise?.Nombres || "-"}</span>
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
              <span>{selectedEnterprise?.Cedula || "-"}</span>
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
              {selectedEnterprise?.FechaDeNacimiento
                ? dayjs(selectedEnterprise?.FechaDeNacimiento).format(
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
            <span>{selectedEnterprise?.Correo || "-"}</span>
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
              <span>{selectedEnterprise?.Telefono1 || "---"}</span>
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
            <span>{selectedEnterprise?.Telefono2 || "-"}</span>
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
            <span>{selectedEnterprise?.PaisNombre || "-"}</span>
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
                {selectedEnterprise?.CiudadNombre
                  ? truncateText(selectedEnterprise?.CiudadNombre || "", 10)
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
            <span>{selectedEnterprise?.SexoNombre || "-"}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px",
          boxShadow: " 0 4px 8px rgba(201, 219, 243, 0.3)",
          borderBottom: "0.1px solid #F0F0F5",
        }}
      >
        <div>
          <Button onClick={() => message.info("Limpiar campos")}>
            Cancelar
          </Button>
        </div>

        <div>
          <Button
            onClick={() => props.onBack({} as any, 2)}
            style={{ marginRight: "10px" }}
          >
            Atras
          </Button>
          <Button onClick={() => props.onSuccess({} as any, 2)}>
            Siguiente
          </Button>
        </div>
      </div>
    </ContainerFormAntd>
  );
}

{
  /*

        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px",
          boxShadow: " 0 4px 8px rgba(201, 219, 243, 0.3)",
          borderBottom: "0.1px solid #F0F0F5",
        }}
      >
        <div>
          <Button onClick={() => message.info("Limpiar campos")}>
            Cancelar
          </Button>
        </div>

        <div>
          <Button
            onClick={() => props.onBack({} as any, 2)}
            style={{ marginRight: "10px" }}
          >
            Atras
          </Button>
          <Button onClick={() => props.onSuccess({} as any, 2)}>
            Siguiente
          </Button>
        </div>
      </div>

  */
}
