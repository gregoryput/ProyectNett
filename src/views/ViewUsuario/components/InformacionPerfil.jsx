import { Avatar, ButtonIcon, Container } from "../../../components";
import PropTypes from "prop-types";

export default function InformacionPerfil({ toggle, setToggle, data }) {
  const perfil = data.result.objectInfoPerfil;

  InformacionPerfil.propTypes = {
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    data: PropTypes.shape({
      result: PropTypes.shape({
        objectInfoPerfil: PropTypes.shape({
          nombreUsuario: PropTypes.string.isRequired,
          nombreRol: PropTypes.string.isRequired,
          correo: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };
  return (
    <Container>
      {perfil !== undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <Avatar>
              <h3>{perfil.nombreUsuario[0].toUpperCase()}</h3>
            </Avatar>
            <div style={{ marginLeft: 20, marginRight: 70 }}>
              <h3> Usuario</h3>
              <p>{perfil.nombreUsuario}</p>
            </div>
            <div style={{ marginRight: 60 }}>
              <h4>Puesto en Gestnett</h4>
              <p>Ingeniero en Software</p>
            </div>
            <div style={{ marginRight: 60 }}>
              <h4>Roll de usuario</h4>
              <p>{perfil.nombreRol}</p>
            </div>
            <div style={{ marginRight: 60 }}>
              <h4>Correo electronico</h4>
              <p>{perfil.correo}</p>
            </div>
          </div>

          <ButtonIcon
            onClick={() => setToggle(!toggle)}
            style={{ justifyContent: "center", alignContent: "center" }}
          >
            {" "}
            {toggle ? "Cancelar" : "Editar contraseña "}
          </ButtonIcon>
        </div>
      ) : null}
    </Container>
  );
}
