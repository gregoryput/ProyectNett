//import "animate.css";
import { message, Button, Tag } from "antd";
import {
  Container,
  DropdownActionsLists,
  ViewContainerPages,
} from "../../components";
import { BiCartAdd } from "react-icons/bi";
import {
  MdAddBox,
  MdCheckCircle,
  MdClear,
  MdOutlineAddShoppingCart,
} from "react-icons/md";

import { MdInventory } from "react-icons/md";

import { DrawerForm } from "./DrawerForm";
import { useGetUnistOfMeasurementsQuery } from "../../redux/Api/unitsOfMeasurementsApi";
import {
  useCreateProductMutation,
  useGetProductsInvWithExistenceInvQuery,
} from "../../redux/Api/productsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  IProductInv,
  IProductoExistencia,
  IProductoInv,
} from "../../interfaces";
import Table, { ColumnsType } from "antd/es/table";
import { MdDeleteOutline, MdDocumentScanner } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import {
  DivContainerTitle,
  DivHeaderInput,
  SpanTitleHeader,
} from "./FormularioOrdenesCompras/formulario-ordenes-compras.styled";
import CustomAvatar from "../../components/CustomAvatar";

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

  // Estado para controlar si se van a crear o editar datos personales:
  const [dataEditProducto, setDataEditProduct] = React.useState<
    IProductInv | undefined
  >(undefined);

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

  React.useEffect(() => {
    if (isProductsError) {
      message.error("Error al solicitar la lista de productos");
    }
  }, [isProductsError]);

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
      window.location.reload();
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
      width: "22%",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomAvatar
            sizeImage={36}
            sizeIcon={25}
            Data={record.Data}
            ContentType={record.ContentType}
          />
          <div>
            <strong style={{ color: "#1C3C6D" }}>
              {record.Codigo} - {record.Nombre}
            </strong>
          </div>
        </div>
      ),
    },
    {
      title: "Modelo",
      dataIndex: "Modelo",
      key: "Modelo",
      align: "center",
      width: "10%",
    },
    {
      title: "Vence?",
      dataIndex: "TieneVencimiento",
      align: "center",
      width: "5%",
      render: (_, record) =>
        record.TieneVencimiento ? <MdCheckCircle /> : <MdClear />,
    },
    {
      title: "Estado en inventario",
      dataIndex: "EstadoNombreProducto",
      key: "EstadoNombreProd9ucto",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <Tag
          color={
            record.IdEstado == 1
              ? "#FFB645"
              : record.IdEstado == 2
              ? "#71B0B9"
              : "#EA6C58"
          }
          style={{ minWidth: "90px", textAlign: "center" }}
        >
          {record.EstadoNombreProducto}
        </Tag>
      ),
    },
    {
      title: "Unidades",
      dataIndex: "ProductoExistencias",
      key: "ProductoExistencias",
      width: "7%",
      align: "center",
      render: (_, record) => <span>{record.ProductoExistencias.length}</span>,
    },
    {
      title: "Estado registro",
      dataIndex: "NombreEstado",
      key: "NombreEstado",
      width: "15%",
      align: "center",
      render: (_, record) => <Tag color="#68D492">{record.NombreEstado}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      width: "15%",
      align: "center",
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

        <DivHeaderInput>
          <DivContainerTitle>
            <MdInventory size={23} />
            <SpanTitleHeader>
              Listado de productos en el inventario
            </SpanTitleHeader>
          </DivContainerTitle>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                marginRight: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setCleanInputs(true),
                  setOpenDrawerForm(true),
                  setSelectedItem(undefined);
              }}
            >
              <MdAddBox size={20} color="#1C3C6D" />
              <span style={{ marginLeft: "5px" }}>
                Registrar nuevo producto
              </span>
            </Button>
            <Button
              style={{
                marginRight: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate("/inventario/form-OrdenCompra")}
            >
              <MdOutlineAddShoppingCart size={20} color="#1C3C6D" />
              <span style={{ marginLeft: "5px" }}>Crear orden de compra</span>
            </Button>
          </div>
        </DivHeaderInput>

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
            expandable={{
              expandedRowRender: (record) => (
                <div
                  style={{
                    display: "Flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "100px" }}></div>
                  <Table
                    style={{ width: "90%" }}
                    dataSource={record.ProductoExistencias}
                    size="small"
                  >
                    <Table.Column
                      title="Unidad"
                      dataIndex="UnidadNombre"
                      key="UnidadNombre"
                      width={"9%"}
                      align="center"
                    />
                    <Table.Column
                      title="Precio costo"
                      dataIndex="PrecioCosto"
                      key="PrecioCosto"
                      width={"9%"}
                      align="center"
                    />
                    <Table.Column
                      title="Precio venta"
                      dataIndex="PrecioVenta"
                      key="PrecioVenta"
                      width={"9%"}
                      align="center"
                    />
                    <Table.Column
                      title="ITBIS"
                      dataIndex="ITBIS"
                      key="ITBIS"
                      width={"9%"}
                      align="center"
                    />
                    <Table.Column
                      title="Estado"
                      key="Estado"
                      width={"9%"}
                      align="center"
                      render={(_, record: IProductoExistencia) => (
                        <Tag>
                          {record.CantidadExistente == 0
                            ? "No disponible"
                            : "Disponible"}
                        </Tag>
                      )}
                    />
                    <Table.Column
                      title="Existente"
                      dataIndex="CantidadExistente"
                      key="CantidadExistente"
                      width={"9%"}
                      align="center"
                    />
                  </Table>
                </div>
              ),
            }}
          />
        </Container>

        <DrawerForm
          statusFetch={{
            loading: isLoadingCreate,
            success: isCreateSuccess,
            error: isErrorCreate,
          }}
          //
          dataEditProducto={dataEditProducto}
          setDataEditProduct={setDataEditProduct}
          //
          cleanInputs={cleanInputs}
          setCleanInputs={setCleanInputs}
          createProduct={createProduct}
          Open={openDrawerForm}
          OnClose={() => setOpenDrawerForm(false)}
          OpstionsUnits={opstionsUnits}
          selectedItem={selectedItem}
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
