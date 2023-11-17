import { Cascader, DatePicker, Form, Input, List, Table, Tag } from "antd";
import {
  BtnSelect,
  ButtonAdd,
  ButtonIconDelete,
  Container,
  ContainerDetail,
} from "../../../components";

import {
  IoPersonAddOutline,
  IoRemoveSharp,
  IoAddOutline,
  IoCloseSharp,
} from "react-icons/io5";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
const { SHOW_CHILD } = Cascader;

const options = [
  {
    label: "Light",
    value: "light",
    children: new Array(20).fill(null).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: "Bamboo",
    value: "bamboo",
    children: [
      {
        label: "Little",
        value: "little",
        children: [
          {
            label: "Toy Fish",
            value: "fish",
          },
          {
            label: "Toy Cards",
            value: "cards",
          },
          {
            label: "Toy Bird",
            value: "bird",
          },
        ],
      },
    ],
  },
];

export default function FormularioProyecto() {
  return (
    <div style={{ width: "100%", height: "100%", marginTop: 0, margin: 0 }}>
      <Container
        style={{
          marginInline: 5,
          marginTop: 0,
          marginBottom: 5,
          height: 70,
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2>Creacion de proyecto</h2>
      </Container>
      <ContainerDetail
        style={{
          margin: 0,
          padding: 0,
          height: "82vh",
          overflow: "auto",
        }}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Container
            style={{
              marginInline: 5,
              marginBlock: 5,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <h3>Tipo de servicio</h3>
            <div style={{ width: 400 }}>
              <Cascader
                style={{
                  width: "100%",
                }}
                options={options}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
                defaultValue={[
                  ["bamboo", "little", "fish"],
                  ["bamboo", "little", "cards"],
                  ["bamboo", "little", "bird"],
                ]}
              />
            </div>
          </Container>
          <Container style={{ marginInline: 5, marginBlock: 5, width: "100%" }}>
            <h3>Informacion basica</h3>
            <Form.Item
              label={<strong>Nombre:</strong>}
              style={{ width: 200, marginTop: 30 }}
              name={"nombre"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el nombre del producto",
                },
                {
                  max: 55,
                  message: "55 caracteres como máximo",
                },
                {
                  min: 3,
                  message: "30 caracteres como minimo",
                },
              ]}
            >
              <Input placeholder="Ingrese el nombre" />
            </Form.Item>

            <Form.Item
              label={<strong>Descripcion:</strong>}
              style={{ width: 300, marginRight: 10 }}
              name={"Descripcion"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el nombre del producto",
                },
                {
                  max: 55,
                  message: "55 caracteres como máximo",
                },
                {
                  min: 3,
                  message: "30 caracteres como minimo",
                },
              ]}
            >
              <TextArea placeholder="Ingres una descripcion" />
            </Form.Item>

            <Form.Item
              label={<strong>Seleccionar cliente:</strong>}
              style={{ width: 200, marginTop: 30 }}
              name={"nombre"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el nombre del producto",
                },
                {
                  max: 55,
                  message: "55 caracteres como máximo",
                },
                {
                  min: 3,
                  message: "30 caracteres como minimo",
                },
              ]}
            >
              <div style={{ display: "flex" }}>
                <Input disabled="true" placeholder="Cliente" />
                <ButtonAdd style={{ width: 40, marginLeft: 10 }} type="button">
                  <IoPersonAddOutline size={18} />
                </ButtonAdd>
              </div>
            </Form.Item>

            <Form.Item
              label={<strong>fecha de inicio del proyecto:</strong>}
              style={{ width: 300, marginTop: 30 }}
              name={"fecha"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el nombre del producto",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <ComponentTarea />
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <TablaProducto />
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <h3>Equipo</h3>
          </Container>
        </Form>
      </ContainerDetail>
    </div>
  );
}

function TablaProducto() {
  /// cosa de la tabla de productos

  const columns = [
    {
      title: "Código",
      dataIndex: "Código",
      key: "Código",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Precio Costo",
      dataIndex: "precioCosto",
      key: "precioCosto",
      width: "120px",
    },
    {
      title: "Precio Venta",
      dataIndex: "precioVenta",
      key: "precioVenta",
      width: "120px",
    },
    {
      title: "ITBIS",
      dataIndex: "itbis",
      key: "itbis",
      width: "120px",
    },
    {
      title: "Unidad de Medida",
      dataIndex: "unidadNombre",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidadDisponible",
      key: "cantidadDisponible",
      editable: true,
      render: (_, record, index) => (
        <>
          {record.idEstado === "Sin entradas" ||
          record.idEstado === "Agotado" ? (
            <Tag
              key={`State ${record.idEstado} ${index}`}
              color={
                record.idEstado === 1
                  ? "#F7BA76"
                  : record.idEstado === 2
                  ? "#304878"
                  : "#FF4D4D"
              }
            >
              {record.estadoNombre}
            </Tag>
          ) : (
            <span>{record.cantidadDisponible}</span>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h3>Productos</h3>
        <ButtonAdd style={{ width: 150 }} type="button">
          Agregar tarea
        </ButtonAdd>
      </div>

      <Table dataSource={null} columns={columns} />
    </>
  );
}

function ComponentTarea() {
  const [activo, setActivo] = useState(false);
  const [ver, setVer] = useState(false);

  const dd = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h3>Tareas</h3>
        <ButtonAdd style={{ width: 150 }} type="button">
          Agregar tarea
        </ButtonAdd>
      </div>
      <div>
        <ContainerDetail
          style={{
            overflow: "auto",
            height: 350,
            padding: 0,
            margin: 0,
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
