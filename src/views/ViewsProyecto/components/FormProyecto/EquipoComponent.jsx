import { useState } from "react";
import { ButtonIcon, ButtonNext } from "../../../../components";
import { Table } from "antd";
import ModalEmpelado from "../Modales/ModalEmpleado";
import {
  IoCloseSharp,
} from "react-icons/io5"
export default function EquipoComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleado, setEmpleado] = useState([]);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
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
      dataIndex: "Responsabilidad",
      key: "Responsabilidad",
      render: (text, record) => (
        <span>{record.Responsabilidad}</span>
      ),
    },  {
      align: "Right",
      key: "action",
      render: (_, record) => (
        <ButtonIcon onMouseUp={() => Remover(record.idEmpleado)}>
          <IoCloseSharp size={15} color="gray" />
        </ButtonIcon>
      ),
    },
   
   
  ];
  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el idProducto
    const updated = empleado.filter(
      (data) => data.idEmpleado !== item
    );

    // Establecer el nuevo array sin el elemento eliminado
    setEmpleado(updated);
  };
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          marginBottom: 40,
        }}
      >
        <h3>Equipo asignado</h3>

        <>
          <ButtonNext style={{ paddingInline: 10 }} type="button" onClick={()=> OpenModal()}>
            Agregar
          </ButtonNext>
        </>
      </div>
      <div>
        <Table
          dataSource={empleado}
          columns={columns}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          // scroll={{ x: "max-content", y: 400 }}
          size="small" 
          locale={{ emptyText: "No hay empleado agregados" }}
        />
      </div>
      <ModalEmpelado isModalOpen={isModalOpen}  CloseModal={CloseModal} setEmpleado={setEmpleado} empleado={empleado}  />
    </>
  );
}
