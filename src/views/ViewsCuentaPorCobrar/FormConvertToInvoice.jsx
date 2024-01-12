import { Form, Table } from "antd";
import { useParams } from "react-router-dom";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { Container } from "../../components";
import { InputNumber } from "antd";
import { Colores } from "../../components/GlobalColor";
import {
  BtnNavPro,
  ButtonNext,
  Label,
  ViewContainerPages2,
} from "../../components";
import {
  useCreateFacturaVentaProyectoMutation,
  useGetProyectoCompletoQuery,
} from "../../redux/Api/proyectoApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Select } from "antd";
import toast from "react-hot-toast";
const { Option } = Select;

const FormConvertToInvoice = () => {
  const { ID } = useParams();
  const { data, isSuccess, isLoading } = useGetProyectoCompletoQuery(ID);
  const [state, setState] = useState([]);
  const [servicio, setServicio] = useState([]);
  const [factura, setFactura] = useState([]);
  const [plazo, setPlazo] = useState(0);
  
  const sumarTotales = (proyecto) => {
    let totalGeneral = 0;
    let totalesPorServicio = [];

    proyecto.forEach((tarea) => {
      tarea.TareasProyecto.forEach((tareaDetalle) => {
        if (tareaDetalle.CostoTotal) {
          totalGeneral += tareaDetalle.CostoTotal;

          const servicioIndex = totalesPorServicio.findIndex(
            (item) => item.NombreServicio === tareaDetalle.NombreServicio
          );

          if (servicioIndex !== -1) {
            totalesPorServicio[servicioIndex].Total += tareaDetalle.CostoTotal;
          } else {
            totalesPorServicio.push({
              NombreServicio: tareaDetalle.NombreServicio,
              Total: tareaDetalle.CostoTotal,
            });
          }
        }
      });
    });

    return { totalGeneral, totalesPorServicio };
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      const r = sumarTotales(data.Result);
      setServicio(r);
      setState(data.Result);
    }
  }, [isLoading, data, isSuccess]);

  function generarFacturas(
    cantidadCuotas,
    MontoInicial,
    PresupuestoAcordado,
    plazo,
    diaVencimiento,
    porcentajeMora,
    diasMora,
    diaEmisionMensual
  ) {
    const facturas = [];
    // let fechaEmision = new Date(); // Fecha de inicio

    // Ensure the first invoice is equal to the initial amount
    const montoCuotaPrimeraFactura = MontoInicial;

    // Calculate the remaining budget for the rest of the invoices
    const presupuestoRestante = PresupuestoAcordado - MontoInicial;

    // Calculate the amount to distribute for each of the remaining invoices
    const montoCuotaRestante = calcularMontoCuota(
      presupuestoRestante,
      cantidadCuotas - 1
    );

    for (let i = 1; i <= cantidadCuotas; i++) {
      const montoCuota =
        i === 1 ? montoCuotaPrimeraFactura : montoCuotaRestante;

      const porcentajeMoraAplicado = calcularPorcentajeMora(
        porcentajeMora,
        diasMora,
        i
      );

      const fechaEmisionQuincena = calcularFechaEmision(
        plazo,
        i,
        diaEmisionMensual
      );
      const fechaVencimiento = calcularFechaVencimiento(
        fechaEmisionQuincena,
        diaVencimiento,
        plazo,
        i,
        diasMora
      );

      const factura = {
        numeroFactura: `Fact No. ${i.toString().padStart(4, "0")}`, // Número de factura
        numero: i, // Identificador de la factura
        monto: montoCuota,
        porcentajeMora: `${porcentajeMoraAplicado}%`, // Porcentaje de mora aplicado
        fechaEmision: fechaEmisionQuincena.toISOString(),
        fechaVencimiento: fechaVencimiento,
        tipoPlazo: plazo === 1 ? "mensual" : "quincenal",
      };

      facturas.push(factura);

      // Actualizar la fecha de emisión para la siguiente factura
      // fechaEmision = new Date(factura.fechaVencimiento);
    }

    return facturas;
  }

  function calcularMontoCuota(presupuestoRestante, cantidadCuotasRestantes) {
    return presupuestoRestante / cantidadCuotasRestantes;
  }

  function calcularPorcentajeMora(porcentajeMora, diasMora, cuotaNumero) {
    // Aplicar el porcentaje de mora a partir de la primera cuota
    return cuotaNumero > 1 ? porcentajeMora : 0;
  }

  function calcularFechaEmision(plazo, cuotaNumero, diaEmisionMensual) {
    const nuevaFecha = new Date();

    if (plazo === 2) {
      // For bi-weekly payments, set the emission date to the 15th and 30th
      nuevaFecha.setDate(cuotaNumero % 2 === 0 ? 30 : 15);
    } else {
      // For monthly payments, set the emission date based on cuotaNumero or use provided 'diaEmisionMensual'
      nuevaFecha.setDate(diaEmisionMensual || 1);
      nuevaFecha.setMonth(nuevaFecha.getMonth() + cuotaNumero - 1);
    }

    return nuevaFecha;
  }

  function calcularFechaVencimiento(
    fechaEmision,
    plazo,
    cuotaNumero,
    diasMora
  ) {
    const nuevaFecha = new Date(fechaEmision);

    // Move to the next month for subsequent payments
    nuevaFecha.setMonth(nuevaFecha.getMonth() + (cuotaNumero - 1) * plazo);

    // Apply late fee if the payment is due after the grace period
    if (diasMora > 0) {
      nuevaFecha.setDate(nuevaFecha.getDate() + diasMora);
    }

    return nuevaFecha.toISOString();
  }

  // Estado insert Proyecto:
  const [
    createFacturaVentaProyecto,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateFacturaVentaProyectoMutation();

  useEffect(() => {
    if (isLoadingCreate) {
      toast.loading("Guardando la factura de venta de proyecto", {
        id: "tSavinProduct",
      });
    } else {
      toast.dismiss("tSavinProduct");
    }
  }, [isLoadingCreate]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("tSavinProduct");
      toast.success("La factura ha sido guardada correctamente", {
        id: "tSucc",
      });
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isErrorCreate) {
      toast.dismiss("tSavinProduct");
      toast.error("Error al guardar la factura", {
        id: "tError",
      });
    }
  }, [isErrorCreate]);

  // Imprimir las facturas generadas
  const [form] = Form.useForm();
  // Función para manejar el cambio en los campos del formulario

  //Estado Para el tipo TipoNCFId
  const [ncfId, setNCFId] = useState(1);

  const handleSelectChange = (value) => {
    setPlazo(value);
    // Puedes realizar acciones adicionales en tiempo real aquí
  };

  const handleSubmitCreateInvoice = () => {
    const dataForm = form.getFieldsValue();

    const dataFactura = {
      // FechaDeEmision = DateTime.Now,
      MontoInicial: state[0]?.MontoInicial,
      // FechaVencimientoNCF = factura.FechaVencimientoNCF,
      // FechaDeVencimiento = DateTime.Now,
      MontoTotal: state[0]?.PresupuestoAcordado,
      TipoNCFId: ncfId,
      Secuencia: "0",
      //
      IdProyecto: state[0]?.IdProyecto,
      IdEstadoFactura: 3, // <-- Pendiente de pagos
      //
      CantidadCuotas: dataForm.Cuota,
      PorcientoMora: dataForm.Mora,
      DiaPagoMensual: dataForm.DiaPago,
      DiasParaVencimiento: dataForm.PlazoDias,
      IdTipoPlazo: dataForm.Plazo,

      DistribucionesPagos: factura.map((dist) => ({
        IdFactura: 0,
        MontoAPagar: dist.monto,
        FechaPago: dist.fechaEmision,
        FechaEmision: dist.fechaEmision,
        FechaVencimiento: dist.fechaVencimiento,
        SePago: false,
        CuotaNumero: dist.numero,
      })),

      // Distrib: factura,
    };

    // Ejecutar el create:
    createFacturaVentaProyecto({ ...dataFactura });
    console.log("dataFacturadataFactura", dataFactura);
  };

  const onFinish = (values) => {
    const resultado = generarFacturas(
      values.Cuota,
      state[0]?.MontoInicial,
      state[0]?.PresupuestoAcordado,
      values.Plazo,
      null,
      values.Mora,
      values.PlazoDias,
      values.DiaPago
    );
    setFactura(resultado);
  };

  const columns = [
    {
      title: "Factura",
      dataIndex: "numeroFactura",
      key: "numeroFactura",
    },

    {
      title: "Monto",
      dataIndex: "monto",
      key: "monto",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    {
      title: "Mora %",
      dataIndex: "porcentajeMora",
      key: "porcentajeMora",
    },
    {
      title: "Fecha de emision",
      dataIndex: "fechaEmision",
      key: "fechaEmision",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Fecha de vencimiento",
      dataIndex: "fechaVencimiento",
      key: "fechaVencimiento",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Plazo",
      dataIndex: "tipoPlazo",
      key: "tipoPlazo",
    },
  ];

  const columnsProyectos = [
    {
      title: "Cliente",
      dataIndex: "NombreEntidad",
      key: "NombreEntidad",
    },
    {
      title: "Tipo Entidad",
      dataIndex: "NombreTipoEntidad",
      key: "NombreTipoEntidad",
    },
    {
      title: "Proyecto",
      dataIndex: "NombreProyecto",
      key: "NombreProyecto",
    },
    {
      title: "Estado de proyecto",
      dataIndex: "EstadoProyecto",
      key: "EstadoProyecto",
    },

    {
      title: "Presupuesto",
      dataIndex: "PresupuestoAcordado",
      key: "PresupuestoAcordado",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },

    {
      title: "Monto Incial",
      dataIndex: "MontoInicial",
      key: "MontoInicial",
      align: "right",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de productos
  const columnsProductos = [
    {
      title: "Producto",
      dataIndex: "NombreProducto",
      key: "NombreProducto",
    },
    {
      title: "Cantidad",
      dataIndex: "Cantidad",
      key: "Cantidad",
    },
    {
      title: "Precio",
      dataIndex: "PrecioVenta",
      key: "PrecioVenta",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    {
      title: "ITBIS",
      dataIndex: "ITBIS",
      key: "ITBIS",
      render: (text) => (
        <p>
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    {
      title: "Total",
      dataIndex: "Subtotal",
      key: "Subtotal",
      align: "right",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    // Agregar más columnas según tus necesidades
  ];
  // Columnas para la tabla de gastos
  const columnsServicio = [
    {
      title: "Servicios",
      dataIndex: "NombreServicio",
      key: "NombreServicio",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
      align: "right",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de gastos
  const columnsGastos = [
    {
      title: "Gasto adicionales",
      dataIndex: "DescripcionGasto",
      key: "DescripcionGasto",
    },
    {
      title: "Costo",
      dataIndex: "MontoGasto",
      key: "MontoGasto",
      align: "right",
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },
    // Agregar más columnas según tus necesidades
  ];

  return (
    <ViewContainerPages2>
      <Container
        style={{
          marginTop: 0,
          marginBottom: 15,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: `${Colores.AzulMar}`,
          color: `${Colores.Blanco}`,
        }}
      >
        <div>
          <h2>Generar Factura</h2>
          <p>Pueder realizar proceso de pago codicion de pagos</p>
        </div>
      </Container>
      <Container>
        <h3>Información basica</h3>
        <div style={{ display: "flex", width: "100%" }}>
          <Form style={{ display: "flex" }} form={form}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBlock: 10,
                  marginRight: 5,
                }}
              >
                <div>
                  <Label>No. Factura: </Label>
                  <span>0000</span>
                </div>
                <div>
                  <Label>No. NCF: </Label>
                  <Form.Item name={"TipoNCFId"} noStyle>
                    <Select
                      style={{ minWidth: "220px" }}
                      size="small"
                      value={ncfId}
                      onChange={(val) => setNCFId(val)}
                      options={[
                        {
                          value: 1,
                          label: "Factura de Crédito Fiscal",
                        },
                        {
                          value: 2,
                          label: "Factura de Consumo",
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Label>Empresa: </Label>
                  <span> GESTNETT S.R.L</span>
                </div>
                <div>
                  <Label>Direccion: </Label>
                  <span>
                    Plaza HJ, Sergio A. Beras No. 23, San Pedro de Macorís 21000
                  </span>
                </div>
                <div>
                  <Label>Telefono: </Label>
                  <span>(809) 339-2941</span>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Container>

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            marginBottom: 40,
          }}
        >
          <h3> Distribución de pago</h3>
        </div>
        <div>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Form
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
              layout="vertical"
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                label={<strong>Tipo plazo</strong>}
                name={"Plazo"}
                rules={[
                  {
                    required: true,
                    message: "No hay precio",
                  },
                ]}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder="Selecciona algo"
                  onChange={handleSelectChange}
                >
                  <Option value={1}>Mensual</Option>
                  <Option value={2}>Quincenal</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label={<strong>Cuota</strong>}
                name={"Cuota"}
                rules={[
                  {
                    required: true,
                    message: "No hay precio",
                  },
                ]}
              >
                <InputNumber min={1} defaultValue={0} style={{ width: 100 }} />
              </Form.Item>

              <Form.Item
                label={<strong>Mora %</strong>}
                name={"Mora"}
                rules={[
                  {
                    required: true,
                    message: "No hay precio",
                  },
                ]}
              >
                <InputNumber min={2} style={{ width: 100 }} />
              </Form.Item>

              {plazo == 1 ? (
                <Form.Item
                  label={<strong>Fecha dia</strong>}
                  name={"DiaPago"}
                  rules={[
                    {
                      required: true,
                      message: "No hay precio",
                    },
                  ]}
                >
                  <InputNumber min={1} max={31} style={{ width: 100 }} />
                </Form.Item>
              ) : null}
              <Form.Item
                label={<strong>Dias para vencimiento</strong>}
                name={"PlazoDias"}
                rules={[
                  {
                    required: true,
                    message: "No hay precio",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>

              <div style={{ display: "flex" }}>
                <ButtonNext type="submit">Pagos</ButtonNext>
              </div>
            </Form>
          </Container>
        </div>
        <div>
          <Table
            dataSource={factura}
            columns={columns}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            // scroll={{ x: "max-content", y: 400 }}
            locale={{ emptyText: "No hay pagos" }}
            size="small"
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        ></div>
      </Container>
      <Container>
        <h3>Detalle</h3>
        <div>
          <Table
            dataSource={state}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            size="middle"
            columns={columnsProyectos}
          />
          <br />
          <Table
            dataSource={servicio.totalesPorServicio}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            size="middle"
            columns={columnsServicio}
          />
          <br />

          <Table
            dataSource={state[0]?.ProductosProyecto}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            size="middle"
            columns={columnsProductos}
          />
          <br />

          <br />
          <Table
            dataSource={state[0]?.GastoProyecto}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            size="middle"
            columns={columnsGastos}
          />
        </div>
      </Container>
      <Container
        style={{
          backgroundColor: `white`,
          marginBlock: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 15, width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 15,
              width: "100%",
            }}
          >
            <p>Total productos:</p>
            <span>
              RD${" "}
              {parseFloat(state[0]?.TotalProducto).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <p>Total servicios:</p>
            <span>
              RD${" "}
              {parseFloat(state[0]?.TotalTarea).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <p>Total gasto adicional:</p>
            <span>
              RD${" "}
              {parseFloat(state[0]?.TotalGasto).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <h3>Total general</h3>
            <h3>
              RD${" "}
              {parseFloat(state[0]?.PresupuestoAcordado).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </h3>
          </div>
        </div>
      </Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Procesar factura</h3>
        <div>
          <BtnNavPro
            style={{
              borderRadius: "12px",
              width: "180px",
              height: "50px",
              padding: 15,
              marginInline: 15,
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-evenly" }}
              onClick={() => handleSubmitCreateInvoice()}
            >
              <h4>Crear</h4>
              <IoDocumentAttachOutline size={20} />
            </div>
          </BtnNavPro>
        </div>
      </Container>
    </ViewContainerPages2>
  );
};
export default FormConvertToInvoice;
