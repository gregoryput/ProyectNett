import { Container, ViewContainerPages } from "../../components";
import { Colores } from "../../components/GlobalColor";
import gatito from "../../assets/gatito.png";
import fotodeljefe from "../../assets/fotodeljefe.jpg";
export default function Home() {

  return (
    <ViewContainerPages>
      <Container
        style={{
          color: `${Colores.fondo}`,
          backgroundColor: `${Colores.AzulMar}`,
          display: "flex",
          justifyContent: "space-between",
          paddingBlock: 10,
        }}
      >
        <div>
          <h1>Bienvenido</h1>
          <h3>Descubre la mejor manera de gestionar tus proyectos </h3>
        </div>
        <img
          style={{ height: 90, width: 90 }}
          src={gatito}
          alt="Descripción de la imagen"
        />
      </Container>

      <div style={{ position: "relative" }}>
        <img
          src={fotodeljefe}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "98%",
            height: 400,
            objectFit: "cover",
            borderRadius: 12,
            margin: 4,
            marginLeft: 15,
            objectPosition: "0% 50%",
            filter: "brightness(0.7)",
            // Mostrar la parte superior izquierda
          }}
        ></img>
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            bottom: 40,
            paddingInline: 30,
            color: "white",
            paddingBottom: 10,
          }}
        >
          <h1>Descubre la mejor forma de gestionar proyecto</h1>
          <p>
            ProyectNett es una plaforma que te permite llevar el control de tu
            proyecto de la manera mas optima
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 15, margin: 10 }}>
        <Container style={{ backgroundColor: "#010937" }}>
          <h3 style={{ color: `${Colores.fondo}` }}>Crea presupuesto </h3>
        </Container>
        <Container style={{ backgroundColor: "#020f59" }}>
          <h3 style={{ color: `${Colores.fondo}` }}>Gestiona proyecto </h3>
        </Container>
        <Container style={{ backgroundColor: "#101f78" }}>
          <h3 style={{ color: `${Colores.fondo}` }}>Organiza inventario </h3>
        </Container>
        <Container style={{ backgroundColor: "#232226" }}>
          <h3 style={{ color: `${Colores.fondo}` }}>Factura tus servicios</h3>
        </Container>
      </div>
  
    </ViewContainerPages>
  );
}
