import { Form, Table } from "antd";
import { useParams } from "react-router-dom";
import { IoDocumentAttachOutline } from "react-icons/io5";

import { Colores } from "../../components/GlobalColor";
import {
  BtnNavPro,
  ButtonNext,
  Container,
  Label,
  ViewContainerPages2,
} from "../../components";
import { useGetProyectoCompletoQuery } from "../../redux/Api/proyectoApi";
import { useEffect, useState } from "react";
import ModalPlazoPago from "./ModalPlazoPago";
import dayjs from "dayjs";

const FormConvertToInvoice = () => {
  const { ID } = useParams();
  const { data, isSuccess, isLoading } = useGetProyectoCompletoQuery(ID);
  const [state, setState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factura, setFactura] = useState([]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setState(data.Result);
    }
  }, [data, isSuccess]);
  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

 
  const columns = [
    {
      title: "Factura",
      dataIndex: "Factura",
      key: "Factura",
      render: (text, record) => (
        <span>
          {"Factura" + " " + dayjs(factura.FechaDeEmision).format("DD-MM-YYYY")}
        </span>
      ),
    },

    {
      title: "Monto",
      dataIndex: "Monto",
      key: "Monto",
    },
    {
      title: "Fecha de emision",
      dataIndex: "FechaDeEmision",
      key: "FechaDeEmision",
      render: (text, record) => (
        <span>{dayjs(factura.FechaDeEmision).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Fecha de vencimiento",
      dataIndex: "FechaDeVencimiento",
      key: "FechaDeVencimiento",
      render: (text, record) => (
        <span>{dayjs(factura.FechaDeVencimiento).format("DD-MM-YYYY")}</span>
      ),
    },
    // {
    //   align: "Right",
    //   key: "action",
    //   render: (_, record) => (
    //     <ButtonIcon
    //     // onMouseUp={() => Remover(record.idProducto)}
    //     >
    //       {/* <IoCloseSharp size={15} color="gray" /> */}
    //     </ButtonIcon>
    //   ),
    // },
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
      align:"right",
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
      align: "center",
      render: (text) => <p>% {text}</p>,
    },
    {
      title: "Sub-Total",
      dataIndex: "Subtotal",
      key: "Subtotal",
      align:"right",
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
      align:"right",
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
          padding: 15,
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
          <Form
            style={{ display: "flex", width: "100%", gap: 20, padding: 20 }}
          >
            {/* <Form.Item
              name={"Tipo de NCF"}
              style={{ width: "300px" }}
              label={"Tipo de NCF"}
            >
              <Select
                options={[
                  { value: 1, label: "Consumidor final" },
                  { value: 1, label: "Registro unico de ingresos" },
                ]}
              />

            </Form.Item> */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
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
                  <Label>No. Rnc: </Label>
                  <span>56789</span>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBlock: 10,
                  marginRight: 5,
                }}
              >
                <div>
                  <Label>Cliente: </Label>
                  <span>{state.NombreEntidad}</span>
                </div>
                <div>
                  <Label>Tipo entienda: </Label>
                  <span>{state.NombreTipoEntidad}</span>
                </div>
                <div>
                  <Label>Nombre del proyecto: </Label>
                  <span>{state.NombreProyecto}</span>
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

          <>
            <ButtonNext
              style={{ paddingInline: 10 }}
              type="button"
              onClick={() => OpenModal()}
            >
              Agregar
            </ButtonNext>
          </>
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
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <h4>Crear</h4>
              <IoDocumentAttachOutline size={20} />
            </div>
          </BtnNavPro>
        </div>
      </Container>

      <ModalPlazoPago
        isModalOpen={isModalOpen}
        CloseModal={CloseModal}
        factura={factura}
        setFactura={setFactura}
      />
    </ViewContainerPages2>
  );
};
export default FormConvertToInvoice;
