using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarqMvc.Models
{
    public class Pagamentos
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Data Pagamento")]
        public DateTime DataPagamento { get; set; }

        public decimal Valor { get; set; }

    }
}
