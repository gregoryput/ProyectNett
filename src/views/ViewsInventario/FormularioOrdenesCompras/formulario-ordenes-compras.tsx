import React from "react";
import { Container, ViewContainerPages2 } from "../../../components";
import { FcDocument } from "react-icons/fc";
import {
  Button,
  Collapse,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
} from "antd";
import { MdOutlineAttachMoney, MdPerson } from "react-icons/md";
import { MdOutlineViewHeadline } from "react-icons/md";
import { MdSave } from "react-icons/md";
import { MdCancelScheduleSend } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";

import {
  DivContainerImage,
  DivContainerNoImage,
  DivInputNoStyle,
  DivPrincipalForm,
  DivInput,
  DivHeaderInput,
  DivContainerTitle,
  SpanTitleHeader,
} from "./formulario-ordenes-compras.styled";
import { useGetEntitadesProveedoresQuery } from "../../../redux/Api/entitiesApi";
import { useGetCountriesQuery } from "../../../redux/Api/countriesApiT";
import { useGetCitiesQuery } from "../../../redux/Api/citiesApiT";
import {
  IOrdenCompra,
  IOrdenCompraDetalle,
  IProductoInv,
} from "../../../interfaces";
import DrawerSelectProduct from "./drawer-select-product/drawer-select-product";
import {
  useCreateOrdenCompraMutation,
  useGetProductsInvWithExistenceInvQuery,
} from "../../../redux/Api/productsApi";
import ProductoComponent from "../../ViewsProyecto/components/FormProyecto/ProductoComponent";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FormularioOrdenesCompras = () => {
  //Fetch para obtener la lista de EntidadesProveedores:
  const fetchEntidadesProveedores = useGetEntitadesProveedoresQuery();

  const [form] = Form.useForm(); // <<--- Instancia del Form
  const [form2] = Form.useForm(); // <<--- Instancia del Form

  const [openDrawerSelectProducts, setOpenDrawerSelectProducts] =
    React.useState<boolean>(false);

  const [dataSourcherProducts, setDataSourcherProducts] = React.useState<
    IProductoInv[]
  >([]);

  ///console.log("dataSourcherProducts", dataSourcherProducts);

  const { data: countiresData, isLoading: isLoadingCountries } =
    useGetCountriesQuery();
  //Observar el valor IdPaisEntrega del form:
  const IdPaisEntrega = Form.useWatch("IdPaisEntrega", form);

  // fetch de obtener ciudades por pais (el skip es para que se ejecute solo si idPais tiene valor):
  const fetchCitiesByCountry = useGetCitiesQuery(IdPaisEntrega, {
    skip: IdPaisEntrega === undefined || IdPaisEntrega === null,
  });

  //const [selectStateCliente, setSelectStateCliente] = React.useState({});
  const [selectStateProducto, setSelectStateProducto] = React.useState([]);
  const [totalProducto, setTotalProducto] = React.useState(0);

  React.useEffect(() => {
    if (totalProducto == 0) {
      form2.setFieldValue("MontoInicial", 1);
    }
  }, [totalProducto, form2]);

  // Hacer refetch (ejecutar la peticion de getCities cuando el valor de idPais cambie):
  React.useEffect(() => {
    IdPaisEntrega !== undefined && IdPaisEntrega !== null
      ? fetchCitiesByCountry.refetch()
      : null;
  }, [IdPaisEntrega]);

  //api para obtener la lista de productos
  const { data: productsData } = useGetProductsInvWithExistenceInvQuery();

  const navigate = useNavigate();

  //Funcion peticion para el create/insert de Producto:
  const [
    createPurchaseOrder,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateOrdenCompraMutation();

  React.useEffect(() => {
    if (isLoadingCreate) {
      toast.loading("Creando la orden de compra", {
        id: "tSavinProduct",
      });
    } else {
      toast.dismiss("tSavinProduct");
    }
  }, [isLoadingCreate]);

  React.useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("tSavinProduct");
      toast.success("La orden de compra ha sido guardada correctamente", {
        id: "tSucc",
      });
      navigate("/cuenta-por-pagar")
    }
  }, [isCreateSuccess]);

  React.useEffect(() => {
    if (isErrorCreate) {
      toast.dismiss("tSavinProduct");
      toast.error("Error al guardar la orden de compra", {
        id: "tError",
      });
    }
  }, [isErrorCreate]);

  const image = null;

  const handleSubmitCreatePurchaseOrder = () => {
    const valuesDataOrder = form.getFieldsValue();
    const valueInitial: number = form2.getFieldValue("MontoInicial");

    const orderDetails = selectStateProducto.map((data: any) => ({
      IdOrdenCompra: 0,
      IdDetalleOrdenCompra: 0,
      IdProducto: data.IdProducto,
      IdUnidadDeMedida: data.IdUnidadDeMedida,
      Cantidad: data.Cantidad,
      Precio: data.PrecioCompra,
      ITBIS: data.ITBIS,
      Subtotal: data.Subtotal,
    }));

    const dataOrder: IOrdenCompra = {
      IdOrdenCompra: 0,
      IdEntidadProveedor: valuesDataOrder.IdEntidadProveedor,
      MontoTotal: totalProducto,
      MontoInicial: valueInitial, // Puede ser opcional, según el modelo de datos en SQL Server
      Secuencia: "0",
      FechaEmision: valuesDataOrder.FechaEmision,
      FechaEntrega: valuesDataOrder.FechaEntrega,
      IdCiudadEntrega: valuesDataOrder.IdCiudadEntrega,
      DireccionEntrega: valuesDataOrder.DireccionEntrega,
      IdEstadoDocumento: 4,
      IdEstadoRegistro: 1,
      OrdenCompraDetalles: orderDetails,
    };

    createPurchaseOrder({ ...dataOrder });
  };

  return (
    <ViewContainerPages2>
      <DivHeaderInput>
        <DivContainerTitle>
          <FcDocument size={23} />
          <SpanTitleHeader>Crear orden de compra de productos</SpanTitleHeader>
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
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <MdCancelScheduleSend />
            <span style={{ marginLeft: "4px" }}>Salir</span>
          </Button>
          {/*--------------------------------------------------------------*/}
          <Button
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  selectStateProducto.length > 0
                    ? handleSubmitCreatePurchaseOrder()
                    : toast.error(
                        "Debe agregar productos a la orden de compra"
                      );
                })
                .catch((errr) => {
                  toast.error("Debe llenar todos los campos");
                  return;
                });
            }}
          >
            <MdSave />
            <span style={{ marginLeft: "4px" }}>Guardar</span>
          </Button>
        </div>
      </DivHeaderInput>

      <Container>
        {/*Encabezado de los campos*/}
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel
            header={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MdOutlineViewHeadline size={26} />
                <span
                  style={{
                    fontSize: "20px",
                    color: "#7D7D7D",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  Información de encabezado del nuevo documento
                </span>
              </div>
            }
            key="1"
          >
            <Form layout="vertical" form={form}>
              <DivPrincipalForm>
                {/*------ Campo IdEntidadProveedor::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <DivInputNoStyle>
                  <DivContainerImage>
                    {image ? (
                      <Image src="qlq" />
                    ) : (
                      <DivContainerNoImage>
                        <MdPerson size={"40px"} color="#909090" />
                      </DivContainerNoImage>
                    )}
                  </DivContainerImage>

                  <Form.Item
                    name={"IdEntidadProveedor"}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      minWidth: "60%",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Debe seleccionar el proveedor",
                      },
                    ]}
                    label={
                      <strong style={{ marginBottom: "6px" }}>
                        Proveedor:
                      </strong>
                    }
                  >
                    <Select
                      placeholder={"Seleccione el proveedor"}
                      style={{ width: "100%" }}
                      options={fetchEntidadesProveedores.data?.Result.map(
                        (entP) => ({
                          value: entP.IdEntidad,
                          label: entP.NombreEntidad,
                        })
                      )}
                    />
                  </Form.Item>
                </DivInputNoStyle>

                {/*------ Campo FechaEmision::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <Form.Item
                  name={"FechaEmision"}
                  rules={[
                    {
                      required: true,
                      message: "Debe ingresar la fecha de emisión",
                    },
                  ]}
                  style={{ width: "25%" }}
                  label={<strong>Fecha de emisión</strong>}
                >
                  <input
                    type="date"
                    style={{
                      padding: "4px",
                      fontSize: "14px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: "#fff",
                      transition: "border-color 0.3s ease-in-out",
                      width: "100%",
                    }}
                  />
                </Form.Item>

                {/*------ Campo FechaEntrega::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <Form.Item
                  name={"FechaEntrega"}
                  label={<strong>Fecha de entrega</strong>}
                  style={{ width: "25%" }}
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar la fecha entrega",
                    },
                  ]}
                >
                  <input
                    type="date"
                    style={{
                      padding: "4px",
                      fontSize: "14px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "8px",
                      outline: "none",
                      boxSizing: "border-box",
                      backgroundColor: "#fff",
                      transition: "border-color 0.3s ease-in-out",
                      width: "100%",
                    }}
                  />
                </Form.Item>

                {/*------ Campo DireccionEntrega::::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <Form.Item
                  name={"DireccionEntrega"}
                  style={{ width: "43%" }}
                  label={<strong>Dirección de entrega</strong>}
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar la direecció",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese datos relevantes de la dirección de entrega" />
                </Form.Item>

                {/*------ Campo IdPaisEntrega::::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <Form.Item
                  name={"IdPaisEntrega"}
                  label={<strong>País de entrega</strong>}
                  style={{ width: "25%" }}
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar el país",
                    },
                  ]}
                >
                  <Select
                    loading={isLoadingCountries === true}
                    options={countiresData?.Result.map((pais) => ({
                      label: pais.PaisNombre,
                      value: pais.IdPais,
                    }))}
                  />
                </Form.Item>

                {/*------ Campo IdCiudadEntrega::::::::::::::::::::::::::::::::::::::::::::::::::*/}
                <Form.Item
                  name={"IdCiudadEntrega"}
                  label={<strong>Ciudad</strong>}
                  style={{ width: "25%" }}
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar el proveedor",
                    },
                  ]}
                >
                  <Select
                    loading={fetchCitiesByCountry.isLoading}
                    options={fetchCitiesByCountry.data?.Result.map((cF2) => ({
                      label: cF2.CiudadNombre,
                      value: cF2.IdCiudad,
                    }))}
                  />
                </Form.Item>
              </DivPrincipalForm>
            </Form>
          </Collapse.Panel>
        </Collapse>
      </Container>

      <Container style={{ minHeight: "200px" }}>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel
            header={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineArticle size={26} color="#7D7D7D" />
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#7D7D7D",
                      fontWeight: "bold",
                      marginLeft: "5px",
                    }}
                  >
                    Tabla de detalle de productos a pedir
                  </span>
                </div>
                <Button
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenDrawerSelectProducts(true);
                  }}
                >
                  <MdAddShoppingCart size={20} />
                  <span style={{ marginLeft: "5px" }}>
                    Agregar producto (vista mosaico)
                  </span>
                </Button>
              </div>
            }
            key="1"
          >
            <ProductoComponent
              setSelectStateProducto={setSelectStateProducto}
              selectStateProducto={selectStateProducto}
              setTotalProducto={setTotalProducto}
            />
          </Collapse.Panel>
        </Collapse>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <span> </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MdOutlineAttachMoney size={25} />
              <span style={{ fontSize: "18px" }}>Monto inicial a pagar:</span>
            </div>
            <Form form={form2}>
              <Form.Item noStyle name={"MontoInicial"} initialValue={1}>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  style={{
                    maxWidth: "130px",
                    width: "100px",
                    marginLeft: "10px",
                  }}
                  disabled={totalProducto == 0}
                  onChange={(value: number | null) => {
                    const valor: number = value ? value : 0;
                    if (totalProducto < valor) {
                      toast.error(
                        "El monto inicial a pagar no puede ser mayor al monto total"
                      );
                      form2.setFieldValue("MontoInicial", 1);
                    }
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>

      <DrawerSelectProduct
        productsData={productsData}
        open={openDrawerSelectProducts}
        onClose={() => setOpenDrawerSelectProducts(false)}
        setDataSourcherProducts={setDataSourcherProducts}
      />
    </ViewContainerPages2>
  );
};

export default FormularioOrdenesCompras;
