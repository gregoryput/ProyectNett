import CountUp from "react-countup";
import { Container } from "../../../components";

export default function Tiempo() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Container style={{ marginInline: 5 }}>
      <h3>Tiempo</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",

          marginTop: 3,
        }}
      >
        <div style={{ flexDirection: "column" }}>
          <p style={{ fontSize: 12, color: "gray" }}>
            Fecha de entrega estimada
          </p>
          <h2>05-06-2024</h2>
        </div>
      </div>

      <div style={{ fontSize: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 15,
          }}
        >
          <p>Fecha inicio:</p>
          <span>05/01/2024</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Fecha de proyecion</p>
          <span>05/01/2024</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Dias atrazados :</p>
          <span>{formatter(0)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Dias extras :</p>
          <span>{formatter(0)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Dias total :</p>
          <span>{formatter(0)}</span>
        </div>
      </div>
    </Container>
  );
}
