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
import {
  BtnSelectPeron,
  ContainerPrincipalNoImage,
  DivAreaFoto,
  DivColumnInfOne,
  DivColumnThree,
  DivColumnTwo,
  DivContainerAreaFoto,
  DivContainerButtonsSelectPerson,
  DivContainerColumnPersonalInfo,
  DivContainerFotoClient,
  DivContainerInputSelectPerson,
  DivContainerItemsColumnsInfo,
  DivContainerTitleColumn,
  DivIconNoImage,
  DivItemInfo,
  DivLabelSelectPerson,
  DivPrincipalContainerColumns,
  DivSelectedPerson,
  DivTextNoImage,
  H3TitleColumn,
  SpanNoImage,
  StyledImageAntd,
} from "./form-clientes-pdf.styled";

import { MdLiveHelp } from "react-icons/md";

import { FaAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGetPersonasIfoPersonalQuery } from "../../../redux/Api/personasApi";
import { IPersona, PersonaInfoPersonalDTO } from "../../../interfaces";
import dayjs from "dayjs";
import { useCreateEntitieMutation } from "../../../redux/Api/entitiesApi";
import toast from "react-hot-toast";
import { DefaultOptionType } from "antd/es/select";

interface IFormClientesProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormClientsPersonsFi = (props: IFormClientesProps) => {
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
  };

  // Funcion Onchange Del Input Select Person:
  const OnChangeInputSelectPerso = (value: number | null) => {
    const dataSelectedPerson = fecthClientes.data?.Result.find(
      (client) => client.IdPersona === value
    );

    if (
      dataSelectedPerson != undefined &&
      dataSelectedPerson.YaEstaAsociado == false
    ) {
      setSelectedPerson(
        fecthClientes.data?.Result.find((client) => client.IdPersona === value)
      );

      setIdPersona(value);
    } else {
      toast.error("La persona seleccionada ya está asociada a un cliente");
      form.setFieldValue("IdPersona", null);
      form.resetFields();
      setIdPersona(null);
      setSelectedPerson(undefined);
    }
  };

  // Función de filtro
  const customFilterOption = (
    input: string,
    option: DefaultOptionType | undefined
  ): boolean => {
    return option
      ? option.label
          ?.toString()
          ?.toLowerCase()
          ?.includes(input.toLowerCase()) ?? false
      : false;
  };

  // Funcion OnClick Editar Persona seleccionada:
  const HandleClickEditPerson = () => {
    if (selectedPerson != undefined) {
      setDataEditPersona({
        IdPersona: selectedPerson.IdPersona,
        Nombres: selectedPerson.Nombres,
        Apellidos: selectedPerson.Apellidos,
        Cedula: selectedPerson.Cedula,
        Telefono1: selectedPerson.Telefono1,
        Telefono2: selectedPerson.Telefono2,
        Correo: selectedPerson.Correo,
        FechaDeNacimiento: selectedPerson.FechaDeNacimiento,
        IdSexo: selectedPerson.IdSexo,
        IdPais: selectedPerson.IdPais,
        IdCiudad: selectedPerson.IdCiudad,
        Direccion: selectedPerson.Direccion,

        PersonaTiposPersona: selectedPerson.PersonaTiposPersona,

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
            IdPersonaImagen: selectedPerson.IdPersonaImagen,
          },
        },
      });
      setOpenModalFP(true);
    } else {
      message.info("no ha seleccionado ninguna persona");
      setDataEditPersona(undefined);
      setOpenModalFP(true);
    }
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
          </>
        ) : (
          <ContainerFormAntd
            layout={"vertical"}
            onFinish={dataSubmit}
            form={form}
          >
            {/* 1 - ************************** CONTENEDOR PRINCIPAL (Contiene las dos columnas (Info Personal e Info de recnocimiento)) ************************** */}
            <DivPrincipalContainerColumns>
              {/* 1.1 - ********** Columna Info personal: ************************** */}
              <DivContainerColumnPersonalInfo>
                {/* A - - -------- Contener del titulo de la columna: ---------------- */}
                <DivContainerTitleColumn>
                  <H3TitleColumn>
                    Información personal del cliente
                  </H3TitleColumn>
                </DivContainerTitleColumn>

                {/* B ---------- Contenedor principal de la info personal (1 - Select de cedula-nombre con foto y PequeñasColumnas para mostrar la info del seleccionado): ---------------- */}
                <DivSelectedPerson>
                  {/* B.1 --- Contenedor de la pequenia parte de la foto: ---------------- */}
                  <DivContainerFotoClient>
                    <Form.Item name={"fotoCliente"}>
                      <DivContainerAreaFoto>
                        <DivAreaFoto>
                          {selectedPerson?.Data != null &&
                          selectedPerson?.Data != undefined &&
                          IdPersona != null ? (
                            <StyledImageAntd
                              src={`data:${selectedPerson?.ContentType};base64,${selectedPerson?.Data}`}
                              alt={`Imagen-${selectedPerson?.FileName}`}
                            />
                          ) : (
                            <ContainerPrincipalNoImage>
                              <DivIconNoImage>
                                <MdImageNotSupported
                                  size={25}
                                  color="#90BFD9"
                                />
                              </DivIconNoImage>
                              <DivTextNoImage>
                                <SpanNoImage>No img</SpanNoImage>
                              </DivTextNoImage>
                            </ContainerPrincipalNoImage>
                          )}
                        </DivAreaFoto>
                      </DivContainerAreaFoto>
                    </Form.Item>
                  </DivContainerFotoClient>

                  {/* B.2 --- Contenedor del Input Select Persona: ---------------- */}
                  <DivContainerInputSelectPerson>
                    <Form.Item
                      style={{
                        width: "100%",
                      }}
                      name={"IdPersona"}
                      label={
                        <DivLabelSelectPerson>
                          <strong style={{ marginRight: "10px" }}>
                            Cédula - Nombre
                          </strong>{" "}
                          <MdHelpOutline size={20} color={"#D4D4D8"} />
                        </DivLabelSelectPerson>
                      }
                    >
                      <Select
                        showSearch
                        allowClear
                        filterOption={(input, option) =>
                          customFilterOption(input, option)
                        }
                        options={[
                          { value: null, label: " 0 -> Sin representante" },
                          ...(fecthClientes.data?.Result?.map((client) => ({
                            value: client.IdPersona,
                            label: `${client.Cedula} - ${client.Nombres} ${client.Apellidos}`,
                          })) || []),
                        ]}
                        placeholder="Seleccionar cliente"
                        onChange={(value: number | null) => OnChangeInputSelectPerso(value)}
                      />
                      <DivContainerButtonsSelectPerson>
                        {/*BOTON NUEVO ---------------------------------------------------------*/}
                        <BtnSelectPeron onClick={() => setOpenModalFP(true)}>
                          <FaAddressCard />{" "}
                          <span style={{ marginLeft: "5px" }}>Nuevo</span>
                        </BtnSelectPeron>

                        {/*BOTON EDITAR ---------------------------------------------------------*/}
                        <BtnSelectPeron onClick={() => HandleClickEditPerson()}>
                          <FaUserEdit
                            color={
                              selectedPerson != undefined
                                ? "#398FFF"
                                : "#CCCCCC"
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
                        </BtnSelectPeron>

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
                              selectedPerson != undefined
                                ? "#398FFF"
                                : "#CCCCCC"
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
                      </DivContainerButtonsSelectPerson>
                    </Form.Item>
                  </DivContainerInputSelectPerson>
                </DivSelectedPerson>

                {/* C ---------- Contenedor de las PequeñasColumnas para mostrar la info del seleccionado: ---------------- */}
                <DivContainerItemsColumnsInfo>
                  {/* -------------------- PRIMERA COLUMNA -------------------- */}
                  <DivColumnInfOne>
                    {/* ------------------------ ------------------------ ------------------------ */}
                    <DivItemInfo>
                      <strong>Nombre completo: </strong>
                      <span>
                        {truncateText(
                          selectedPerson
                            ? `${selectedPerson.Nombres} ${selectedPerson.Apellidos}`
                            : "N/A",
                          21
                        )}
                      </span>
                    </DivItemInfo>

                    {/* ------------------------ ------------------------ ------------------------ */}
                    <DivItemInfo>
                      <strong>Correo Eléctronico: </strong>
                      <span>
                        {truncateText(
                          selectedPerson ? `${selectedPerson.Correo}` : "N/A",
                          25
                        )}
                      </span>
                    </DivItemInfo>

                    {/* ------------------------ ------------------------ ------------------------ */}
                    <DivItemInfo>
                      <strong>País de residencia: </strong>
                      <span>
                        {truncateText(
                          selectedPerson ? `${selectedPerson.Correo}` : "N/A",
                          25
                        )}
                      </span>
                    </DivItemInfo>
                  </DivColumnInfOne>

                  {/* -------------------- SEGUNDA COLUMNA -------------------- */}
                  <DivColumnTwo>
                    {/* ----------*/}
                    <DivItemInfo>
                      <strong>Cédula: </strong>
                      <span>
                        {truncateText(
                          selectedPerson ? `${selectedPerson.Cedula}` : "N/A",
                          40
                        )}
                      </span>
                    </DivItemInfo>

                    {/* ----------*/}
                    <DivItemInfo>
                      <strong>Télefono 1: </strong>
                      <span>
                        {truncateText(
                          selectedPerson
                            ? `${selectedPerson.Telefono1}`
                            : "N/A",
                          23
                        )}
                      </span>
                    </DivItemInfo>

                    {/* -------*/}
                    <DivItemInfo>
                      <strong>Teléfono 2: </strong>
                      <span>
                        {truncateText(
                          selectedPerson
                            ? `${selectedPerson.Telefono2}`
                            : "N/A",
                          23
                        )}
                      </span>
                    </DivItemInfo>
                  </DivColumnTwo>

                  {/* -------------------- TERCERA COLUMNA -------------------- */}
                  <DivColumnThree>
                    {/* ------------------------ ------------------------ ------------------------ */}
                    <DivItemInfo>
                      <strong>Fecha nacimiento: </strong>
                      <span>
                        {selectedPerson
                          ? dayjs(selectedPerson.FechaDeNacimiento).format(
                              "DD/MM/YYYY"
                            )
                          : "N/A"}
                      </span>
                    </DivItemInfo>

                    {/* ------------- */}
                    <DivItemInfo>
                      <strong>Sexo: </strong>
                      <span>
                        {truncateText(
                          selectedPerson
                            ? `${selectedPerson.SexoNombre}`
                            : "N/A",
                          23
                        )}
                      </span>
                    </DivItemInfo>

                    {/* ------------- */}
                    <DivItemInfo>
                      <strong>Ciudad: </strong>
                      <span>
                        {truncateText(
                          selectedPerson
                            ? `${selectedPerson.CiudadNombre}`
                            : "N/A",
                          23
                        )}
                      </span>
                    </DivItemInfo>
                  </DivColumnThree>
                </DivContainerItemsColumnsInfo>
              </DivContainerColumnPersonalInfo>

              {/* 1.2 - ********** Columna Info de reconocimiento: ************************** */}
              <div style={{ marginTop: "15px", width: "48%" }}>
                {/* CONTAINER HIJO - ********** Contiene el parrafo de explicacion y los campos de indentificacion: ************************** */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  {/* A - ------- Titulo de la columna: --------------------- */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "20px",
                      width: "100%",
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
                      Información para la entidad cliente
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <MdLiveHelp size={40} />
                    </div>
                    {/* B - ------- Parrafo de explicacion: --------------------- */}
                    <div style={{ marginBottom: "20px" }}>
                      <p style={{ textAlign: "center" }}>
                        Esta info permite identificar de forma única a cada
                        cliente en el sistema. Todos los clientes deben tener
                        esta indentificación. Esta distribución permite mantener
                        la integridad y evitar la duplicidad de datos.
                      </p>
                    </div>

                    {/* C - ------- Campos de indentificacion: --------------------- */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignSelf: "flex-end",
                      }}
                    >
                      <Form.Item
                        name={"NombreEntidad"}
                        label={
                          <strong>Nombre de entidad:</strong>
                        }
                        style={{ width: "48%" }}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name={"Codigo"}
                        label={<strong>Código del cliente:</strong>}
                        style={{ width: "48%" }}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name={"FechaInicioCliente"}
                        label={<strong>Fecha de inicio cliente:</strong>}
                        style={{ width: "48%" }}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        name={"IdRepresentante"}
                        label={<strong>Representante del cliente:</strong>}
                        style={{ width: "48%" }}
                      >
                        <Select
                          showSearch
                          allowClear
                          filterOption={(input, option) =>
                            customFilterOption(input, option)
                          }
                          options={[
                            { value: null, label: " 0 -> Sin representante" }, // Agregar la opción 'Sin representante' al principio
                            ...(fecthClientes.data?.Result?.map((client) => ({
                              value: client.IdPersona,
                              label: `${client.Cedula} - ${client.Nombres} ${client.Apellidos}`,
                            })) || []),
                          ].filter(
                            (op) => op.value !== selectedPerson?.IdPersona
                          )}
                          placeholder="Seleccionar una persona de contacto"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </DivPrincipalContainerColumns>

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

export default FormClientsPersonsFi;
