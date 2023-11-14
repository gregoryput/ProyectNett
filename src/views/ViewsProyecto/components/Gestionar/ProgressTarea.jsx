import { Progress } from "antd";
import { Container } from "../../../../components";

export default function ProgressTarea() {
  return (
    <Container
      style={{ marginInline: 5, marginTop: 0, marginBottom: 0, width: "99.5%" }}
    >
      <div>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <h1>Central Romana</h1>

          <h4>Progreso</h4>
        </div>
        <Progress percent={30} />
      </div>
    </Container>
  );
}
