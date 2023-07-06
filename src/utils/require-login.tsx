import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Column, Row } from "../components";
import MenuBar from "../layout/MenuBar";
import Navegation from "../layout/Navegation";

import { JwtUtils } from ".";

const RequireLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    console.log("pon el de 30")
    const token = localStorage.getItem("token");

    if (JwtUtils.verifyTokenExpiration(token)) {
      navigate("/login");
    }
    else{
      console.log("token valido")
    }
  }, [navigate, location]);

  return (
    <>
      <Row>
        <Navegation />
        <Column>
          <MenuBar />
          <Outlet />
        </Column>
      </Row>
    </>
  );
};

export default RequireLogin;
