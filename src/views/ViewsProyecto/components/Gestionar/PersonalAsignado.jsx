import CountUp from "react-countup";
import {
  Avatar,
  BtnSelect,
  Container,
  ContainerDetail,
} from "../../../../components";
import { AiOutlineUser } from "react-icons/ai";
import PropTypes from "prop-types";

PersonalAsignado.propTypes = {
  proyecto: PropTypes.array.isRequired,
};


export default function PersonalAsignado({proyecto}) {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const maxCharacters = 20;
  const renderText = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };
  return (
    <>
      <Container style={{ height: 400 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <AiOutlineUser size={20} style={{ marginRight: 5 }} />
            <h4>Personal asignado</h4>
          </div>
        </div>
        <ContainerDetail style={{ overflow: "auto", height: 280, padding: 0 }}>
          {proyecto[0]?.EmpleadosProyecto.map((item, key) => (
            <BtnSelect
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                height: 60,
                justifyContent: "space-between",
              }}
              key={key}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Avatar style={{ margin: 0 }}>
                  <h3>J</h3>
                </Avatar>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "justify",
                }}
              >
                <b>{renderText(item.NombreEmpleado)}</b>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "gray",
                    fontSize: "11px",
                  }}
                >
                  <p>Responsabilidad</p>
                  <p>{item.ResponsabilidadNombre}</p>
                </div>
              </div>
            </BtnSelect>
          ))}
        </ContainerDetail>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 10,
            paddingInline: 10,
          }}
        >
          <p>Participantes:</p>
          <span> {formatter(proyecto[0]?.EmpleadosProyecto.length)}</span>
        </div>
      </Container>
    </>
  );
}
