import { Container } from "../../../../components";
import { Colores } from "../../../../components/GlobalColor";


export default function Servicio() {
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
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      <h3>Tipo de Servicio</h3>
      </div>
      <p>Optimización y Seguridad de Redes</p>
    </Container>
  )
}
