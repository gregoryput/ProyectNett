import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Column, Row } from "../components";
import MenuBar from "../layout/MenuBar";
import Navegation from "../layout/Navegation";

import { JwtUtils } from ".";

const RequireLogin = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (JwtUtils.verifyTokenExpiration(token)) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate]);

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
