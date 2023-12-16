using Dapper;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;
using System.Reflection;

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


                // -
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla ProductosImagenes: ........................................
                foreach (var productImage in producto.DataProductoImagenes)
                {
                    //Insertar en la tabla imagenes
                    string queryProcedureInserImage = "dbo.InsertarImagen";
                    var imagen = productImage.Imagen;
                    var dataImage = new
                    {
                        FileName = imagen.FileName,
                        ContentType = imagen.ContentType,
                        FileSize = imagen.FileSize,
                        Data = imagen.Data,
                        IdCreadoPor = producto.IdCreadoPor,
                    };
                    int IdImagen = connection.ExecuteScalar<int>(queryProcedureInserImage, dataImage, transaction, commandType: CommandType.StoredProcedure);


                    //Insertar en la tabla ProductoImagenes
                    string queryPi = "dbo.InsertarProductoImagen";
                    var dataPI = new
                    {
                        IdImagen = IdImagen,
                        IdProducto = IdProducto,
                        EsLaPrincipal = productImage.ProductoImagen.EsLaPrincipal,
                        IdCreadoPor = producto.IdCreadoPor,
                    };
                    connection.Execute(queryPi, dataPI, transaction, commandType: CommandType.StoredProcedure);
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
