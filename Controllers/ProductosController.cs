using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using ProyectNettApi.Interfaces;
using ProyectNettApi.Models;
using ProyectNettApi.Repositories;

namespace ProyectNettApi.Controllers
{
    [Route("Productos")]
    [ApiController]
    [Authorize]
    public class ProductosController : ControllerBase
    {
        protected Respuesta _respuesta;
        private readonly IConfiguration _configuration;
        private readonly IProductoRepositorio _productoRepositorio;
        private readonly InfoUserByToken _infoUser;

        public ProductosController(IConfiguration configuration)
        {
            _respuesta = new Respuesta();
            _configuration = configuration;
            _productoRepositorio = new ProductoRepositorio(_configuration);
            _infoUser = new InfoUserByToken();
        }

        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Productos: --------------------------------------------
        [Authorize]
        [Route("obtenerProductos")]
        [HttpGet]
        public IActionResult getProductos()
        {
            try
            {
                var listaProductos = _productoRepositorio.GetProductos();
                _respuesta.Result = listaProductos;
                _respuesta.DisplayMessage = "Listado de productos obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de products";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }



        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Productos: --------------------------------------------
        [Authorize]
        [Route("GetOrdenCompraById")]
        [HttpGet]
        public IActionResult getrdenCompraById(int OrdenId)
        {
            try
            {
                var OrdenCompra = _productoRepositorio.GetOrdenCompraById(OrdenId);
                _respuesta.Result = OrdenCompra;
                _respuesta.DisplayMessage = "Orden de compra obtenida correctamente";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la orden de compra";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para obtener la lista basica de Productos: --------------------------------------------
        [Authorize]
        [Route("GetListaProductosInfoInv")]
        [HttpGet]
        public IActionResult GetListaProductosInfoInv()
        {
            try
            {
                var listaProductos = _productoRepositorio.GetListaProductosInfoInv();
                _respuesta.Result = listaProductos;
                _respuesta.DisplayMessage = "Listado de productos obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de products";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para CREAR LA ORDEN COMPRA: --------------------------------------------
        [Authorize]
        [Route("CrearOrdenCompra")]
        [HttpPost]
        public IActionResult CreateOrdenCompra(OrdenCompra ordenCompra)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            ordenCompra.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _productoRepositorio.CrearOrdenCompra(ordenCompra);
                _respuesta.Result = ordenCompra;
                _respuesta.DisplayMessage = "orden de compra creada correctamente";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al crear la orden de compra";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }



        //
        // .A.C.C.I.O.N -- Para obtener los productos a mostrar en la Factura de Entraada: --------------------------------------------
        [Authorize]
        [Route("obtenerProductosParaFC")]
        [HttpGet]
        public IActionResult getProductosParaFC()
        {
            try
            {
                var listaProductos = _productoRepositorio.GetProductosParaFC();
                _respuesta.Result = listaProductos;
                _respuesta.DisplayMessage = "Listado de productos obtenido con exito:";
                return Ok(_respuesta);
            }
            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al solicitar la lista de products";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


        //
        // .A.C.C.I.O.N -- Para insertar Producto: --------------------------------------------
        [Authorize]
        [Route("insertarProducto")]
        [HttpPost]
        public IActionResult insertarProducto(ProductoINV producto)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            producto.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _productoRepositorio.InsertarProducto(producto);
                _respuesta.Result = producto;
                _respuesta.DisplayMessage = "Producto insertado correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al insertar el producto";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }


         //
        // .A.C.C.I.O.N -- Para insertar Producto: --------------------------------------------
        [Authorize]
        [Route("AprobarOrdenCompra")]
        [HttpPost]
        public IActionResult AprobarOrdenCompra(int OrdenId)
        {
            string token = HttpContext.Request.Headers["Authorization"];
            //producto.IdCreadoPor = _infoUser.getUsuarioIdByToken(token);
            try
            {
                _productoRepositorio.AprobarOrdenCmpra(OrdenId);
                _respuesta.Result = OrdenId;
                _respuesta.DisplayMessage = "Orden aprobada correctamente:";
                return Ok(_respuesta);
            }

            catch (Exception ex)
            {
                _respuesta.IsSuccess = false;
                _respuesta.DisplayMessage = "Error al aprobar la OC";
                _respuesta.ErrorMessages = new List<string> { ex.ToString() };
                return StatusCode(500, _respuesta);
            }
        }
    }
}
