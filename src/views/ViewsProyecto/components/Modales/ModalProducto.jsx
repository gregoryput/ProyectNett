import { List, Modal, Table, InputNumber, message } from "antd";
import {
  IoCloseSharp,
} from "react-icons/io5"
import Search from "antd/es/input/Search";
import PropTypes from "prop-types";
import {
  BtnSelect,
  ButtonIcon,
  ButtonSave,
  ContainerDetail,
} from "../../../../components";

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
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Tipo de Unidad",
      dataIndex: "unidadNombre",
      key: "unidadNombre",
    },
    {
      title: "Precio",
      dataIndex: "precioVenta",
      key: "precioVenta",
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      align: "center",
      render: (text, record) => (
        <InputNumber
          value={text == " " || text == null ? 0 : text}
          onChange={(value) => handleCantidadChange(value, record.idProducto)} // Reemplaza 'key' con la propiedad única de tu registro
        />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <ButtonIcon onMouseUp={() => Remover(record.idProducto)}>
          <IoCloseSharp size={20} color="gray" />
        </ButtonIcon>
      ),
    },
  ];

  const handleCantidadChange = (value, id) => {
    setProducto((prevData) => {
      const newData = prevData.map((item) => {
        if (item.idProducto === id) {
          // Aquí defines tu límite, por ejemplo, 100
          const limiteCantidad = item.cantidadDisponible;

          // No permitir que el nuevo valor supere el límite
          const nuevaCantidad =
            value <= limiteCantidad && value >= 0 ? value : limiteCantidad;

          return { ...item, cantidad: nuevaCantidad };
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
      (elemento) => elemento.idProducto === data.idProducto
    );

    if (!existeEnArreglo) {
      // Agregar el elemento solo si no existe en el arreglo
      setProducto([...producto, data]);
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
      (data) => data.idProducto !== item
    );

    // Establecer el nuevo array sin el elemento eliminado
    setProducto(updatedProductos);
  };

  const listaDeIds = producto.map((item) => item.idProducto);

  const Guardar = () => {
    const tienePropiedad = producto.every((item) => "cantidad" in item);

    if (tienePropiedad) {
      //  alert('Todos los elementos tienen la propiedad "cantidad".');
      setSelectStateProducto(producto);
      CloseModalProducto();
    } else {
      messageApi.open({
        type: "warning",
        content: 'tiene que tener una  "cantidad" mayor a cero ',
      });
    }
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
          <h3>Productos en inventario</h3>
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
              <>
                <BtnSelect
                  isSelected={listaDeIds.includes(item.idProducto)}
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
                    <h4> {item.nombre}</h4>
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
                      Cantidad disponible
                    </p>
                    <h4>{item.cantidadDisponible}</h4>
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
                      Precio de venta
                    </p>
                    <h4>${item.precioVenta}</h4>
                  </div>
                </BtnSelect>
              </>
            )}
          />
        </ContainerDetail>
        <ContainerDetail style={{ margin: 0, padding: 0, marginTop: 50 }}>
          <h3> Producto agregados</h3>
          <Table
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
