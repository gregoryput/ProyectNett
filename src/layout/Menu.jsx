import { useState  } from "react";
import { OutsideClick } from 'outsideclick-react'
import { IoChevronDownSharp, IoCalendarNumberOutline } from "react-icons/io5";

import { Avatar, ButtonMenu, DivNav, DivRotate, DropdownContent } from "../components";
import { DivContainer } from "../components/Menu/DivContianer";

export default function Menu() {
  const [activo, setActivo] = useState(null)

  

  return (
    <DivContainer>

      <DivNav>

        <IoCalendarNumberOutline style={{ width: 30, height: 30, marginRight: 50, cursor: "pointer" }}/>
        <OutsideClick
            onOutsideClick={() => 
              setActivo(false)   
            }
        >
    
            <div>
              <ButtonMenu onMouseUp={()=> setActivo(!activo)}  >
                  <DivRotate rotate={activo} >
                    <IoChevronDownSharp/>  
                  </DivRotate>
                  <p style={{marginLeft: 15, fontSize: 15, fontWeight: "600", color: "#1C3C6D"  }}> Gregoryput </p>
                  <Avatar>
                    <h1>G</h1>
                  </Avatar>
              </ButtonMenu>
            </div>
            <DropdownContent activo={activo}>
              <p>Tema de la interfaz </p>
            </DropdownContent>
        </OutsideClick>

      </DivNav>
    </DivContainer>
  );
}



