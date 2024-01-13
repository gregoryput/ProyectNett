import { Table } from "antd";
import { useEffect, useState } from "react";
//import { useGetProductsForFCQuery } from "../../../../redux/Api/productsApi";
import { ButtonNext } from "../../../../components";
import ModalProducto from "../Modales/ModalProducto";
import PropTypes from "prop-types";
import { Statistic } from "antd";
import CountUp from "react-countup";
import { useGetProductosUnidadesDetallesQuery } from "../../../../redux/Api/proyectoApi";

ProductoComponent.propTypes = {
  //selectStateProducto: PropTypes.func.isRequired,
  selectStateProducto: PropTypes.array,
  setSelectStateProducto: PropTypes.func.isRequired,
  setTotalProducto: PropTypes.func.isRequired,
};
export default function ProductoComponent({
  selectStateProducto,
  setSelectStateProducto,
  setTotalProducto,
}) {
  //api para obtener la lista de productos
  const {
    data: productsData,
    // isLoading: isLoadingProducts,
    isSuccess: isSuccessProducts,
  } = useGetProductosUnidadesDetallesQuery("");
  const formatter = (value) => (
    <CountUp
      end={value}
      separator=","
      decimals={2}  // Número de decimales
      prefix="RD$"   // Símbolo de moneda
    />
  );

  const [producto, setProducto] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (productsData?.Result !== undefined && isSuccessProducts) {
      setFilteredData(productsData?.Result);
    }
  }, [productsData, isSuccessProducts]);

  const OpenModalProducto = () => {
    setIsModalOpen(true);
  };

  const CloseModalProducto = () => {
    setIsModalOpen(false);
  };
  const totalSubtotal =
    selectStateProducto != null
      ? selectStateProducto?.reduce((total, item) => total + item.Subtotal, 0)
      : "0";

  useEffect(() => {
    setTotalProducto(totalSubtotal);
  }, [setTotalProducto, totalSubtotal]);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = productsData?.Result.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };

  /*Arreglo de productos disponible*/
  const columns = [
    {
      title: "Código",
      dataIndex: "Codigo",
      key: "Codigo",
    },
    {
      title: "Nombre",
      dataIndex: "Nombre",
      key: "Nombre",
    },
    {
      title: "Modelo",
      dataIndex: "Modelo",
      key: "Modelo",
    },
    {
      title: "Unidad",
      dataIndex: "UnidadNombre",
      key: "UnidadNombre",
    },
    {
      title: "Precio",
      dataIndex: "PrecioVenta",
      key: "PrecioVenta",
      align: "center",
      render: (text) => (
        <p>RD${parseFloat(text).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      ),
    },
    {
      title: "ITBIS",
      dataIndex: "ITBIS",
      key: "ITBIS",
      align: "center",
      render: (text) => (
        <p>% {text}</p>
    ),
    },

    {
      title: "Cantidad",
      dataIndex: "Cantidad",

      key: "Cantidad",
      align: "center",
    },
    {
      title: "Sub-Total",
      dataIndex: "Subtotal",
      key: "Subtotal",
      width: "120px",
      align: "center",
      render: (text) => (
        <p>RD${parseFloat(text).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
          <ButtonNext
            style={{ paddingInline: 10 }}
            type="button"
            onClick={() => OpenModalProducto()}
          >
            Agregar
          </ButtonNext>
        </div>
        <Table
          dataSource={selectStateProducto}
          columns={columns}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          // scroll={{ x: "max-content", y: 400 }}
          locale={{ emptyText: "No hay productos agregados" }}
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
          <Statistic
            title="Total"
            value={totalSubtotal}
            formatter={formatter}
          />
        </div>
        <ModalProducto
          isModalOpen={isModalOpen}
          CloseModalProducto={CloseModalProducto}
          filteredData={filteredData}
          handleSearch={handleSearch}
          setProducto={setProducto}
          producto={producto}
          setSelectStateProducto={setSelectStateProducto}
          selectStateProducto={selectStateProducto}
        />
      </>
    </div>
  );
}
