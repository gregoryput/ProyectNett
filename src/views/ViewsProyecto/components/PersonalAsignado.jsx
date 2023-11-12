import { Progress, Statistic } from "antd";
import CountUp from "react-countup";
import {
  ButtonIconBorder,
  ContainerDetail,
  ContainerList,
} from "../../../components";
const data = [
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
];

export default function PersonalAsignado() {
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div style={{ border: "none", margin: 0, padding: 0 ,width:"auto"}}>
      <ContainerList>
        <h4>Personal asignado</h4>

        <ContainerDetail style={{ overflow: "auto", height: 200, padding: 0 }}>
          {data.map((item, key) => (
            <ButtonIconBorder
              style={{
                width: "100%",
                textAlign: "justify",
                justifyContent: "normal",
              }}
              key={key}
            >
              {item}
            </ButtonIconBorder>
          ))}
        </ContainerDetail>
      </ContainerList>
      <ContainerList>
        <h3>Presupuesto</h3>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Statistic title="Total" value={4500000} formatter={formatter} />
        </div>

        <div style={{ fontSize: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 15,
            }}
          >
            <p>Costo en productos:</p>
            <span>RD$  {formatter(150000)}</span>
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
            <Progress percent={50} steps={10} strokeColor={"green"} />
          </div>
        </div>
      </ContainerList>
    </div>
  );
}
