import { Progress } from "antd";
import { Container } from "../../../../components";

export default function ProgressTarea() {
  return (
    <Container
      style={{ margin:0,marginInline: 5, marginTop: 0, paddingBlock:12,marginBottom: 0 ,width:"99%"}}
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
