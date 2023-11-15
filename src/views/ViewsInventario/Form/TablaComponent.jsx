import { Input, Table, Tag, Dropdown, Modal } from "antd";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const { Search } = Input;
const { Column } = Table;
//icons
import {
  IoTrashOutline,
  IoClipboardOutline,
  IoEllipsisVerticalSharp,
} from "react-icons/io5";
import { ButtonIcon, Container, SpinnerTables } from "../../../components";
import { MdRestore } from "react-icons/md";

export default function TablaComponent({
  dataProducts,
  loadingSave,
  isLoadingProducts,
  setOpenForm,
  selectedItem,
  setSelectedItem,
  setOpenDrawerForm,
}) {

  const [filteredData, setFilteredData] = useState(dataProducts?.result);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = dataProducts?.result.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };
  useEffect(() => {
    if (dataProducts?.result !== undefined) {
      setFilteredData(dataProducts?.result);
    }
  }, [dataProducts?.result, setFilteredData]);

  TablaComponent.propTypes = {
    loadingSave: PropTypes.bool.isRequired,
    dataProducts: PropTypes.object,
    isLoadingProducts: PropTypes.bool.isRequired,
    setOpenForm: PropTypes.func.isRequired,
    selectedItem: PropTypes.bool.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
    setOpenDrawerForm: PropTypes.func.isRequired,
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {selectedItem?.idEstadoRegistro === 1 ? (
            <IoTrashOutline
              size={18}
              style={{ marginLeft: 5, marginRight: 5 }}
            />
          ) : (
            <MdRestore size={18} style={{ marginLeft: 5, marginRight: 5 }} />
          )}

          <p>
            {selectedItem?.idEstadoRegistro === 1 ? "Desactivar" : "Activar"}
          </p>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onClick={() => {
            setOpenForm(true);
            setOpenDrawerForm();
          }}
        >
          <IoClipboardOutline
            size={18}
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          <p>Editar</p>
        </a>
      ),
    },
  ];

  return (
    <Container
      style={{
        margin: 15,
        padding: 20,
        borderRadius: 12,
      }}
    >
      {isLoadingProducts || loadingSave ? (
        <>
          <SpinnerTables />
        </>
      ) : (
        <>
          <div>
            <Modal>
              <div>
                <span>Actualizar producto</span>
              </div>
            </Modal>
            <Search
              placeholder="Buscar producto"
              style={{
                width: 304,
                marginTop: 10,
                marginBottom: 40,
              }}
              onSearch={handleSearch}
            />
          </div>

          <Table
            dataSource={filteredData}
            size="small"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
              showTotal: (total) => ` ${total} Total`,
            }}
          >
            <Column
              title="Código"
              dataIndex="codigo"
              key="codigo"
              sorter={(a, b) => a.nombres.localeCompare(b.nombres)}
            />
            <Column
              title="Nombre"
              dataIndex="nombre"
              key="nombre"
              sorter={(a, b) => a.nombres.localeCompare(b.nombres)}
            />
            <Column
              title="Modelo"
              dataIndex="modelo"
              key="modelo"
              sorter={(a, b) => a.modelo.localeCompare(b.modelo)}
            />
            <Column
              title="Precio Costo"
              dataIndex="precioCosto"
              key="precioCosto"
              sorter={(a, b) => a.precioCosto.localeCompare(b.precioCosto)}
              width={"120px"}
              align="center"
            />
            <Column
              title="Precio Venta"
              dataIndex="precioVenta"
              key="precioVenta"
              width={"120px"}
              align="center"
              sorter={(a, b) => a.precioVenta.localeCompare(b.precioVenta)}
            />
            <Column
              title="ITBIS"
              dataIndex="itbis"
              key="itbis"
              width={"120px"}
              align="center"
              sorter={(a, b) => a.itbis.localeCompare(b.itbis)}
            />
            <Column
              title="Unidad de Medida"
              dataIndex="unidadNombre"
              key="unidadNombre"
              sorter={(a, b) => a.itbis.localeCompare(b.itbis)}
            />
            <Column
              title="Cantidad disponible"
              dataIndex="cantidadDisponible"
              key="cantidadDisponible"
              width={"120px"}
              align="center"
              render={(_, record, index) => (
                <>
                  {record.idEstado === "Sin entradas" ||
                  record.idEstado === "Agotado" ? (
                    <Tag
                      key={`State ${record.idEstado} ${index}`}
                      color={
                        record.idEstado === 1
                          ? "#F7BA76"
                          : record.idEstado === 2
                          ? "#304878"
                          : "#FF4D4D"
                      }
                      F3A247
                    >
                      {record.estadoNombre}
                    </Tag>
                  ) : (
                    <span>{record.cantidadDisponible}</span>
                  )}
                </>
              )}
            />

            <Column
              title="Estado"
              dataIndex="idEstadoRegistro"
              key="idEstadoRegistro"
              render={(_, record, index) => (
                <>
                  {
                    <Tag
                      key={`State ${record?.idEstadoRegistro} ${index}`}
                      color={
                        record?.idEstadoRegistro === 1 ? "#304878" : "#FF4D4D"
                      }
                    >
                      {record?.nombreEstadoRegistro}
                    </Tag>
                  }
                </>
              )}
              filters={[
                { text: "Activo", value: 1 },
                { text: "Inactivo", value: 2 },
              ]}
              onFilter={(value, record) => record?.idEstadoRegistro === value}
            />

            <Column
              key="action"
              render={(_, record) => (
                <Dropdown
                  menu={{ items }}
                  placement="bottomLeft"
                  arrow
                  trigger={["click"]}
                >
                  <ButtonIcon
                    onMouseUp={() => {
                      setSelectedItem(record);
                    }}
                  >
                    <IoEllipsisVerticalSharp size={22} />
                  </ButtonIcon>
                </Dropdown>
              )}
            />
          </Table>
        </>
      )}
    </Container>
  );
}
