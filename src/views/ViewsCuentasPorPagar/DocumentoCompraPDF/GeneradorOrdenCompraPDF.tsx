import React from "react";
import OrdenCompraPDF from "./OrdenCompraPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
//import { Spin } from "antd";
import { BtnNPro, Container, SpinnerTables } from "../../../components";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { useGetOrdenCompraByIdQuery } from "../../../redux/Api/productsApi";
// import { IOrdenCompraDTO } from "../../../interfaces";
//import { IOrdenCompraDTO } from "../../../interfaces";

interface IGeneradorDocumentoCompraPDFProps {
  onCloseGenerador: () => void;
  OrdenId: number;
}

const GeneradorOrdenCompraPDF = ({
  OrdenId,
  onCloseGenerador,
}: IGeneradorDocumentoCompraPDFProps) => {
  const {
    data: responseOrdenCompra,
    // isError: isProductsError,
    isLoading: isLoadingProducts,
  } = useGetOrdenCompraByIdQuery(OrdenId);

  console.log("responseOrdenCompra", responseOrdenCompra);

  return (
    <Container>
      <div
        style={{
          width: "200px",
          height: "50px",
          float: "right",
        }}
      >
        <PDFDownloadLink
          document={<OrdenCompraPDF OrdenCompra={responseOrdenCompra} />}
          fileName="Orden_Compra"
          //fileName={`Orden_Compra_No.${responseOrdenCompra?.Result.Secuencia}`}
        >
          {({ loading }) => (
            <>
              {loading ? (
                <div>
                  <SpinnerTables />
                  <span>Generando document de compra en PDF</span>
                </div>
              ) : (
                <>
                  <div onClick={() => onCloseGenerador()}>
                    <BtnNPro
                      style={{
                        borderRadius: "12px",
                        width: "200px",
                        height: "50px",
                        padding: "15px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <h4>Descargar PDF</h4>
                        <IoDocumentAttachOutline size={20} />
                      </div>
                    </BtnNPro>
                  </div>
                </>
              )}
            </>
          )}
        </PDFDownloadLink>
      </div>
      <div>
        <h2>Descargar documento de compra</h2>
      </div>
    </Container>
  );
};

export default GeneradorOrdenCompraPDF;
