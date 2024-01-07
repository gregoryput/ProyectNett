import { BtnNavPro, Container, ViewContainerPages2 } from "../../components";
import { Colores } from "../../components/GlobalColor";
import { IoMegaphoneOutline,IoDocumentAttachOutline } from "react-icons/io5";
export default function Reporte() {
  return (
    <ViewContainerPages2>
      <Container
        style={{
          marginInline: 10,
          marginTop: 0,
          marginBottom: 5,
          padding: 15,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: `${Colores.AzulMar}`,
          color: `${Colores.Blanco}`,
        }}
      >
        <div>
          <h2>Generar reportes</h2>
          <p>Puedes generar reporte de todos los modulos</p>
        </div>

        <div style={{display:"flex"}}>
          <div>
            <BtnNavPro
              style={{
                borderRadius: "12px",
                width: "180px",
                height: "50px",
                padding: 15,
                marginInline:15,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <h4>Descargar PDF</h4>
                <IoDocumentAttachOutline size={20} />
              </div>
            </BtnNavPro>
          </div>

          <div>
            <BtnNavPro
              style={{
                borderRadius: "12px",
                width: "100px",
                height: "50px",
                padding: 15,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <h4>Crear</h4>
                <IoMegaphoneOutline size={20} />
              </div>
            </BtnNavPro>
          </div>
        </div>
      </Container>
      <Container
        style={{
          marginInline: 10,
          marginTop: 15,
          marginBottom: 5,
          height: 700,
          padding: 20,
          alignItems: "center",
        }}
      >
        <h2>Vista del reporte</h2>
      </Container>
    </ViewContainerPages2>
  );
}
