import {  Tag, } from "antd";
import { Container } from "../../../../components";


export default function DescripcionProyecto() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container style={{ marginInline: 5,marginBlock:5 }}>
        <h4>Informacion del proyecto</h4>
        <br />
        <p>
          <b>Nombre:</b> <span>Central Romana</span>
        </p>

        <div style={{ paddingBlock: 5 }}>
          <p>
            <b>Descripcion:</b>{" "}
            <span style={{ textAlign: "justify" }}>
              Este proyecto consiste en actualizar todo los servidores locales
              que tiene la empresa
            </span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <p>
            <b>Estado:</b>
          </p>
          <Tag color="#108ee9">En proceso</Tag>
        </div>
      </Container>
    

      
    </div>
  );
}
