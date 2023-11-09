import { useState, useEffect } from "react";
//import "animate.css";
import { message, Button } from "antd";
import { ViewContainerPages } from "../../components";

import { BiCartAdd } from "react-icons/bi";

import { TablaComponent } from "./Form";
import { useGetProductsWithExistenceQuery } from "../../redux/Api/productsApi";
import { DrawerForm } from "./DrawerForm";
import { useGetUnistOfMeasurementsQuery } from "../../redux/Api/unitsOfMeasurementsApi";
import { useCreateProductMutation } from "../../redux/Api/productsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Inventario() {
  const navigate = useNavigate();
  const [openDrawerForm, setOpenDrawerForm] = useState();
  const [cleanInputs, setCleanInputs] = useState();
  const [selectedItem, setSelectedItem] = useState();

  //api para obtener la lista de productos
  const {
    data: productsData,
    //isSuccess: isProductsSuccess,
    isError: isProductsError,
    isLoading: isLoadingProducts,
  } = useGetProductsWithExistenceQuery("");

  //Funcion peticion para el create/insert de Producto:
  const [
    createProduct,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateProductMutation();

  const units = useGetUnistOfMeasurementsQuery("");
  const opstionsUnits = units?.data?.result?.map((op) => ({
    label: op?.unidadNombre,
    value: op?.idUnidad_DeMedida,
  }));

  useEffect(() => {
    if (isProductsError) {
      message.success("Error al solicitar la lista de productos");
    }
  }, [isProductsError]);

  const scrollToSection = () => {
    // Obtener el titulo de arriba, para cuando se de clic a un producto, si esta muy abajo se desplace hacia arriba automaticamente:
    const targetSection = document.getElementById("titleTop");

    if (targetSection) {
      // Con el scrollIntoView se lleva a cabo el desplazamiento a la sección objetivo (titleTop):
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isLoadingCreate) {
      toast.loading("Guardando el producto", {
        id: "tSavinProduct",
      });
    } else {
      toast.dismiss("tSavinProduct");
    }
  }, [isLoadingCreate]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.dismiss("tSavinProduct");
      toast.success("El producto ha sido guardado correctamente", {
        id: "tSucc",
      });
      setOpenDrawerForm(false);
      setCleanInputs(true);
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isErrorCreate) {
      toast.dismiss("tSavinProduct");
      toast.error("Error al guardar el producto", {
        id: "tError",
      });
    }
  }, [isErrorCreate]);

  return (
    <>
      <ViewContainerPages className="animate__animated animate__fadeIn">
        {/* <h2 style={{ marginLeft: 15, marginBottom: 40 }} id="titleTop">
          Gestión de inventario
        </h2> */}
        <div style={{ marginLeft: "20px" }}>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              setCleanInputs(true),
                setOpenDrawerForm(true),
                setSelectedItem(undefined);
            }}
          >
            Nuevo
          </Button>
          <Button style={{ marginRight: "10px" }}>
            Proveedores por producto
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/cuenta-por-cobrar/form-facturacion")}
          >
            Factura de entrada de productos
          </Button>
        </div>

        <TablaComponent
          dataProducts={productsData}
          isLoadingProducts={isLoadingProducts}
          loadingSave={false}
          goSectionUp={scrollToSection}
          setOpenForm={setOpenDrawerForm}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOpenDrawerForm={() => setOpenDrawerForm(true)}
        />

        <DrawerForm
          statusFetch={{
            loading: isLoadingCreate,
            success: isCreateSuccess,
            error: isErrorCreate,
          }}
          cleanInputs={cleanInputs}
          setCleanInputs={setCleanInputs}
          createProduct={createProduct}
          Open={openDrawerForm}
          OnClose={() => setOpenDrawerForm(false)}
          OpstionsUnits={opstionsUnits}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          Title={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <BiCartAdd size={30} />
              <span style={{ fontSize: "20px", marginLeft: "5px" }}>
                <strong>{`${
                  selectedItem === undefined ? "Registrar" : "Actualizar"
                } producto`}</strong>
              </span>
            </div>
          }
        />
      </ViewContainerPages>
    </>
  );
}
