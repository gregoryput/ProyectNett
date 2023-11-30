import { Table } from "antd";
import { useEffect, useState } from "react";
import { useGetProductsForFCQuery } from "../../../../redux/Api/productsApi";
import { ButtonNext } from "../../../../components";
import ModalProducto from "../Modales/ModalProducto";
import PropTypes from "prop-types";


ProductoComponent.propTypes = {
  selectStateProducto: PropTypes.func.isRequired,
  setSelectStateProducto: PropTypes.func.isRequired,
 
};
export default function ProductoComponent({selectStateProducto,setSelectStateProducto}) {
  //api para obtener la lista de productos
  const {
    data: productsData,
    // isLoading: isLoadingProducts,
    isSuccess: isSuccessProducts,
  } = useGetProductsForFCQuery("");

  const [producto, setProducto] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    if (productsData?.result !== undefined && isSuccessProducts) {
      setFilteredData(productsData?.result);
    }
  }, [producto, setProducto, isSuccessProducts]);

  const OpenModalProducto = () => {
    setIsModalOpen(true);
  };

  const CloseModalProducto = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = productsData?.result.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };

 

  /*Arreglo de productos disponible*/
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
      title: "Unidad",
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
      title: "ITBIS",
      dataIndex: "itbis",
      key: "itbis",
      align: "center",
    },

    {
      title: "Cantidad",
      dataIndex: "cantidad",

      key: "cantidad",
      align: "center",
    },
    {
      title: "Sub-Total",
      dataIndex: "subtotal",

      render: (text, record) => (
        <span>
          {record.cantidad * record.precioVenta + record.itbis}
        </span>
      ),
      key: "sub-total",
      width: "120px",
      align: "center",
    },

    // {
    //   key: "action",
    //   render: (_, record) => (
    //     <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={["click"]}>
    //       <ButtonIcon onMouseUp={() => setSelectedItem(record)}>
    //         <IoEllipsisVerticalSharp size={22} />
    //       </ButtonIcon>
    //     </Dropdown>
    //   ),
    // },
  ];
  const totalSubtotal = selectStateProducto != null ? selectStateProducto?.reduce((total, item) => total + (item.cantidad * item.precioVenta + item.itbis), 0) : "0";
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
        <div style={{float:"right", marginRight:30,marginTop:20}}>
          <h3>Total</h3>
           <p>RD$ {totalSubtotal}</p>
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
