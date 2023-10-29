import { Link  } from "react-router-dom"
import { GradientText, Button } from "../components"
import {DivContainerPage} from "../components/LoginStyled/DivContainerPage"

export default function ErrorPages() {
 


  return (
    <>
      <DivContainerPage >
       <GradientText> 404 </GradientText>
       <h3>Oops , usted esta fuera de Gestnett</h3>
       <Link to="/login"><Button >Regresar al sistema</Button></Link>
    </DivContainerPage>
    </>
  )
}


