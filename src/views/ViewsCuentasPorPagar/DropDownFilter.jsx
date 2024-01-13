import { Dropdown, Button, Checkbox } from "antd";
import PropTypes from "prop-types";
//icons
import { IoFilterSharp } from "react-icons/io5";
import { FcFilledFilter } from "react-icons/fc";

export default function DropDownFilter({
  filtersDataSource,
  setFiltersDataSource,
}) {
  DropDownFilter.propTypes = {
    setFiltersDataSource: PropTypes.func,
    filtersDataSource: PropTypes.array,
  };

  const items = filtersDataSource.map((filter) => {
    return {
      key: filter.filterId,
      label: (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Checkbox
            style={{ marginRight: "5px" }}
            onChange={(event) => {
              const currentFilter = filtersDataSource.find(
                (fa) => fa.filterId === filter.filterId
              );

              const updatedFilters = filtersDataSource.map((filter) => {
                // Verificamos si el filterId coincide con el que queremos modificar
                if (filter.filterId === currentFilter.filterId) {
                  // Creamos un nuevo objeto con isActive establecido en true
                  return { ...filter, isActive: event.target.checked };
                } else {
                  // Para los otros objetos, simplemente los dejamos como están
                  return filter;
                }
              });

              // Actualizamos el estado con el nuevo arreglo de filtros
              setFiltersDataSource(updatedFilters);
            }}
          />
          <span>{filter.filterName}</span>
        </div>
      ),
    };
  });

  const activeFilterCount = filtersDataSource.reduce((count, filter) => {
    if (filter.isActive) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <Dropdown placement="bottomLeft" menu={{ items }} arrow trigger={["click"]}>
      <Button
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {activeFilterCount > 0 ? (
          <FcFilledFilter size={18} />
        ) : (
          <IoFilterSharp size={18} />
        )}
        <span style={{ marginLeft: "9px" }}>Filtros de busqueda</span>
      </Button>
    </Dropdown>
  );
}
