import { Modal, Form, Input, Select, DatePicker, InputNumber } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { Btnbox, ButtonSave, Container } from "../../../../components";
import { IoExtensionPuzzleOutline, IoNuclear } from "react-icons/io5";

import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function ModalTarea({
  isModalOpen,
  CloseModal,
  setTarea,
  tarea,
}) {
  ModalTarea.propTypes = {
    isModalOpen: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    setTarea: PropTypes.array.isRequired,
    tarea: PropTypes.array.isRequired,
  };
  const [seeState, setSee] = useState(true);

  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [form] = Form.useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleChangeCantidad = (value) => {
    setCantidad(value);
    form.setFieldsValue({
      Total: value * precio,
    });
  };

  const handleChangePrecio = (value) => {
    setPrecio(value);
    form.setFieldsValue({
      Total: cantidad * value,
    });
  };

  const onFinish = (data) => {
    const idUnico = uuidv4();
    const fechaInicio = dayjs(data.Fechas[0].$d).format("DD-MM-YYYY");
    const fechaFinal = dayjs(data.Fechas[1].$d).format("DD-MM-YYYY");
    let datos = {
      ...data,
      id: idUnico,
      FechaInicio: fechaInicio,
      FechaFinal: fechaFinal,
    };
    console.log(datos);
    setTarea([...tarea, datos]);
  };
  const dateFormat = "YYYY/MM/DD";
  return (
    <>
      {" "}
      <Modal open={isModalOpen} footer={null} width={900} onCancel={CloseModal}>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 30 }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btnbox
              color={seeState == true ? true : false}
              style={{ margin: 0, width: 200, borderRadius: "12px  0 0  12px" }}
              onClick={() => {
                setSee(true);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Tarea basica</span>
                <IoExtensionPuzzleOutline size={22} />
              </div>
            </Btnbox>
            <Btnbox
              color={seeState == false ? true : false}
              style={{
                margin: 0,
                width: 200,
                borderRadius: "0  12px 12px  0px",
              }}
              onClick={() => {
                setSee(false);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Tarea avanzada</span>
                <IoNuclear size={22} />
              </div>
            </Btnbox>
          </div>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {seeState == true ? (
              <>
                <h3> Tarea basica</h3>

                <Container>
                  <Form.Item
                    label={<strong>Servicio</strong>}
                    name={"Servicio"}
                    rules={[
                      {
                        required: true,
                        message: "No hay prioridad",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 250,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "6",
                          label: "Garantía de Transferencia de conocimiento",
                        },
                        {
                          value: "5",
                          label: "Virtualización, Cluster, NAS",
                        },
                        {
                          value: "4",
                          label: "Documentación y Gestión de Infraestructura",
                        },
                        {
                          value: "3",
                          label: "Optimización y Seguridad de Redes",
                        },
                        {
                          value: "2",
                          label: "Soporte Técnico Remoto y en Sitio",
                        },
                        {
                          value: "1",
                          label: "Asesoría de Personal en el Departamento TIC",
                        },
                      ]}
                    />
                  </Form.Item>
                </Container>
                <Container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 0,
                    width: "100%",
                    justifyContent: "space-between",
                    paddingRight: 100,
                  }}
                >
                  <Form.Item
                    label={<strong>Prioridad</strong>}
                    name={"Prioridad"}
                    rules={[
                      {
                        required: true,
                        message: "No hay prioridad",
                      },
                    ]}
                  >
                    <Select
                      defaultValue="1"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "3",
                          label: "Alta",
                        },
                        {
                          value: "2",
                          label: "Media",
                        },
                        {
                          value: "1",
                          label: "Baja",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<strong>Titulo</strong>}
                    name={"Titulo"}
                    rules={[
                      {
                        required: true,
                        message: "Debe ingresar el nombre del producto",
                      },
                      {
                        max: 40,
                        message: "40 caracteres como máximo",
                      },
                    ]}
                  >
                    <Input placeholder="Ingrese el titulo" />
                  </Form.Item>

                  <Form.Item
                    label={<strong>Precio</strong>}
                    name={"Precio"}
                    rules={[
                      {
                        required: true,
                        message: "No hay precio",
                      },
                    ]}
                  >
                    <InputNumber
                      defaultValue={0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      style={{ width: 100 }}
                    />
                  </Form.Item>
                </Container>
                <Container
                  style={{
                    display: "flex",
                    marginTop: 0,
                    paddingTop: 0,
                    width: "100%",
                  }}
                >
                  <Form.Item
                    label={<strong>Fechas</strong>}
                    name={"Fechas"}
                    rules={[
                      {
                        required: true,
                        message: "No hay fecha",
                      },
                    ]}
                  >
                    <RangePicker format={dateFormat} />
                  </Form.Item>
                </Container>
                <Container
                  style={{ marginTop: 0, paddingTop: 0, width: "100%" }}
                >
                  <Form.Item
                    label={<strong>Descripcion</strong>}
                    name={"Descripcion"}
                    rules={[
                      {
                        required: true,
                        message: "No hay descripcion",
                      },
                      {
                        max: 400,
                        message: "400 caracteres como máximo",
                      },
                    ]}
                  >
                    <TextArea placeholder="Explica esta tarea para los colaboradores" />
                  </Form.Item>
                </Container>
                <ButtonSave>Crear tarea</ButtonSave>
              </>
            ) : (
              <>
                <h3> Tarea avanzada</h3>
                <Container>
                  <Form.Item
                    label={<strong>Servicio</strong>}
                    name={"Servicio"}
                    rules={[
                      {
                        required: true,
                        message: "No hay prioridad",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 250,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "6",
                          label: "Garantía de Transferencia de conocimiento",
                        },
                        {
                          value: "5",
                          label: "Virtualización, Cluster, NAS",
                        },
                        {
                          value: "4",
                          label: "Documentación y Gestión de Infraestructura",
                        },
                        {
                          value: "3",
                          label: "Optimización y Seguridad de Redes",
                        },
                        {
                          value: "2",
                          label: "Soporte Técnico Remoto y en Sitio",
                        },
                        {
                          value: "1",
                          label: "Asesoría de Personal en el Departamento TIC",
                        },
                      ]}
                    />
                  </Form.Item>
                </Container>

                <Container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 0,
                    width: "100%",
                  }}
                >
                  <Form.Item
                    label={<strong>Prioridad</strong>}
                    name={"Prioridad"}
                    style={{
                      paddingRight: 100,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "No hay prioridad",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "3",
                          label: "Alta",
                        },
                        {
                          value: "2",
                          label: "Media",
                        },
                        {
                          value: "1",
                          label: "Baja",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<strong>Titulo</strong>}
                    name={"Titulo"}
                    rules={[
                      {
                        required: true,
                        message: "No hay titulo",
                      },
                      {
                        max: 55,
                        message: "55 caracteres como máximo",
                      },
                      {
                        min: 3,
                        message: "30 caracteres como minimo",
                      },
                    ]}
                  >
                    <Input placeholder="Ingrese el titulo" />
                  </Form.Item>
                </Container>

                <Container
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: 0,
                    width: "100%",
                    justifyContent: "space-between",
                    paddingRight: 100,
                  }}
                >
                  <Form.Item
                    label={<strong>Parametro</strong>}
                    name={"Parametro"}
                    rules={[
                      {
                        required: true,
                        message: "No hay parametro",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "1",
                          label: "metro",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<strong>Cantidad</strong>}
                    name={"Cantidad"}
                    rules={[
                      {
                        required: true,
                        message: "No hay cantidad",
                      },
                    ]}
                  >
                    <InputNumber onChange={handleChangeCantidad} />
                  </Form.Item>

                  <Form.Item
                    label={<strong>Precio</strong>}
                    name={"Costo"}
                    rules={[
                      {
                        required: true,
                        message: "No hay precio",
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={handleChangePrecio}
                      defaultValue={0}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      style={{ width: 100 }}
                    />
                  </Form.Item>
                  <Form.Item
                    label={<strong>Total</strong>}
                    name={"Total"}
                    rules={[
                      {
                        required: true,
                        message: "No hay total",
                      },
                    ]}
                  >
                    <InputNumber
                      readOnly
                      defaultValue={0}
                      style={{ width: 100 }}
                    />
                  </Form.Item>
                </Container>

                <Container
                  style={{ marginTop: 0, paddingTop: 0, width: "100%" }}
                >
                  <Form.Item
                    label={<strong>Fechas</strong>}
                    name={"Fechas"}
                    rules={[
                      {
                        required: true,
                        message: "No hay fecha",
                      },
                    ]}
                  >
                    <RangePicker format="DD-MM-YYYY" />
                  </Form.Item>
                </Container>
                <Container
                  style={{ marginTop: 0, paddingTop: 0, width: "100%" }}
                >
                  <Form.Item
                    label={<strong>Descripcion</strong>}
                    name={"Descripcion"}
                    rules={[
                      {
                        required: true,
                        message: "No hay descripcion",
                      },
                      {
                        max: 55,
                        message: "55 caracteres como máximo",
                      },
                      {
                        min: 3,
                        message: "30 caracteres como minimo",
                      },
                    ]}
                  >
                    <TextArea placeholder="Ingresa la descripcion" />
                  </Form.Item>
                </Container>
                <ButtonSave>Crear tarea</ButtonSave>
              </>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}
