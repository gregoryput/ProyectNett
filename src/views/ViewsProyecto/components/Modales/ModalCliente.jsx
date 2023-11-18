import { List, Modal } from "antd";
import Search from "antd/es/input/Search";
import PropTypes from "prop-types";
import { BtnSelect, ContainerDetail } from "../../../../components";


ModalCliente.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  filteredData: PropTypes.func.isRequired,
  llenarCampo: PropTypes.func.isRequired,
  CloseModalCliente: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
export default function ModalCliente({
  isModalOpen,
  filteredData,
  llenarCampo,
  CloseModalCliente,
  handleSearch,
}) {
  return (
    <>
      {" "}
      <Modal
        open={isModalOpen}
        footer={null}
        width={900}
        onCancel={CloseModalCliente}
        title={"Elige el cliente"}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Search
            placeholder="Buscar Cliente..."
            style={{
              width: 304,
              marginTop: 10,
              marginBottom: 40,
            }}
            allowClear
            onSearch={handleSearch}
          />
        </div>

        <ContainerDetail
          style={{ overflow: "auto", height: 400, padding: 0, margin: 0 }}
        >
          <List
            dataSource={filteredData}
            renderItem={(item) => (
              <>
                <BtnSelect
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                  onClick={() => llenarCampo(item)}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "5%",
                    }}
                  >
                    <h4>ID</h4>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {item.idCliente}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                      textAlign: "left",
                    }}
                  >
                    <h4>Nombre</h4>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {item.nombres + " " + item.apellidos}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "30%",
                    }}
                  >
                    <h4>Cedula</h4>

                    <p style={{ fontSize: 12, color: "gray" }}>{item.cedula}</p>
                  </div>
                </BtnSelect>
              </>
            )}
          />
        </ContainerDetail>
      </Modal>
    </>
  );
}
