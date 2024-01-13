import { useEffect, useState } from "react";

import {
  BtnNPro,
  BtnPago,
  ButtonIcon,
  Container,
  ContainerDetail,
  ViewContainerPages2,
} from "../../components";
import { IoAddOutline, IoClose } from "react-icons/io5";
// import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { InputNumber, Input } from "antd";
import { IoCheckmark } from "react-icons/io5";
import { Select } from "antd";
const { Option } = Select;
import FacturaPDF from "./DocumentoVentaPDF/FacturaPDF";

import {
  useGetProyectoCompletoQuery,
  useGetProyectoCoutaQuery,
  useInsertaPagoFacturaVentaProyectoMutation,
} from "../../redux/Api/proyectoApi";
import { Form, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoDocumentAttachOutline } from "react-icons/io5";

export default function PagoCuota() {
  const { ID } = useParams();
  const data = useGetProyectoCoutaQuery(ID);
  const [state, setState] = useState([]);
  const [datoCompleto, setDatoCompleto] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectCuota, setSelectCuota] = useState([]);
  const [devolucion, setDevolucion] = useState(0);
  const [datoFacturaPago, setDatoFacturaPago] = useState([]);
  const [Mora, setMora] = useState(0);
  const [pagode, setPagode] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: dataCompleta,
    isSuccess,
    isLoading,
  } = useGetProyectoCompletoQuery(ID);

  useEffect(() => {
    if (data?.data?.Result !== undefined) {
      setFilteredData(data?.data?.Result[0]?.LCuotaProyectoDTO);
      setDatoCompleto(data?.data?.Result[0]);
    }
  }, [data?.data?.Result, setFilteredData]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setState(dataCompleta.Result);
      // const r = sumarTotales(dataCompleta.Result);
      // setServicio(r);
    }
  }, [isLoading, dataCompleta, isSuccess]);

  // const sumarTotales = (proyecto) => {
  //   let totalGeneral = 0;
  //   let totalesPorServicio = [];

  //   proyecto.forEach((tarea) => {
  //     tarea.TareasProyecto.forEach((tareaDetalle) => {
  //       if (tareaDetalle.CostoTotal) {
  //         totalGeneral += tareaDetalle.CostoTotal;

  //         const servicioIndex = totalesPorServicio.findIndex(
  //           (item) => item.NombreServicio === tareaDetalle.NombreServicio
  //         );

  //         if (servicioIndex !== -1) {
  //           totalesPorServicio[servicioIndex].Total += tareaDetalle.CostoTotal;
  //         } else {
  //           totalesPorServicio.push({
  //             NombreServicio: tareaDetalle.NombreServicio,
  //             Total: tareaDetalle.CostoTotal,
  //           });
  //         }
  //       }
  //     });
  //   });

  //   return { totalGeneral, totalesPorServicio };
  // };

  const columns = [
    {
      title: "No. Cuota",
      dataIndex: "CuotaNumero",
      key: "CuotaNumero",
      sorter: (a, b) => a.CuotaNumero - b.CuotaNumero,
      defaultSortOrder: "ascend",
      sortOrder: "ascend",
    },
    {
      title: "Monto ",
      dataIndex: "MontoAPagar",
      key: "MontoAPagar",
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
      title: "Fecha emision",
      dataIndex: "FechaEmision",
      key: "FechaEmision",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Fecha vencimiento",
      dataIndex: "FechaVencimiento",
      key: "FechaVencimiento",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },

    {
      title: "Estado",
      dataIndex: "SePago",
      key: "SePago",
      render: (_, record) => (
        <Tag color={record.SePago == false ? "red" : "green"}>
          {record.SePago == true ? "Pago" : "Pediente"}
        </Tag>
      ),
    },

    {
      key: "action",
      render: (_, record) =>
        record.SePago == 0 ? (
          <>
            <ButtonIcon
              onMouseUp={() => {
                AgregarCuota(record.CuotaNumero);
              }}
            >
              <IoAddOutline size={20} color="gray" />
            </ButtonIcon>
          </>
        ) : (
          <>
            <IoCheckmark size={20} color="green" />
          </>
        ),
    },
  ];

  const columns2 = [
    {
      title: "No. Cuota",
      dataIndex: "CuotaNumero",
      key: "CuotaNumero",
      sorter: (a, b) => a.CuotaNumero - b.CuotaNumero,
      defaultSortOrder: "ascend",
      sortOrder: "ascend",
    },
    {
      title: "Monto ",
      dataIndex: "MontoAPagar",
      key: "MontoAPagar",
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
      title: "Fecha emision",
      dataIndex: "FechaEmision",
      key: "FechaEmision",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Fecha vencimiento",
      dataIndex: "FechaVencimiento",
      key: "FechaVencimiento",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
    },
    {
      key: "action",
      render: (_, record) => (
        <ButtonIcon
          onMouseUp={() => {
            RemoverSelect(record.CuotaNumero);
          }}
        >
          <IoClose size={20} color="gray" />
        </ButtonIcon>
      ),
    },
  ];

  const SumaCuotaPagadas = () => {
    const lista = filteredData.filter((x) => x.SePago == true);
    let resultado = lista?.reduce((total, item) => total + item.MontoAPagar, 0);

    return resultado;
  };

  const diferencia = SumaCuotaPagadas();

  const AgregarCuota = (item) => {
    const lista = filteredData.filter((x) => x.CuotaNumero == item);
    setSelectCuota([...selectCuota, ...lista]);
    Remover(item);
  };

  const Remover = (item) => {
    const lista = filteredData.filter((x) => x.CuotaNumero !== item);
    setFilteredData(lista);
  };

  const RemoverSelect = (item) => {
    const lista2 = selectCuota.filter((x) => x.CuotaNumero == item);
    const lista = selectCuota.filter((x) => x.CuotaNumero !== item);
    setSelectCuota(lista);
    setFilteredData([...filteredData, ...lista2]);
  };

  const DetectarPago = () => {
    let fechaActual = new Date();

    // Iterar sobre la lista de datos filtrados
    filteredData?.forEach((item) => {
      let fechaEmision = new Date(item.FechaEmision);
      let fechaVencimiento = new Date(item.FechaVencimiento);
      // Verificar si la fecha de emisión es igual o mayor a la fecha actual
      if (fechaActual >= fechaEmision) {
        AgregarCuota(item.CuotaNumero);

        // Verificar si la fecha de vencimiento es mayor a la fecha actual
        if (fechaVencimiento >= fechaActual) {
          // Realizar acciones adicionales si es necesario
          const dias = calcularDiferenciaEnDias(fechaActual, fechaVencimiento);

          // Ejemplo de uso
          const mora = calcularMora(
            item.MontoAPagar,
            Math.abs(dias),
            datoCompleto.PorcientoMora
          );
          setMora(mora);
        }
      }
    });
  };

  const calcularDiferenciaEnDias = (fechaInicio, fechaFin) => {
    // Convertir las fechas a objetos de fecha
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar si las fechas son iguales
    if (inicio.toDateString() === fin.toDateString()) {
      return 1;
    }

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = fin - inicio;

    // Calcular la diferencia en días
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diferenciaEnDias;
  };
  function calcularMora(montoCuota, diasMora, tasaMora) {
    // Calcula el interés diario

    const porciento = tasaMora / 100;
    const interesDiario = porciento / 30;

    // Calcula el monto adicional debido a la mora
    const mora = montoCuota * interesDiario * diasMora;

    return parseFloat(mora).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const totalCuota = selectCuota?.reduce(
    (total, item) => total + item.MontoAPagar,
    0
  );

  DetectarPago();

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

    // {
    //   title: "Monto Incial",
    //   dataIndex: "MontoInicial",
    //   key: "MontoInicial",
    //   align: "right",
    //   render: (text) => (
    //     <p>
    //       RD$
    //       {parseFloat(text).toLocaleString(undefined, {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //       })}
    //     </p>
    //   ),
    // },
    // Agregar más columnas según tus necesidades
  ];

  const [form] = Form.useForm();
  // Estado insert Proyecto:
  const [
    InsertarPagoFacturaVentaProyecto,
    {
      // isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      // isError: isErrorCreate,
    },
  ] = useInsertaPagoFacturaVentaProyectoMutation();

  useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("nose");
      toast.success("La factura ha procesado", {
        id: "nose",
      });
    }
  }, [isCreateSuccess]);

  const onFinish = (values) => {
    const data = selectCuota.map((x) => ({
      Fecha: x.FechaEmision,
      MontoPago: x.MontoAPagar || null,
      MontoMora: Mora,
      MontoTotal: totalCuota + Mora,
      FechaPago: new Date(),
      MontoEfectivo: values.MontoEfectivo || null,
      DevolucionEfectivo: values.DevolucionEfectivo || null,
      MontoTarjeta: values.MontoTarjeta || null,
      Tarjeta: values.Tarjeta || null,
      IdTipoPago: values.IdTipoPago || plazo,
      IdDistribucionPago: x.IdDistribucionPago,
      IdEstadoRegistro: 1,
    }));

    const datasubmit = {
      ListaPagos: data,
    };
    const handleCuotaSubmit = () => {
      if (selectCuota.length > 0) {
        InsertarPagoFacturaVentaProyecto(datasubmit);
        setDatoFacturaPago(datasubmit);

        setSelectCuota([]);
        OpenModal();
      }
    };
    handleCuotaSubmit();
  };
  
  const [plazo, setPlazo] = useState(2);

  const handleSelectChange = (value) => {
    setPlazo(value);
    // Puedes realizar acciones adicionales en tiempo real aquí
  };
  const validateCreditCard = (rule, value, callback) => {
    // Realiza la validación de la tarjeta de crédito según tus criterios
    // Puedes utilizar bibliotecas como 'luhn' para verificar el número de tarjeta

    // Ejemplo básico utilizando una expresión regular para Visa y MasterCard
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14})$/;

    if (!regex.test(value)) {
      callback("Número de tarjeta inválido");
    } else {
      callback();
    }
  };

  const handleChange = (value) => {
    form.setFieldsValue({
      DevolucionEfectivo: value - totalCuota,
    });

    setDevolucion( value - totalCuota)
  };
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

    // Devolver los resultados para que puedan ser utilizados fuera de la función
    return {
      totalGeneral,
      totalesPorServicio,
    };
  };

  const totalservicio = sumarTotales(state);
  const ValorRestante = datoCompleto.MontoTotal - diferencia - totalCuota
  return (
    <ViewContainerPages2>
      <div>
        <Container>
          <h3>Información de proyecto</h3>

          <br />

          <Table
            dataSource={state}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            size="middle"
            columns={columnsProyectos}
          />
          <br />
        </Container>

        <Container>
          <h3>Cuotas </h3>
          <br />
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            // scroll={{ x: "max-content", y: 400 }}
            locale={{ emptyText: "No hay Cuotas" }}
            size="small"
          />
        </Container>
        <Container>
          <h3>Cuotas seleccionada </h3>
          <br />

          <Table
            dataSource={selectCuota}
            columns={columns2}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            // scroll={{ x: "max-content", y: 400 }}
            locale={{ emptyText: "No hay Cuotas" }}
            size="small"
          />

          <ContainerDetail
            style={{
              marginBlock: 0,
              marginInline: 0,
              display: "flex",
            }}
          >
            <div style={{ fontSize: 14, width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 15,
                }}
              >
                <p>Mora:</p>
                <span>RD$ {Mora}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 10,
                }}
              >
                <p>Diferencia:</p>
                <span>
                  RD${" "}
                  {parseFloat(
                    datoCompleto.MontoTotal - diferencia - totalCuota
                  ).toLocaleString(undefined, {
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
                <h3>Sub-Total:</h3>
                <h3>
                  RD${" "}
                  {parseFloat(totalCuota).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 10,
                }}
              >
                <h3>Total General:</h3>
                <h3>
                  RD${" "}
                  {parseFloat(totalCuota + Mora).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
          </ContainerDetail>
        </Container>

        <Container style={{ float: "right", marginBlock: 5, marginRight: 18 }}>
          <div>
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Container
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: 0,
                  width: "100%",
                  flexWrap: "wrap",
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
              >
                <Form.Item
                  label={<strong>Tipo de pago</strong>}
                  name={"IdTipoPago"}
                  rules={[
                    {
                      required: false,
                      message: "Tipo de pago",
                    },
                  ]}
                >
                  <Select
                    style={{ width: 200 }}
                    placeholder="Tipo de pago"
                    onChange={handleSelectChange}
                    defaultValue={2}
                  >
                    <Option value={1}>Tarjeta</Option>
                    <Option value={2}>Efectivo</Option>
                  </Select>
                </Form.Item>

                {plazo == 1 ? (
                  <>
                    <Form.Item
                      label={<strong>No. Tarjeta</strong>}
                      name={"Tarjeta"}
                      rules={[
                        {
                          required: true,
                          message: "No hay Tarjeta",
                        },
                        {
                          min: 16,
                          message: "16 caracteres como min",
                        },
                        {
                          max: 16,
                          message: "16 caracteres como máximo",
                        },
                        { validator: validateCreditCard },
                      ]}
                    >
                      <Input
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ width: 300 }}
                      />
                    </Form.Item>

                    <Form.Item
                      label={<strong>Pago de:</strong>}
                      name={"MontoTarjeta"}
                      rules={[
                        {
                          required: true,
                          message: "No hay pago",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        onChange={handleChange}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ width: 300 }}
                      />
                    </Form.Item>
                  </>
                ) : (
                  <>
                    <Form.Item
                      label={<strong> Pago de: </strong>}
                      name={"MontoEfectivo"}
                      rules={[
                        {
                          required: true,
                          message: "No hay pago",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        onChange={handleChange}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ width: 300 }}
                      />
                    </Form.Item>
                    <Form.Item
                      label={<strong>Devolución:</strong>}
                      name={"DevolucionEfectivo"}
                      rules={[
                        {
                          required: false,
                          message: "No hay Devolucion",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        readOnly
                        defaultValue={0}
                        onChange={pagode}
                        formatter={(value) =>
                          ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        style={{ width: 300 }}
                      />
                    </Form.Item>
                  </>
                )}
              </Container>

              <BtnPago
                style={{
                  height: 70,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 0,
                  width: 400,
                  float: "right",
                }}
                onClick={() => OpenModal()}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <AiOutlineDollarCircle size={35} style={{ margin: 10 }} />
                  <h4> Realizar pago</h4>
                </div>
                <AiOutlineArrowRight size={35} />
              </BtnPago>
            </Form>
          </div>
        </Container>
      </div>
      <ModalGasto
        isModalOpen={isModalOpen}
        CloseModal={CloseModal}
        state={state}
        totalservicio={totalservicio}
        datoCompleto={datoCompleto.Secuencia}
        datoFacturaPago={datoFacturaPago}
        ValorRestante={ValorRestante}
        devolucion={devolucion}
      />
    </ViewContainerPages2>
  );
}

function ModalGasto({
  isModalOpen,
  CloseModal,
  state,
  totalservicio,
  datoCompleto,
  datoFacturaPago,
  ValorRestante,
  devolucion
}) {
  const handleCloses = () => {
    CloseModal();
  };
  return (
    <>
      {" "}
      <Modal
        title="Factura "
        open={isModalOpen}
        centered
        footer={null}
        width={800}
        onCancel={handleCloses}
      >
        <div>
          <PDFDownloadLink
            document={
              <FacturaPDF
                Cotizacion={state[0]}
                resultado={totalservicio}
                datoCompleto={datoCompleto}
                datoFacturaPago={datoFacturaPago}
                ValorRestante={ValorRestante}
                devolucion={devolucion}
              />
            }
            fileName="invoice.pdf"
          >
            <BtnNPro
              style={{
                borderRadius: "12px",
                width: "200px",
                height: "50px",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <h4>Descargar PDF</h4>
                <IoDocumentAttachOutline size={20} />
              </div>
            </BtnNPro>
          </PDFDownloadLink>
        </div>
      </Modal>
    </>
  );
}
