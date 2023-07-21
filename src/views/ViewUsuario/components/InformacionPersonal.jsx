import { ContainerForm } from "../../../components";

export default function InformacionPersonal(){
    return(
      <ContainerForm>
          <h3 style={{marginBottom:30}}>Informacion basica</h3>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:10, width:600 ,marginLeft:50 }}>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4>Nombre</h4>
              <p>Juan Andres</p>
        </div>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4> Apellido</h4>
              <p>Molina</p>
        </div>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4>Cedula</h4>
              <p>402-1167189-9</p>
        </div>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4> Direccion</h4>
              <p>Calle indolete francisco</p>
        </div>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4> Edad</h4>
              <p>23</p>
        </div>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h4> Fecha de nacimiento</h4>
              <p>11 de agosto 2000</p>
        </div>
        </div>
        
        </ContainerForm>
    )
  }
  