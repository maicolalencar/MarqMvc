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
    public class PagamentoController : Controller
    {
        string BaseUri = "http://localhost:63409/";

        public async Task<IActionResult> PagamentoAdicionar(Pagamentos pagamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.PostAsJsonAsync($"api/Pagamentos/", pagamento);

                    response.EnsureSuccessStatusCode();

                    var result = await response.Content.ReadAsStringAsync();
                    var resultJson = JsonConvert.DeserializeObject<Pagamentos>(result);

                    TempData["Mensagem"] = "Pagamento incluído com sucesso";

                    return Json(new { success = true, novoPagamentoId = resultJson.Id });
                }
                catch (Exception e)
                {
                    return Json(new { success = false, mensagem = "Ocorreu um erro na inclusão do pagamento" });
                }
            }
        }

        public async Task<IActionResult> PagamentoAlterar(Pagamentos pagamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.PutAsJsonAsync($"api/Pagamentos/{pagamento.Id}", pagamento);

                    response.EnsureSuccessStatusCode();

                    return Json(new { success = true });
                }
                catch (Exception e)
                {
                    return Json(new { success = false, mensagem = "Ocorreu um erro na alteração do pagamento" });

                }
            }
        }

        public async Task<IActionResult> PagamentoExcluir(Pagamentos pagamento)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri(BaseUri);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = await client.DeleteAsync($"api/Pagamentos/{pagamento.Id}");

                    response.EnsureSuccessStatusCode();

                    return Json(new { success = true });
                }
                catch (Exception e)
                {
                    return Json(new { success = false, mensagem = "Ocorreu um erro na exclusão do cliente" });

                }
            }
        }


        public IActionResult PagamentoTelaAdicionar(int idCliente)
        {
            return View("PagamentoAdicionar", new Pagamentos() { IdCliente = idCliente, DataPagamento = DateTime.Now });
        }
    }
}