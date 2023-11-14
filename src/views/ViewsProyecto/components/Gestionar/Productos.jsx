import CountUp from "react-countup";
import { BtnSelect, Container, ContainerDetail } from "../../../../components";
import { AiOutlineInbox } from "react-icons/ai";

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

export default function Productos() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Container style={{ height: 400, marginBottom: 0 }}>
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
      {data2.map((item, key) => (
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
            <h3>Producto 1</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
              }}
            >
              <p>Cantidad</p>
              <p>20</p>
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
          <span> {formatter(data2.length)}</span>
        </div>
  </Container>
  )
}
