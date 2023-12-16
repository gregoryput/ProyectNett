import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Tooltip,
} from "antd";
import { ContainerFormAntd } from "../../../../components";

import PropTypes from "prop-types"; // Importa PropTypes
import { MdHelpOutline } from "react-icons/md";
import { GroupContext } from "antd/es/checkbox/Group";

export default function Step2Representantes(props) {
  // Definir PropTypes para las props del componente
  Step2Representantes.propTypes = {
    setItemsSteps: PropTypes.array.isRequired,
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
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
              width: "400px",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Designación del representante de la empresa
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
            label={<strong>Nombres:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"nombreCliente"}
            label={<strong>Apellidos:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"nombreCliente"}
            label={<strong>Cédula:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"codigo"}
            label={<strong>Teléfono 1:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"nombreCliente"}
            label={<strong>Teléfono 2:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"nombreCliente"}
            label={<strong>Correo:</strong>}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"fechaInicioCliente"}
            label={<strong>Fecha de nacimiento:</strong>}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"fechaInicioCliente"}
            label={<strong>Ciudad:</strong>}
          >
            <Select />
          </Form.Item>

          <Form.Item
            style={{ width: "32%" }}
            name={"fechaInicioCliente"}
            label={<strong>Sexo:</strong>}
          >
            <GroupContext>
              <Checkbox>Masculino</Checkbox>
              <Checkbox>Femeinino</Checkbox>
            </GroupContext>
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
