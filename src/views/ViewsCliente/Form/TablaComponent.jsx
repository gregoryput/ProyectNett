import { Input, Pagination, Table } from "antd";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const { Search } = Input;
const { Column } = Table;
//icons
import {
  IoTrashOutline,
  IoEyeOutline,
  IoClipboardOutline,
  IoEllipsisVerticalSharp,
} from "react-icons/io5";
import {
  ButtonIcon,
  ButtonIconMenuTalba,
  Container,
  DropdownContenttabla,
  SpinnerTables,
} from "../../../components";
import { OutsideClick } from "outsideclick-react";
import { useNavigate } from "react-router-dom";

export default function TablaComponent({
  data,
  dataClients,
  handlePageChange,
  isLoadingClients,
  loadingSave,
  editarCliente,
  handleOpenModal,
  goSectionUp,
}) {
  const [openIndex, setOpenIndex] = useState(-1);
  const handleDrop = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const navegation = useNavigate();

  const [filteredData, setFilteredData] = useState(dataClients?.result);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = dataClients?.result.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };
  useEffect(() => {
    if (dataClients?.result !== undefined) {
      setFilteredData(dataClients?.result);
    }
  }, [dataClients?.result, setFilteredData]);

  TablaComponent.propTypes = {
    data: PropTypes.object, // Cambia el tipo según lo que corresponda
    dataClients: PropTypes.object, // Cambia el tipo según lo que corresponda
    handlePageChange: PropTypes.func.isRequired,
    isLoadingClients: PropTypes.bool.isRequired,
    loadingSave: PropTypes.bool.isRequired,
    handlePageSizeChange: PropTypes.func.isRequired,
    setToggle: PropTypes.func,
    editarCliente: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
  };
  return (
    <Container
      style={{
        margin: 15,
        border: "1px solid #e2e2e2",
        padding: 20,
        borderRadius: 12,
      }}
    >
      {isLoadingClients || loadingSave ? (
        <>
          <SpinnerTables />
        </>
      ) : (
        <>
          <div>
            <Search
              placeholder="Buscar cliente"
              style={{
                width: 304,
                marginTop: 10,
                marginBottom: 40,
              }}
              onSearch={handleSearch}
            />
          </div>
          <Table dataSource={filteredData} pagination={false} size="small">
            <Column title="Nombre completo" dataIndex="nombres" key="nombres" />
            <Column title="Apellidos" dataIndex="apellidos" key="apellidos" />
            <Column title="Teléfono" dataIndex="telefono1" key="telefono1" />
            <Column title="Ciudad" dataIndex="ciudadNombre" key="ciudad" />
            <Column title="Correo" dataIndex="correo" key="correo" />
            <Column
              key="action"
              render={(_, record) => (
                <div style={{ width: 90, zIndex: 100 }}>
                  <ButtonIcon
                    onMouseUp={() => {
                      handleDrop(record.idCliente);
                    }}
                  >
                    <IoEllipsisVerticalSharp size={22} />
                  </ButtonIcon>
                  <DropdownContenttabla open={openIndex === record.idCliente}>
                    <OutsideClick>
                      {/*----------VIEW BUTTON:----------*/}
                      <ButtonIconMenuTalba
                        onClick={() => {
                          handleDrop(-1);
                          navegation(`/cliente/${record.idCliente}`);
                        }}
                      >
                        <IoEyeOutline
                          size={18}
                          style={{ marginLeft: 5, marginRight: 5 }}
                        />
                        <p>Ver</p>
                      </ButtonIconMenuTalba>

                      {/*----------EDIT BUTTON:----------*/}
                      <ButtonIconMenuTalba
                        onClick={() => {
                          handleDrop(-1);
                          editarCliente(record);
                          goSectionUp();
                        }}
                      >
                        <IoClipboardOutline
                          size={18}
                          style={{ marginLeft: 5, marginRight: 5 }}
                        />
                        <p>Editar</p>
                      </ButtonIconMenuTalba>

                      {/*----------DELETE BUTTON:----------*/}
                      <ButtonIconMenuTalba
                        onClick={() => {
                          handleOpenModal();
                          handleDrop(-1);
                        }}
                      >
                        <IoTrashOutline
                          size={18}
                          style={{ marginLeft: 5, marginRight: 5 }}
                        />
                        <p>Eliminar</p>
                      </ButtonIconMenuTalba>
                    </OutsideClick>
                  </DropdownContenttabla>
                </div>
              )}
            />
          </Table>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginTop: 15 }}>
              <Pagination
                current={data?.currentPage}
                pageSize={data?.pageSize}
                total={data?.totalItems}
                onChange={handlePageChange}
              />
            </div>

            {/* <div>
              <span style={{ fontSize: "15px" }}>Clientes por página: </span>
              <Select
                defaultValue={20}
                style={{ width: "60px" }}
                onChange={handlePageSizeChange}
              >
                <Select.Option key={1} value={5}>
                  5
                </Select.Option>
                <Select.Option key={2} value={10}>
                  10
                </Select.Option>
                <Select.Option key={3} value={20}>
                  20
                </Select.Option>
                <Select.Option key={5} value={30}>
                  30
                </Select.Option>
                <Select.Option key={5} value={40}>
                  50
                </Select.Option>
              </Select>
            </div> */}
          </div>
        </>
      )}
    </Container>
  );
}
