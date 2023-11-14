import { Tag } from "antd";
import {
  BtnSelect,
  Container,
  ContainerDetail,
} from "../../../../components";

import { IoClipboardOutline, IoRadioButtonOff } from "react-icons/io5";
const data = [
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
];

export default function TareasProyecto() {
  return (
    <>
      <Container style={{ marginInline: 5, marginBlock: 5, height: 490 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom:10,
          }}
        >
          <div style={{ display: "flex" }}>
            <IoClipboardOutline size={20} style={{ marginRight: 5 }} />
            <h4>Tareas</h4>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 12, padding: 5 }}>
          <p style={{ marginInline: 5 }}>Prioridad</p>
          <p style={{ marginRight: 90 }}>Tareas</p>
          <p style={{ marginInline: 15 }}>Tiempo estimado</p>
          <p style={{ marginInline: 25 }}>Estado</p>
        </div>
        <ContainerDetail style={{ overflow: "auto", height: 350, padding: 0 }}>
          {data.map((item, key) => (
            <BtnSelect
              style={{
                width: "98%",
                display: "flex",
                flexDirection: "row",
                height: "auto",
                alignItems: "center",
              }}
              key={key}
            >
              <div
                style={{
                  display: "flex",
                  marginRight: 10,
                }}
              >
                <IoRadioButtonOff size={22} color="red" />
              </div>
              <div
                style={{
                  display: "flex",
                  marginInline: 18,
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>Cableado edificio 1</h4>
                <span>llevar acabo la...</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 15,
                  fontSize: 12,
                  color: "gray",
                }}
              >
                <p>1 semana</p>
              </div>
           
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 70,
                  fontSize: 12,
                  color: "gray",
                }}
              >
                <Tag color="#108ee9">En curso</Tag>
              </div>
            </BtnSelect>
          ))}
        </ContainerDetail>
  
      </Container>
    </>
  );
}
