import CountUp from "react-countup";
import { Container } from "../../../../components";
import dayjs from "dayjs";

import PropTypes from "prop-types";
Tiempo.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function Tiempo({proyecto}) {
  const formatter = (value) => <CountUp end={value} separator="," />;
   console.log(proyecto);
  return (
    <Container style={{ marginInline: 5 ,marginTop:0}}>
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
          <h2>{dayjs(proyecto[0]?.FechaDeFinalizacion).format("DD-MM-YYYY")}</h2>
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
          <span>{dayjs(proyecto[0]?.FechaDeInicio).format("DD-MM-YYYY")}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Fecha de proyecion</p>
          <span>{dayjs(proyecto[0]?.FechaDeFinalizacion).format("DD-MM-YYYY")}</span>
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
