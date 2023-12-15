import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { IDocumentoDTO } from "../../../interfaces";
import dayjs from "dayjs";

// Estilos para el documento
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    backgroundColor: "red",
  },
});

const DocumentoVentaPDF = ({ documento }: { documento: IDocumentoDTO }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>{documento.DocumentoNombre}</Text>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Detalles de la Cotización</Text>
            <Text>
              <Text style={styles.label}>Cotización #:</Text>
              {documento.Secuencia}
            </Text>
            <Text>
              <Text style={styles.label}>Fecha de Emisión:</Text>
              {dayjs(documento.FechaDeEmision).format("DD/MM/YYYY")}
            </Text>
            <Text>
              <Text style={styles.label}>Monto Total:</Text>$
              {documento.MontoTotal}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Información del Proyecto</Text>
            <Text>
              <Text style={styles.label}>Nombre del Proyecto:</Text>
              {documento.NombreProyecto}
            </Text>
            {/* Agrega más información del proyecto si es necesario */}
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Información del Cliente</Text>
            <Text>
              <Text style={styles.label}>Entidad:</Text>
              {documento.NombreEntidad}
            </Text>
            <Text>
              <Text style={styles.label}>Tipo de Entidad:</Text>
              {documento.NombreTipoEntidad}
            </Text>
            {/* Agrega más información del cliente si es necesario */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentoVentaPDF;
