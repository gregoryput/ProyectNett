import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { BtnNavPro, Container } from "../../../components";

export default function Seccion({ setSee, seeState, setFormSee }) {
  Seccion.propTypes = {
    setSee: PropTypes.func.isRequired,
    seeState: PropTypes.func.isRequired,
    setFormSee: PropTypes.func.isRequired,
  };

  return (
    <Container
      style={{
        marginTop: 0,
        padding: 0,
        height: 70,
      }}
    >
      <div>
        <BtnNavPro
          color={seeState == true ? true : false}
          style={{ width: "50%", margin: 0 }}
          onClick={() => {
            setSee(true);
            setFormSee(false);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Presupuesto</span>
            <AiOutlineDollarCircle size={25} />
          </div>
        </BtnNavPro>
        <BtnNavPro
          color={seeState == false ? true : false}
          style={{ width: "50%", margin: 0 }}
          onClick={() => {
            setSee(false);
            setFormSee(false);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Control</span>
            <IoGameControllerOutline size={25} />
          </div>
        </BtnNavPro>
      </div>
    </Container>
  );
}
