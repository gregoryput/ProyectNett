import { Tag } from "antd";
import { BtnSelect, Container, ContainerDetail } from "../../../../components";

import { IoClipboardOutline } from "react-icons/io5";

import PropTypes from "prop-types";

TareasProyecto.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function TareasProyecto({ proyecto }) {
  const maxCharacters = 15;
  const renderText = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };
  return (
    <>
      <Container style={{ marginInline: 5, marginBlock: 5, height: 440 }}>
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
          <p style={{ marginRight: 30 }}>Tareas </p>
          <p style={{ marginInline: 15 }}>Tiempo estimado</p>
          <p style={{ marginInline: 30 }}>Estado</p>
        </div>
        <ContainerDetail style={{ overflow: "auto", height: 320, padding: 0 }}>
          {proyecto[0]?.TareasProyecto.map((item, key) => (
            <BtnSelect
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={key}
            >
            
              <div
                style={{
                  display: "flex",
                  marginInline: 18,
                  textAlign: "left",
                  flexDirection: "column",
                }}
              >
                <h4>{renderText(item.NombreTarea)}</h4>
                <span>{renderText(item.Descripcion)}</span>
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
                <p>{item.TiempDuracionEstimado}</p>
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
                <Tag color="#108ee9">{item.EstadoTarea}</Tag>
              </div>
            </BtnSelect>
          ))}
        </ContainerDetail>
      </Container>
    </>
  );
}
