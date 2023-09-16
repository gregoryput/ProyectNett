import { Container } from "../../../components";
import PropTypes from "prop-types";
export default function InformacionPersonal({ data }) {
  const info = data.result.objectInfoPerfil;
  const fechaObjeto = new Date(info.fechaDeNacimiento);
  const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
  const fechaFormateada = fechaObjeto.toLocaleDateString("es", opcionesFecha);

  InformacionPersonal.propTypes = {
    data: PropTypes.shape({
      result: PropTypes.shape({
        objectInfoPerfil: PropTypes.shape({
          nombres: PropTypes.string.isRequired,
          apellidos: PropTypes.string.isRequired,
          cedula: PropTypes.string.isRequired,
          direccion: PropTypes.string.isRequired,
          edad: PropTypes.number.isRequired,
          fechaDeNacimiento: PropTypes.string.isRequired, // Asegúrate de que el formato sea válido
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <Container>
      {info !== undefined ? (
        <>
          <h3 style={{ marginBottom: 30 }}>Informacion basica</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: 10,
              width: 600,
              marginLeft: 50,
            }}
          >
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4>Nombre</h4>
              <p>{info.nombres}</p>
            </div>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4> Apellido</h4>
              <p>{info.apellidos}</p>
            </div>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4>Cedula</h4>
              <p>{info.cedula}</p>
            </div>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4> Direccion</h4>
              <p>{info.direccion}</p>
            </div>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4> Edad</h4>
              <p>{info.edad}</p>
            </div>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h4> Fecha de nacimiento</h4>
              <p>{fechaFormateada}</p>
            </div>
          </div>
        </>
      ) : null}
    </Container>
  );
}
