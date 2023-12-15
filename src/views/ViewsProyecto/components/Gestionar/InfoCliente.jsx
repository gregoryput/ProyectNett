import { Container } from "../../../../components";
import { Colores } from "../../../../components/GlobalColor";
import PropTypes from "prop-types";
InfoCliente.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function InfoCliente({proyecto}) {
  return (
    <Container
      style={{
        height: 70,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor:`${Colores.Azulclaro}`,
        color:`${Colores.AzulMar}`,
        marginInline:5,
        marginBottom:5
      }}
    >
      <div style={{display:"flex",alignItems:"center",padding:5, justifyContent:"space-between"}}>
      <h3>Cliente</h3>
      </div>
      <h4>{proyecto[0]?.NombreEntidad}</h4>
    </Container>
  )
}
