﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Proyecto")]
    [ApiController]
    //[Authorize]
    public class ProyectoController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IProyectoRespositorio _proyectoRepositorio;
        private readonly InfoUserByToken _infoUser;

        public ProyectoController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _proyectoRepositorio = new ProyectoRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        
        [Authorize]
        [Route("obtenerClientes")]
        [HttpGet]
        public IActionResult getClientes()
        {
            try
            {
                var lista = _proyectoRepositorio.GetClienteProyecto();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerListaProyecto")]
        [HttpGet]
        public IActionResult getListaProyecto()
        {
            try
            {
                var lista = _proyectoRepositorio.GetListaProyecto();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //[Authorize]
        [Route("obtenerProyectoCompleto")]
        [HttpGet]
        public IActionResult getProyectoCompleto(int IdProyecto)
        {
            try
            {
                var lista = _proyectoRepositorio.GetObtenerDatosProyecto(IdProyecto);
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Route("obtenerProyectoCouta")]
        [HttpGet]
        public IActionResult getCoutas(int IdProyecto)
        {
            try
            {
                var lista = _proyectoRepositorio.GetObtenerDatosCoutaProyecto(IdProyecto);
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("obtenerServicio")]
        [HttpGet]
        public IActionResult getServicio()
        {
            try
            {
                var lista = _proyectoRepositorio.GetServicio();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("obtenerParametros")]
        [HttpGet]
        public IActionResult getParametros()
        {
            try
            {
                var lista = _proyectoRepositorio.GetParametros();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("obtenerEmpleado")]
        [HttpGet]
        public IActionResult getEmpleadoProyecto()
        {
            try
            {
                var lista = _proyectoRepositorio.GetEmpeleadoProyecto();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("obtenerResposabilidad")]
        [HttpGet]
        public IActionResult getResponsabilidad()
        {
            try
            {
                var lista = _proyectoRepositorio.GetResponsabilidad();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("obtenerPrioridad")]
        [HttpGet]
        public IActionResult getPrioridad()
        {
            try
            {
                var lista = _proyectoRepositorio.GetPrioridad();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado  obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        [Authorize]
        [Route("getProductosUnidadesDetalles")]
        [HttpGet]
        public IActionResult getProductosUnidadesDetalles()
        {
            try
            {
                var lista = _proyectoRepositorio.GetProyectosProductos();
                _respuesta.Result = lista;
                _respuesta.DisplayMessage = "Listado obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para insertar Cliente: --------------------------------------------
        [Authorize]
        [Route("insertarParametroCosto")]
        [HttpPost]
        public IActionResult insertarParametroCosto(ParametroCosto parametro)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            parametro.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _proyectoRepositorio.InsertarParametroCosto(parametro);
                _respuesta.Result = parametro;
                _respuesta.DisplayMessage = "Paramtro insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el parametro";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para InsertarFacturaVentaProyecto: --------------------------------------------
        [Authorize]
        [Route("InsertarFacturaVentaProyecto")]
        [HttpPost]
        public IActionResult InsertarFacturaVentaProyecto(FacturaVentaProyecto facturaVenta)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            facturaVenta.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _proyectoRepositorio.InsertarFacturaVentaProyecto(facturaVenta);
                _respuesta.Result = facturaVenta;
                _respuesta.DisplayMessage = "Factura de venta de proyecto creada correctamente:";
                return Ok(_respuesta);
            }
            //
            catch (InvalidOperationException ex) // Capturamos la excepción personalizada
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Se ha agotado o vencido el comprobante fiscal";
                _respuesta.ErrorMessages = new List<string> { ex.Message };
                return StatusCode(500, _respuesta);
            }
            //
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al crear la factura de venta";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        // .A.C.C.I.O.N -- Para InsertarFacturaVentaProyecto: --------------------------------------------
        [Authorize]
        [Route("InsertarPagoFacturaVentaProyecto")]
        [HttpPost]
        public IActionResult InsertaPagos(DataPagos facturaVenta)
        {
          
            try
            {
                _proyectoRepositorio.InsertarPago(facturaVenta);
                _respuesta.Result = facturaVenta;
                _respuesta.DisplayMessage = "Pagos Factura de venta de proyecto creada correctamente:";
                return Ok(_respuesta);
            }
         
            //
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error ";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        //
        // .A.C.C.I.O.N -- Para Insertar Proyectos: --------------------------------------------
        [Authorize]
        [Route("insertarProyectos")]
        [HttpPost]
        public IActionResult insertarProyectos(Proyecto proyecto)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            proyecto.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _proyectoRepositorio.InsertarProyecto(proyecto);
                _respuesta.Result = proyecto;
                _respuesta.DisplayMessage = "Proyecto insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el proyecto";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }

        [Authorize]
        [Route("ActualizarEstadoTarea")]
        [HttpPost]
        public IActionResult EstadoTarea(int IdProyecto, int IdTarea, int IdEstado)
        {
          
            try
            {
                _proyectoRepositorio.UdapteEstado(IdProyecto , IdTarea, IdEstado);
                _respuesta.Result =  IdEstado;
                _respuesta.DisplayMessage = "Actualizar tarea correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al Actualizar la tarea";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        [Authorize]
        [Route("GetListaDocumentos")]
        [HttpGet]
        public IActionResult GetListaDocumentos()
        {

            try
            {
                var listaDocs = _proyectoRepositorio.GetListaDocumentosVentas();
                _respuesta.Result = listaDocs;
                _respuesta.DisplayMessage = "Listado de documentos de ventas obtenida correctamente";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al obtener la lista de documentos";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        [Authorize]
        [Route("GetListaDocumentosCompras")]
        [HttpGet]
        public IActionResult GetListaDocumentosCompras()
        {

            try
            {
                var listaDocs = _proyectoRepositorio.GetListaDocumentosCompras();
                _respuesta.Result = listaDocs;
                _respuesta.DisplayMessage = "Listado de documentos de ventas obtenida correctamente";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al obtener la lista de documentos";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
