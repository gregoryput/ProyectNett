using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;
using System.Transactions;

namespace ProyectNettApi.Repositories
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        private readonly IConfiguration _configuration;
        private readonly ConexionDB _conexionDB;

        public UsuarioRepositorio(IConfiguration configuration)
        {
            _configuration = configuration;
            _conexionDB = new ConexionDB();
        }

        public InfoPerfilDTO GetInfoPerfil(int idUsuario)
        {
            string procedure = "dbo.InformacionBasicaUsuario_ByIdUsuario";
            var resultSet = _conexionDB.GetConnection(_configuration).Query(procedure, new { IdUsuario = idUsuario }, commandType: CommandType.StoredProcedure).ToList();

            InfoPerfilDTO infoPerfil = new InfoPerfilDTO();

            infoPerfil.IdUsuario = resultSet[0].IdUsuario;
            infoPerfil.NombreUsuario = resultSet[0].NombreUsuario;
            infoPerfil.Correo = resultSet[0].Correo;
            infoPerfil.NombreRol = resultSet[0].NombreRol;
            infoPerfil.IdRol = resultSet[0].IdRol;
            infoPerfil.IdEmpleado = resultSet[0].IdEmpleado;
            infoPerfil.Nombres = resultSet[0].Nombres;
            infoPerfil.Apellidos = resultSet[0].Apellidos;
            infoPerfil.Cedula = resultSet[0].Cedula;
            infoPerfil.Direccion = resultSet[0].Direccion;
            infoPerfil.Edad = resultSet[0].Edad;
            infoPerfil.FechaDeNacimiento = resultSet[0].FechaDeNacimiento;

            string procedure2 = "dbo.CargosEmpleado_ByEmpleadoId";
            var resultSet2 = _conexionDB.GetConnection(_configuration).Query(procedure2, new { IdEmpleado = infoPerfil.IdEmpleado }, commandType: CommandType.StoredProcedure).ToList();

            foreach (var result in resultSet2)
            {
                CargoDTO newCargo = new CargoDTO();
                newCargo.IdCargo = result.IdCargo;
                newCargo.NombreCargo = result.NombreCargo;
                infoPerfil.Cargos.Add(newCargo);
            }

            return infoPerfil;
        }


        public UsuarioDTO GetUsuarioLogin(string NombreUsuario, string Contraseña)
        {
            UsuarioDTO usuario = _conexionDB.GetConnection(_configuration).QueryFirstOrDefault<UsuarioDTO>("dbo.GetUsuarioLogin",
                new { NombreUsuario, Contraseña },
                commandType: CommandType.StoredProcedure);

            return usuario;
        }
    }
}
