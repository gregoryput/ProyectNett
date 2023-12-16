import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Select,
  StepProps,
  message,
} from "antd";
import { ContainerFormAntd } from "../../../../components";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

interface IStep3EmpresasProps {
  setItemsSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  onSuccess: () => void;
  onBack: (dataBack: any, step: any) => void;
  data: any;
}

const aux = false;

export default function Step3Empresas(props: IStep3EmpresasProps) {
  const onChangeCollapse = () => {
    console.log("Cambio");
  };

  return (
    <ContainerFormAntd layout={"vertical"}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChangeCollapse}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {fields.map(({ key, name, ...restField }) => (
                <Collapse.Panel
                  header={renderHeaderPanel(() => remove(name))}
                  key={key}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <h3
                        style={{
                          width: "100%",
                          background: "#5592E7",
                          borderRadius: "8px",
                          textAlign: "center",
                          color: "white",
                          marginRight: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        Información de la sucursal:
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          flexWrap: "wrap",
                        }}
                      >
                        <Form.Item
                          {...restField}
                          label={<strong>Sucursal:</strong>}
                          name={[name, "nombre:"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                          style={{ width: "30%" }}
                        >
                          <Input placeholder="First Name" size="small" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label={<strong>País</strong>}
                          name={[name, "pais:"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                          style={{ width: "34.2%" }}
                        >
                          <Select
                            placeholder="First Name"
                            size="small"
                            options={[
                              { label: "Republica Dominicana", value: "1" },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label={<strong>Ciudad:</strong>}
                          name={[name, "idCiudad:"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                          style={{ width: "34.2%" }}
                        >
                          <Select
                            placeholder="First Name"
                            size="small"
                            options={[{ label: "Hato Mayor", value: "2" }]}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          label={<strong>Mas detalles de la sucursal:</strong>}
                          name={[name, "detalles:"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                          style={{ width: "100%" }}
                        >
                          <TextArea size="small" />
                        </Form.Item>
                      </div>
                    </div>

                    <div style={{ width: "48%" }}>
                      <h3
                        style={{
                          width: "100%",
                          background: "#5592E7",
                          borderRadius: "8px",
                          textAlign: "center",
                          color: "white",
                          marginRight: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        Representante de la sucursal:
                      </h3>
                      <div style={{ width: "100%", marginTop: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div
                            style={{
                              width: "105px",
                              height: "94px",
                              border: "2px solid #8CBCD6",
                            }}
                          ></div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "3px",
                              }}
                            >
                              <strong>Nombre:</strong>
                              {aux ? (
                                <Select
                                  size="small"
                                  style={{ minWidth: "320px" }}
                                />
                              ) : (
                                <span>Juan Andres Cesar Jimenez</span>
                              )}
                            </div>
                            <div style={{ marginBottom: "3px" }}>
                              <strong>Cédula:</strong>
                              <span>402-1543-1013</span>
                            </div>
                            <div style={{ marginBottom: "3px" }}>
                              <strong>Teléfono:</strong>
                              <span>829-013-2020</span>
                            </div>
                            <div style={{ marginBottom: "3px" }}>
                              <strong>Correo:</strong>
                              <span>juanjim@gmail.com</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <a> - Ver más</a>
                          <a> - Cambiar</a>
                          <a> - Registrar nuevo</a>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <Checkbox style={{ marginRight: "4px" }} />
                          <span>Escoger al representante principal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  marginTop: "25px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span>-</span>
                <span>Agregar sucursal</span>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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
            Limpiar campos
          </Button>
        </div>

        <div>
          <Button
            onClick={() => props.onBack({} as any, 3)}
            style={{ marginRight: "10px" }}
          >
            Atras
          </Button>
          <Button onClick={() => props.onSuccess()}>Guardar</Button>
        </div>
      </div>
    </ContainerFormAntd>
  );
}

const renderHeaderPanel = (handleRemove: () => void) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong style={{ marginRight: "5px" }}>Nombre:</strong>
        <span>{"Sucursal San Pedro"}</span>
      </div>

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <MdDeleteOutline
            size={22}
            style={{ marginLeft: "10px" }}
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </div>
  );
};
