//import "animate.css";
import { message, Button, Tag, Image } from "antd";
import {
  Container,
  DropdownActionsLists,
  ViewContainerPages,
} from "../../components";
import { BiCartAdd } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";

import { DrawerForm } from "./DrawerForm";
import { useGetUnistOfMeasurementsQuery } from "../../redux/Api/unitsOfMeasurementsApi";
import {
  useCreateProductMutation,
  useGetProductsInvWithExistenceInvQuery,
  //useGetProductsInvWithExistenceQuery,
} from "../../redux/Api/productsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IProductoInv } from "../../interfaces";
import Table, { ColumnsType } from "antd/es/table";
import { MdDeleteOutline, MdDocumentScanner, MdImage } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";

export default function Inventario() {
  const navigate = useNavigate();
  const [openDrawerForm, setOpenDrawerForm] = React.useState<boolean>(false);
  const [cleanInputs, setCleanInputs] = React.useState<any>();
  const [selectedItem, setSelectedItem] = React.useState<any>();

  //api para obtener la lista de productos
  const {
    data: productsData,
    //isSuccess: isProductsSuccess,
    isError: isProductsError,
    isLoading: isLoadingProducts,
  } = useGetProductsInvWithExistenceInvQuery();

  //Funcion peticion para el create/insert de Producto:
  const [
    createProduct,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateProductMutation();

  const units = useGetUnistOfMeasurementsQuery("");
  const opstionsUnits = units?.data?.Result?.map((op) => ({
    label: op?.UnidadNombre,
    value: op?.IdUnidadDeMedida,
  }));

  console.log("unitsunits", units?.data?.Result);

  React.useEffect(() => {
    if (isProductsError) {
      message.success("Error al solicitar la lista de productos");
    }
  }, [isProductsError]);

  const scrollToSection = () => {
    // Obtener el titulo de arriba, para cuando se de clic a un producto, si esta muy abajo se desplace hacia arriba automaticamente:
    const targetSection = document.getElementById("titleTop");

    if (targetSection) {
      // Con el scrollIntoView se lleva a cabo el desplazamiento a la sección objetivo (titleTop):
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    if (isLoadingCreate) {
      toast.loading("Guardando el producto", {
        id: "tSavinProduct",
      });
    } else {
      toast.dismiss("tSavinProduct");
    }
  }, [isLoadingCreate]);

  React.useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("tSavinProduct");
      toast.success("El producto ha sido guardado correctamente", {
        id: "tSucc",
      });
      setOpenDrawerForm(false);
      setCleanInputs(true);
    }
  }, [isCreateSuccess]);

  React.useEffect(() => {
    if (isErrorCreate) {
      toast.dismiss("tSavinProduct");
      toast.error("Error al guardar el producto", {
        id: "tError",
      });
    }
  }, [isErrorCreate]);

  const columns: ColumnsType<IProductoInv> = [
    {
      title: "Código y nombre del producto",
      dataIndex: "Codigo",
      key: "Codigo",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#BFBFBF",
              maxWidth: "30px",
              maxHeight: "30px",
              minWidth: "30px",
              minHeight: "30px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid #6DA7FB",
            }}
          >
            {record.Data !== null ? (
              <Image
                src={`data:${record.ContentType};base64,${record.Data}`}
                alt="Producto"
              />
            ) : (
              <MdImage color="#DDDDDD" size={25} />
            )}
          </div>
          <a
            style={{ marginLeft: "5px" }}
          >{`(${record.Codigo}) - ${record.Nombre}`}</a>
        </div>
      ),
    },
    {
      title: "Modelo",
      dataIndex: "Modelo",
      key: "Modelo",
    },
    {
      title: "Tiene vencimiento",
      dataIndex: "TieneVencimiento",
      align: "center",
      render: (_, record) => (
        <span>{record.TieneVencimiento ? "Si" : "No"}</span>
      ),
    },
    {
      title: "Estado en inventario",
      dataIndex: "EstadoNombreProducto",
      key: "EstadoNombreProducto",
      render: (_, record) => <Tag>{record.EstadoNombreProducto}</Tag>,
    },
    {
      title: "Unidades",
      dataIndex: "ProductoExistencias",
      key: "ProductoExistencias",
      render: (_, record) => (
        <center>
          {" "}
          <a
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MdRemoveRedEye />
            <span>{record.ProductoExistencias.length}</span>
          </a>
        </center>
      ),
    },
    {
      title: "Estado registro",
      dataIndex: "NombreEstado",
      key: "NombreEstado",
      render: (_, record) => <Tag>{record.NombreEstado}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: IProductoInv, index) => (
        <DropdownActionsLists
          key={index}
          Actions={[
            {
              Name: "ViewDetailD",
              Title: "Detalles del producto",
              Method: () => console.log("aa"),
              Icon: <MdDocumentScanner size={20} color="#25375B" />,
            },
            {
              Name: "Editar",
              Title: "Editar producto",
              Method: () =>
                navigate("/cuentas-por-pagar-facturar-cotizacion=1"),
              Icon: <MdEditSquare size={20} color="#25375B" />,
            },
            {
              Name: "Delete",
              Title: "Desactivar",
              Method: () => console.log("aaaa"),
              Icon: <MdDeleteOutline size={20} color="#25375B" />,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <ViewContainerPages className="animate__animated animate__fadeIn">
        {/* <h2 style={{ marginLeft: 15, marginBottom: 40 }} id="titleTop">
          Gestión de inventario
        </h2> */}
        <div style={{ marginLeft: "20px" }}>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              setCleanInputs(true),
                setOpenDrawerForm(true),
                setSelectedItem(undefined);
            }}
          >
            Registrar nuevo producto
          </Button>
          <Button style={{ marginRight: "10px" }}>Crear orden de compra</Button>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/cuenta-por-cobrar/form-facturacion")}
          >
            <FaFileInvoiceDollar color="#1C3C6D" size={20} />
            <span style={{ marginLeft: "5px" }}>Crear Factura de entrada</span>
          </Button>
        </div>

        <Container
          style={{
            margin: 15,
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Table
            size="small"
            loading={isLoadingProducts}
            pagination={{
              showTotal: (total) => ` ${total} Total`,
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
            }}
            dataSource={productsData?.Result}
            columns={columns}
          />
        </Container>

        <DrawerForm
          statusFetch={{
            loading: isLoadingCreate,
            success: isCreateSuccess,
            error: isErrorCreate,
          }}
          cleanInputs={cleanInputs}
          setCleanInputs={setCleanInputs}
          createProduct={createProduct}
          Open={openDrawerForm}
          OnClose={() => setOpenDrawerForm(false)}
          OpstionsUnits={opstionsUnits}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          Title={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BiCartAdd size={30} />
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                <strong>{`${
                  selectedItem === undefined ? "Registrar" : "Actualizar"
                } producto`}</strong>
              </span>
            </div>
          }
        />
      </ViewContainerPages>
    </>
  );
}
