﻿using System.ComponentModel.DataAnnotations;

namespace ProyectNettApi.Models
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdCreadoPor { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public DateTime FechaCreacion { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdModificadoPor { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public DateTime FechaModificacion { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public int IdEstadoRegistro { get; set; }

        [Required(ErrorMessage = "Este campo es requerido")]
        public Persona Persona { get; set; }


        public List<Empresa> Empresas { get; set; }
    }
}
