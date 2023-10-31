//import { ViewContainerPages } from "../../components";
import {
  Card,
  Select,
  Form,
  DatePicker,
  Input,
  Dropdown,
  Button,
  Table,
  Tag,
} from "antd";

import { useMemo, useState } from "react";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useGetProductsForFCQuery } from "../../redux/Api/productsApi";
import { ViewContainerPages } from "../../components";
import DropDownFilter from "./DropDownFilter";
import DropDownAdvancedFilters from "./DropDownAdvancesFilters";

export default function FormFacturacionCP() {
  //api para obtener la lista de productos
  const {
    data: productsData,
    //isError: isProductsError,
    isLoading: isLoadingProducts,
  } = useGetProductsForFCQuery("");

  /*Arreglo de productos disponible*/
  const [dataSourceProducto, setDataSourceProducts] = useState([]);

  const [dataSourceEditable, setDataSourceEditable] = useState([]);

  /*Arreglo de productos seleccionados*/
  const [selectedProduct, setSelectedProduct] = useState({});

  /*Arreglo de filtros aplicables para la busqueda por texto*/
  const [filtersDataSource, setFiltersDataSource] = useState([
    { filterId: 1, filterName: "nombre", isActive: false },
    { filterId: 2, filterName: "modelo", isActive: false },
    { filterId: 3, filterName: "codigo", isActive: false },
  ]);

  /*Data filtrada:*/
  //const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Funcion de detele product:
  const deleteProduct = () => {
    setDataSourceProducts((prevState) => {
      return [
        ...prevState.filter((p) => p.idProducto !== selectedProduct.idProducto),
      ];
    });
  };

  console.log("dataSourceProductodataSourceProducto", dataSourceProducto);

  {
    /* ---------------- ITEMS PARA LA TABLA: ---------------- */
  }
  const items = [
    {
      key: "1",
      label: (
        <a onClick={() => deleteProduct()}>
          <p>Eliminar</p>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a>
          <p>Ver detalle</p>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a>
          <p>Ver detalle</p>
        </a>
      ),
    },
  ];

  const columnsProducts = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "Nombre",
      render: (_, record) => <Tag color="#1C3C6D">{record.nombre}</Tag>,
    },
    Table.EXPAND_COLUMN,
    {
      title: "Código",
      dataIndex: "codigo",
      key: "Codigo",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "Modelo",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
      cursor: "pointer",
      render: (_, record) => {
        const editableControl = dataSourceEditable.find(
          (dSE) => record.idProducto === dSE.idProducto
        );
        const currentIndex = dataSourceEditable.findIndex(
          (dSE) => record.idProducto === dSE.idProducto
        );
        const reSetStateV1 = (value, columnCell) => {
          setDataSourceEditable((prevState) => {
            const dSModified = prevState;
            if (columnCell === "Quantity&Units") {
              dSModified[currentIndex].isEditQuantity = value;
              dSModified[currentIndex].isEditUnit = value;
            } else if (columnCell === "Price") {
              dSModified[currentIndex].isEditPrice = value;
            }
            return [...dSModified];
          });
        };
        return (
          <div
            style={{
              width: "80%",
              borderBottom: "1px solid black",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {!editableControl.isEditQuantity ? (
              <span
                style={{ marginRight: "2px", textAlign: "center" }}
                onClick={() => {
                  reSetStateV1(true, "Quantity&Units");
                  const inputE = document.getElementById("inputP1");
                  inputE?.focus();
                }}
              >
                {Number.isInteger(record.cantidad)
                  ? `${record.cantidad}.0000`
                  : `${Math.floor(record.cantidad)}.${(record.cantidad % 1)
                      .toFixed(4)
                      .substr(2)}`}
              </span>
            ) : (
              <input
                style={{ borderRadius: "5px", maxWidth: "76px", padding: 0 }}
                id="inputP1"
                onBlur={() => reSetStateV1(false, "Quantity&Units")}
              />
            )}
            {!editableControl.isEditQuantity ? (
              <select
                id="unitsOfMensure"
                name="unitsOfMensure"
                style={{ border: "none", outline: "none" }}
              >
                <option value="1">Metros</option>
                <option value="2">Rollos</option>
                <option value="3">Units</option>
              </select>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "ITBIS",
      dataIndex: "itbis",
      key: "itbis",
      align: "center",
    },
    {
      title: "Precio",
      dataIndex: "precioVenta",
      key: "precioVenta",
      align: "center",
      cursor: "pointer",
      render: (_, record) => {
        const editableControlv2 = dataSourceEditable.find(
          (dSE) => record.idProducto === dSE.idProducto
        );
        const currentIndexv2 = dataSourceEditable.findIndex(
          (dSE) => record.idProducto === dSE.idProducto
        );
        const reSetStatev2 = (value, columnCell) => {
          setDataSourceEditable((prevState) => {
            const dSModifiedv2 = prevState;
            columnCell === "Quantity&Units"
              ? () => {
                  console.log("Quantity&UnitsQuantity&Units");
                  dSModifiedv2[currentIndexv2].isEditQuantity = value;
                  dSModifiedv2[currentIndexv2].isEditUnit = value;
                }
              : columnCell === "Price"
              ? (dSModifiedv2[currentIndexv2].isEditPrice = value)
              : null;
            return [...dSModifiedv2];
          });
        };
        return (
          <div
            style={{
              width: "80%",
              borderBottom: "1px solid black",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {!editableControlv2.isEditPrice ? (
              <span
                style={{ marginRight: "2px", textAlign: "center" }}
                onClick={() => {
                  reSetStatev2(true, "Price");
                  const inputE2 = document.getElementById("inputP2");
                  inputE2?.focus();
                }}
              >
                {Number.isInteger(record.precioVenta)
                  ? `${record.precioVenta}.0000`
                  : `${Math.floor(record.precioVenta)}.${(
                      record.precioVenta % 1
                    )
                      .toFixed(4)
                      .substr(2)}`}
              </span>
            ) : (
              <input
                style={{ borderRadius: "5px", maxWidth: "76px" }}
                id="inputP2"
                onBlur={() => reSetStatev2(false, "Price")}
              />
            )}
            {!editableControlv2.isEditPrice ? (
              <select
                id="coin"
                name="coin"
                style={{ border: "none", outline: "none" }}
              >
                <option value="1">DOP</option>
                <option value="2">US</option>
                <option value="3">CO</option>
              </select>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "Sub-Total",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "right",
      render: (_, record, index) => (
        <span key={index}>{record.subTotal.toFixed(4)}</span>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      width: "100px",
      render: (_, record, index) => (
        <Dropdown
          key={index}
          menu={{ items }}
          placement="bottomLeft"
          arrow
          trigger={["click"]}
        >
          <Button
            onMouseUp={() => {
              console.log("recordrecordrecordrecordrecordrecord", record);
              setSelectedProduct(record);
            }}
          >
            <IoEllipsisVerticalSharp size={22} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // Función para aplicar los filtros y buscar en el dataSource
  const performSearch = useMemo(() => {
    console.log("searchTermsearchTermsearchTerm", searchTerm);
    const filteredData = productsData?.result?.filter((item) => {
      return filtersDataSource.every((filter) => {
        if (filter.isActive) {
          // Comprueba si el valor del filtro es una cadena y luego verifica si contiene el término de búsqueda
          return Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.includes(searchTerm.toLowerCase())
          );
        }
        return true; // Si el filtro no está activado, se incluye el objeto
      });
    });
    // Realiza algo con el resultado, como mostrarlo en tu componente
    return filteredData?.length > 0
      ? filteredData.map((product) => {
          return { ...product, cantidad: 1.1 };
        })
      : [];
  }, [productsData?.result, filtersDataSource, searchTerm]);
  return (
    <ViewContainerPages>
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "21px",
            width: "100%",
            marginBottom: "25px",
          }}
        >
          <span style={{ borderBottom: "2px solid black" }}>
            <strong>Factura de entrada de productos</strong>
          </span>
          <span style={{ borderBottom: "2px solid black" }}>
            <strong>Factura no.</strong> <span>{2015}</span>
          </span>
        </div>
        <Card style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Card
              style={{
                boxShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.3)",
                marginBottom: "40px",
              }}
            >
              {/* -------------------------- FORMULARIO ENCABEZADO: --------------------------*/}
              <div style={{ marginBottom: "20px" }}>
                <span style={{ fontSize: "18px" }}>
                  <strong>Información de encabezado de factura</strong>
                </span>
              </div>
              <Form
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
                layout="vertical"
              >
                {/*CAMPO PROVEEDOR*/}
                <Form.Item
                  label={<strong>Proveedor:</strong>}
                  style={{ width: "48%" }}
                  name={"IdProveedor"}
                  rules={[
                    {
                      required: true,
                      message: "Debe seleccionar el proveedor",
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccione el proveedor"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/*CAMPO FECHA*/}
                <Form.Item
                  label={<strong>Fecha:</strong>}
                  style={{ width: "24%" }}
                  name={"idUnidad_DeMedida"}
                  rules={[
                    {
                      required: true,
                      message: "Seleccione la fecha",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {/*CAMPO VENCIMIENTO*/}
                <Form.Item
                  label={<strong>Vencimiento:</strong>}
                  style={{ width: "24%" }}
                  name={"idUnidad_DeMedida"}
                  rules={[
                    {
                      required: true,
                      message: "Seleccione la fecha",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {/*CODIGO DE SEGUIMIENTO*/}
                <Form.Item
                  label={<strong>Código de seguimiento:</strong>}
                  style={{ width: "48%", marginBottom: "0" }}
                  name={"Codigo"}
                  rules={[
                    {
                      required: true,
                      message: "Seleccione la fecha",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/*NCF = Numero de comprobante fiscal*/}
                <Form.Item
                  label={<strong>Comprobante fiscal:</strong>}
                  style={{ width: "48%", marginBottom: "0" }}
                  name={"NCF"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese el comprobante fiscal",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Card>
          </div>

          <Card
            style={{
              boxShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.3)",
              marginBottom: "40px",
            }}
          >
            {/*-------------------------- Listado de productos para ir agregandolos a la factura: --------------------------*/}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-end",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <span>Seleccione los productos:</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <DropDownAdvancedFilters />
                </div>

                <div>
                  <DropDownFilter
                    setFiltersDataSource={setFiltersDataSource}
                    filtersDataSource={filtersDataSource}
                  />
                </div>

                <div>
                  <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar"
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                padding: "10px",
                background: "blue",
                overflowX: "scroll",
                overflowY: "hidden",
                height: "150px",
              }}
            >
              {performSearch.map((product) => (
                <div
                  key={product.idProduct}
                  style={{
                    width: "180px",
                    height: "100%",
                    background: "red",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setDataSourceProducts((prevState) => {
                      const itbis = product.itbis / 100;
                      var _product = product.cantidad
                        ? { ...product }
                        : { ...product, cantidad: 1 };
                      _product = product.subTotal
                        ? { ...product }
                        : {
                            ...product,
                            subTotal:
                              product.cantidad * product.precioVenta +
                              product.cantidad * product.precioVenta * itbis,
                          };
                      return [...prevState, _product];
                    });
                    setDataSourceEditable((prevState) => {
                      return [
                        ...prevState,
                        {
                          idProducto: product.idProducto,
                          isEditQuantity: false,
                          isEditUnit: false,
                          isEditPrice: false,
                        },
                      ];
                    });
                  }}
                >
                  {/*Sub contenedor del card producto*/}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/*Imagen del producto*/}
                    <div
                      style={{
                        width: "110px",
                        height: "88px",
                        display: "flex",
                        flexDirection: "column",
                        background: "green",
                      }}
                    ></div>
                    {/*Texto del card producto*/}
                    <div
                      style={{
                        width: "100%",
                        height: "30px",
                        background: "yellow",
                      }}
                    >
                      <strong>
                        <span>{product.codigo}</span>
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div>
            {/*-------------------------- Detalle de la factura: --------------------------*/}
            <Card
              style={{
                boxShadow: "0.5px 0.5px 2px rgba(0, 0, 0, 0.3)",
                marginBottom: "20px",
              }}
            >
              <h3>Productos agregados</h3>
              <Table
                loading={isLoadingProducts}
                dataSource={dataSourceProducto}
                columns={columnsProducts}
                locale={{ emptyText: "No hay productos agregados" }}
                expandable={{
                  expandedRowRender: (record) => (
                    <div>
                      <div>
                        <h4>
                          Distribución del producto{" "}
                          {
                            <span style={{ borderBottom: "3px solid black" }}>
                              {record.nombre}
                            </span>
                          }{" "}
                          en las ubicaciones de inventario:
                        </h4>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "10px",
                            background: "#DADCD9",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          {/*-----------------------*/}
                          <div>
                            <span>
                              <strong>Ubicación:</strong> <span>Área A</span>
                            </span>
                          </div>
                          {/*-----------------------*/}
                          <div>
                            <strong>Cantidad:</strong>
                            <input style={{ height: "20px", width: "60px" }} />
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "10px",
                            background: "#DADCD9",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          {/*-----------------------*/}
                          <div>
                            <span>
                              <strong>Ubicación:</strong> <span>Área A</span>
                            </span>
                          </div>
                          {/*-----------------------*/}
                          <div>
                            <strong>Cantidad:</strong>
                            <input style={{ height: "20px", width: "60px" }} />
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "10px",
                            background: "#DADCD9",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          {/*-----------------------*/}
                          <div>
                            <span>
                              <strong>Ubicación:</strong> <span>Área A</span>
                            </span>
                          </div>
                          {/*-----------------------*/}
                          <div>
                            <strong>Cantidad:</strong>
                            <input style={{ height: "20px", width: "60px" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                }}
                footer={() => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        maxWidth: "100%",
                      }}
                    >
                      <div
                        style={{
                          borderBottom: "1.2px solid black",
                          width: "110px",
                          marginRight: "100px",
                          textAlign: "right",
                        }}
                      >
                        <span>
                          <strong>Total: </strong>
                          {dataSourceProducto
                            .reduce(
                              (acc, producto) => acc + producto.subTotal,
                              0
                            )
                            .toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              />
            </Card>
          </div>
        </Card>
      </Card>
    </ViewContainerPages>
  );
}
