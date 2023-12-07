import PropTypes from "prop-types";
import {
  BtnSelect,
  ButtonIcon,
  ButtonSave,
  ContainerDetail,
} from "../../../../components";
import { Modal, List, Table, Select, message } from "antd";
import Search from "antd/es/input/Search";
import { useGetEmployeQuery } from "../../../../redux/Api/employeeApi";
import { useState } from "react";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

ModalEmpleado.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  CloseModal: PropTypes.func.isRequired,
  setEmpleado: PropTypes.func.isRequired,
  empleado: PropTypes.func.isRequired,
};
const { Option } = Select;
export default function ModalEmpleado({
  isModalOpen,
  CloseModal,
  setEmpleado,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: dataEmpleado,
    isSuccess: isSuccess,
    // isLoading: isLoading,
  } = useGetEmployeQuery("");

  const [filteredData, setFilteredData] = useState({});
  const [PersnalProyecto, setPersnalProyecto] = useState([]);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = dataEmpleado?.result.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };
  useEffect(() => {
    if (dataEmpleado?.result !== undefined && isSuccess) {
      setFilteredData(dataEmpleado?.result);
    }
  }, [isSuccess, dataEmpleado]);

  const handleResponsabilidadChange = (value, id) => {
    setPersnalProyecto((prevData) => {
      const newData = prevData.map((item) => {
        if (item.idEmpleado === id) {
          return { ...item, Responsabilidad: value };
        } else {
          return item;
        }
      });
      return newData;
    });
  };

  const columns = [
    {
      title: "Empleado",
      dataIndex: "nombres",
      key: "nombres",
      render: (text, record) => (
        <span>{`${record.nombres} ${record.apellidos}`}</span>
      ),
    },
    {
      title: "Responsabilidad",
      dataIndex: "idEmpleado",
      key: "idEmpleado",
      align: "Right",
      render: (record) => (
        <Select
          onChange={(value) => handleResponsabilidadChange(value, record)}
          placeholder="Seleccionar"
        >
          <Option value="0">Supervisor</Option>
          <Option value="1">Ayudante</Option>
          {/* Agrega más opciones según sea necesario */}
        </Select>
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <ButtonIcon onMouseUp={() => Remover(record.idEmpleado)}>
          <IoCloseSharp size={20} color="gray" />
        </ButtonIcon>
      ),
    },
  ];

  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el idProducto
    const updatedProductos = PersnalProyecto.filter(
      (data) => data.idEmpleado !== item
    );

    // Establecer el nuevo array sin el elemento eliminado
    setPersnalProyecto(updatedProductos);
  };
  const listaDeIds = PersnalProyecto?.map((item) => item.idEmpleado);

  const Guardar = () => {
    const tienePropiedad = PersnalProyecto.every(
      (item) => "Responsabilidad" in item
    );

    if (tienePropiedad) {
      CloseModal();
      setEmpleado(PersnalProyecto);
    } else {
      messageApi.open({
        type: "warning",
        content: 'tiene que tener una  "Responsabilidad" el empleado ',
      });
    }
  };

  const HandlerSelect = (item) => {
    const data = item;

    // Verificar si el elemento ya está en el arreglo
    const existeEnArreglo = PersnalProyecto?.some(
      (elemento) => elemento.idEmpleado === data.idEmpleado
    );

    if (!existeEnArreglo) {
      // Agregar el elemento solo si no existe en el arreglo
      setPersnalProyecto([...PersnalProyecto, data]);
    } else {
      messageApi.open({
        type: "warning",
        content:
          '"El elemento ya está en el arreglo. No se agregará duplicado."',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Seleccion de equipo"
        open={isModalOpen}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonSave onClick={() => Guardar()}>Guardar</ButtonSave>
          </div>
        }
        width={700}
        onCancel={CloseModal}
      >
        <Search
          placeholder="Buscar Empleado..."
          allowClear
          style={{
            width: 304,
            marginTop: 10,
            marginBottom: 40,
          }}
          onSearch={handleSearch}
        />

        <ContainerDetail
          style={{ overflow: "auto", height: 200, padding: 0, margin: 0 }}
        >
          <List
            locale={{ emptyText: "No hay datos" }}
            dataSource={filteredData}
            renderItem={(item) => (
              <>
                <BtnSelect
                  isSelected={listaDeIds.includes(item.idEmpleado)}
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                  onClick={() => HandlerSelect(item)}
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
                      Empleado
                    </p>
                    <h4> {item.nombres + " " + item.apellidos}</h4>
                  </div>
                </BtnSelect>
              </>
            )}
          />
        </ContainerDetail>
        <ContainerDetail style={{ margin: 0, padding: 0, marginTop: 50 }}>
          <Table
            style={{ height: 300 }}
            dataSource={PersnalProyecto}
            columns={columns}
            pagination={false} // Desactiva la paginación si no deseas que aparezca
            scroll={{ x: "max-content", y: 200 }}
            locale={{ emptyText: "No hay productos agregados" }}
          />
        </ContainerDetail>
      </Modal>
    </>
  );
}
