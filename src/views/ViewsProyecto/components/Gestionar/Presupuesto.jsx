import { Container } from "../../../../components";
import { Progress, Statistic } from "antd";
import CountUp from "react-countup"

import PropTypes from "prop-types";
Presupuesto.propTypes = {
  proyecto: PropTypes.array.isRequired,
};
export default function Presupuesto({proyecto}) {
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <Container style={{ marginInline: 5}}>
      <h3>Presupuesto</h3>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Statistic title="Total" value={proyecto[0]?.PresupuestoAcordado} formatter={formatter} />
      </div>

      <div style={{ fontSize: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 24,
          }}
        >
          <p>Costo en productos:</p>
          <span>RD$ {formatter(proyecto[0]?.TotalProducto)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Costo en tareas:</p>
          <span>RD$ {formatter(proyecto[0]?.TotalTarea)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Costo adicional :</p>
          <span>RD$ {formatter(proyecto[0]?.TotalGasto)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          {/* <b>Pagos :</b>
          <Progress percent={50} steps={10} strokeColor={"#87d068"} /> */}
          <br />
        </div>
      
      </div>
    </Container>
  );
}
