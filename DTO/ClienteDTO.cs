﻿namespace ProyectNettApi.DTO
{
    public class ClienteDTO
    {
        public int IdCliente { get; set; }
        public string NombreEntidad { get; set; }
        public string Codigo { get; set; }
        public int IdTipoEntidad { get; set; }
        public string NombreTipoEntidad { get; set; }
        public string Identificacion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public DateTime FechaInicioCliente { get; set; }
        public string CiudadNombre { get; set; }
        public string PaisNombre { get; set; }

        // -------------------------------
        public int IdImagen { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string FileSize { get; set; }
        public string Data { get; set; }
    }
} 