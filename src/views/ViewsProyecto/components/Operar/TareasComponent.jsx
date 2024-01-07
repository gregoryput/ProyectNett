import {
  BtnEstadoCompleto,
  BtnEstadoEnCuros,
  BtnEstadoPendiente,
  BtnSelectt,
  Container,
  ContainerDetail,
  ContainerList,
} from "../../../../components";

import { IoClipboardOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useUpdateEstadoTareaMutation } from "../../../../redux/Api/proyectoApi";
TareasComponent.propTypes = {
  proyecto: PropTypes.array.isRequired,
  setSelectProyecto: PropTypes.func.isRequired,
};

export default function TareasComponent({ proyecto, setSelectProyecto }) {
  const [selectedTarea, setSelectedTarea] = useState({});
  const [vistaTareaKey, setVistaTareaKey] = useState(0); // Agrega una clave para forzar la actualización
  const maxCharacters = 22;
  useEffect(() => {
    setSelectProyecto(proyecto[0]?.IdProyecto);
    setSelectedTarea({});
  }, [proyecto, setSelectProyecto]);
  const [
    UpdateEstadoTarea,
    // { isLoading: isLoadingCreate, isSuccess: isCreateSuccess, isError: isErrorCreate },
  ] = useUpdateEstadoTareaMutation();

  const renderText = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };

  const update = (IdProyecto, IdTarea, IdEstado) => {
    UpdateEstadoTarea({ IdProyecto, IdTarea, IdEstado });
  };

  useEffect(() => {
    setVistaTareaKey((prevKey) => prevKey + 1);
  }, [selectedTarea]);
  return (
    <>
      <Container
        style={{ marginInline: 5, marginBlock: 5, marginTop: 10, height: 250 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex" }}>
            <IoClipboardOutline size={20} style={{ marginRight: 5 }} />
            <h4>Tareas</h4>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 12,
            padding: 5,
            justifyContent: "space-between",
          }}
        >
          <p style={{ marginRight: 30 }}>Tareas</p>
          <p>Tiempo estimado</p>
          <p style={{ marginInline: 30 }}>Estado</p>
        </div>
        <ContainerDetail
          style={{
            overflow: "auto",
            height: "80%",
            padding: 0,
            borderRadius: "0",
          }}
        >
          {proyecto[0]?.TareasProyecto.map((item, key) => (
            <BtnSelectt
              isSelected={selectedTarea.IdTarea == item.IdTarea ? true : false}
              style={{
                width: "98%",
                display: "flex",
                flexDirection: "row",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={key}
              onClick={() => setSelectedTarea(item)}
            >
              <div
                style={{
                  display: "flex",
                  width: "33%",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>{renderText(item.NombreTarea)}</h4>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 15,
                  fontSize: 12,
                  width: "20%",
                }}
              >
                <p>{item.TiempDuracionEstimado }</p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 70,
                  fontSize: 12,
                }}
              >
                <p>{item.EstadoTarea}</p>
              </div>
            </BtnSelectt>
          ))}
        </ContainerDetail>
      </Container>
      <Container style={{ marginInline: 5 }}>
        <h4>Vista tarea</h4>
        {selectedTarea?.NombreTarea != undefined ? (
          <>
            <ContainerDetail style={{ margin: 0, padding: 10 }}>
              <ContainerList
                style={{
                  margin: 5,
                  padding: 10,
                  color: "black",
                  backgroundColor: "white",
                  gap: 15,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <b>Tipo de tarea</b>
                <p>
                  {selectedTarea.CostoPorParametro != undefined
                    ? "Avanzada"
                    : "Basica"}
                </p>
              </ContainerList>
              <ContainerList
                style={{
                  display: "flex",
                  margin: 5,
                  padding: 10,
                  color: "black",
                  backgroundColor: "transparent",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <b>Prioridad</b>
                  <p>{selectedTarea.NombrePrioridad}</p>
                </div>
                <div>
                  <b>Titulo</b>
                  <p>{selectedTarea.NombreTarea}</p>
                </div>
                <div style={{ display: "flex", gap: 20, color: "black" }}>
                  <b>Estado</b>
                  <div>
                    {selectedTarea.EstadoTarea == "Pendiente" ? (
                      <div style={{paddingInline:10 , borderRadius: 12 , backgroundColor:"#f94a3e", color:"white",paddingBlock:2}}>
                      <b> {selectedTarea.EstadoTarea}</b>
                      </div>
                    ) : selectedTarea.EstadoTarea == "En progreso" ? (
                      <div style={{paddingInline:10 , borderRadius: 12 , backgroundColor:"#3a0ae7", color:"white",paddingBlock:2}}>
                      <b> {selectedTarea.EstadoTarea}</b>
                      </div>
                    ) : (
                      <div style={{paddingInline:10 , borderRadius: 12 , backgroundColor:"#21f575", color:"white",paddingBlock:2}}>
                      <b> {selectedTarea.EstadoTarea}</b>
                      </div>
                    )}
                  </div>
                </div>
              </ContainerList>
              <ContainerList
                style={{
                  margin: 5,
                  padding: 10,
                  color: "black",
                  backgroundColor: "white",
                  gap: 5,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <b>Descripcion</b>
                  <p>{selectedTarea.Descripcion}</p>
                </div>
                <div>
                  <b>Tipo de servicio</b>
                  <p>{selectedTarea.NombreServicio}</p>
                </div>
              </ContainerList>

              <ContainerList
                style={{
                  margin: 5,
                  padding: 10,
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 40,
                    backgroundColor: "white",
                  }}
                >
                  <div>
                    <b>Fecha inicio</b>
                    <p>
                      {dayjs(selectedTarea.FechaInicio).format("DD-MM-YYYY")}
                    </p>
                  </div>
                  <div>
                    <b>Fecha Final</b>
                    <p>
                      {dayjs(selectedTarea.FechaFinalizacion).format(
                        "DD-MM-YYYY"
                      )}
                    </p>
                  </div>
                  <div>
                    <b>Duración</b>
                    <p>{selectedTarea.TiempDuracionEstimado}</p>
                  </div>
                  <div>
                    <b>Fecha Terminado</b>
                    <p>
                      {selectedTarea.FechaRealDeFinalizacion != null  ? dayjs(selectedTarea.FechaRealDeFinalizacion).format(
                        "DD-MM-YYYY"
                      ) : "No Terminada"}
                    </p> 
                  </div>
                </div>
              </ContainerList>
              <ContainerList
                style={{
                  margin: 5,
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                 
                }}
              >
                <h4>Estado</h4>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <BtnEstadoPendiente
                    isSelected={selectedTarea.IdEstadoTarea == 1 ? true : false}
                    style={{
                      borderRadius: "12px",
                      width: "100px",
                      padding: "5px 5px",
                      marginInline: 5,
                    }}
                    onClick={() =>
                      update(proyecto[0]?.IdProyecto, selectedTarea.IdTarea, 1)
                    }
                  >
                    Pendiente
                  </BtnEstadoPendiente>
                  <BtnEstadoEnCuros
                    isSelected={selectedTarea.IdEstadoTarea == 2 ? true : false}
                    style={{
                      borderRadius: "12px",
                      width: "100px",
                      padding: "5px 5px",
                      marginInline: 5,
                    }}
                    onClick={() =>
                      update(proyecto[0]?.IdProyecto, selectedTarea.IdTarea, 2)
                    }
                  >
                    En curso
                  </BtnEstadoEnCuros>
                  <BtnEstadoCompleto
                    isSelected={selectedTarea.IdEstadoTarea == 3 ? true : false}
                    style={{
                      borderRadius: "12px",
                      width: "100px",
                      padding: "5px 5px",
                      marginInline: 5,
                    }}
                    onClick={() =>
                      update(proyecto[0]?.IdProyecto, selectedTarea.IdTarea, 3)
                    }
                  >
                    Completo
                  </BtnEstadoCompleto>
                </div>
              </ContainerList>
            </ContainerDetail>
          </>
        ) : (
          <>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                color: "gray",
              }}
            >
              
              <b>no hay tarea seleccionada</b>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}
