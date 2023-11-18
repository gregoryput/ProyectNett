import { Button, Dropdown, Table, Tag } from "antd";
import { useState } from "react";
import { useGetProductsForFCQuery } from "../../../../redux/Api/productsApi";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { ButtonNext } from "../../../../components";

export default function ProductoComponent() {
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




  //Funcion de detele product:
  const deleteProduct = () => {
    setDataSourceProducts((prevState) => {
      return [
        ...prevState.filter((p) => p.idProducto !== selectedProduct.idProducto),
      ];
    });
  };


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

  return (
    <div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 0,
            marginBottom: 40,
          }}
        >
          <h3>Productos</h3>
          <ButtonNext style={{ paddingInline: 10 }} type="button">
            Agregar
          </ButtonNext>
        </div>
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
                    width: "150px",
                    marginRight: "100px",
                    textAlign: "right",
                  }}
                >
                  <span>
                    <p>Total: </p>
                    {dataSourceProducto
                      .reduce((acc, producto) => acc + producto.subTotal, 0)
                      .toFixed(4)}
                  </span>
                </div>
              </div>
            </>
          )}
        />
      </>
    </div>
  );
}
