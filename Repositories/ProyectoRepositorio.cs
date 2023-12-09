using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
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

        // Lista 
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
        public IEnumerable<UnidadesMedidaDTO> GetUnidades()
        {
            string query = "dbo.ListaUnidades";

            var resultSet = _conexionDB.GetConnection(_configuration).Query<UnidadesMedidaDTO>(query, commandType: CommandType.StoredProcedure);
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
    }
   
}
