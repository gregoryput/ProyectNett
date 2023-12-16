import CountUp from "react-countup";
import { BtnSelect, Container, ContainerDetail } from "../../../../components";
import { AiOutlineInbox } from "react-icons/ai";
import PropTypes from "prop-types";

Productos.propTypes = {
  proyecto: PropTypes.array.isRequired,
};


export default function Productos({proyecto}) {
  const formatter = (value) => <CountUp end={value} separator="," />;
  console.log(proyecto[0]?.ProductosProyecto);
  const maxCharacters = 20;
  const renderText = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };
  return (
    <Container style={{ height: 400 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        <AiOutlineInbox size={22} style={{ marginRight: 5 }} />
        <h4>Productos</h4>
      </div>
    
    </div>
    <ContainerDetail style={{ overflow: "auto", height: 280, padding: 0 }}>
      {proyecto[0]?.ProductosProyecto.map((item, key) => (
        <BtnSelect
          style={{
            width: "98%",
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
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              textAlign: "justify",
            }}
          >
            <h3>{renderText(item.NombreProducto)}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <p>Cantidad</p>
              <p>{item.Cantidad}</p>
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
          <p>Cantidad:</p>
          <span> {formatter(proyecto[0]?.ProductosProyecto.length)}</span>
        </div>
  </Container>
  )
}
