import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentoVentaPDF from "./DocumentoVentaPDF";
import React from "react";
import { Button, Modal, Spin } from "antd";
import { IDocumentoDTO } from "../../../interfaces";

interface IGeneradorDocumentoVentaPDFProps {
  openGeneradorPDF: boolean;
  setOpenGeneradorPDF: React.Dispatch<React.SetStateAction<boolean>>;
  documentoData: IDocumentoDTO | undefined;
}

const documentoFakeData: IDocumentoDTO = {
  IdDocumento: 2,
  IdTipoDocumento: 1,
  DocumentoNombre: "Cotización de proyecto",
  FechaDeEmision: new Date(),
  MontoTotal: 3806.5,
  Secuencia: "CO00000001",
  IdCliente: 1,
  NombreEntidad: "Inversiones José COPR",
  IdTipoEntidad: 2,
  NombreTipoEntidad: "Empresa",
  IdEstado: 1,
  IdProyecto: 13,
  NombreProyecto: "Segundo proyecto de prueba",
};
const GeneradorDocumentoVentaPDF = ({
  openGeneradorPDF,
  setOpenGeneradorPDF,
  documentoData,
}: IGeneradorDocumentoVentaPDFProps) => {
  return (
    <Modal open={openGeneradorPDF} onCancel={() => setOpenGeneradorPDF(false)}>
      <PDFDownloadLink
        document={
          <DocumentoVentaPDF documento={documentoData as IDocumentoDTO} />
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
              <Button type="primary">Descargar PDF</Button>
            )}
          </>
        )}
      </PDFDownloadLink>
    </Modal>
  );
};

export default GeneradorDocumentoVentaPDF;
