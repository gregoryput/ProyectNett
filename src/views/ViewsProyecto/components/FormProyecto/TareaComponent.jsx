import { useState } from "react";
import {
  BtnSelect,
  ButtonIconDelete,
  ButtonNext,
  ContainerDetail,
} from "../../../../components";
import { List, Popover, Collapse } from "antd";
import { IoRemoveSharp, IoAddOutline, IoCloseSharp } from "react-icons/io5";
import ModalTarea from "../Modales/ModalTarea";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useEffect } from "react";
ComponentTarea.propTypes = {
  tarea: PropTypes.func.isRequired,
  setTarea: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};
export default function ComponentTarea({ tarea, setTarea, value }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {" "}
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
       {value.length >=1 ? <>
        <ButtonNext
          style={{ paddingInline: 10 }}
          
          type="button"
          onClick={() => OpenModal()}
        >
          Agregar
        </ButtonNext></> : null}
      </div>
      <div style={{ display: "flex" }}>
        <ContainerDetail
          style={{
            overflow: "auto",
            maxHeight: 400,
            padding: 0,
            margin: 0,
            borderRadius:0,
          }}
        >
          <List
            dataSource={value}
            renderItem={(item) => (
              <Collapse
                bordered
                style={{border:0}}
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
      <ModalTarea
        CloseModal={CloseModal}
        isModalOpen={isModalOpen}
        setTarea={setTarea}
        tarea={tarea}
      />
    </>
  );
}

function ListaDeTarea({ tarea, setTarea, item }) {
  const [activo, setActivo] = useState(false);
  const [ver, setVer] = useState(false);
  const [datafilter, setDatafilter] = useState([]);

  useEffect(() => {
    const filtrado = tarea.filter((data) => data.Servicio === item);
    setDatafilter(filtrado);
  }, [tarea, item]);
  const maxCharacters = 20;
  const Remover = (item) => {
    // Filtrar todos los elementos excepto el que coincide con el id
    const updatedProductos = tarea.filter((data) => data.id !== item);
    setTarea(updatedProductos);
  };

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
  };

  return (
    <>
      <List
        bordered
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
                gap: "5px",
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
                <p>
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
                <h4>Tareas</h4>

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
    </>
  );
}



