import { useState } from "react";
import {
  BtnSelect,
  ButtonIconDelete,
  ButtonNext,
  ContainerDetail,
} from "../../../../components";
import { List, Popover, Collapse, message } from "antd";
import {
  IoRemoveSharp,
  IoAddOutline,
  IoCloseSharp,
  IoClipboardOutline,
} from "react-icons/io5";
import ModalTarea from "../Modales/ModalTarea";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useEffect } from "react";
import DiagramaGrantt from "./DiagramaGrantt";
import { Statistic } from "antd";
import CountUp from "react-countup";

ComponentTarea.propTypes = {
  tarea: PropTypes.func.isRequired,
  setTarea: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  selectedDate: PropTypes.func.isRequired,
  setTotalServicios: PropTypes.func.isRequired,
  setFechaFinal: PropTypes.func.isRequired,
};
export default function ComponentTarea({
  tarea,
  setTarea,
  value,
  selectedDate,
  setTotalServicios,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const formatter = (value) => <CountUp end={value} separator="," />;
  const OpenModal = () => {
    if (value <= 0) {
      messageApi.open({
        type: "warning",
        content: "No tiene servicios agregados ",
      });
    } else {
      setIsModalOpen(true);
    }
  };
  // Función para sumar los totales de los objetos
  const sumarTotales = (objetos) => {
    let totalGeneral = 0;
    let totalesPorServicio = {};

    objetos.forEach((objeto) => {
      if (objeto.Total) {
        // Objeto con estructura regular
        totalGeneral += objeto.Total;
        if (!totalesPorServicio[objeto.Servicio]) {
          totalesPorServicio[objeto.Servicio] = 0;
        }
        totalesPorServicio[objeto.Servicio] += objeto.Total;
      } else if (objeto.Precio) {
        // Objeto solo con precio
        totalGeneral += objeto.Precio;
        if (!totalesPorServicio[objeto.Servicio]) {
          totalesPorServicio[objeto.Servicio] = 0;
        }
        totalesPorServicio[objeto.Servicio] += objeto.Precio;
      }
    });

    return { totalGeneral, totalesPorServicio };
  };
 // Llamada a la función
 const resultado = sumarTotales(tarea);

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
    setTotalServicios(resultado.totalGeneral);
  },[resultado])

  
  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          marginBottom: 40,
        }}
      >
        <h3>Tareas</h3>

        <>
          <ButtonNext
            style={{ paddingInline: 10 }}
            type="button"
            onClick={() => OpenModal()}
          >
            Agregar
          </ButtonNext>
        </>
      </div>
      <div style={{ display: "flex" }}>
        <ContainerDetail
          style={{
            overflow: "auto",
            maxHeight: 400,
            padding: 0,
            margin: 0,
            borderRadius: 0,
          }}
        >
          <List
            bordered
            style={{ border: "none" }}
            dataSource={value}
            renderItem={(item) => (
              <Collapse
                bordered
                style={{
                  border: "none",
                  borderTop: "none",
                  borderBottom: "none",
                }}
                collapsible="header"
                items={[
                  {
                    key: "1",
                    label: `${
                      item === "1"
                        ? "Asesoría de Personal en el Departamento TIC"
                        : item === "2"
                        ? "Soporte Técnico Remoto y en Sitio"
                        : item === "3"
                        ? "Optimización y Seguridad de Redes"
                        : item === "4"
                        ? "Documentación y Gestión de Infraestructura"
                        : item === "5"
                        ? "Virtualización, Cluster, NAS"
                        : item === "6"
                        ? "Garantía de Transferencia de conocimiento"
                        : null
                    }`,
                    children: (
                      <>
                        <ListaDeTarea
                          setTarea={setTarea}
                          tarea={tarea}
                          item={item}
                          value={value}
                        />
                      </>
                    ),
                  },
                ]}
              />
            )}
          />
        </ContainerDetail>
      </div>

      {value.length >= 1 ? (
        <DiagramaGrantt tarea={tarea} selectedDate={selectedDate} />
      ) : null}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Statistic
          title="Total"
          value={resultado.totalGeneral}
          formatter={formatter}
        />
      </div>

      <ModalTarea
        CloseModal={CloseModal}
        isModalOpen={isModalOpen}
        setTarea={setTarea}
        tarea={tarea}
        value={value}
      />
    </>
  );
}

// componente de lista tarea
function ListaDeTarea({ tarea, setTarea, item, value }) {
  const [activo, setActivo] = useState(false);
  const [ver, setVer] = useState(false);
  const [datafilter, setDatafilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectEdit, setSelectEdit] = useState([]);

  useEffect(() => {
    const filtrado = tarea.filter((data) => data.Servicio === item);
    setDatafilter(filtrado);
  }, [tarea, item]);
  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el id
    const filtrado = tarea.filter((data) => data.id !== item);
    setTarea(filtrado);
  };

  const HandlerUpdate = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el id
    const filtrado = tarea.filter((data) => data.id === item);
    setSelectEdit(filtrado);
    OpenModal();
  };

  const maxCharacters = 20;
  const renderDireccion = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };

  ListaDeTarea.propTypes = {
    tarea: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    item: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
  };

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <List
        bordered
        style={{ border: "none" }}
        dataSource={datafilter}
        renderItem={(item) => (
          <BtnSelect
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "default",
              justifyContent: "center",
            }}
            type="button"
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                textAlign: "left",
                width: "100%",
              }}
            >
              {item.Parametro != undefined ? (
                <>
                  <div
                    onClick={() => {
                      setActivo(item.id), setVer(!ver);
                    }}
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {activo == item.id && ver === true ? (
                      <IoRemoveSharp size={20} color="gray" />
                    ) : (
                      <IoAddOutline size={20} color="gray" />
                    )}
                  </div>
                </>
              ) : null}
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4> Prioridad</h4>
                <p
                  style={{
                    fontSize: 12,
                    color: "gray ",
                  }}
                >
                  {item.Prioridad === "1"
                    ? "Baja"
                    : item.Prioridad === "2"
                    ? "Media"
                    : item.Prioridad === "3"
                    ? "Alta"
                    : null}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Tarea</h4>

                <p
                  style={{
                    fontSize: 12,
                    color: "gray ",
                  }}
                >
                  <Popover
                    placement="topLeft"
                    title={"Tarea"}
                    content={item.Titulo}
                  >
                    {renderDireccion(item.Titulo)}
                  </Popover>
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Fecha inicio</h4>

                <p style={{ fontSize: 12, color: "gray" }}>
                  {dayjs(item.Fechas[0].$d).format("DD/MM/YYYY")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Fecha final</h4>
                <p style={{ fontSize: 12, color: "gray" }}>
                  {dayjs(item.Fechas[1].$d).format("DD/MM/YYYY")}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Precio</h4>

                <p style={{ fontSize: 12, color: "gray" }}>
                  {" "}
                  RD$
                  {item.Costo != null ? item.Total : item.Precio}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Descripcion</h4>
                <p
                  style={{
                    fontSize: 12,
                    color: "gray",
                    flexBasis: "100%",
                    boxSizing: "border-box",
                    maxWidth: 200,
                    overflowWrap: "break-word",
                  }}
                >
                  <Popover
                    placement="top"
                    title={"Descripcion"}
                    content={item.Descripcion}
                    style={{
                      maxWidth: 200,
                      overflowWrap: "break-word",
                    }}
                    width="100"
                  >
                    {renderDireccion(item.Descripcion)}
                  </Popover>
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonIconDelete
                  type="button"
                  onClick={() => HandlerUpdate(item.id)}
                >
                  <IoClipboardOutline size={20} color="gray" />
                </ButtonIconDelete>
                <ButtonIconDelete
                  type="button"
                  onClick={() => Remover(item.id)}
                >
                  <IoCloseSharp size={20} color="gray" />
                </ButtonIconDelete>
              </div>
            </div>

            {activo == item.id && ver === true ? (
              <div
                style={{
                  display: "flex",
                  margin: 0,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      flexDirection: "column",
                    }}
                  >
                    <b>Parametro</b>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {" "}
                      {item.Parametro}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      flexDirection: "column",
                    }}
                  >
                    <b>Cantidad</b>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {" "}
                      {item.Cantidad}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      flexDirection: "column",
                    }}
                  >
                    <b>Costo</b>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {" "}
                      RD${item.Costo}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      flexDirection: "column",
                    }}
                  >
                    <b>Total</b>

                    <p style={{ fontSize: 12, color: "gray" }}>
                      {" "}
                      RD$ {item.Total}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "20%",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
                </div>
              </div>
            ) : null}
          </BtnSelect>
        )}
      />
      <ModalTarea
        CloseModal={CloseModal}
        isModalOpen={isModalOpen}
        setTarea={setTarea}
        tarea={tarea}
        value={value}
        selectEdit={selectEdit}
        setSelectEdit={setSelectEdit}
      />
    </>
  );
}
