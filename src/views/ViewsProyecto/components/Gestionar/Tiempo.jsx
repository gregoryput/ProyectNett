import CountUp from "react-countup";
import { Container } from "../../../../components";
import dayjs from "dayjs";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
Tiempo.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function Tiempo({ proyecto }) {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const [p, setB] = useState({});
  useEffect(() => {
    if (proyecto) {
      const resultado = analizarProyecto(proyecto);
      setB(resultado);
    }
  }, [proyecto]);

  function analizarProyecto(proyecto) {
    const fechaInicio = new Date(proyecto.FechaDeInicio);
    const fechaFinal = new Date(proyecto.FechaDeFinalizacion);
    const fechaFinalReal = proyecto.TareasProyecto.reduce((maxFecha, tarea) => {
      const fechaReal = tarea.FechaRealDeFinalizacion
        ? new Date(tarea.FechaRealDeFinalizacion)
        : null;
      return fechaReal && fechaReal > maxFecha ? fechaReal : maxFecha;
    }, new Date(0));

    const diasTrazados = Math.ceil(
      (fechaFinal - fechaInicio) / (1000 * 60 * 60 * 24)
    );
    const diasSobrantes = Math.max(
      0,
      diasTrazados - proyecto.TareasProyecto.length
    );
    const diasAtrasados =
      fechaFinalReal && fechaFinalReal > fechaFinal
        ? Math.ceil((fechaFinalReal - fechaFinal) / (1000 * 60 * 60 * 24))
        : 0;

    let proyeccionReal = new Date(fechaFinal);

    if (diasSobrantes > 0) {
      proyeccionReal.setDate(proyeccionReal.getDate() - diasSobrantes);
    } else if (diasAtrasados > 0) {
      proyeccionReal.setDate(proyeccionReal.getDate() + diasAtrasados);
    }

    const totalDiasProyecto = diasTrazados;

    return {
      diasSobrantes,
      diasAtrasados,
      proyeccionReal: proyeccionReal.toISOString().split("T")[0],
      totalDiasProyecto,
    };
  }


  return (
    <Container style={{ marginInline: 5, marginTop: 0 }}>
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
          <h2>{dayjs(proyecto?.FechaDeFinalizacion).format("DD-MM-YYYY")}</h2>
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
          <span>{dayjs(proyecto?.FechaDeInicio).format("DD-MM-YYYY")}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Fecha de proyección</p>
          <span>{dayjs(p.proyeccionReal).format("DD-MM-YYYY")}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Dias atrazados :</p>
          <span>{formatter(p.diasAtrasados)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 8,
          }}
        >
          <p>Dias extras :</p>
          <span>{formatter(p.diasSobrantes)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <p>Dias total :</p>
          <span>{formatter(p.totalDiasProyecto)}</span>
        </div>
      </div>
    </Container>
  );
}
