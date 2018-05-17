using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MarqMvc.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MarqMvc.Controllers
{
    public class AgendamentoController : Controller
    {
        string BaseUri = "http://localhost:63409/";

        public async Task<IActionResult> AgendamentoAdicionar(Agendamentos agendamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.PostAsJsonAsync($"api/Agendamentos/", agendamento);

                    response.EnsureSuccessStatusCode();

                    var result = await response.Content.ReadAsStringAsync();
                    var resultJson = JsonConvert.DeserializeObject<Agendamentos>(result);
                    //TempData["Mensagem"] = "Agendamentos alterado com sucesso.";

                    return Json(new { success = true, novoAgendamentoId = resultJson.Id });
                }
                catch (Exception e)
                {
                    //TempData["Mensagem"] = "Ocorreu um erro na inclusão do cliente";

                    //return RedirectToAction("ClienteLista");
                    return Json(new { success = false, mensagem = "Ocorreu um erro na inclusão do agendamento" });

                }
            }
        }

        public async Task<IActionResult> AgendamentoAlterar(Agendamentos agendamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.PutAsJsonAsync($"api/Agendamentos/{agendamento.Id}", agendamento);

                    response.EnsureSuccessStatusCode();

                    //TempData["Mensagem"] = "Agendamentos alterado com sucesso.";

                    return Json(new { success = true });
                }
                catch (Exception e)
                {
                    //TempData["Mensagem"] = "Ocorreu um erro na inclusão do cliente";

                    //return RedirectToAction("ClienteLista");
                    return Json(new { success = false, mensagem = "Ocorreu um erro na alteração do agendamento" });

                }
            }
        }

        public async Task<IActionResult> AgendamentoExcluir(Agendamentos agendamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.DeleteAsync($"api/Agendamentos/{agendamento.Id}");

                    response.EnsureSuccessStatusCode();

                    //TempData["Mensagem"] = "Agendamentos alterado com sucesso.";

                    return Json(new { success = true });
                }
                catch (Exception e)
                {
                    //TempData["Mensagem"] = "Ocorreu um erro na inclusão do cliente";

                    //return RedirectToAction("ClienteLista");
                    return Json(new { success = false, mensagem = "Ocorreu um erro na exclusão do cliente" });

                }
            }
        }


    }
}