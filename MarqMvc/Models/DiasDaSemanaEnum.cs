using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MarqMvc.Models
{
    public enum DiasDaSemana
    {
        [Display(Name="Domingo")]
        Domingo,
        [Display(Name = "Segunda-feira")]
        SegundaFeira,
        [Display(Name = "Terça-feira")]
        TercaFeira,
        [Display(Name = "Quarta-feira")]
        QuartaFeira,
        [Display(Name = "Quinta-feira")]
        QuintaFeira,
        [Display(Name = "Sexta-feira")]
        SextaFeira,
        [Display(Name = "Sábado")]
        Sabado
    }

}
