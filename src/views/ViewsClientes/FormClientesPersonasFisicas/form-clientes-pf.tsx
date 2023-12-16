import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Tooltip,
  UploadFile,
  message,
} from "antd";
import {
  ContainerForm,
  ContainerFormAntd,
  ModalFormPerson,
} from "../../../components";
import { OutsideClick } from "outsideclick-react";

import { MdImageNotSupported, MdHelpOutline } from "react-icons/md";
import { DivAreaFoto } from "./steps.styled";
import { RcFile } from "antd/es/upload";

import { FaAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useGetPersonasIfoPersonalQuery } from "../../../redux/Api/personasApi";

interface IFormClientesProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormClientsPersonsFi = (props: IFormClientesProps) => {
  const [animacion, setAnimacion] = React.useState<boolean>(false);

  const [fileList, setFileList] = React.useState<UploadFile<any>[]>(
    [] as UploadFile<any>[]
  );

  const fecthClientes = useGetPersonasIfoPersonalQuery();

  const [openModalFP, setOpenModalFP] = React.useState<boolean>(false);

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

  return (
    <ContainerForm
      animacion={animacion}
      display={props.toggle}
      layout={"vertical"}
    >
      <OutsideClick>
        <ContainerFormAntd layout={"vertical"}>
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
                name={"nombreEntidad"}
                label={<strong>Nombre de identificación (opcional):</strong>}
                style={{ width: "29%" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"codigoCliente"}
                label={<strong>Código del cliente:</strong>}
                style={{ width: "29%" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"fechaInicioCliente"}
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
                      {fileList.length > 0 ? (
                        <Image
                          src={URL.createObjectURL(
                            fileList[0].originFileObj as RcFile
                          )}
                          alt={`Imagen-${fileList[0].fileName}`}
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
                  name={"idPersona"}
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
                    options={fecthClientes.data?.Result.map((client) => ({
                      value: client.IdPersona,
                      label: client.Nombres + " " + client.Apellidos,
                    }))}
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
                <span>Juan Andres Cesar Jimenez</span>
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
                  <span style={{}}>849-123-1414</span>
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
                <span>26-02-2001</span>
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
                <span>juanjim123@gmail.com</span>
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
                  <span>121-112-2424</span>
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
                <span>121-112-2424</span>
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
                <span>Republica Dominicana</span>
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
                  <span>Hato Mayor</span>
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
                <span>Masculino</span>
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
              <Button>Guardar</Button>
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
