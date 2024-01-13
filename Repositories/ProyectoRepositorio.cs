using Dapper;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Newtonsoft.Json;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System;
using System.Data;

namespace ProyectNettApi.Repositories
{

    public class ProyectoRepositorio : IProyectoRespositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public ProyectoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        /// peticiones para proyecto 
        public IEnumerable<ProyectoDTO> GetListaProyecto()
        {
            string query = "dbo.ListaProyecto";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProyectoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        //public IEnumerable<ListaProyectoDTO> GetObtenerDatosProyecto(int IdProyecto)
        //{
        //    string query = "dbo.ObtenerDatosProyecto";

        //    var resultSet = _conexionDB.GetConnection(_configuration).Query<ListaProyectoDTO> (query,new {IdProyecto}, commandType: CommandType.StoredProcedure);

        //    foreach (var proyecto in resultSet)
        //    {
        //        proyecto.TareasProyecto = JsonConvert.DeserializeObject<List<ListaTareaDTO>>(proyecto.TareasProyectoJson);
        //        proyecto.ServicioProyecto = JsonConvert.DeserializeObject<List<ListaServicioDTO>>(proyecto.ServicioProyectoJson);
        //        proyecto.ProductosProyecto = JsonConvert.DeserializeObject<List<ListaProductoDTO>>(proyecto.ProductosProyectoJson);
        //        proyecto.EmpleadosProyecto = JsonConvert.DeserializeObject<List<ListaEmpleadoDTO>>(proyecto.EmpleadosProyectoJson);
        //        proyecto.GastoProyecto = JsonConvert.DeserializeObject<List<GastoDTO>>(proyecto.GastoProyectoJson);
        //    }

        //    return resultSet.ToList();
        //}

        public IEnumerable<ListaProyectoDTO> GetObtenerDatosProyecto(int IdProyecto)
        {
            string query = "dbo.ObtenerDatosProyecto";

            var resultSet = _conexionDB.GetConnection(_configuration)
                .Query<ListaProyectoDTO>(query, new { IdProyecto }, commandType: CommandType.StoredProcedure);

            foreach (var proyecto in resultSet)
            {
                proyecto.TareasProyecto = DeserializeJson<List<ListaTareaDTO>>(proyecto.TareasProyectoJson);
                proyecto.ServicioProyecto = DeserializeJson<List<ListaServicioDTO>>(proyecto.ServicioProyectoJson);
                proyecto.ProductosProyecto = DeserializeJson<List<ListaProductoDTO>>(proyecto.ProductosProyectoJson);
                proyecto.EmpleadosProyecto = DeserializeJson<List<ListaEmpleadoDTO>>(proyecto.EmpleadosProyectoJson);
                proyecto.GastoProyecto = DeserializeJson<List<GastoDTO>>(proyecto.GastoProyectoJson);
            }

            return resultSet.ToList();
        }

        private T DeserializeJson<T>(string json)
        {
            if (json == null)
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(json);
        }

        /// GET PARA VER MODULO DE PAGOS 
        public IEnumerable<ObtenerDatosProcesarPagosProyectoDTO> GetObtenerDatosCoutaProyecto(int IdProyecto)
        {
            string query = "dbo.ObtenerDatosProcesarPagosProyecto";

            var resultSet = _conexionDB.GetConnection(_configuration)
                .Query<ObtenerDatosProcesarPagosProyectoDTO>(query, new { IdProyecto }, commandType: CommandType.StoredProcedure);

            foreach (var proyecto in resultSet)
            {
                proyecto.LCuotaProyectoDTO = DeserializeJson<List<CuotaProyectoDTO>>(proyecto.CuotaProyectoJson);
               
            }

            return resultSet.ToList();
        }

        // Lista  de get para formulario de proyecto 
        public IEnumerable<ServiciosDTO> GetServicio()
        {
            string query = "dbo.ListaServicios";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ServiciosDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public IEnumerable<ProyectoClienteDTO> GetClienteProyecto()
        {
            string query = "dbo.ListaClienteProyecto";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProyectoClienteDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public IEnumerable<ResponsabilidadesDTO> GetResponsabilidad()
        {
            string query = "dbo.ListaResponsabilidades";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ResponsabilidadesDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
        public IEnumerable<PrioridadDTO> GetPrioridad()
        {
            string query = "dbo.ListaPrioridades";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<PrioridadDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
        public IEnumerable<ProyectoEmpleadoDTO> GetEmpeleadoProyecto()
        {
            string query = "dbo.ListaEmpleadoProyecto";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProyectoEmpleadoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public IEnumerable<ProyectoProductosDTO> GetProyectosProductos()
        {
            // Ejecutamos el get Info basica de prductos:
            string queryPrcedure1 = "dbo.GetInfoProductos";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProductosInfoBasicDTO>(queryPrcedure1, commandType: CommandType.StoredProcedure);

            // -- Declaramos la lista de Productos con su detalle:
            List<ProyectoProductosDTO> listadoProductosDetallesUndiades = new List<ProyectoProductosDTO>();

            // Por cada Producto buscamos su detalle:
            foreach (var producto in resultSet)
            {
                ProyectoProductosDTO ProductoDetalleUnidades = new ProyectoProductosDTO();
                ProductoDetalleUnidades.IdProducto = producto.IdProducto;
                ProductoDetalleUnidades.Nombre = producto.Nombre;
                ProductoDetalleUnidades.Codigo = producto.Codigo;
                ProductoDetalleUnidades.Descripcion = producto.Descripcion;
                ProductoDetalleUnidades.Modelo = producto.Modelo;
                ProductoDetalleUnidades.TieneVencimiento = producto.TieneVencimiento;
                ProductoDetalleUnidades.IdEstado = producto.IdEstado;
                ProductoDetalleUnidades.NombreEstado = producto.NombreEstado;

                // Ejecutamos el getDetalleByProductoId:
                string queryPrcedure2 = "dbo.GetInfoProductoUnidades";
                var resultGetById = _conexionDB.GetConnection(_configuration).Query<DetalleProductoUnidadMedidaDTO>(queryPrcedure2, new { IdProducto = producto.IdProducto }, commandType: CommandType.StoredProcedure);

                // Ahora traemos las unidades detalles:
                ProductoDetalleUnidades.ProductoDetallesUnidades = resultGetById.ToList();

                listadoProductosDetallesUndiades.Add(ProductoDetalleUnidades);
            }

            return listadoProductosDetallesUndiades;
        }

        public IEnumerable<ParametroCostoDTO> GetParametros()
        {
            string query = "dbo.GetParametrosCostos";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<ParametroCostoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public void InsertarParametroCosto(ParametroCosto parametro)
        {

            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                connection.Execute("dbo.InsertParametrosCostos", new { NombreParametro = parametro.NombreParametro, IdCreadoPor = parametro.IdCreadoPor }, transaction,
                    commandType: CommandType.StoredProcedure);

                transaction.Commit();
            }

            catch (Exception ex)
            {
                transaction.Rollback();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }



        // INSERTAR PROYECTO:
        // ------------- ------------ ------------ ------------- ----------------- --------------- --------------- ----------------- ------------------------
        public void InsertarProyecto(Proyecto proyecto)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Generar Secuencia Para la Cotizacion:
                var resultSecuenciaCO = connection.Query<dynamic>("dbo.GenerarSecuenciaDocumento", new { clave = "CO" }, transaction, commandType: CommandType.StoredProcedure).ToList();
                string secuenciaCO = resultSecuenciaCO[0].SecuenciaGenerada;

                // Generar Secuencia Para EL Proyecto:
                var resultSecuenciaPR = connection.Query<dynamic>("dbo.GenerarSecuenciaDocumento", new { clave = "PR" }, transaction, commandType: CommandType.StoredProcedure).ToList();
                string secuenciaPR = resultSecuenciaPR[0].SecuenciaGenerada;

                // -------------------------- INSERTAR EN LA TABLA PROYECTOS (Procedimiento: InsertarProyecto):
                int IdProyecto = connection.ExecuteScalar<int>("dbo.InsertarProyecto",

                    new
                    {
                        Secuencia = secuenciaPR,
                        Nombre = proyecto.Nombre,
                        Descripcion = proyecto.Descripcion,
                        FechaDeInicio = proyecto.FechaDeInicio,
                        FechaDeFinalizacion = proyecto.FechaDeFinalizacion,
                        TiempoDuracionEstimado = proyecto.TiempoDuracionEstimado,
                        TiempoDuracionReal = proyecto.TiempoDuracionReal,
                        PresupuestoAcordado = proyecto.PresupuestoAcordado,
                        ClienteEsPersonaFisica = proyecto.ClienteEsPersonaFisica,
                        IdEntidad = proyecto.IdEntidad,
                        IdEstado = proyecto.IdEstado,
                        IdCreadoPor = proyecto.IdCreadoPor,
                        IdEstadoRegistro = 1
                    }, transaction, commandType: CommandType.StoredProcedure); ;


                // -------------------------- INSERTAR EN LA TABLA ProyectosDetallesProductos -----PROCEDURE----- dbo.InsertarProyectoDetalleProducto:
                var proyectoDetallesProductos = proyecto.ProyectoDetallesProductos;

                foreach (var detalle in proyectoDetallesProductos)
                {
                    var dataDetalle = new
                    {
                        Cantidad = detalle.Cantidad, // DECIMAL
                        PrecioCompra = detalle.PrecioCompra, // DECIMAL
                        PrecioVenta = detalle.PrecioVenta, // DECIMAL
                        ITBIS = detalle.ITBIS, // DECIMAL
                        Codigo = detalle.Codigo, // VARCHAR(10)
                        Descuento = detalle.Descuento, // DECIMAL
                        Subtotal = detalle.Subtotal, // DECIMAL
                        IdProducto = detalle.IdProducto, // INT
                        IdUnidadDeMedida = detalle.IdUnidadDeMedida, // INT
                        IdProyecto = IdProyecto, // INT
                        IdCreadoPor = proyecto.IdCreadoPor // INT
                    };

                    connection.Execute("dbo.InsertarProyectoDetalleProducto", dataDetalle, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosEntidadesEmpresas o ProyectosEntidadesPF:
                var proyectoEntidadParams = proyecto.ProyectoEntidadParams;
                proyectoEntidadParams.IdProyecto = IdProyecto;
                if (proyecto.ClienteEsPersonaFisica)
                {
                    // -- INSERTAR EN LA TABLA ProyectosEntidadesPF:
                    connection.Execute("dbo.InsertProyectosEntidadesPersonasFisicas", proyectoEntidadParams, transaction, commandType: CommandType.StoredProcedure);
                }
                else
                {
                    // -- INSERTAR EN LA TABLA ProyectosEntidadesEmpresas:
                    connection.Execute("dbo.InsertProyectosEntidadesEmpresas", proyectoEntidadParams, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectoEmpleados -----PROCEDURE----- dbo.InsertarProyectoDetalleProducto:
                var proyectoEmpleados = proyecto.ProyectoEmpleados;
                foreach (var empleado in proyectoEmpleados)
                {
                    var dataEmpleadoProyecto = new
                    {
                        IdProyecto = IdProyecto, // INT
                        IdResponsabilidad = empleado.IdResponsabilidad, // INT
                        IdEmpleado = empleado.IdEmpleado, // INT
                        IdCreadoPor = proyecto.IdCreadoPor // INT
                    };

                    try
                    {
                        connection.Execute("dbo.InsertarProyectoEmpleado", dataEmpleadoProyecto, transaction, commandType: CommandType.StoredProcedure);
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosGastosAdicionales -----PROCEDURE----- dbo.InsertarGastoAdicional:
                var gastosAdicionales = proyecto.GastoAdicionales;
                foreach (var gasto in gastosAdicionales)
                {
                    var dataGasto = new
                    {
                        DescripcionGasto = gasto.DescripcionGasto, // VARCHAR(60)
                        MontoGasto = gasto.MontoGasto, // DECIMAL(10, 2)
                        IdProyecto = IdProyecto, // INT
                        IdCreadoPor = proyecto.IdCreadoPor // INT
                    };
                    connection.Execute("dbo.InsertarGastoAdicional", dataGasto, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosServicios -----PROCEDURE----- dbo.InsertarProyectoServicio:
                var servicios = proyecto.ProyectoServicios;
                foreach (var servicio in servicios)
                {
                    var dataServicio = new
                    {
                        Descripcion = servicio.Descripcion, // VARCHAR(70)
                        IdProyecto = IdProyecto, // INT
                        IdServicio = servicio.IdServicio, // INT
                        IdCreadoPor = proyecto.IdCreadoPor // INT
                    };

                    connection.Execute("dbo.InsertarProyectoServicio", dataServicio, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA Tarareas -----PROCEDURE----- dbo.InsertarTarea:
                var tareas = proyecto.ProyectoTareas;
                foreach (var tarea in tareas)
                {
                    var dataTarea = new
                    {
                        Nombre = tarea.Nombre, // VARCHAR(255)
                        Descripcion = tarea.Descripcion, // VARCHAR(255)
                        FechaInicio = tarea.FechaInicio, // DATE
                        FechaFinalizacion = tarea.FechaFinalizacion, // DATE
                        TiempDuracionEstimado = tarea.TiempDuracionEstimado, // VARCHAR(40)
                        FechaRealDeFinalizacion = tarea.FechaRealDeFinalizacion, // DATE
                        TiempoDuracionReal = tarea.TiempoDuracionReal, // VARCHAR(40)
                        IdParametroCosto = tarea.IdParametroCosto, // INT
                        CostoPorParametro = tarea.CostoPorParametro, // DECIMAL(10, 2)
                        Cantidad = tarea.Cantidad, // DECIMAL
                        CostoTotal = tarea.CostoTotal, // DECIMAL(10, 2)
                        IdPrioridad = tarea.IdPrioridad, // INT
                        IdProyecto = IdProyecto, // INT
                        IdEstado = tarea.IdEstado, // INT
                        IdServicioRelacionado = tarea.IdServicioRelacionado, // INT
                        IdCreadoPor = proyecto.IdCreadoPor // INT
                    };

                    connection.Execute("dbo.InsertarTarea", dataTarea, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA Cotizaciones -----PROCEDURE----- dbo.InsertarCotizacionProyecto: -----------------------------------------
                var cotizacion = proyecto.CotizacionProyecto;

                var dataCotizacion = new
                {
                    Secuencia = secuenciaCO,
                    MontoInicial = cotizacion.MontoInicial, // DECIMAL(18, 2)
                    MontoTotal = cotizacion.MontoTotal, // DECIMAL(18, 2)
                    IdCliente = cotizacion.IdCliente, // INT
                    IdEstado = cotizacion.IdEstado, // INT
                    IdProyecto = IdProyecto, // INT
                    IdCreadoPor = proyecto.IdCreadoPor // INT
                };
                connection.Execute("dbo.InsertarCotizacionProyecto", dataCotizacion, transaction, commandType: CommandType.StoredProcedure);

                transaction.Commit();
            }

            catch (Exception ex)
            {
                transaction.Rollback();
                transaction.Dispose();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }

        public void UdapteEstado(int IdProyecto, int IdTarea, int IdEstado)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            try
            {
                connection.Execute("dbo.EstadoTarea", new { IdProyecto, IdTarea, IdEstado }, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                connection.Close();
                throw ex;
            }
            connection.Close();
        }

        // -----------------------------------------------------------------------------------------------------------------------------------------------
        public IEnumerable<DocumentoDTO> GetListaDocumentosVentas()
        {
            string query = "dbo.ListadoDocumentsVentas";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<DocumentoDTO>(query, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }




        // INSERTAR FacturaVentaProyecto:
        // ------------- ------------ ------------ ------------- ----------------- --------------- --------------- ----------------- ------------------------
        public void InsertarFacturaVentaProyecto(FacturaVentaProyecto factura)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // Generar Secuencia(NCF) Para la Factura de venta:
                var resultSecuenciaFV = connection.Query<dynamic>("dbo.GenerarSecuenciaNCF", new { tipoNCFId = factura.TipoNCFId }, transaction, commandType: CommandType.StoredProcedure).ToList();

                dynamic objectSecuenciaFV = resultSecuenciaFV[0];

                // Verificar si la secuencia vencion o se agoto:
                if (objectSecuenciaFV.Mensaje == null || objectSecuenciaFV.Mensaje == DBNull.Value)
                {
                    // Asignar el vencimiento de NCF:
                    factura.FechaVencimientoNCF = objectSecuenciaFV.FechaVencimiento;
                    // Asignar la secuencia NCF a la factura
                    factura.Secuencia = objectSecuenciaFV.Secuencia;

                    // -------------------------- INSERTAR EN LA TABLA FACTURAS VENTAS PROYECTOS (Procedimiento: dbo.InsertarFacturaVentaProyecto):
                    int IdFactura = connection.ExecuteScalar<int>("dbo.InsertarFacturaVentaProyecto",

                        new
                        {
                            FechaDeEmision = DateTime.Now,
                            MontoInicial = factura.MontoInicial,
                            FechaVencimientoNCF = factura.FechaVencimientoNCF,
                            FechaDeVencimiento = DateTime.Now,
                            MontoTotal = factura.MontoTotal,
                            TipoNCFId = factura.TipoNCFId,
                            Secuencia = factura.Secuencia,
                            IdProyecto = factura.IdProyecto,
                            IdEstadoFactura = factura.IdEstadoFactura,
                            CantidadCuotas = factura.CantidadCuotas,
                            PorcientoMora = factura.PorcientoMora,
                            DiaPagoMensual = factura.DiaPagoMensual,
                            DiasParaVencimiento = factura.DiasParaVencimiento,
                            IdTipoPlazo = factura.IdTipoPlazo,
                            IdCreadoPor = factura.IdCreadoPor,

                        }, transaction, commandType: CommandType.StoredProcedure);


                    // -------------------------- INSERTAR EN LA TABLA DistribucionesPagos -----PROCEDURE----- dbo.InsertarDistribucionPago:
                    var dataDistribucionesPagos = factura.DistribucionesPagos;

                    foreach (var distribucion in dataDistribucionesPagos)
                    {
                        var dataParaInsert = new
                        {
                            IdFactura = IdFactura,
                            MontoAPagar = distribucion.MontoAPagar,
                            FechaEmision = distribucion.FechaEmision,
                            FechaVencimiento = distribucion.FechaVencimiento,
                            SePago = distribucion.SePago,
                            IdCreadoPor = factura.IdCreadoPor,
                            CuotaNumero = distribucion.CuotaNumero,
                        };

                        connection.Execute("dbo.InsertarDistribucionPago", dataParaInsert, transaction, commandType: CommandType.StoredProcedure);
                    }
                }

                else
                {
                    throw objectSecuenciaFV.Mensaje;
                }

                transaction.Commit();
            }

            catch (Exception ex)
            {
                transaction.Rollback();
                transaction.Dispose();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }


        public void InsertarPago(DataPagos pago)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {

                foreach( var item in pago.ListaPagos )
                {
                    // -------------------------- INSERTAR EN LA TABLA PPAGOS FACTURAS VENTAS PROYECTOS (Procedimiento: dbo.InsertarPagoFacturaVenta):
                    connection.Execute("dbo.InsertarPagoFacturaVenta",

                            new
                            {
                                Fecha = item.Fecha,
                                MontoPago = item.MontoPago,
                                MontoMora = item.MontoMora,
                                MontoTotal = item.MontoTotal,
                                FechaPago = item.FechaPago,
                                MontoEfectivo = item.MontoEfectivo,
                                DevolucionEfectivo = item.DevolucionEfectivo,
                                MontoTarjeta = item.MontoTarjeta,
                                Tarjeta = item.Tarjeta,
                                IdTipoPago = item.IdTipoPago,
                                IdDistribucionPago = item.IdDistribucionPago,
                                IdCreadoPor = 1,

                            }, transaction, commandType: CommandType.StoredProcedure);



                }





                transaction.Commit();
            }

            catch (Exception ex)
            {
                transaction.Rollback();
                transaction.Dispose();
                connection.Close();
                throw ex;
            }
            connection.Close();
        }
    }

}

