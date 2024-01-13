using Dapper;
using Newtonsoft.Json;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System;
using System.Data;
namespace ProyectNettApi.Repositories
{
    public class ProductoRepositorio : IProductoRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;
        public ProductoRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }
        public IEnumerable<ProductoDTO> GetProductos()
        {
            string query = "Execute dbo.GetListaProductosConExistencia";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProductoDTO>(query);
            return resultSet.ToList();
        }

        public OrdenCompraDTO GetOrdenCompraById(int OrdenId)
        {
            string query = "dbo.GetOrdenCompraById";
            // var resultSet = _conexionDB.GetConnection(_configuration).Query<OrdenCompraDTO>(query).ToList()[0];
            var resultSet = _conexionDB.GetConnection(_configuration).Query<OrdenCompraDTO>(query, new { IdOrdenCompra = OrdenId }, commandType: CommandType.StoredProcedure).ToList()[0];

            // Sacar los datos de la relacion con OrdenesComprasDetalles:
            string proc1 = "dbo.GetOrdenCompraDetallesById";
            var resultProc2 = _conexionDB.GetConnection(_configuration).Query<OrdenCompraDetalleDTO>(proc1, new { IdOrdenCompra = resultSet.IdOrdenCompra }, commandType: CommandType.StoredProcedure);

            resultSet.DetallesOrdenCompra = resultProc2.ToList();

            return resultSet;
        }

        public IEnumerable<ProductoInfoBasicaDTO> GetListaProductosInfoInv()
        {
            string query = "Execute dbo.GetListaProductosInfoBasica";
            var resultProc = _conexionDB.GetConnection(_configuration).Query<ProductoInfoBasicaResultProcedure>(query);

            var resultSet = new List<ProductoInfoBasicaDTO>();

            List<ProdutoDetalleUnidadMedidaDetalle> detallesUnidades = new List<ProdutoDetalleUnidadMedidaDetalle>();

            foreach (var producto in resultProc)
            {
                var ProductInfo = new ProductoInfoBasicaDTO();
                var dataDetail = JsonConvert.DeserializeObject<List<ProductoExistenciaDTO>>(producto.ProductosExistenciasJson).ToList();

                ProductInfo.IdProducto = producto.IdProducto;
                ProductInfo.Nombre = producto.Nombre;
                ProductInfo.Codigo = producto.Codigo;
                ProductInfo.Descripcion = producto.Descripcion;
                ProductInfo.Modelo = producto.Modelo;
                ProductInfo.TieneVencimiento = producto.TieneVencimiento;
                ProductInfo.IdEstado = producto.IdEstado;
                ProductInfo.EstadoNombreProducto = producto.EstadoNombreProducto;
                ProductInfo.IdEstadoRegistro = producto.IdEstadoRegistro;
                ProductInfo.NombreEstado = producto.NombreEstado;
                ProductInfo.Data = producto.Data;
                ProductInfo.ContentType = producto.ContentType;
                ProductInfo.ProductoExistencias = dataDetail;
                resultSet.Add(ProductInfo);

                // Sacar los datos de la relacion con ProductosUnidadesDeMedida:
                string proc1 = "dbo.Get_ProductosUnidadesDeMedida_By_IdProducto";
                var resultProc1 = _conexionDB.GetConnection(_configuration).Query<ProductoUnidadDeMedida>(proc1, new { producto.IdProducto }, commandType: CommandType.StoredProcedure);

                foreach (var productoUnidad in resultProc1)
                {
                    // Sacar los datos de la relacion con ProductosUnidadesDeMedida:
                    string proc2 = "dbo.Get_DetallesProductosUnidadesDeMedida_By_IdProducto";
                    var resultProc2 = _conexionDB.GetConnection(_configuration).Query<DetalleProductoUnidadDeMedida>(proc2, new { productoUnidad.IdProductoUnidadDeMedida }, commandType: CommandType.StoredProcedure);

                    // Armar data para la lista:
                    ProdutoDetalleUnidadMedidaDetalle detalleUnidad = new ProdutoDetalleUnidadMedidaDetalle();
                    detalleUnidad.ProductoUnidadDeMedida = productoUnidad;
                    detalleUnidad.DetalleProductoUnidadDeMedida = resultProc2.ToList()[0];

                    detallesUnidades.Add(detalleUnidad);
                }
            }
            return resultSet.ToList();
        }


        public IEnumerable<ProductoDTO> GetProductosParaFC()
        {
            string query = "Execute dbo.GetListaProductosParaFacturaC";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProductoDTO>(query);
            return resultSet.ToList();
        }




        public void InsertarProducto(ProductoINV producto)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Producto: ........................................
                string queryPrducto = "dbo.InsertarProductoInv";
                var dataProduct = new
                {
                    Nombre = producto.Nombre,
                    Codigo = producto.Codigo,
                    Descripcion = producto.Descripcion,
                    Modelo = producto.Modelo,
                    TieneVencimiento = producto.TieneVencimiento,
                    IdCreadoPor = producto.IdCreadoPor,

                };
                int IdProducto = connection.ExecuteScalar<int>(queryPrducto, dataProduct, transaction, commandType: CommandType.StoredProcedure);


                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla ProductosUnidadesDeMedida: ........................................
                foreach (var productUNI in producto.ProductoUnidadesMedidaDetalles)
                {
                    //////////////////     //////////////////    //////////////////
                    var dataUnidades = productUNI.ProductoUnidadDeMedida;
                    string queryPUMedida = "dbo.InsertarProductoUnidadDeMedida";

                    var dataPUMedida = new
                    {
                        IdUnidadDeMedida = dataUnidades.IdUnidadDeMedida,
                        IdProducto = IdProducto,
                        IdCreadoPor = producto.IdCreadoPor,
                    };

                    int IdProductoUnidadDeMedida = connection.ExecuteScalar<int>(queryPUMedida, dataPUMedida, transaction, commandType: CommandType.StoredProcedure);


                    //////////////////   //////////////////    //////////////////
                    var dataUnidadesDetalles = productUNI.DetalleProductoUnidadDeMedida;
                    string queryDPUD = "dbo.InsertarDetalleProductoUnidadDeMedida";
                    var dataDPUD = new
                    {
                        IdProducto = IdProducto,
                        IdUnidadDeMedida = dataUnidadesDetalles.IdUnidadDeMedida,
                        PrecioCosto = dataUnidadesDetalles.PrecioCosto,
                        PrecioVenta = dataUnidadesDetalles.PrecioVenta,
                        ITBIS = dataUnidadesDetalles.ITBIS,
                        IdProductoUnidadDeMedida = IdProductoUnidadDeMedida,
                        IdCreadoPor = producto.IdCreadoPor,
                    };
                    int IdProductoDetalleUnidad = connection.ExecuteScalar<int>(queryDPUD, dataDPUD, transaction, commandType: CommandType.StoredProcedure);


                    // INSERTAR LAS EXISTENCIAS:
                    //////////////////     //////////////////    //////////////////
                   // var dataExistencia = productUNI.Existencia;
                    string queryInsertExistencia = "dbo.InsertarExistencia";

                    var existenciaInsert = new
                    {
                        Descripcion = producto.Codigo+"Unidad Id = "+productUNI.ProductoUnidadDeMedida.IdUnidadDeMedida,
                        Codigo = producto.Codigo+"-"+productUNI.ProductoUnidadDeMedida.IdUnidadDeMedida,
                        CantidadExistente = 0,
                        IdProducto = IdProducto,
                        IdUnidadMedida = productUNI.ProductoUnidadDeMedida.IdUnidadDeMedida,
                        IdDetalleProductoUnidad = IdProductoDetalleUnidad,
                        IdCreadoPor = producto.IdCreadoPor,
                    };

                    connection.Execute(queryInsertExistencia, existenciaInsert, transaction, commandType: CommandType.StoredProcedure);

                }



                // UPDATE, INSERT O DELETE A LA IMAGEN:
                var dataImagenProducto = producto.DataImagenProducto;

                // Si viene dataImagenPersona y el Data viene == "" es poque: INSERTO O ACTUALIZO
                if (dataImagenProducto != null && producto.DataImagenProducto.Imagen.Data != "")
                {
                    var imagen = producto.DataImagenProducto.Imagen;

                    // Si el IdImagen viene en 0 inserto la imagen:
                    if (imagen.IdImagen == 0)
                    {
                        //
                        // -
                        // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.InsertarImagen";
                        var dataImage = new
                        {
                            FileName = imagen.FileName,
                            ContentType = imagen.ContentType,
                            FileSize = imagen.FileSize,
                            Data = imagen.Data,
                            IdCreadoPor = producto.IdCreadoPor
                        };
                        int IdImagen = connection.ExecuteScalar<int>(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);

                        //
                        // -
                        // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                        string queryProcedureIPI = "dbo.InsertarProductoImagen";
                        var dataIPI = new
                        {
                            IdImagen = IdImagen,
                            IdProducto = IdProducto,
                            IdCreadoPor = producto.IdCreadoPor
                        };
                        connection.Execute(queryProcedureIPI, dataIPI, transaction, commandType: CommandType.StoredProcedure);
                    }

                    // SI EL ID IMAGEN NO VIENE EN CERO ACTUALIZO:
                    else
                    {
                        //
                        // -
                        // - ..U.P.D.A.T.E.. ACTUALIZANDO en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.ActualizarImagen";
                        var dataImage = new
                        {
                            IdImagen = imagen.IdImagen,
                            FileName = imagen.FileName,
                            ContentType = imagen.ContentType,
                            FileSize = imagen.FileSize,
                            Data = imagen.Data,
                            IdModificadoPor = producto.IdModificadoPor
                        };
                        connection.Execute(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);
                    }
                }

                // Si no viene dataimagen hago delete a la imagen
                else if (dataImagenProducto == null)
                {
                    string queryProcedureDeleteImae = "dbo.EliminarProductoImagen";
                    connection.Execute(queryProcedureDeleteImae, new { IdPersona = producto.IdProducto }, transaction, commandType: CommandType.StoredProcedure);
                }



                // - .C.O.M.M.I.T. Confirmo la transaccion
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








        // -----------------------------------------------------------------------------------------------------------------------------------------
        public void ActualizarProducto(ProductoINV producto)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..update en la tabla Producto: ........................................
                string queryPrducto = "dbo.UpdateProductoInv";
                var dataProduct = new
                {
                    producto.IdProducto,
                    producto.Nombre,
                    producto.Codigo,
                    producto.Descripcion,
                    producto.Modelo,
                    producto.TieneVencimiento,
                    producto.IdModificadoPor,
                };

                // UPDATE, INSERT O DELETE A LA IMAGEN:
                var dataImagenProducto = producto.DataImagenProducto;

                // Si viene dataImagenPersona y el Data viene == "" es poque: INSERTO O ACTUALIZO
                if (dataImagenProducto != null && producto.DataImagenProducto.Imagen.Data != "")
                {
                    var imagen = producto.DataImagenProducto.Imagen;

                    // Si el IdImagen viene en 0 inserto la imagen:
                    if (imagen.IdImagen == 0)
                    {
                        //
                        // -
                        // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.InsertarImagen";
                        var dataImage = new
                        {
                            FileName = imagen.FileName,
                            ContentType = imagen.ContentType,
                            FileSize = imagen.FileSize,
                            Data = imagen.Data,
                            IdCreadoPor = producto.IdCreadoPor
                        };
                        int IdImagen = connection.ExecuteScalar<int>(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);

                        //
                        // -
                        // - ..I.N.S.E.R.T.. Insertando en la tabla Imagenes: ........................................
                        string queryProcedureIPI = "dbo.InsertarProductoImagen";
                        var dataIPI = new
                        {
                            IdImagen = IdImagen,
                            IdProducto = producto.IdProducto,
                            IdCreadoPor = producto.IdCreadoPor
                        };
                        connection.Execute(queryProcedureIPI, dataIPI, transaction, commandType: CommandType.StoredProcedure);
                    }

                    // SI EL ID IMAGEN NO VIENE EN CERO ACTUALIZO:
                    else
                    {
                        //
                        // -
                        // - ..U.P.D.A.T.E.. ACTUALIZANDO en la tabla Imagenes: ........................................
                        string queryProcedureInserImage = "dbo.ActualizarImagen";
                        var dataImage = new
                        {
                            IdImagen = imagen.IdImagen,
                            FileName = imagen.FileName,
                            ContentType = imagen.ContentType,
                            FileSize = imagen.FileSize,
                            Data = imagen.Data,
                            IdModificadoPor = producto.IdModificadoPor
                        };
                        connection.Execute(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);
                    }
                }

                // Si no viene dataimagen hago delete a la imagen
                else if (dataImagenProducto == null)
                {
                    string queryProcedureDeleteImae = "dbo.EliminarProductoImagen";
                    connection.Execute(queryProcedureDeleteImae, new { IdPersona = producto.IdProducto }, transaction, commandType: CommandType.StoredProcedure);
                }



                // - .C.O.M.M.I.T. Confirmo la transaccion
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





        public void CrearOrdenCompra(OrdenCompra ordenCompra)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            // Generar Secuencia Para la Orden de compra:
            var resultSecuenciaOC = connection.Query<dynamic>("dbo.GenerarSecuenciaDocumento", new { clave = "OC" }, transaction, commandType: CommandType.StoredProcedure).ToList();
            string secuenciaOC = resultSecuenciaOC[0].SecuenciaGenerada.ToString();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Ordenes Compras: ........................................
                string queryOrdenCompra = "dbo.InsertarOrdenCompra";
                var dataOrdenCompra = new
                {
                    IdEntidadProveedor = ordenCompra.IdEntidadProveedor,
                    MontoTotal = ordenCompra.MontoTotal,
                    Secuencia = secuenciaOC.ToString(),
                    FechaEmision = ordenCompra.FechaEmision,
                    FechaEntrega = ordenCompra.FechaEntrega,
                    IdCiudadEntrega = ordenCompra.IdCiudadEntrega,
                    DireccionEntrega = ordenCompra.DireccionEntrega,
                    MontoInicial = ordenCompra.MontoInicial,
                    IdEstadoDocumento = ordenCompra.IdEstadoDocumento,
                    IdCreadoPor = ordenCompra.IdCreadoPor,

                };
                int IdOrdenCompra = connection.ExecuteScalar<int>(queryOrdenCompra, dataOrdenCompra, transaction, commandType: CommandType.StoredProcedure);


                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla ProductosUnidadesDeMedida: ........................................
                foreach (var ordenCompraDetalle in ordenCompra.OrdenCompraDetalles)
                {
                    string queryProcInsertDetail = "dbo.InsertarDetalleOrdenCompra";

                    var dataDetail = new
                    {
                        IdProducto = ordenCompraDetalle.IdProducto,
                        IdUnidadDeMedida = ordenCompraDetalle.IdUnidadDeMedida,
                        IdOrdenCompra = IdOrdenCompra,
                        Cantidad = ordenCompraDetalle.Cantidad,
                        Precio = ordenCompraDetalle.Precio,
                        ITBIS = ordenCompraDetalle.ITBIS,
                        Subtotal = ordenCompraDetalle.Subtotal,
                        IdCreadoPor = ordenCompra.IdCreadoPor,
                    };

                    connection.Execute(queryProcInsertDetail, dataDetail, transaction, commandType: CommandType.StoredProcedure);
                }


                // - .C.O.M.M.I.T. Confirmo la transaccion
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



        public void AprobarOrdenCmpra(int OrdenId)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // 
                // -
                // - ..I.N.S.E.R.T.. AprobarOrdenCompra: ........................................
                string queryAprobar = "dbo.AprobarOrdenCompra";
                var dataOrdenCompra = new
                {
                    OrdenId = OrdenId
                };
                //
                connection.Execute(queryAprobar, dataOrdenCompra, transaction, commandType: CommandType.StoredProcedure);

                // -
                // - ..I.N.S.E.R.T.. IncrementarInventario: ........................................
                string queryIncrementar = "dbo.IncrementarInventario";
                var dataIncre = new
                {
                    OrdenId = OrdenId
                };
                //
                connection.Execute(queryIncrementar, dataIncre, transaction, commandType: CommandType.StoredProcedure);


                // - .C.O.M.M.I.T. Confirmo la transaccion
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
    }
}
