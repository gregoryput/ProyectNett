import { Outlet } from "react-router-dom";
import {Column, Row } from "../components";
import MenuBar from "../layout/MenuBar";
import Navegation from "../layout/Navegation";


export default function Layout() {
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
}
