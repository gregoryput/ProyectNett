import {Column, Row } from "../components";
import MenuBar from "../layout/MenuBar";
import Navegation from "../layout/Navegation";
import Cliente from "../views/Cliente";

export default function Layout() {
  return (
    <>
      <Row>
        <Navegation />
        <Column>
          <MenuBar />
          <Cliente/>
        </Column>
      </Row>
    </>
  );
}
