using Dapper;
using Newtonsoft.Json;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
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
                    connection.ExecuteScalar<int>(queryDPUD, dataDPUD, transaction, commandType: CommandType.StoredProcedure);
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

                // Obtener las unidades en la BD:
                var detailInBD = connection!.Execute("Get_ProductosUnidadesDeMedida_By_IdProducto", new {  ProductoId = producto!.IdProducto }, commandType: CommandType.StoredProcedure);

                // -
                // -
                // -
                // - .Update en la tabla ProductosUnidadesDeMedida: ........................................
                foreach (var productUNI in producto.ProductoUnidadesMedidaDetalles)
                {
                    //////////////////     //////////////////    //////////////////
                    var dataUnidades = productUNI.ProductoUnidadDeMedida;
                    string queryPUMedida = "dbo.InsertarProductoUnidadDeMedida";

                    var dataPUMedida = new
                    {
                        IdUnidadDeMedida = dataUnidades.IdUnidadDeMedida,
                        IdProducto = dataUnidades.IdProducto,
                        IdCreadoPor = producto.IdCreadoPor,
                    };

                    int IdProductoUnidadDeMedida = connection.ExecuteScalar<int>(queryPUMedida, dataPUMedida, transaction, commandType: CommandType.StoredProcedure);


                    //////////////////   //////////////////    //////////////////
                    var dataUnidadesDetalles = productUNI.DetalleProductoUnidadDeMedida;
                    string queryDPUD = "dbo.InsertarDetalleProductoUnidadDeMedida";
                    var dataDPUD = new
                    {
                        IdProducto = dataUnidadesDetalles.IdUnidadDeMedida,
                        IdUnidadDeMedida = dataUnidadesDetalles.IdUnidadDeMedida,
                        PrecioCosto = dataUnidadesDetalles.PrecioCosto,
                        PrecioVenta = dataUnidadesDetalles.PrecioVenta,
                        ITBIS = dataUnidadesDetalles.ITBIS,
                        IdProductoUnidadDeMedida = IdProductoUnidadDeMedida,
                        IdCreadoPor = producto.IdCreadoPor,
                    };
                    connection.ExecuteScalar<int>(queryDPUD, dataDPUD, transaction, commandType: CommandType.StoredProcedure);
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
    }
}
