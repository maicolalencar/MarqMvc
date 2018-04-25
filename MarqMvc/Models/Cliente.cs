using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarqMvc.Models
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }

        [Required]
        public string NomeCliente { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Data de Nascimento")]
        public DateTime DataNascimento { get; set; }

        public string Endereco { get; set; }

        public string email { get; set; }

        [Phone]
        public string telefone { get; set; }

        public IList<Agendamentos> Agendamentos { get; set; }
    }
}
