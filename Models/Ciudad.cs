﻿using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class PersonaDTO
    {
        public int IdCiudad { get; set; }
        public string CiudadNombre { get; set; }
        public int IdPais { get; set; }
    }
}
