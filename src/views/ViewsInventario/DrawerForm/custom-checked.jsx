//import React from "react";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import PropTypes from "prop-types";

const CustomChecked = ({ onChange, isActive, file }) => {
  CustomChecked.propTypes = {
    onChange: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
  };

  const handleClick = (action) => {
    const newState = action === "unChecked" ? true : false;
    // Llama a la funcion de devolucion (callback) onChange para informar al componente principal sobre el cambio
    onChange(newState, file);
  };

  return (
    <>
      {isActive === false ? (
        <MdOutlineRadioButtonUnchecked
          size={18}
          onClick={() => handleClick("unChecked")}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <MdCheckCircle
          size={18}
          onClick={() => handleClick("checked")}
          style={{ cursor: "pointer" }}
        />
      )}
    </>
  );
};
export default CustomChecked;
