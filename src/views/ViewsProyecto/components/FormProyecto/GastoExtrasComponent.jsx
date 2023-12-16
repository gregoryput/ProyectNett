import { ButtonIcon, ButtonNext } from "../../../../components";
import { Table } from "antd";
import ModalGasto from "../Modales/ModalGasto";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Statistic } from "antd";
import CountUp from "react-countup";

export default function GastoExtrasComponent({
  setTotalGasto,
  gasto,
  setGasto,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatter = (value) => <CountUp end={value} separator="," />;

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Recurso adicionales",
      dataIndex: "Descripcion",
      key: "Descripcion",
    },

    {
      title: "Costo",
      dataIndex: "Costo",
      key: "Costo",
    },
    {
      align: "Right",
      key: "action",
      render: (_, record) => (
        <ButtonIcon onMouseUp={() => Remover(record.idProducto)}>
          <IoCloseSharp size={15} color="gray" />
        </ButtonIcon>
      ),
    },
  ];

  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el idProducto
    const updated = gasto.filter((data) => data.id !== item);

    // Establecer el nuevo array sin el elemento eliminado
    setGasto(updated);
  };
  const totalSubtotal = gasto != null ? gasto?.reduce((total, item) => total + item.Costo, 0) : "0";
  useEffect(() => {
    setTotalGasto(totalSubtotal);
  }, [setTotalGasto,totalSubtotal]);

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
        <h3>Gastos</h3>

        <>
          <ButtonNext
            style={{ paddingInline: 10 }}
            type="button"
            onClick={() => OpenModal()}
          >
            Agregar
          </ButtonNext>
        </>
      </div>
      <div>
        <Table
          dataSource={gasto}
          columns={columns}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          // scroll={{ x: "max-content", y: 400 }}
          locale={{ emptyText: "No hay gastos" }}
          size="small"
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
      >
        <Statistic title="Total" value={totalSubtotal} formatter={formatter} />
      </div>
      <ModalGasto
        isModalOpen={isModalOpen}
        CloseModal={CloseModal}
        setGasto={setGasto}
        gasto={gasto}
      />
    </>
  );
}
