using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System;
using System.Data;
using System.Runtime.InteropServices;
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

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Usuario):
        public IEnumerable<UsuarioDTO> getUsuario()
        {
            string query = "Execute dbo.ListaUsuario";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<UsuarioDTO>(query);
            return resultSet.ToList();
        }

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DEVOLVER una LISTA de Usuario):
        public IEnumerable<EmpleadoDTO2> GetEmpleadoParaUsuario()
        {
            string query = "Execute dbo.ListadoFiltradaParaUsuario";
            var resultSet = _conexionDB.GetConnection(_configuration).Query<EmpleadoDTO2>(query);
            return resultSet.ToList();
        }


        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para INSERTAR USUARIO):
        public string  InsertarUsuario(Usuario usuario)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
 

            try
            {
                // -
                // - ..I.N.S.E.R.T.. Insertando en la tabla usuario: ........................................
                string usuarioInsert = "dbo.Insertar_Usuario";
                var data = new
                {
              
                    NombreUsuario = usuario.NombreUsuario,
                    IdRol = usuario.IdRol,
                    Correo = usuario.Correo,
                    Contra = Segurity.Segurity.HashPassword(usuario.Contraseña).ToString(),
                    IdEmpleado = usuario.IdEmpleado,
                    IdCreadoPor = usuario.IdCreadoPor,

                };
             return  connection.ExecuteScalar<string>(usuarioInsert, data, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
      
                connection.Close();
                throw ex;
            }
            connection.Close();
        }

        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para actualizar USUARIO):
        public void ActualizarUsuario(Usuario usuario)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();


            try
            {
                // -
                // - ..I.N.S.E.R.T.. Actualizar en la tabla usuario: ........................................
                string usuarioActualizar = "dbo.ActualizarUsuario";
                var data = new
                {
                    IdUsuario = usuario.IdUsuario,
                    NombreUsuario = usuario.NombreUsuario,
                    IdRol = usuario.IdRol,
                    Correo = usuario.Correo,
                    Contra = Segurity.Segurity.HashPassword(usuario.Contraseña).ToString(),
                    IdEmpleado = usuario.IdEmpleado,
                    IdModificadoPor = usuario.IdModificadoPor,

                };
                connection.Execute(usuarioActualizar, data, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {

                connection.Close();
                throw ex;
            }
            connection.Close();
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


        //
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para DESACTIVAR/ELIMINAR CLIENTES):
        public void EliminarUsuario(int IdUsuario)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - Eliminando en la tabla
                connection.Execute("dbo.DesactivarUsuario", new { IdUsuario }, transaction,
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


        //
        // REPOSITORIO--A-P-I----P-R-O-Y-E-N-E-T-T ------ (Metodo para ACTIVAR/ELIMINAR CLIENTES):
        public void ActivarUsuario(int IdUsuario)
        {
            var connection = _conexionDB.GetConnection(_configuration);
            connection.Open();
            var transaction = connection.BeginTransaction();

            try
            {
                // - ACTIVANDO/RESTAURANDO
                connection.Execute("dbo.RestaurarUsuario", new { IdUsuario }, transaction,
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





    }
}
