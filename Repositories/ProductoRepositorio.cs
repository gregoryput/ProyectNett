using Dapper;
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

        public IEnumerable<ProductoDTO> GetProductosParaFC()
        {
            string query = "Execute dbo.GetListaProductosParaFacturaC";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<ProductoDTO>(query);
            return resultSet.ToList();
        }

        public void InsertarProducto(Producto producto)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla Persona: ........................................
                string queryPrducto = "dbo.InsertarProducto";
                var dataProduct = new
                {
                    Nombre = producto.Nombre,
                    Codigo = producto.Codigo,
                    Descripción = producto.Descripción,
                    Modelo = producto.Modelo,
                    PrecioCosto = producto.PrecioCosto,
                    PrecioVenta = producto.PrecioVenta,
                    ITBIS = producto.ITBIS,
                    IdUnidad_DeMedida = producto.IdUnidad_DeMedida,
                    IdCreadoPor = producto.IdCreadoPor,

                };
                int IdPersona = connection.Execute(queryPrducto, dataProduct, transaction, commandType: CommandType.StoredProcedure);

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
