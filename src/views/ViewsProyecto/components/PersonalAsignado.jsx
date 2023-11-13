import CountUp from "react-countup";
import {
  Avatar,
  BtnSelect,
  ButtonIconBorder,
  Container,
  ContainerDetail,
} from "../../../components";
import { AiOutlineUser,AiOutlineEdit } from "react-icons/ai";
const data = [
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
  "Juan andres santana",
];

export default function PersonalAsignado() {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <Container style={{ height: 400 }}>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <div style={{ display: "flex" }}>
            <AiOutlineUser size={20} style={{ marginRight: 5 }} />
            <h4>Personal asignado</h4>
          </div>
          <ButtonIconBorder>
            <AiOutlineEdit size={22} />
          </ButtonIconBorder>
        </div>
        <ContainerDetail style={{ overflow: "auto", height: 280, padding: 0 }}>
          {data.map((item, key) => (
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
                <h3>Usuario</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "gray",
                  }}
                >
                  <p>Responsabilidad</p>
                  <p>Supervisor</p>
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
          <span> {formatter(data.length)}</span>
        </div>
      </Container>
    </>
  );
}
