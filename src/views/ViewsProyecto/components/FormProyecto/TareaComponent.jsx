import { useState } from "react";
import { BtnSelect, ButtonIconDelete, ButtonNext, Container, ContainerDetail } from "../../../../components";

import {
    IoRemoveSharp,
    IoAddOutline,
    IoCloseSharp,
    IoCalendarClearOutline,
  } from "react-icons/io5";

export default function ComponentTarea() {
  const [activo, setActivo] = useState(false);
  const [ver, setVer] = useState(false);

  const dd = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 6 },
    { id: 9 },
    { id: 10 },
  ];
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
        <ButtonNext style={{ paddingInline: 10 }} type="button">
          Agregar
          <IoCalendarClearOutline size={22} style={{ marginInline: 5 }} />
        </ButtonNext>
      </div>
      <div>
        <ContainerDetail
          style={{
            overflow: "auto",
            height: 400,
            padding: 0,
            margin: 0,
            marginTop: 10,
            width: "100%",
          }}
        >
          {dd.map((item, key) => (
            <BtnSelect
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "default",
              }}
              type="button"
              key={key}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: " 0.5fr 1fr 3fr repeat(4, 1fr)",
                  gridTemplateRows: "1fr",
                  gridColumnGap: "0px",
                  gridRowGap: "0px",
                  textAlign: "left",
                  width: "100%",
                }}
              >
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
                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    flexDirection: "column",
                  }}
                >
                  <h4> Prioridad</h4>
                  <p>baja</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    flexDirection: "column",
                  }}
                >
                  <h4>Tareas</h4>

                  <p style={{ fontSize: 12, color: "gray" }}>
                    Cableado edificio 1
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    flexDirection: "column",
                  }}
                >
                  <h4>Duracion</h4>

                  <p style={{ fontSize: 12, color: "gray" }}>1 dias</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    textAlign: "left",
                    flexDirection: "column",
                  }}
                >
                  <h4>Costo</h4>

                  <p style={{ fontSize: 12, color: "gray" }}> RD$ 4,500</p>
                </div>
                <div style={{ textAlign: "left", width: "100%" }}>
                  <h4>Descripcion</h4>
                  <p style={{ fontSize: 12, color: "gray", width: 400 }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem unde omnis, molestias ullam quidem quisquam ratione,
                    nobis sequi quia maiores, voluptas ipsa tenetur
                    exercitationem aspernatur fugit ducimus sint fuga saepe!
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ButtonIconDelete type="button">
                    <IoCloseSharp size={20} color="gray" />
                  </ButtonIconDelete>
                </div>
              </div>

              {activo == item.id && ver === true ? (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    margin: 10,
                    flexDirection: "column",
                  }}
                >
                  {" "}
                  <Container>
                    <div style={{ fontSize: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <b>Parametro</b>
                        <span>Metro</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: 8,
                        }}
                      >
                        <b>Cantidad</b>
                        <span>2</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: 8,
                        }}
                      >
                        <b>Costo</b>
                        <span>2</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: 8,
                        }}
                      >
                        <b>Total</b>
                        <span>1600</span>
                      </div>
                    </div>
                  </Container>
                  <ContainerDetail
                    style={{
                      marginInline: 10,
                      marginTop: 0,
                      height: "auto",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginTop: 0,
                      }}
                    >
                      <b>Producto</b>
                      <b>Cantidad</b>
                    </div>
                    {dd.map(() => (
                      <>
                        <div
                          style={{
                            fontSize: 12,
                            marginInline: 10,
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingTop: 15,
                            }}
                          >
                            <span>Cable UTP</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingTop: 8,
                            }}
                          >
                            <span>2</span>
                          </div>
                        </div>
                      </>
                    ))}
                  </ContainerDetail>
                </div>
              ) : null}
            </BtnSelect>
          ))}
        </ContainerDetail>
        <div>
          <p>Total: {dd.length}</p>
        </div>
      </div>
    </>
  );
}
