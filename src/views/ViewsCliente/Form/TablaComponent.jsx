import { Input, Table, Tag } from "antd";
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
import { MdRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function TablaComponent({
  dataClients,
  isLoadingClients,
  loadingSave,
  editarCliente,
  handleOpenModal,
  goSectionUp,
  setSelectedClient,
  setActionClient,
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
    isLoadingClients: PropTypes.bool.isRequired,
    loadingSave: PropTypes.bool.isRequired,
    setToggle: PropTypes.func,
    editarCliente: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    setSelectedClient: PropTypes.func.isRequired,
    setActionClient: PropTypes.func.isRequired,
    goSectionUp: PropTypes.func.isRequired,
  };
  return (
    <Container
      style={{
        margin: 15,
        padding: 20,
        borderRadius: 12,
      }}>
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

          <Table
            dataSource={filteredData}
            size="small"
            pagination={{
              showTotal: (total) => ` ${total} Total`,
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
            }}>
            <Column
              title="Id Cliente"
              dataIndex="idCliente"
              key="idCliente"
             
            />
            <Column
              title="Nombre completo"
              dataIndex="nombres"
              key="nombres"
           
            />
            <Column
              title="Apellidos"
              dataIndex="apellidos"
              key="apellidos"
              
            />
            <Column
              title="Sexo"
              dataIndex="sexoNombre"
              key="sexoNombre"
             
            />
            <Column title="Teléfono" dataIndex="telefono1" key="telefono1" />
            <Column
              title="Ciudad"
              dataIndex="ciudadNombre"
              key="ciudad"
              sorter={(a, b) => a.ciudad.localeCompare(b.ciudad)}
            />
            <Column title="Correo" dataIndex="correo" key="correo" />

            <Column
              title="Estado"
              dataIndex="idEstadoRegistro"
              key="idEstadoRegistro"
              render={(_, record, index) => (
                <>
                  {
                    <Tag
                      key={`State ${record.idEstadoRegistro} ${index}`}
                      color={
                        record.idEstadoRegistro === 1 ? "#304878" : "#FF4D4D"
                      }>
                      {record.nombreEstado}
                    </Tag>
                  }
                </>
              )}
              filters={[
                { text: "Activo", value: 1 },
                { text: "Inactivo", value: 2 },
              ]}
              onFilter={(value, record) => record.idEstadoRegistro === value}
            />

            <Column
              key="action"
              render={(_, record) => (
                <div style={{ width: 90, zIndex: 200 }}>
                  <ButtonIcon
                    onMouseUp={() => {
                      setSelectedClient(record);
                      setActionClient(
                        record.idEstadoRegistro === 1 ? "Desactivar" : "Activar"
                      );
                      handleDrop(record.idCliente);
                    }}>
                    <IoEllipsisVerticalSharp size={22} />
                  </ButtonIcon>
                  <DropdownContenttabla open={openIndex === record.idCliente}>
                    <OutsideClick>
                      {/*----------VIEW BUTTON:----------*/}
                      <ButtonIconMenuTalba
                        onClick={() => {
                          handleDrop(-1);
                          navegation(`/cliente/${record.idCliente}`);
                        }}>
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
                        }}>
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
                        }}>
                        {record.idEstadoRegistro === 1 ? (
                          <IoTrashOutline
                            size={18}
                            style={{ marginLeft: 5, marginRight: 5 }}
                          />
                        ) : (
                          <MdRestore
                            size={18}
                            style={{ marginLeft: 5, marginRight: 5 }}
                          />
                        )}

                        <p>
                          {record.idEstadoRegistro === 1
                            ? "Desactivar"
                            : "Activar"}
                        </p>
                      </ButtonIconMenuTalba>
                    </OutsideClick>
                  </DropdownContenttabla>
                </div>
              )}
            />
          </Table>
        </>
      )}
    </Container>
  );
}
