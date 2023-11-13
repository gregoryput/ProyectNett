import { ViewContainerPages } from "../../components";
import DescripcionProyecto from "./components/DescripcionProyecto";
import Detalle from "./components/Detalle";
import Pagos from "./components/Pagos";
import PersonalAsignado from "./components/PersonalAsignado";
import Presupuesto from "./components/Presupuesto";
import Productos from "./components/Productos";
import ProgressTarea from "./components/ProgressTarea";
import Servicio from "./components/Servicio";
import TareasProyecto from "./components/TareasProyecto";
import Tiempo from "./components/Tiempo";
import ViewsList from "./components/ViewsList";
import { Col, Row } from "antd";
export default function Proyecto() {
  return (
    <ViewContainerPages>
      <Row>
        <Col>
          <ViewsList />
        </Col>
        <Col flex={1}>
          <ProgressTarea />

          <Row justify="start">
            <Col span={10}>
              <Servicio/>
              <DescripcionProyecto />
              <TareasProyecto />
            </Col>
            <Col span={7}>
              <PersonalAsignado />
              <Tiempo/>
              <Detalle />
            </Col>
            <Col span={7}>
              <Productos />
              <Presupuesto />
              <Pagos />
            </Col>
          </Row>
        </Col>
      </Row>
    </ViewContainerPages>
  );
}
