import { DatePicker, Form, Input, Select } from "antd";

import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useEffect, useMemo } from "react";
import CountUp from "react-countup";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ModalCliente from "../Modales/ModalCliente";
import {
  BtnPro,
  ButtonIcon,
  Container,
  ContainerDetail,
} from "../../../../components";
import ComponentTarea from "../FormProyecto/TareaComponent";
import ProductoComponent from "../FormProyecto/ProductoComponent";
import EquipoComponent from "../FormProyecto/EquipoComponent";
import GastoExtrasComponent from "../FormProyecto/GastoExtrasComponent";
import { Colores } from "../../../../components/GlobalColor";
import dayjs from "dayjs";

import {
  useGetClienteProyectoQuery,
  useGetServicioQuery,
} from "../../../../redux/Api/proyectoApi";

export default function FormularioProyecto() {
  const [form] = Form.useForm();
  const formatter = (value) => <CountUp end={value} separator="," />;

  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    // isLoading: isLoading,
  } = useGetClienteProyectoQuery("");
  const {
    data: dataServicios,
    isSuccess: isServiciosSuccess,
    // isLoading: isLoading,
  } = useGetServicioQuery("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectStateCliente, setSelectStateCliente] = useState({});
  const [selectStateProducto, setSelectStateProducto] = useState([]);
  const [tarea, setTarea] = useState([]);

  // totales por productos, servicios, gasto adicionales
  const [totalServicios, setTotalServicios] = useState(0);
  const [totalProducto, setTotalProducto] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const totalGeneral = totalGasto + totalProducto + totalServicios;
  const [servicios, setServicios] = useState([]);
  const [serviciosfiltrado, setServiciosFiltrado] = useState([]);

  //esto es de treeselect de tipo de servicio
  const [value, setValue] = useState([]); // IDs de servicios seleccionados
  const selectProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    value,
    options: servicios.map((servicio) => ({
      label: servicio.nombreServicio,
      value: servicio.idServicio,
    })),
    onChange: (newValue) => {
      setValue(newValue);
      // Filtrar los servicios que coinciden con los nuevos valores seleccionados
      const nuevosServicios = servicios.filter((item) =>
        newValue.includes(item.idServicio)
      );
      setServiciosFiltrado( nuevosServicios);
    },
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };


  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = clientesData?.result.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };

  const obtenerFechaMasDistante = (tarea) => {
    // Obtener las fechas
    const fechas = tarea.map((fecha) => fecha?.Fechas[1].$d);

    // Encontrar la fecha más distante
    const fechaMasDistante = fechas.reduce((fechaDistante, fechaActual) => {
      return fechaActual > fechaDistante ? fechaActual : fechaDistante;
    }, fechas[0]);

    // Convertir la fecha más distante a un objeto dayjs
    const fechaMasDistanteDayjs = dayjs(fechaMasDistante);

    // Sumar dos semanas a la fecha más distante
    const fechaFinal = fechaMasDistanteDayjs.add(1, "week").toDate();

    return fechaFinal;
  };

  const fechafin = useMemo(() => {
    const resultado = obtenerFechaMasDistante(tarea);
    return new Date(resultado);
  }, [tarea]);

  const ClienteInput = (item) => {
    CloseModalCliente();
    setSelectStateCliente(item.idCliente);
    form.setFieldsValue({
      cliente: item.nombres.toLowerCase(),
      // Puedes agregar más campos según sea necesario
    });
  };

  const handleDateChange = (value) => {
    // 'value' es la fecha seleccionada
    setSelectedDate(value);
  };

  const OpenModalCliente = () => {
    setIsModalOpen(true);
  };

  const CloseModalCliente = () => {
    setIsModalOpen(false);
  };

  //guardar formulario
  const onFinish = (values) => {
    // Manejar el envío del formulario aquí
    console.log("Valores del formulario:", values);
  };
  const fecha = form.getFieldsValue(["FechaInicio"]);

  useEffect(() => {
    if (fecha != undefined) {
      setFechaInicio(dayjs(fecha?.FechaInicio).format("DD-MM-YYYY"));
    }
    if (fechafin != undefined) {
      setFechaFinal(dayjs(fechafin).format("DD-MM-YYYY"));
    }
  }, [fecha, fechafin]);

  useEffect(() => {
    if (clientesData?.result !== undefined && isClientsSuccess) {
      setFilteredData(clientesData?.result);
    }

    if (dataServicios?.result !== undefined && isServiciosSuccess) {
      setServicios(dataServicios?.result);
    }
  }, [
    clientesData,
    dataServicios,
    setFilteredData,
    isClientsSuccess,
    isServiciosSuccess,
  ]);

  return (
    <div style={{ width: "100%", marginTop: 0, margin: 0 }}>
      <ContainerDetail
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          form={form}
          onFinish={onFinish}
        >
          <Container
            style={{
              marginInline: 5,
              marginBlock: 5,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <h3>Servicios</h3>
            <div style={{ width: 400 }}>
              <Select {...selectProps} />
            </div>
          </Container>
          <Container style={{ marginInline: 5, marginBlock: 5, width: "100%" }}>
            <h3>Informacion basica</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label={<strong>Nombre:</strong>}
                style={{ width: 200, marginTop: 30 }}
                name={"nombre"}
                rules={[
                  {
                    required: true,
                    message: "Escriba el nombre del proyecto",
                  },
                  {
                    max: 55,
                    message: "55 caracteres como máximo",
                  },
                ]}
              >
                <Input placeholder="Ingrese el nombre" />
              </Form.Item>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item
                  label={<strong>Cliente:</strong>}
                  style={{ width: 200, marginTop: 30 }}
                  name={"cliente"}
                  rules={[
                    {
                      required: true,
                      message: "Seleccionar cliente",
                    },
                  ]}
                >
                  <Input
                    allowClear
                    readOnly
                    style={{ backgroundColor: "white" }}
                    placeholder="Seleccionar cliente"
                  />
                </Form.Item>
                <ButtonIcon
                  onClick={() => OpenModalCliente()}
                  style={{ width: 40, marginLeft: 10, marginTop: 37 }}
                  type="button"
                >
                  <IoPersonAddOutline size={18} color="black" />
                </ButtonIcon>
              </div>

              <Form.Item
                label={<strong>Fecha de inicio:</strong>}
                style={{ width: 300, marginTop: 30 }}
                name={"FechaInicio"}
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar fecha ",
                  },
                ]}
              >
                <DatePicker onChange={handleDateChange} format={"DD-MM-YYYY"} />
              </Form.Item>
            </div>

            <Form.Item
              label={<strong>Descripción:</strong>}
              style={{ width: 300, marginRight: 10 }}
              name={"Descripcion"}
              rules={[
                {
                  required: true,
                  message: "No hay descripción",
                },
                {
                  max: 60,
                  message: "60 caracteres como máximo",
                },
              ]}
            >
              <TextArea placeholder="Descripción" />
            </Form.Item>
          </Container>

          {/* componente tarea  */}

          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <ComponentTarea
              setTarea={setTarea}
              tarea={tarea}
              serviciosfiltrado={serviciosfiltrado}
              selectedDate={selectedDate}
              setTotalServicios={setTotalServicios}
            />
          </Container>

          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <ProductoComponent
              setSelectStateProducto={setSelectStateProducto}
              selectStateProducto={selectStateProducto}
              setTotalProducto={setTotalProducto}
            />
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <GastoExtrasComponent setTotalGasto={setTotalGasto} />
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <EquipoComponent />
          </Container>
          <ContainerDetail
            style={{
              backgroundColor: `${Colores.AzulOscuro}`,
              marginBlock: 5,
              marginInline: 5,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div style={{ width: 300 }}>
              <h3>Detalle</h3>

              <div style={{ fontSize: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 15,
                  }}
                >
                  <p>Total productos:</p>
                  <span>RD$ {formatter(totalProducto)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <p>Total servicios:</p>
                  <span>RD$ {formatter(totalServicios)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <p>Total gasto adicional:</p>
                  <span>RD$ {formatter(totalGasto)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <h3>Total general</h3>
                  <h3>RD$ {formatter(totalGeneral)}</h3>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 0, width: 200 }}>
              <h3>Tiempo</h3>

              <div style={{ fontSize: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 15,
                  }}
                >
                  <p>Fecha inicio:</p>
                  <span> {fechaInicio}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 8,
                  }}
                >
                  <p>Fecha final:</p>
                  <span>{fechaFinal}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-end",
                maxWidth: 400,
                width: 300,
              }}
            >
              <BtnPro
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 0,
                  padding: 5,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", padding: 5 }}
                >
                  <AiOutlineDollarCircle size={30} style={{ margin: 10 }} />
                  <h4> Realizar cotización</h4>
                </div>
                <AiOutlineArrowRight size={30} />
              </BtnPro>
            </div>
          </ContainerDetail>
        </Form>
      </ContainerDetail>
      {/* modal de cliente  */}
      <ModalCliente
        CloseModalCliente={CloseModalCliente}
        OpenModalCliente={OpenModalCliente}
        llenarCampo={ClienteInput}
        handleSearch={handleSearch}
        isModalOpen={isModalOpen}
        filteredData={filteredData}
        selectState={selectStateCliente}
      />
    </div>
  );
}
