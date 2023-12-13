import { Tag } from "antd";
import { Container } from "../../../../components";
import PropTypes from "prop-types";

DescripcionProyecto.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function DescripcionProyecto({ proyecto }) {
  const maxCharacters = 40;
  const renderText = (text) => {
    if (text?.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Container style={{ marginInline: 5, marginBlock: 5 }}>
        <h4>Informacion del proyecto</h4>
        <br />
        <p>
          <b>Nombre:</b> <span>{proyecto[0]?.NombreProyecto}</span>
        </p>
        {proyecto[0]?.ServicioProyecto.map((item, key) => (
          <>
            <p key={key}>
              <b>Servicios:</b> <span>{renderText(item.NombreServicio)}</span>
            </p>
          </>
        ))}
        <div style={{ paddingBlock: 5 }}>
          <p>
            <b>Descripcion:</b>{" "}
            <span style={{ textAlign: "justify" }}>
              {renderText(proyecto[0]?.Descripcion)}
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
          <Tag color="#108ee9"> {proyecto[0]?.EstadoProyecto}</Tag>
        </div>
      </Container>
    </div>
  );
}
