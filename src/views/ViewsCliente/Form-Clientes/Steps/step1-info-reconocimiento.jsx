import { Button, DatePicker, Form, Input, Tooltip } from "antd";
import { ContainerFormAntd } from "../../../../components";

import { MdHelpOutline } from "react-icons/md";

import PropTypes from "prop-types"; // Importa PropTypes

export default function Step1InfoReconocimiento(props) {
  // Definir PropTypes para las props del componente
  Step1InfoReconocimiento.propTypes = {
    setItemsSteps: PropTypes.array.isRequired,
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  return (
    <ContainerFormAntd layout={"vertical"}>
      <div style={{ marginTop: "15px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              width: "350px",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Información de identificación del cliente
          </h3>
          <Tooltip title="Con esta información se puede identificar a cada cliente, se asigna un código único, la fecha en que inicio a ser cliente de GESTNETT y un nombre (apodo, nombre comercial, etc).">
            <MdHelpOutline size={30} color={"#D4D4D8"} />
          </Tooltip>
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            style={{ width: "32%" }}
            name={"codigo"}
            label={<strong>Código:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"nombreCliente"}
            label={<strong>Nombre comercial:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"fechaInicioCliente"}
            label={<strong>Fecha de inicio como cliente:</strong>}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <Button>Cancelar</Button>
        <Button
          type="primary"
          color="#5592E7"
          onClick={() => {
            //Mando la data y el paso en el que se esta
            props.onSuccess({ data: "data" }, 1);
          }}
        >
          Siguiente
        </Button>
      </div>
    </ContainerFormAntd>
  );
}
