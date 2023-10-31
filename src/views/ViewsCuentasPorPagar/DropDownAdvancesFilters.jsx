import { Dropdown, Button, Slider } from "antd";
//icons
import { IoFilterSharp } from "react-icons/io5";
import { FcFilledFilter } from "react-icons/fc";

export default function DropDownAdvancedFilters() {
  const items = [
    {
      key: "1",
      label: (
        <div>
          <span>Rango precio compra:</span>
          <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <span>Rango precio venta:</span>
          <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
        </div>
      ),
    },
  ];

  const active1icon = false;

  return (
    <Dropdown placement="bottomLeft" menu={{ items }} arrow trigger={["click"]}>
      <Button
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {active1icon ? (
          <FcFilledFilter size={18} />
        ) : (
          <IoFilterSharp size={18} />
        )}
        <span style={{ marginLeft: "9px" }}>Filtros avanzados</span>
      </Button>
    </Dropdown>
  );
}
