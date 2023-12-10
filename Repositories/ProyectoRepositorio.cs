using Dapper;
using ProyectNettApi.DTO;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using System.Data;
using System.Reflection.Metadata;

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
                // -------------------------- INSERTAR EN LA TABLA PROYECTOS (Procedimiento: InsertarProyecto):
                connection.Execute("dbo.InsertarProyecto",

                    new
                    {
                        Nombre = proyecto.Nombre,
                        Descripcion = proyecto.Descripcion,
                        FechaDeInicio = proyecto.FechaDeInicio,
                        FechaDeFinalizacion = proyecto.FechaDeFinalizacion,
                        TiempoDuracionEstimado = proyecto.TiempoDuracionEstimado,
                        //FechaRealDeFinalizacion = null,
                        //TiempoDuracionReal = proyecto.TiempoDuracionReal,
                        PresupuestoAcordado = proyecto.PresupuestoAcordado,
                        ClienteEsPersonaFisica = proyecto.ClienteEsPersonaFisica,
                        IdEntidad = proyecto.IdEntidad,
                        IdEstado = proyecto.IdEstado,
                        IdCreadoPor = proyecto.IdCreadoPor,
                        FechaCreacion = proyecto.FechaCreacion,
                        IdEstadoRegistro = proyecto.IdEstadoRegistro,
                        IdModificadoPor = proyecto.IdModificadoPor
                    }, transaction, commandType: CommandType.StoredProcedure);


                // -------------------------- INSERTAR EN LA TABLA ProyectosDetallesProductos -----PROCEDURE----- dbo.InsertarProyectoDetalleProducto:
                var proyectoDetallesProductos = proyecto.ProyectoDetallesProductos;
                foreach (var detalle in proyectoDetallesProductos)
                {
                    connection.Execute("dbo.InsertarProyectoDetalleProducto", detalle, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosEntidadesEmpresas o ProyectosEntidadesPF:
                var proyectoEntidadParams = proyecto.ProyectoEntidadParams;
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
                    connection.Execute("dbo.InsertarProyectoEmpleado", empleado, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosGastosAdicionales -----PROCEDURE----- dbo.InsertarGastoAdicional:
                var gastosAdicionales = proyecto.GastoAdicionales;
                foreach (var gasto in gastosAdicionales)
                {
                    connection.Execute("dbo.InsertarGastoAdicional", gasto, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosServicios -----PROCEDURE----- dbo.InsertarProyectoServicio:
                var servicios = proyecto.ProyectoServicios;
                foreach (var servicio in servicios)
                {
                    connection.Execute("dbo.InsertarProyectoServicio", servicio, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA ProyectosServicios -----PROCEDURE----- dbo.InsertarProyectoServicio:
                var tareas = proyecto.ProyectoTareas;
                foreach (var tarea in tareas)
                {
                    connection.Execute("dbo.InsertarTarea", tarea, transaction, commandType: CommandType.StoredProcedure);
                }

                // -------------------------- INSERTAR EN LA TABLA Cotizaciones -----PROCEDURE----- dbo.InsertarProyectoServicio:
                var cotizaciones = proyecto.CotizacionesProyecto;
                foreach (var cotizacion in cotizaciones)
                {
                    connection.Execute("dbo.InsertarCotizacionProyecto", cotizacion, transaction, commandType: CommandType.StoredProcedure);
                }

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
