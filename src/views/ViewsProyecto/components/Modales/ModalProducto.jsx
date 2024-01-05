import {
  List,
  Modal,
  Table,
  InputNumber,
  message,
  Popover,
  Tooltip,
  Select,
} from "antd";
import { IoCloseSharp } from "react-icons/io5";
import Search from "antd/es/input/Search";
import PropTypes from "prop-types";
import {
  BtnSelect,
  ButtonIcon,
  ButtonSave,
  ContainerDetail,
} from "../../../../components";

import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

ModalProducto.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  CloseModalProducto: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  filteredData: PropTypes.func.isRequired,
  producto: PropTypes.func.isRequired,
  setProducto: PropTypes.func.isRequired,
  setSelectStateProducto: PropTypes.func.isRequired,
};
export default function ModalProducto({
  isModalOpen,
  CloseModalProducto,
  handleSearch,
  filteredData,
  producto,
  setProducto,
  setSelectStateProducto,
}) {
  const columns = [
    {
      title: "Código",
      dataIndex: "Codigo",
      key: "Codigo",
      width: "8%",
    },
    {
      title: "Nombre",
      dataIndex: "Nombre",
      key: "Nombre",
      width: "25%",
    },
    {
      title: "Modelo",
      dataIndex: "Modelo",
      key: "Modelo",
      width: "8%",
    },
    {
      title: "Tipo de Unidad",
      dataIndex: "ProductoDetallesUnidades",
      key: "ProductoDetallesUnidades",
      width: "20%",
      render: (_, record) => (
        <>
          {record.IdUnidadDeMedida === 0 ? (
            <Tooltip title="Debe seleccionar la unidad de medida">
              <FiAlertTriangle color="red" />
            </Tooltip>
          ) : null}
          <Select
            size="middle"
            style={{ minWidth: "120px" }}
            options={record?.ProductoDetallesUnidades?.map((PUD) => ({
              label: PUD.UnidadNombre,
              value: PUD.IdUnidadDeMedida,
            }))}
            onChange={(value) => handleChangeUnit(value, record)}
          />
        </>
      ),
    },
    {
      title: "Precio",
      dataIndex: "PrecioVenta",
      key: "PrecioVenta",
      align: "center",
      width: "8%",
      render: (_, record) => (
        <Tooltip
          title={
            record.IdUnidadDeMedida === 0
              ? "Debe seleccionar una unidad de medida"
              : ""
          }
        >
          <InputNumber
            onChange={(value) => handlePriceChange(value, record.IdProducto)}
            min={1}
            disabled={record.IdUnidadDeMedida === 0}
            value={record.IdUnidadDeMedida === 0 ? null : record.PrecioVenta}
          />
        </Tooltip>
      ),
    },
    {
      title: "Cantidad",
      dataIndex: "Cantidad",
      key: "Cantidad",
      align: "right",
      width: "8%",
      render: (text, record) => (
        <InputNumber
          disabled={record.IdUnidadDeMedida === 0}
          min={1}
          value={record.Cantidad}
          defaultValue={1}
          onChange={(value) => handleCantidadChange(value, record.IdProducto)}
        />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <ButtonIcon onMouseUp={() => Remover(record.IdProducto)}>
          <IoCloseSharp size={20} color="gray" />
        </ButtonIcon>
      ),
    },
  ];

  // Funcion para cuando cambie la unidad seleccionada (recibo la unidad seleccionada y el record (Producto))
  const handleChangeUnit = (idUnidad, record) => {
    // Le saco el detalle al producto:
    const details = record?.ProductoDetallesUnidades;

    // Capturamos el detalle de la unidad seleccionada:
    const detailUnit = details.find(
      (product) => product.IdUnidadDeMedida == idUnidad
    );

    // Reasignar el estado, modificando el producto en especifico
    setProducto((prevStat) => {
      const newState = prevStat.map((item) => {
        return item.IdProducto == record.IdProducto
          ? {
              ...item,
              IdUnidadDeMedida: idUnidad,
              UnidadNombre: detailUnit.UnidadNombre,
              PrecioCosto: detailUnit.PrecioCosto,
              PrecioVenta: detailUnit.PrecioVenta,
              ITBIS: detailUnit.ITBIS,
              Subtotal: 0,
            }
          : { ...item };
      });
      return newState;
    });
  };

  const calcuteSubTotal = (precioVenta, cantidad, itbis) => {
    const Subtotal = precioVenta * cantidad + itbis * cantidad;
    return Subtotal;
  };

  // Cuando cambie la cantidad seleccionada:
  const handleCantidadChange = (value, id) => {
    setProducto((prevData) => {
      const newData = prevData.map((item) => {
        if (item.IdProducto === id) {
          // Aquí defines tu límite, por ejemplo, 100
          const limiteCantidad = 300; //item.cantidadDisponible;

          // No permitir que el nuevo valor supere el límite
          const nuevaCantidad =
            value <= limiteCantidad && value >= 0 ? value : limiteCantidad;

          const itbis = item.ITBIS;

          return {
            ...item,
            Cantidad: nuevaCantidad,
            Subtotal: calcuteSubTotal(item.PrecioVenta, nuevaCantidad, itbis),
          };
        } else {
          return item;
        }
      });
      return newData;
    });
  };

  // Cuando cambie el precio:
  const handlePriceChange = (value, id) => {
    setProducto((prevData) => {
      const newData = prevData.map((item) => {
        if (item.IdProducto === id) {
          // Aquí defines tu límite, por ejemplo, 100

          // const limiteCantidad = 300; //item.cantidadDisponible;

          // No permitir que el nuevo valor supere el límite
          // const nuevaCantidad =
          //   value <= limiteCantidad && value >= 0 ? value : limiteCantidad;

          const itbis = item.ITBIS;

          return {
            ...item,
            PrecioVenta: value,
            Subtotal: calcuteSubTotal(value, item.Cantidad, itbis),
          };
        } else {
          return item;
        }
      });
      return newData;
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const ProductoSelect = (item) => {
    const data = item;

    // Verificar si el elemento ya está en el arreglo
    const existeEnArreglo = producto.some(
      (elemento) => elemento.IdProducto === data.IdProducto
    );

    if (!existeEnArreglo) {
      //Objeto data:
      const dataProducto = {
        ...item,

        // <<---- Dependen de la unidad de medida seleccionada:
        UnidadNombre: "",
        IdUnidadDeMedida: 0,
        PrecioCosto: 0,
        PrecioVenta: 0,
        ITBIS: 0,
        Subtotal: 0,

        Cantidad: 1,
      };

      // Agregar el elemento solo si no existe en el arreglo:
      setProducto([...producto, dataProducto]);
    } else {
      messageApi.open({
        type: "warning",
        content:
          '"El elemento ya está en el arreglo. No se agregará duplicado."',
      });
    }
  };
  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el idProducto
    const updatedProductos = producto.filter(
      (data) => data.IdProducto !== item
    );

    // Establecer el nuevo array sin el elemento eliminado
    setProducto(updatedProductos);
  };
  
  const listaDeIds = producto.map((item) => item.IdProducto);

  const Guardar = () => {
    const tienePropiedad = producto.every((item) => "Cantidad" in item);

    if (tienePropiedad) {
      //  alert('Todos los elementos tienen la propiedad "cantidad".');
      setSelectStateProducto(producto);
      CloseModalProducto();
    } else {
      messageApi.open({
        type: "warning",
        content: 'tiene que tener una  "Cantidad" mayor a cero ',
      });
    }
  };

  const unitControl = (item) => {
    const existUnit = item?.ProductoDetallesUnidades.some(
      (PUD) => PUD.IdUnidadDeMedida === 1
    );

    let detailUnit = {};
    if (existUnit) {
      detailUnit = item.ProductoDetallesUnidades?.find(
        (PUD) => PUD.IdUnidadDeMedida === 1
      );
    }
    return {
      tieneMedadU: existUnit,
      detailUnit: detailUnit,
    };
  };

  return (
    <>
      {" "}
      {contextHolder}
      <Modal
        open={isModalOpen}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonSave onClick={() => Guardar()}>Guardar</ButtonSave>
          </div>
        }
        width={1200}
        onCancel={CloseModalProducto}
      >
        <h3>Registra Productos</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Productos en el inventario</h3>
          <Search
            placeholder="Buscar proudcto..."
            allowClear
            style={{
              width: 304,
              marginTop: 10,
              marginBottom: 40,
            }}
            onSearch={handleSearch}
          />
        </div>

        <ContainerDetail
          style={{ overflow: "auto", height: 200, padding: 0, margin: 0 }}
        >
          <List
            locale={{ emptyText: "No hay datos" }}
            dataSource={filteredData}
            renderItem={(item) => (
              <Popover
                title="Más Información del producto"
                content={
                  //
                  <div style={{ width: "300px" }}>
                    <div>
                      <strong>Nombre:</strong>
                      <span>{item.Nombre}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>Unidad</strong>
                        <strong>Precio costo</strong>
                        <strong>Precio venta</strong>
                        <strong>Itbis</strong>
                      </div>
                      {item.ProductoDetallesUnidades.map((item, index) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          key={index}
                        >
                          <span>{item.UnidadNombre}</span>
                          <span>{item.PrecioCosto}</span>
                          <span>{item.PrecioVenta}</span>
                          <span>{item.ITBIS}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                <BtnSelect
                  isSelected={listaDeIds.includes(item.IdProducto)}
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                  onClick={() => ProductoSelect(item)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      Producto
                    </p>
                    <h4>{item.Codigo + ": " + item.Nombre}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",

                      width: "25%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      Modelo
                    </p>
                    {item.Modelo}
                    {/*<h4>{item.cantidadDisponible}</h4>*/}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",

                      width: "25%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      Tiene vencimiento
                    </p>
                    <h4>
                      <span>
                        {item.TieneVencimiento ? (
                          <FaCheck />
                        ) : (
                          <IoCloseOutline />
                        )}
                      </span>
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",

                      width: "25%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      Costo unitario
                    </p>
                    <h4>
                      {unitControl(item).tieneMedadU
                        ? unitControl(item).detailUnit.PrecioVenta
                        : "---"}
                    </h4>
                  </div>
                </BtnSelect>
              </Popover>
            )}
          />
        </ContainerDetail>
        <ContainerDetail style={{ margin: 0, padding: 0, marginTop: 50 }}>
          <h3> Producto agregados</h3>
          <Table
            size="middle"
            style={{ height: 400 }}
            dataSource={producto}
            columns={columns}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            scroll={{ x: "max-content", y: 300 }}
            locale={{ emptyText: "No hay productos agregados" }}
          />
        </ContainerDetail>
      </Modal>
    </>
  );
}
