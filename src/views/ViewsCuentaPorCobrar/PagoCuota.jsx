import { useEffect, useState } from "react";
import {
  BtnPago,
  ButtonIcon,
  ButtonSave,
  Container,
  ContainerDetail,
  ViewContainerPages2,
} from "../../components";
import { IoAddOutline, IoClose } from "react-icons/io5";
// import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Modal, InputNumber } from "antd";

import { Select } from "antd";
const { Option } = Select;

import {
  useGetProyectoCompletoQuery,
  useGetProyectoCoutaQuery,
} from "../../redux/Api/proyectoApi";
import { Form, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

export default function PagoCuota() {
  const { ID } = useParams();
  const data = useGetProyectoCoutaQuery(ID);
  const [state, setState] = useState([]);
  const [datoCompleto, setDatoCompleto] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectCuota, setSelectCuota] = useState([]);
  const [Mora, setMora] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      render: (_, record) => (
        <ButtonIcon
          onMouseUp={() => {
            AgregarCuota(record.CuotaNumero);
          }}
        >
          <IoAddOutline size={20} color="gray" />
        </ButtonIcon>
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
  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
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

  // // Columnas para la tabla de productos
  // const columnsProductos = [
  //   {
  //     title: "Producto",
  //     dataIndex: "NombreProducto",
  //     key: "NombreProducto",
  //   },
  //   {
  //     title: "Cantidad",
  //     dataIndex: "Cantidad",
  //     key: "Cantidad",
  //   },
  //   {
  //     title: "Precio",
  //     dataIndex: "PrecioVenta",
  //     key: "PrecioVenta",
  //     render: (text) => (
  //       <p>
  //         RD$
  //         {parseFloat(text).toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //       </p>
  //     ),
  //   },
  //   {
  //     title: "ITBIS",
  //     dataIndex: "ITBIS",
  //     key: "ITBIS",
  //     render: (text) => (
  //       <p>
  //         {parseFloat(text).toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //       </p>
  //     ),
  //   },
  //   {
  //     title: "Total",
  //     dataIndex: "Subtotal",
  //     key: "Subtotal",
  //     align: "right",
  //     render: (text) => (
  //       <p>
  //         RD$
  //         {parseFloat(text).toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //       </p>
  //     ),
  //   },
  //   // Agregar más columnas según tus necesidades
  // ];
  // // Columnas para la tabla de gastos
  // const columnsServicio = [
  //   {
  //     title: "Servicios",
  //     dataIndex: "NombreServicio",
  //     key: "NombreServicio",
  //   },
  //   {
  //     title: "Total",
  //     dataIndex: "Total",
  //     key: "Total",
  //     align: "right",
  //     render: (text) => (
  //       <p>
  //         RD$
  //         {parseFloat(text).toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //       </p>
  //     ),
  //   },
  //   // Agregar más columnas según tus necesidades
  // ];

  // // Columnas para la tabla de gastos
  // const columnsGastos = [
  //   {
  //     title: "Gasto adicionales",
  //     dataIndex: "DescripcionGasto",
  //     key: "DescripcionGasto",
  //   },
  //   {
  //     title: "Costo",
  //     dataIndex: "MontoGasto",
  //     key: "MontoGasto",
  //     align: "right",
  //     render: (text) => (
  //       <p>
  //         RD$
  //         {parseFloat(text).toLocaleString(undefined, {
  //           minimumFractionDigits: 2,
  //           maximumFractionDigits: 2,
  //         })}
  //       </p>
  //     ),
  //   },
  //   // Agregar más columnas según tus necesidades
  // ];

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
            <div style={{ fontSize: 12, width: "100%" }}>
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
                    datoCompleto.MontoTotal - totalCuota
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
                <h3>Total por cuota:</h3>
                <h3>
                  RD${" "}
                  {parseFloat(totalCuota).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </div>
            </div>
          </ContainerDetail>
        </Container>
        {/* <Container>
          <h3 style={{display:"flex",justifyContent:"flex-end"}}>Detalle factura </h3>
          <br />
          <div>
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
        </Container> */}
        <div style={{ float: "right", marginBlock: 5, marginRight: 18 }}>
          <BtnPago
            style={{
              height: 70,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 0,
              width: 400,
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
        </div>
      </div>
      <ModalPago
        CloseModal={CloseModal}
        OpenModal={OpenModal}
        isModalOpen={isModalOpen}
        selectCuota={selectCuota}
        datoCompleto={datoCompleto}
      />
    </ViewContainerPages2>
  );
}

function ModalPago({ isModalOpen, CloseModal, selectCuota, datoCompleto }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };

  const [plazo, setPlazo] = useState(0);

  const handleSelectChange = (value) => {
    setPlazo(value);
    // Puedes realizar acciones adicionales en tiempo real aquí
  };

  return (
    <div>
      <Modal
        title="General pago"
        open={isModalOpen}
        centered
        footer={null}
        width={800}
        onCancel={CloseModal}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 0,
              width: "100%",
              flexWrap: "wrap",
              marginTop:10,
            }}
          >
            <Form.Item
              label={<strong>Monto</strong>}
              name={"Costo"}
              rules={[
                {
                  required: true,
                  message: "No hay precio",
                },
              ]}
            >
              <Select
                style={{ width: 400 }}
                placeholder="Tipo de pago"
                onChange={handleSelectChange}
              >
                <Option value={1}>Tarjeta</Option>
                <Option value={2}>Efectivo</Option>
              </Select>
            </Form.Item>
          </Container>
          <Container style={{paddingTop:0}}>
            {plazo == 1 ? (
              <>
                <Form.Item
                  label={<strong>Monto</strong>}
                  name={"Monto"}
                  rules={[
                    {
                      required: true,
                      message: "No hay precio",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: 300 }}
                  />
                </Form.Item>

                <Form.Item
                  label={<strong>No. Tarjeta</strong>}
                  name={"Tarjeta"}
                  rules={[
                    {
                      required: true,
                      message: "No hay precio",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: 300 }}
                  />
                </Form.Item>
                <Form.Item
                  label={<strong>Devolución</strong>}
                  name={"Devolucion"}
                  rules={[
                    {
                      required: true,
                      message: "No hay precio",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    style={{ width: 300 }}
                  />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
          </Container>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonSave type="submit">Facturar</ButtonSave>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
