import { Avatar, ButtonIcon, ContainerForm } from "../../../components";

export default function InformacionPerfil({toggle, setToggle}){

    return(
      <ContainerForm>
  
    <div style={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
    
      <div style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
      <Avatar>
         <h3>J</h3>
      </Avatar>
        <div  style={{marginLeft:20 , marginRight:70}}>
              <h3> Usuario</h3>
              <p>juan01andres</p>
        </div>
        <div style={{ marginRight:60}}>
          <h4>Puesto en Gestnett</h4>
          <p>Ingeniero en Software</p>
        </div>
        <div style={{ marginRight:60}}>
          <h4>Roll de usuario</h4>
          <p>Administrador</p>
        </div>
        <div style={{ marginRight:60}}>
          <h4>Correo electronico</h4>
          <p>juan01andres@gestnett.com</p>
        </div>
       
          
      </div>
     
        
          <ButtonIcon onClick={()=> setToggle(!toggle)} style={{justifyContent:"center",alignContent:"center"}}> {toggle ? "Cancelar": "Editar contraseña "}</ButtonIcon>
         
          
    </div>
     </ContainerForm>
    )
  }