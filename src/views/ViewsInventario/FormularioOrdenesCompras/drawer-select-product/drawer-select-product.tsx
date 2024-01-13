import { Drawer, Image, Input } from "antd";
import React from "react";
import { IProductoInv, IResponseApi } from "../../../../interfaces";
import { FaMinus, FaProductHunt } from "react-icons/fa";
import { MdOutlineStyle } from "react-icons/md";
import { DivBlueFoto, DivCircleFoto } from "./drawer-select-product.styled";
///import DropDownAdvancedFilters from "../../../ViewsCuentasPorPagar/DropDownAdvancesFilters";
//import DropDownFilter from "../../../ViewsCuentasPorPagar/DropDownFilter";

interface IDrawerSelectProductProps {
  productsData: IResponseApi<IProductoInv> | undefined;
  open: boolean;
  onClose: () => void;
  setDataSourcherProducts: React.Dispatch<React.SetStateAction<IProductoInv[]>>;
}

const DrawerSelectProduct = ({
  productsData,
  open,
  onClose,
  setDataSourcherProducts,
}: IDrawerSelectProductProps) => {
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return `${text.substring(0, maxLength)}...`;
    }
  }

  /*Arreglo de filtros aplicables para la busqueda por texto*/
  const [filtersDataSource, setFiltersDataSource] = React.useState([
    { filterId: 1, filterName: "nombre", isActive: false },
    { filterId: 2, filterName: "modelo", isActive: false },
    { filterId: 3, filterName: "codigo", isActive: false },
  ]);

  return (
    // Drawer:
    <Drawer
      height={300}
      placement="top"
      open={open}
      onClose={() => onClose()}
      headerStyle={{ background: "#1C3C6D" }}
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "white" }}>
              Seleccione los productos para la orden de compra:
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            {/* <div style={{ marginRight: "10px" }}>
              <DropDownAdvancedFilters />
            </div> */}

            {/* <div>
              <DropDownFilter
                setFiltersDataSource={setFiltersDataSource}
                filtersDataSource={filtersDataSource}
              />
            </div> */}

            <div>
              <Input
                //onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar"
                style={{ marginLeft: "10px" }}
              />
            </div>
          </div>
        </div>
      }
    >
      <div>
        <div
          style={{
            display: "Flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {productsData?.Result.map((product) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "20px",
                minWidth: "160px",
                cursor: "pointer",
              }}
              title={truncateText(product.Nombre, 20)}
              onClick={() =>
                setDataSourcherProducts((prevState) => [...prevState, product])
              }
            >
              {/*APARTADO DE LA IMAGEN:*/}
              <DivBlueFoto>
                <DivCircleFoto>
                  {product.Data ? (
                    <Image
                      style={{ borderRadius: "100%" }}
                      src={`data:${product.ContentType};base64,${product.Data}`}
                    />
                  ) : (
                    <FaProductHunt size={60} color="#2C4872" />
                  )}
                </DivCircleFoto>
              </DivBlueFoto>
              {/*INFORMACION DEL PRODUCTO:*/}
              <div style={{ background: "#CBCBCB" }}>
                {/*-------- Codigo del producto*/}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FaMinus />
                  <strong>Código</strong>
                  <span>{product.Codigo}</span>
                </div>

                {/*-------- Codigo del producto*/}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineStyle />
                  <strong>Modelo</strong>
                  <span>{product.Modelo}</span>
                </div>

                {/*-------- Codigo del producto*/}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MdOutlineStyle />
                  <strong>Vence?:</strong>
                  <span>{product.TieneVencimiento}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerSelectProduct;
