import { DatePicker, Form, Input, Select, InputNumber } from "antd";
import { message } from "antd";

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
import ComponentTarea from "./TareaComponent";
import ProductoComponent from "./ProductoComponent";
import EquipoComponent from "./EquipoComponent";
import GastoExtrasComponent from "./GastoExtrasComponent";
import { Colores } from "../../../../components/GlobalColor";
import dayjs from "dayjs";

import {
  useCreateProyectoMutation,
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

  const [
    createProyecto,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateProyectoMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectStateCliente, setSelectStateCliente] = useState({});
  const [selectStateProducto, setSelectStateProducto] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [tarea, setTarea] = useState([]);

  // totales por productos, servicios, gasto adicionales
  const [totalServicios, setTotalServicios] = useState(0);
  const [totalProducto, setTotalProducto] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);

  const [gasto, setGasto] = useState([]);
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
      label: servicio.NombreServicio,
      value: servicio.IdServicio,
    })),
    onChange: (newValue) => {
      setValue(newValue);
      // Filtrar los servicios que coinciden con los nuevos valores seleccionados
      const nuevosServicios = servicios.filter((item) =>
        newValue.includes(item.IdServicio)
      );
      setServiciosFiltrado(nuevosServicios);
    },
    placeholder: "Seleccionar servicios",
    maxTagCount: "responsive",
  };

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = clientesData?.Result.filter((item) =>
      item.Nombres.toLowerCase().includes(searchTerm)
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

  const calcularDiferenciaEnDias = (fechaInicio, fechaFin) => {
    // Convertir las fechas a objetos de fecha
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar si las fechas son iguales
    if (inicio.toDateString() === fin.toDateString()) {
      return "1 día";
    }

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = fin - inicio;

    // Calcular la diferencia en días
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );
    return `${diferenciaEnDias.toString() + " " + "días"} `;
  };

  const fechafin = useMemo(() => {
    const resultado = obtenerFechaMasDistante(tarea);
    return new Date(resultado);
  }, [tarea]);

  const ClienteInput = (item) => {
    CloseModalCliente();
    setSelectStateCliente(item.IdCliente);
    form.setFieldsValue({
      cliente: item.Identificacion + " - " + item.NombreEntidad.toLowerCase(),
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
    if( tarea.length > 0 && empleado.length > 0  && gasto.length > 0 && selectStateProducto.length > 0 ) {
      const dataSelectedClient = clientesData?.Result.find(
        (cliente) => cliente.IdCliente == selectStateCliente
      );
  
      const ClienteEsPersonaFisica =
        dataSelectedClient.IdTipoEntidad == 1 ? true : false;
      // Manejar el envío del formulario aquí
      const dataSubmit = {
        IdProyecto: 0,
        Nombre: values.Nombre,
        Descripcion: values.Descripcion,
        FechaDeInicio: new Date(values.FechaDeInicio),
        FechaDeFinalizacion: fechafin,
        TiempoDuracionEstimado: `${calcularDiferenciaEnDias(
          new Date(values.FechaDeInicio),
          fechafin
        )}`,
        //"FechaRealDeFinalizacion": "2023-12-10T05:51:27.368Z",
        //"TiempoDuracionReal": "string",
        PresupuestoAcordado: totalGeneral,
        ClienteEsPersonaFisica: ClienteEsPersonaFisica,
        IdEntidad: dataSelectedClient.IdEntidad,
        IdEstado: 1,
        //IdCreadoPor: 1,
        //FechaCreacion: "2023-12-10T05:51:27.368Z",
        //IdEstadoRegistro: 1,
        //IdModificadoPor: 0,
        //FechaModificacion: "2023-12-10T05:51:27.368Z",
  
        ProyectoDetallesProductos: selectStateProducto.map((detail) => ({
          IdProyectoDetalleProducto: 0,
          Cantidad: detail.Cantidad,
          PrecioCompra: detail.PrecioCosto,
          PrecioVenta: detail.PrecioVenta,
          ITBIS: detail.ITBIS,
          Codigo: "AAA-AAA", // <<-- En el get de pructos traer el codigo
          Descuento: 0, // <<-- Agregar campo de descuento en la tabla de detalles (Campo modificable)
          Subtotal: detail.Subtotal,
          IdProducto: detail.IdProducto,
          IdUnidadDeMedida: detail.IdUnidadDeMedida,
          IdProyecto: 0,
          //IdCreadoPor: 0,
          //FechaCreacion: "2023-12-10T05:51:27.368Z",
          //IdModificadoPor: 0,
          //FechaModificacion: "2023-12-10T05:51:27.368Z",
          IdEstadoRegistro: 1,
        })),
  
        ProyectoEntidadParams: {
          IdProyecto: 0,
          IdEntidad: dataSelectedClient.IdEntidad,
        },
  
        ProyectoEmpleados: empleado.map((empleado) => ({
          IdPersonaProyecto: 0,
          IdProyecto: 0,
          IdResponsabilidad: empleado.IdResponsabilidad,
          IdEmpleado: empleado.IdEmpleado,
          //IdCreadoPor: 0,
          //FechaCreacion: "2023-12-10T05:51:27.368Z",
          //IdModificadoPor: 0,
          //FechaModificacion: "2023-12-10T05:51:27.368Z",
          //IdEstadoRegistro: 0,
        })),
  
        GastoAdicionales: gasto.map((gasto) => ({
          IdGasto: 0,
          DescripcionGasto: gasto.Descripcion,
          MontoGasto: gasto.Costo,
          IdProyecto: 0,
          //IdCreadoPor: 0,
          //FechaCreacion: "2023-12-10T05:51:27.368Z",
          //IdModificadoPor: 0,
          //FechaModificacion: "2023-12-10T05:51:27.368Z",
          //IdEstadoRegistro: 0,
        })),
  
        ProyectoServicios: serviciosfiltrado.map((servicio) => ({
          IdProyectoServicio: 0,
          Descripcion: "-", // << -- Por el momento siempre iraasi
          IdProyecto: 0,
          IdServicio: servicio.IdServicio,
          // IdCreadoPor: 0,
          // FechaCreacion: "2023-12-10T05:51:27.368Z",
          // IdModificadoPor: 0,
          // FechaModificacion: "2023-12-10T05:51:27.368Z",
          // IdEstadoRegistro: 0,
        })),
  
        ProyectoTareas: tarea.map((tarea) => ({
          IdTarea: 0,
          Nombre: tarea.Titulo,
          Descripcion: tarea.Descripcion, // <<--
          FechaInicio: tarea.FechaInicio,
          FechaFinalizacion: tarea.FechaFinal, //dayjs(values.FechaFinal).format("DD-MM-YYYY")
          TiempDuracionEstimado: `${calcularDiferenciaEnDias(
            tarea.FechaInicio,
            tarea.FechaFinal
          )}`,
          //FechaRealDeFinalizacion: "2023-12-10T05:51:27.368Z",
          //TiempoDuracionReal: "string",
          IdParametroCosto: tarea.IdParametroCosto
            ? tarea.IdParametroCosto
            : null,
          CostoPorParametro: tarea.Costo ? tarea.Costo : null,
          Cantidad: tarea.Cantidad ? tarea.Cantidad : null,
          CostoTotal: tarea.Total,
          IdPrioridad: tarea.IdPrioridad,
          IdProyecto: 0,
          IdEstado: 1,
          IdServicioRelacionado: tarea.Servicio,
          //IdCreadoPor: 0,
          // FechaCreacion: "2023-12-10T05:51:27.368Z",
          // IdModificadoPor: 0,
          // FechaModificacion: "2023-12-10T05:51:27.368Z",
          // IdEstadoRegistro: 0
        })),
  
        CotizacionProyecto: {
          IdCotizacion: 0,
          //FechaDeEmision: new Date(),
          MontoInicial: values.MontoInicial,
          MontoTotal: totalGeneral,
          Secuencia: "0",
          IdCliente: dataSelectedClient.IdCliente,
          IdEstado: 1,
          IdProyecto: 0,
          IdEstadoCotizacion: 1,
          // "IdCreadoPor": 0,
          // "FechaCreacion": "2023-12-10T05:51:27.368Z",
          // "IdModificadoPor": 0,
          // "FechaModificacion": "2023-12-10T05:51:27.368Z",
          // "IdEstadoRegistro": 0
        },
      };
      createProyecto({ ...dataSubmit })
    } else {
      message.error({
        content: "Tiene algun campo vacio",
        duration: 4,
      });

    }
  };

  useEffect(() => {
    if (isCreateSuccess === true) {
      console.log(isCreateSuccess);
    }
  }, [isCreateSuccess]);
  //.. CUANDO EL INSERT TENGA UN ERROR:
  useEffect(() => {
    if (isErrorCreate === true) {
      message.error({
        content: "Ha ocurrido un error al intentar guardar los datos",
        duration: 4,
      });
    }
  }, [isErrorCreate]);

  const fecha = form.getFieldsValue(["FechaDeInicio"]);

  useEffect(() => {
    if (fecha != undefined) {
      setFechaInicio(dayjs(fecha?.FechaDeInicio).format("DD-MM-YYYY"));
    }
    if (fechafin != undefined) {
      setFechaFinal(dayjs(fechafin).format("DD-MM-YYYY"));
    }
  }, [fecha, fechafin]);

  useEffect(() => {
    if (clientesData?.Result !== undefined && isClientsSuccess) {
      setFilteredData(clientesData?.Result);
    }

    if (dataServicios?.Result !== undefined && isServiciosSuccess) {
      setServicios(dataServicios?.Result);
    }
  }, [
    clientesData,
    dataServicios,
    setFilteredData,
    isClientsSuccess,
    isServiciosSuccess,
  ]);

  

  return (
    <>
      {isLoadingCreate == true ? (
       null
      ) : (
        <>
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
                <Container
                  style={{ marginInline: 5, marginBlock: 5, width: "100%" }}
                >
                  <h3>Informacion basica</h3>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Form.Item
                      label={<strong>Nombre del proyecto:</strong>}
                      style={{ width: 200, marginTop: 30 }}
                      name={"Nombre"}
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
                        label={<strong>Cliente seleccionado:</strong>}
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
                      label={<strong>Fecha de inicio del proyecto:</strong>}
                      style={{ width: 300, marginTop: 30 }}
                      name={"FechaDeInicio"}
                      rules={[
                        {
                          required: true,
                          message: "Debe ingresar fecha ",

                        },
                      ]}
                    >
                      <DatePicker
                        onChange={handleDateChange}
                        format={"DD-MM-YYYY"}
                        disabledDate={current => current && current < dayjs().startOf('day')}
                      />
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

                <Container
                  style={{ marginBlock: 5, marginInline: 5, width: "100%" }}
                >
                  <ComponentTarea
                    setTarea={setTarea}
                    tarea={tarea}
                    serviciosfiltrado={serviciosfiltrado}
                    selectedDate={selectedDate}
                    setTotalServicios={setTotalServicios}
                  />
                </Container>

                <Container
                  style={{ marginBlock: 5, marginInline: 5, width: "100%" }}
                >
                  <ProductoComponent
                    setSelectStateProducto={setSelectStateProducto}
                    selectStateProducto={selectStateProducto}
                    setTotalProducto={setTotalProducto}
                  />
                </Container>
                <Container
                  style={{ marginBlock: 5, marginInline: 5, width: "100%" }}
                >
                  <GastoExtrasComponent
                    setTotalGasto={setTotalGasto}
                    gasto={gasto}
                    setGasto={setGasto}
                  />
                </Container>
                <Container
                  style={{ marginBlock: 5, marginInline: 5, width: "100%" }}
                >
                  <EquipoComponent
                    empleado={empleado}
                    setEmpleado={setEmpleado}
                  />
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
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ float: "right" }}>
                      <Form.Item
                        label={
                          <strong style={{ color: "white" }}>
                            Monto Inicial:
                          </strong>
                        }
                        name={"MontoInicial"}
                        rules={[
                          {
                            required: true,
                            message: "No hay Monto",
                          },
                        ]}
                      >
                        <InputNumber
                          min={1}
                          defaultValue={0}
                          rules={[
                            {
                              required: true,
                              message: "Debe de tener un monto Inicial",
                            },
                            
                          ]}
                          formatter={(value) =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                          style={{ width: 150, backgroundColor:`${Colores.fondo}` }}
                        />
                      </Form.Item>
                    </div>

                    <BtnPro
                      type="submit"
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
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: 5,
                        }}
                      >
                        <AiOutlineDollarCircle
                          size={30}
                          style={{ margin: 10 }}
                        />
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
        </>
      )}
    </>
  );
}
