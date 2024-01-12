import { useEffect, useState } from "react";
import { ButtonIcon, Container, ViewContainerPages2 } from "../../components";
import { IoAddOutline, IoClose } from "react-icons/io5";

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
  const [filteredData, setFilteredData] = useState([]);
  const [ListaCouta, setListaCouta] = useState([]);
  const [selectCuota, setSelectCuota] = useState([]);
  // const [servicio, setServicio] = useState([]);

  const {
    data: dataCompleta,
    isSuccess,
    isLoading,
  } = useGetProyectoCompletoQuery(ID);

  useEffect(() => {
    if (data?.data?.Result !== undefined) {
      setFilteredData(data?.data?.Result[0]?.LCuotaProyectoDTO);
    }
  }, [data?.data?.Result, setFilteredData, setListaCouta]);

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
      defaultSortOrder: 'ascend',
      sortOrder: 'ascend',
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
      defaultSortOrder: 'ascend',
      sortOrder: 'ascend',
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
        if (fechaActual > fechaVencimiento) {
          // Realizar acciones adicionales si es necesario
          const result = calcularDiferenciaEnDias(
            fechaActual,
            fechaVencimiento
          );
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

  console.log(filteredData);

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
      </div>
    </ViewContainerPages2>
  );
}
