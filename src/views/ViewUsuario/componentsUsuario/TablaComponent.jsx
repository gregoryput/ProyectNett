import { Input, Table, Tag } from "antd";
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
import {
  ButtonIcon,
  ButtonIconMenuTalba,
  Container,
  DropdownContenttabla,
  SpinnerTables,
} from "../../../components";
import { OutsideClick } from "outsideclick-react";
import { MdRestore } from "react-icons/md";

export default function TablaComponent({
  data,
  isLoading,
  loadingSave,
  editar,
  handleOpenModal,
  goSectionUp,
  setSelected,
  setAction,
}) {
  const [openIndex, setOpenIndex] = useState(-1);
  const handleDrop = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const [filteredData, setFilteredData] = useState(data?.result);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = data?.result.filter((item) =>
      item.nombreUsuario.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };
  useEffect(() => {
    if (data?.result !== undefined) {
      setFilteredData(data?.result);
    }
  }, [data?.result, setFilteredData]);

  TablaComponent.propTypes = {
    data: PropTypes.object, // Cambia el tipo según lo que corresponda
    isLoading: PropTypes.bool.isRequired,
    loadingSave: PropTypes.bool.isRequired,
    setToggle: PropTypes.func,
    editar: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    setAction: PropTypes.func.isRequired,
    goSectionUp: PropTypes.func.isRequired,
  };
  return (
    <Container
      style={{
        margin: 15,
        padding: 20,
        borderRadius: 12,
      }}
    >
      {isLoading || loadingSave ? (
        <>
          <SpinnerTables />
        </>
      ) : (
        <>
          <div>
            <Search
              placeholder="Buscar Usuario..."
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
            }}
          >
             <Column
              title="Id Usuario"
              dataIndex="idUsuario"
              key="idUsuario"
              
            />
            <Column
              title="Nombre Usuario"
              dataIndex="nombreUsuario"
              key="nombreUsuario"
             
            />
            <Column
              title="Rol de usuario"
              dataIndex="nombreRol"
              key="nombreRol"
              
            />
            <Column
              title="Empleado"
              dataIndex="empleado"
              key="empleado"
              
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
                      }
                    >
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
                <div style={{ width: 90, zIndex: 100 }}>
                  <ButtonIcon
                    onMouseUp={() => {
                      setSelected(record);
                      setAction(
                        record.idEstadoRegistro === 1 ? "Desactivar" : "Activar"
                      );
                      handleDrop(record.idUsuario);
                    }}
                  >
                    <IoEllipsisVerticalSharp size={22} />
                  </ButtonIcon>
                  <DropdownContenttabla open={openIndex === record.idUsuario}>
                    <OutsideClick>
                      {/*----------VIEW BUTTON:----------*/}
                   
                      {/*----------EDIT BUTTON:----------*/}
                      <ButtonIconMenuTalba
                        onClick={() => {
                          handleDrop(-1);
                          editar(record);
                          console.log(record);
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
