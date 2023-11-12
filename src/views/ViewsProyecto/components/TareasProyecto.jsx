import {
    ButtonIconBorder,
  Container,
  ContainerDetail,
} from "../../../components";

const data = [
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
  "Tarea 1",
];

const data2 = [
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
  "Producto 1",
 
];
export default function TareasProyecto() {
  return (
    <div style={{display:"flex", flexDirection:"column", width:"auto"}}>
        
      <Container style={{ marginInline: 5, height: 400 }}>
        <h4>Tareas de proyecto</h4>

        <ContainerDetail style={{ overflow: "auto", height: 300, padding: 0 }}>
          {data.map((item, key) => (
            <ButtonIconBorder
              style={{
                width: "100%",
                textAlign: "justify",
                justifyContent: "normal",
              }}
              key={key}
            >
              {item}
            </ButtonIconBorder>
          ))}
        </ContainerDetail>
      </Container>

      <Container style={{height:330,marginBottom:0}}>
        <h4>Productos</h4>

        <ContainerDetail style={{overflow:"auto", height:200,padding:0}}>
          {data2.map((item, key)=>
            <ButtonIconBorder style={{width:"100%",textAlign:"justify",justifyContent:"normal"}} key={key}>
            {item}
        </ButtonIconBorder>
          )}
        </ContainerDetail>
      </Container>
    </div>
  );
}
