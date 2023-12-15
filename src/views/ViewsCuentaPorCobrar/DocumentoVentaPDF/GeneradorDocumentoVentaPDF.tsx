import React from "react";
import DocumentoVentaPDF from "./DocumentoVentaPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Spin } from "antd";
import { BtnNPro, Container } from "../../../components";
import { IoDocumentAttachOutline } from "react-icons/io5";

const GeneradorDocumentoVentaPDF = ({
  openGeneradorPDF,
  setOpenGeneradorPDF,
  documentoData,
  Cotizacion,
}) => {
  console.log(Cotizacion[0]);
  const sumarTotales = (proyecto) => {
    let totalGeneral = 0;
    let totalesPorServicio = [];

    proyecto.forEach((tarea) => {
      tarea.TareasProyecto.forEach((tareaDetalle) => {
        if (tareaDetalle.CostoTotal) {
          totalGeneral += tareaDetalle.CostoTotal;

          const servicioIndex = totalesPorServicio.findIndex(
            (item) => item.NombreServicio === tareaDetalle.NombreServicio
          );

          if (servicioIndex !== -1) {
            totalesPorServicio[servicioIndex].Total += tareaDetalle.CostoTotal;
          } else {
            totalesPorServicio.push({
              NombreServicio: tareaDetalle.NombreServicio,
              Total: tareaDetalle.CostoTotal,
            });
          }
        }
      });
    });

    return { totalGeneral, totalesPorServicio };
  };
  const resultado = sumarTotales(Cotizacion);
  return (
    <Container>
      <div
        style={{
          width: "200px",
          height: "50px",
        }}
      >
        <PDFDownloadLink
          document={
            <DocumentoVentaPDF
              Cotizacion={Cotizacion[0]}
              resultado={resultado}
            />
          }
          fileName="Documento_de_venta.pdf"
        >
          {({ loading }) => (
            <>
              {loading ? (
                <div>
                  <Spin />
                  <span>Generando documento de venta en PDF</span>
                </div>
              ) : (
                <>
                  <div>
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
        <h4>Vista de proyecto</h4>
      </div>
    </Container>
  );
};

export default GeneradorDocumentoVentaPDF;
