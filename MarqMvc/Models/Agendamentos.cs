using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarqMvc.Models
{
    public class Agendamentos
    {
        public DiasDaSemana DiaDaSemana { get; set; }

        [DataType(DataType.Time)]
        public TimeSpan Hora { get; set; }

    }
}
