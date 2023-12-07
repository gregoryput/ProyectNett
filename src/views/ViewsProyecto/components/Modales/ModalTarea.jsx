import { Modal, Form, Input, Select, DatePicker, InputNumber } from "antd";
import PropTypes from "prop-types";
import { Btnbox, ButtonSave, Container } from "../../../../components";
import { IoExtensionPuzzleOutline, IoNuclear } from "react-icons/io5";
import dayjs from "dayjs";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function ModalTarea({
  isModalOpen,
  CloseModal,
  setTarea,
  tarea,
  value,
  selectEdit,
  setSelectEdit,
}) {
  ModalTarea.propTypes = {
    isModalOpen: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    tarea: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired,
    selectEdit: PropTypes.array.isRequired,
    setSelectEdit: PropTypes.func.isRequired,
  };
  const [seeState, setSee] = useState(true);

  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [form] = Form.useForm();

  useEffect(() => {
    Editar();
  });

  const Editar = () => {
    if (selectEdit !== null && selectEdit !== undefined) {
      form.setFieldsValue({
        Servicio: selectEdit[0]?.Servicio,
        Prioridad: selectEdit[0]?.Prioridad,
        Titulo: selectEdit[0]?.Titulo,
        Descripcion: selectEdit[0]?.Descripcion,
        Precio: selectEdit[0]?.Precio,
        Costo: selectEdit[0]?.Costo,
        Cantidad: selectEdit[0]?.Cantidad,
        Total: selectEdit[0]?.Total,
        Parametro: selectEdit[0]?.Parametro,
        Fechas: selectEdit[0]?.Fechas,
      });
      if (selectEdit[0]?.Costo != null && selectEdit[0]?.Costo != undefined) {
        setSee(false);
      }
    }
  };

  const handleChangeCantidad = (value) => {
    setCantidad(value);
    form.setFieldsValue({
      Total: value * precio,
    });
  };

  const handleCloses = () => {
    setSee(true);

    CloseModal();
    form.resetFields([
      "Servicio",
      "Prioridad",
      "Titulo",
      "Descripcion",
      "Precio",
      "Costo",
      "Cantidad",
      "Total",
      "Parametro",
    ]);
    setSelectEdit(null);
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

    if (selectEdit == null) {
      let datos = {
        ...data,
        id: idUnico,
        FechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
      };
      setTarea([...tarea, datos]);
    } else {
      const filtrado = tarea.filter((valor) => valor.id !== selectEdit[0]?.id);

      let datos = {
        ...data,
        id: idUnico,
        FechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
      };
      setTarea([...filtrado, datos]);
    }

    handleCloses();
  };
  const dateFormat = "DD-MM-YYYY";

  const opciones = value.map((dato) => ({
    value: dato,
    label:
      dato === "1"
        ? "Asesoría de Personal en el Departamento TIC"
        : dato === "2"
        ? "Soporte Técnico Remoto y en Sitio"
        : dato === "3"
        ? "Optimización y Seguridad de Redes"
        : dato === "4"
        ? "Documentación y Gestión de Infraestructura"
        : dato === "5"
        ? "Virtualización, Cluster, NAS"
        : dato === "6"
        ? "Garantía de Transferencia de Conocimiento"
        : null,
  }));

  return (
    <>
      {" "}
      <Modal
        open={isModalOpen}
        footer={null}
        width={900}
        onCancel={handleCloses}
      >
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 30 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Tarea</h2>
           {selectEdit == null ? 
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Btnbox
              color={seeState == true ? true : false}
              style={{
                margin: 0,
                width: 200,
                borderRadius: "12px  0 0  12px",
              }}
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
          </div> : null
          }
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
                <Container style={{ margin: 0, padding: 20 }}>
                  <Form.Item
                    label={<strong>Servicios</strong>}
                    name={"Servicio"}
                    rules={[
                      {
                        required: true,
                        message: "No hay servicio",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 450,
                      }}
                      options={opciones}
                      placeholder={"Seleccionar Servicio"}
                      allowClear
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
                      placeholder={"Seleccionar prioridad"}
                      style={{
                        width: 120,
                      }}
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
                        max: 40,
                        message: "40 caracteres como máximo",
                      },
                    ]}
                  >
                    <Input placeholder="Escriba el titulo" />
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
                      min={1}
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
                    label={<strong>Duración</strong>}
                    name={"Fechas"}
                    rules={[
                      {
                        required: true,
                        message: "No hay fechas",
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
                    label={<strong>Descripción</strong>}
                    name={"Descripcion"}
                    rules={[
                      {
                        required: true,
                        message: "No hay descripción",
                      },
                      {
                        max: 400,
                        message: "400 caracteres como máximo",
                      },
                    ]}
                  >
                    <TextArea placeholder="Describe la tarea" />
                  </Form.Item>
                </Container>
                <ButtonSave>Crear tarea</ButtonSave>
              </>
            ) : (
              <>
                <Container style={{ margin: 0, padding: 20 }}>
                  <Form.Item
                    label={<strong>Servicio</strong>}
                    name={"Servicio"}
                    rules={[
                      {
                        required: true,
                        message: "No hay servicio",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 450,
                      }}
                      options={opciones}
                      placeholder={"Seleccionar Servicio"}
                      allowClear
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
                      placeholder={"Seleccionar prioridad"}
                      style={{
                        width: 120,
                      }}
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
                        max: 400,
                        message: "400 caracteres como máximo",
                      },
                    ]}
                  >
                    <Input placeholder="Escribe el titulo" />
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
                      options={[
                        {
                          value: "1",
                          label: "metro",
                        },
                      ]}
                      placeholder={"Seleccionar paramentro"}
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
                    <InputNumber
                      min={1}
                      defaultValue={0}
                      onChange={handleChangeCantidad}
                    />
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
                      min={1}
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
                    defaultValue={0}
                    name={"Total"}
                    rules={[
                      {
                        required: true,
                        message: "No hay total",
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
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
                    label={<strong>Duración</strong>}
                    name={"Fechas"}
                    rules={[
                      {
                        required: true,
                        message: "No hay fechas",
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
                    label={<strong>Descripción</strong>}
                    name={"Descripcion"}
                    rules={[
                      {
                        required: true,
                        message: "No hay descripción",
                      },
                      {
                        max: 400,
                        message: "400 caracteres como máximo",
                      },
                    ]}
                  >
                    <TextArea placeholder="Describe la tarea" />
                  </Form.Item>
                </Container>
                <ButtonSave type="submit">Crear tarea</ButtonSave>
              </>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
}
