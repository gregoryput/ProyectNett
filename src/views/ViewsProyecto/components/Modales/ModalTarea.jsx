import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
} from "antd";
import PropTypes from "prop-types";
import { Btnbox, ButtonSave, Container } from "../../../../components";
import { IoExtensionPuzzleOutline, IoNuclear } from "react-icons/io5";
import { MdNewLabel } from "react-icons/md";


import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  useGetParametrosQuery,
  useGetPrioridadQuery,
} from "../../../../redux/Api/proyectoApi";
import ModalCrearParametro from "./ModalCrearParametroCosto";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function ModalTarea({
  isModalOpen,
  CloseModal,
  setTarea,
  tarea,
  serviciosfiltrado,
  selectEdit,
  setSelectEdit,
}) {
  ModalTarea.propTypes = {
    isModalOpen: PropTypes.func.isRequired,
    CloseModal: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    tarea: PropTypes.array.isRequired,
    serviciosfiltrado: PropTypes.array.isRequired,
    selectEdit: PropTypes.array.isRequired,
    setSelectEdit: PropTypes.func.isRequired,
  };
  const [seeState, setSee] = useState(true);
  const [prioridad, setPrioridad] = useState([]);
  const [Parametros, setParametros] = useState([]);

  const [Cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [openCreateParam, setOpenCreateParam] = useState("");
  const onCloseModalCreateParam = () => {
    setOpenCreateParam(false);
  };

  const [form] = Form.useForm();

  const {
    data: dataPrioridad,
    isSuccess: isPrioridadSuccess,
    // isLoading: isLoading,
  } = useGetPrioridadQuery("");
  const {
    data: dataParametros,
    isSuccess: isParametrosSuccess,
    // isLoading: isLoading,
  } = useGetParametrosQuery("");

  useEffect(() => {
    if (dataPrioridad?.Result !== undefined && isPrioridadSuccess) {
      setPrioridad(dataPrioridad?.Result);
    }
    if (dataParametros?.Result !== undefined && isParametrosSuccess) {
      setParametros(dataParametros?.Result);
    }
  }, [dataPrioridad, isPrioridadSuccess, dataParametros, isParametrosSuccess]);

  useEffect(() => {
    Editar();
  });

  const Editar = () => {
    if (selectEdit !== null && selectEdit !== undefined) {
      form.setFieldsValue({
        Servicio: selectEdit[0]?.Servicio,
        IdPrioridad: selectEdit[0]?.IdPrioridad,
        Titulo: selectEdit[0]?.Titulo,
        Descripcion: selectEdit[0]?.Descripcion,
        Precio: selectEdit[0]?.Precio,
        Costo: selectEdit[0]?.Costo,
        Cantidad: selectEdit[0]?.Cantidad,
        Total: selectEdit[0]?.Total,
        IdParametroCosto: selectEdit[0]?.IdParametroCosto,
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
      "IdPrioridad",
      "Titulo",
      "Descripcion",
      "Precio",
      "Costo",
      "Cantidad",
      "Total",
      "IdParametroCosto",
    ]);
    setSelectEdit([]);
  };

  const handleChangePrecio = (Value) => {
    setPrecio(Value);
    form.setFieldsValue({
      Total: Cantidad * Value,
    });
  };

  const onFinish = (data) => {
    const idUnico = uuidv4();
    const fechaInicio = data.Fechas[0].$d; //dayjs(data.Fechas[0].$d).format("DD-MM-YYYY");
    const fechaFinal = data.Fechas[1].$d; //dayjs(data.Fechas[1].$d).format("DD-MM-YYYY");

    const Prioridad = prioridad.filter(
      (f) => f.IdPrioridad == data.IdPrioridad
    );
    const Parametro = Parametros.filter(
      (f) => f.IdParametroCosto == data.IdParametroCosto
    );
    if (selectEdit == null) {
      let datos = {
        ...data,
        id: idUnico,
        FechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
        Prioridad: Prioridad[0]?.NombrePrioridad,
        Parametro: Parametro[0]?.NombreParametro,
      };
      setTarea([...tarea, datos]);
    } else {
      const filtrado = tarea.filter((valor) => valor.id !== selectEdit[0]?.id);

      let datos = {
        ...data,
        id: idUnico,
        FechaInicio: fechaInicio,
        FechaFinal: fechaFinal,
        Prioridad: Prioridad[0]?.NombrePrioridad,
        Parametro: Parametro[0]?.NombreParametro,
      };
      setTarea([...filtrado, datos]);
    }

    handleCloses();
  };
  const dateFormat = "DD-MM-YYYY";

  const opciones = serviciosfiltrado?.map((dato) => ({
    value: dato.IdServicio.toString(),
    label: dato.NombreServicio,
  }));

  const opciones2 = prioridad?.map((dato) => ({
    value: dato.IdPrioridad,
    label: dato.NombrePrioridad,
  }));

  const opciones3 = Parametros?.map((dato) => ({
    value: dato.IdParametroCosto,
    label: dato.NombreParametro,
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
            {selectEdit == null ? (
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
              </div>
            ) : null}
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
                    name={"IdPrioridad"}
                    rules={[
                      {
                        required: true,
                        message: "No hay prioridad",
                      },
                    ]}
                  >
                    <Select
                      options={opciones2}
                      placeholder={"Seleccionar prioridad"}
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
                    name={"IdPrioridad"}
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
                      options={opciones2}
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
                    flexWrap: "wrap",
                    margin: 0,
                    width: "100%",
                    justifyContent: "space-between",
                    paddingRight: 100,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "70%" }}>
                      <Form.Item
                        label={<strong>Parametro de costo</strong>}
                        name={"IdParametroCosto"}
                        rules={[
                          {
                            required: true,
                            message: "No hay parametro",
                          },
                        ]}
                      >
                        <Select
                          style={{
                            width: "100%",
                          }}
                          options={opciones3}
                          placeholder={"Seleccionar paramentro"}
                        />
                      </Form.Item>
                    </div>
                    <div style={{ width: "15%" }}>
                      <Button
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onClick={() => setOpenCreateParam(true)}
                      >
                        <MdNewLabel />
                        <span>Crear parametro de costo</span>
                      </Button>
                    </div>
                  </div>
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
      <ModalCrearParametro
        open={openCreateParam}
        onClose={onCloseModalCreateParam}
      />
    </>
  );
}
