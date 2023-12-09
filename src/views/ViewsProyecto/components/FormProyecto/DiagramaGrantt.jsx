import {
  format,
  addDays,
  startOfMonth,
  differenceInWeeks,
  endOfMonth,
  addMonths,
} from "date-fns"; // Agregué 'differenceInDays'
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Colores } from "../../../../components/GlobalColor";
import {
  Barra,
  ContainerDetail,
  TablaStyled,
  Td,
  Tda,
  Th,
  Tha,
} from "../../../../components";
import { Fragment } from "react";

export default function DiagramaGrantt({ tarea, selectedDate }) {
  const obtenerFechaMasDistante = (tarea) => {
    // Obtener las fechas
    const fechas = tarea.map((fecha) => fecha?.Fechas[1].$d);

    // Encontrar la fecha más distante
    const fechaMasDistante = fechas.reduce((fechaDistante, fechaActual) => {
      return fechaActual > fechaDistante ? fechaActual : fechaDistante;
    }, fechas[0]);

    // Sumar un mes a la fecha más distante
    const fechaFinal = new Date(fechaMasDistante);
    fechaFinal.setMonth(fechaFinal.getMonth() + 1);

    return fechaFinal;
  };

  const fechaMasDistantePrimeraTarea = obtenerFechaMasDistante(tarea);
  const fechaInicio = new Date(dayjs(selectedDate?.$d).format("YYYY-MM-DD"));
  const fechaFin = new Date(fechaMasDistantePrimeraTarea);

  const generarEscaladeTiempo = (fechaInicio, fechaFin) => {
    const escaladeTiempo = [];
    let currentDate = startOfMonth(new Date(fechaInicio));

    while (currentDate <= fechaFin) {
      const year = format(currentDate, "yyyy");
      const month = format(currentDate, "MM");
      const weeksInMonth =
        differenceInWeeks(endOfMonth(currentDate), currentDate) + 1;

      for (let week = 1; week <= weeksInMonth; week++) {
        escaladeTiempo.push({
          ano: year,
          mes: month,
          semana: week,
        });
      }

      currentDate = addMonths(currentDate, 1);
    }

    return escaladeTiempo;
  };

  const obtenerMesesUnicos = (tiempos) => [
    ...new Set(tiempos.map((tiempo) => `${tiempo.ano}-${tiempo.mes}`)),
  ];

  const tiempos = generarEscaladeTiempo(fechaInicio, fechaFin);
  const uniqueYearsAndMonths = obtenerMesesUnicos(tiempos);

  const mesesDelAnio = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const filtrar = (index) => mesesDelAnio[index - 1];

  const calcularDiferenciaEnDias = (fechaInicio, fechaFin) => {
    // Convertir las fechas a objetos de fecha
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Verificar si las fechas son iguales
    if (inicio.toDateString() === fin.toDateString()) {
      return 1;
    }

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = fin - inicio;

    // Calcular la diferencia en días
    const diferenciaEnDias = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diferenciaEnDias;
  };
  const maxCharacters = 15;
  const renderDireccion = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };

  return (
    <ContainerDetail
      style={{
        marginBlock: 5,
        marginInline: 5,
        maxWidth: "60vw",
        overflow: "auto",
        minHeight: 200,
      }}
    >
      <TablaStyled>
        <thead>
          <tr>
            <Tha>Tareas</Tha>
            {uniqueYearsAndMonths.map((yearMonth) => (
              <Th key={yearMonth} colSpan={4}>
                {filtrar(Number(yearMonth.split("-")[1]))}
                {" - "}
                {yearMonth.split("-")[0]}
              </Th>
            ))}
          </tr>
          <tr>
            <Tha></Tha>
            {uniqueYearsAndMonths.map(() =>
              [1, 2, 3, 4].map((num) => (
                <Th style={{ fontSize: 12 }} key={`${num}`}>
                  {num}
                </Th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {tarea.map((data, key) => (
            <tr key={key}>
              <Tda>{renderDireccion(data.Titulo)}</Tda>
              {uniqueYearsAndMonths.map((yearMonth) => {
                const [year, month] = yearMonth.split("-");
                const mesInicio = new Date(`${month} 01, ${year}`);

                return (
                  <Fragment key={`${year}-${month}`}>
                    {[1, 2, 3, 4].map((num) => {
                      const fechaInicio = dayjs(data.Fechas[0].$d);
                      const fechaFinal = dayjs(data.Fechas[1].$d);
                      const duracion = calcularDiferenciaEnDias(
                        fechaInicio,
                        fechaFinal
                      );
                      
                      let semanaInicio, semanaFin;

                      if (duracion >= 3) {
                        semanaInicio = addDays(mesInicio, (num - 1) * 7);
                        semanaFin = addDays(semanaInicio, 5);
                      }

                      if (duracion <= 2) {
                        semanaInicio = addDays(mesInicio, (num - 1) * 9);
                        semanaFin = addDays(semanaInicio, 7);
                      }

                      const tareaEnSemana =
                        fechaInicio.isBefore(semanaFin) &&
                        fechaFinal.isAfter(semanaInicio);

                      return (
                        <Td
                          key={`${year}-${month}-${num}`}
                          style={{ padding: "auto" }}
                        >
                          {tareaEnSemana && (
                            <Tooltip
                              title={
                                "Tarea:   " +
                                data.Titulo +
                                " - duracion " +
                                `${calcularDiferenciaEnDias(
                                  data.Fechas[0].$d,
                                  data.Fechas[1].$d
                                )} dias `
                              }
                              color={Colores.AzulOscuro}
                              key={key}
                            >
                              <Barra
                                style={{
                                  backgroundColor: Colores.AzulMar, // Asegúrate de que Colores esté definido
                                }}
                              ></Barra>
                            </Tooltip>
                          )}
                        </Td>
                      );
                    })}
                  </Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </TablaStyled>
    </ContainerDetail>
  );
}

DiagramaGrantt.propTypes = {
  tarea: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
};
