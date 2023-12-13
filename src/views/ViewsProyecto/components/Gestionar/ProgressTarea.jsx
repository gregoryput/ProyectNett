import { Progress } from "antd";
import { Container } from "../../../../components";
import PropTypes from "prop-types";
import { Colores } from "../../../../components/GlobalColor";
ProgressTarea.propTypes = {
  proyecto: PropTypes.array.isRequired,
};

export default function ProgressTarea({proyecto}) {
  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <Container
      style={{ margin:0,marginInline: 5, marginTop: 0, paddingBlock:12,marginBottom: 0 ,width:"99%"}}
    >
      <div>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
          <h1 style={{color:`${Colores.AzulMar}`}}>{proyecto[0]?.NombreProyecto}</h1>

          <h4>Progreso</h4>
        </div>
        <Progress strokeColor={twoColors} percent={proyecto[0]?.PorcentajeCompletado} />
      </div>
    </Container>
  );
}
