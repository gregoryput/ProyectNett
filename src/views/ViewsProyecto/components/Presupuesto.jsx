import { Progress, Statistic } from "antd";
import { Container } from "../../../components";
import CountUp from "react-countup"

export default function Presupuesto() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Container style={{ marginInline: 5}}>
      <h3>Presupuesto</h3>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Statistic title="Total" value={450000} formatter={formatter} />
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
          <span>RD$ {formatter(150000)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Costo en tareas:</p>
          <span>RD$ {formatter(250000)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Costo adicional :</p>
          <span>RD$ {formatter(50000)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <b>Pagos :</b>
          <Progress percent={50} steps={10} strokeColor={"#87d068"} />
        </div>
      
      </div>
    </Container>
  );
}
