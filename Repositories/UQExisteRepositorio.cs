using Dapper;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;

namespace ProyectNettApi.Repositories
{
    public class UQExisteRepositorio : IUQExisteRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public UQExisteRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public IEnumerable<UQExiste> VerificarUQCedula(string Cedula)
        {
            string queryExecuteProc = "dbo.VerificarUniqueCedula";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<UQExiste>(queryExecuteProc, new { cedula = Cedula }, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }

        public IEnumerable<dynamic> VerificarUQCedulaNoModel(string Cedula)
        {
            string queryExecuteProc = "dbo.VerificarUniqueCedula";
            var resultSet = _conexionDB.GetConnection(_configuration).Query(queryExecuteProc, new { cedula = Cedula }, commandType: CommandType.StoredProcedure);
            return resultSet.ToList();
        }
    }
}