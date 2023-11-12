import { Progress } from "antd";
import { ContainerList } from "../../../components";

export default function ProgressTarea() {
  return (
    <ContainerList>
      <div>
        <h4>Progreso de Proyecto</h4>
        <Progress percent={30} />
      </div>
     
    </ContainerList>
  );
}
