import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";
import { IOrdenCompraDTO, IResponseApiObject } from "../../../interfaces";

// Estilos para el documento
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 10,
    fontSize: 11,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#101f78",
    paddingTop: 20,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    display: "flex",
  },
  label: {
    fontSize: 10,
  },

  table: {
    //display: "table",
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 9,
  },
  tableRow2: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "#101f78",
    color: "white",
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "36%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "left",
  },
  tableCell: { paddingLeft: 3, marginTop: 5, fontSize: 10 },

  tableCol2: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "left",
  },
  tableCol3: {
    width: "16%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  divv: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface IOrdenCompraPDFProps {
  OrdenCompra: IResponseApiObject<IOrdenCompraDTO> | undefined;
}

const OrdenCompraPDF = ({ OrdenCompra }: IOrdenCompraPDFProps) => {
  let fecha = new Date();
  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.title}>Orden de compra</Text>
            {/* Número de Cotización y Fecha */}
            <View style={{ textAlign: "right", fontSize: 9 }}>
              <Text>Número de Orden: {OrdenCompra?.Result.Secuencia}</Text>
              <Text>
                Fecha: {dayjs(fecha.toISOString()).format("DD-MM-YYYY")}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginVertical: 20,
                fontSize: 9,
              }}
            >


              {/* Información del Cliente */}
              <View>
                <Text>Proveedor: {OrdenCompra?.Result.NombreEntidad}</Text>
                <Text>Entidad: {OrdenCompra?.Result.NombreTipoEntidad}</Text>
              </View>
            </View>

            <View style={styles.table}>
              {/* Tabla de Productos */}
              <View style={styles.tableRow2}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Producto</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>Cantidad</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>Precio</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>ITBIS</Text>
                </View>
                <View style={styles.tableCol3}>
                  <Text style={styles.tableCell}>Total</Text>
                </View>
              </View>
              {OrdenCompra?.Result.DetallesOrdenCompra?.map(
                (producto, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text
                        style={styles.tableCell}
                      >{`(${producto.Codigo}) - ${producto.Nombre}`}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}>
                        {producto.UnidadNombre}
                      </Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}>{producto.Cantidad}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}>
                        {"  "}
                        RD
                        {currencyFormatter({
                          currency: "USD",
                          value: producto.Precio,
                        })}
                      </Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}> {producto.ITBIS}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                      <Text style={styles.tableCell}>
                        {"  "}
                        RD
                        {currencyFormatter({
                          currency: "USD",
                          value: producto.Subtotal,
                        })}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>

            <View style={styles.table}>
              {/* Tabla de Gastos Adicionales */}
              <View style={styles.tableRow2}>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Gasto Adicional</Text>
                </View>
                <View style={styles.tableCol2}>
                  <Text style={styles.tableCell}>Costo</Text>
                </View>
              </View>
            </View>

            <View
              style={{ marginLeft: 20, marginTop: 40, gap: 2, fontSize: 9 }}
            >
              <Text>
                Total por productos: {"  "}
                RD
                {currencyFormatter({
                  currency: "USD",
                  value: OrdenCompra?.Result.MontoTotal,
                })}
              </Text>
            </View>

            <View style={{ marginLeft: 20, marginTop: 30, gap: 2 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Condiciones y Observaciones:
              </Text>
              <View
                style={{
                  fontSize: 9,
                  color: "gray",
                  textAlign: "justify",
                  gap: 5,
                }}
              >
                <Text>
                  [Incluye aquí cualquier condición especial, términos de pago,
                  fecha de validez de la cotización, etc.]
                </Text>
                <Text>
                  Estamos a su disposición para discutir cualquier detalle
                  adicional o ajuste que pueda necesitar.
                </Text>
                <Text>
                  No dude en ponerse en contacto con nosotros si tiene alguna
                  pregunta.
                </Text>
                <Text>
                  Agradecemos la oportunidad de servirle y esperamos poder
                  trabajar juntos.
                </Text>
                <Text
                  style={{ textAlign: "right", marginRight: 20, marginTop: 20 }}
                >
                  Atentamente Equipo de Gestnett.
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default OrdenCompraPDF;
