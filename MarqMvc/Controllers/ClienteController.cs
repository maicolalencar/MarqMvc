using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using MarqMvc.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MarqMvc.Controllers
{
    public class ClienteController : Controller
    {

        string BaseUri = "http://localhost:63409/";

        List<Cliente> listaClientes;

        // GET: /<controller>/
        //public IActionResult Index()
        //{
        //    ViewData["Clientes"] = "Lista de Clientes;";
        //    return View();
        //}

        public string Welcome(string name, string age)
        {
            return $"Ei {name}, você tem {age} anos.";
        }

        public async Task<IActionResult> Index()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //modo 1
                HttpResponseMessage Res = await client.GetAsync("api/Clientes");

                if (Res.IsSuccessStatusCode)
                {
                    var resposta = Res.Content.ReadAsStringAsync().Result;

                    listaClientes = JsonConvert.DeserializeObject<List<Cliente>>(resposta);

                }


            }
                return View(listaClientes);
        }

        public async Task<IActionResult> ClienteLista()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //modo 1
                HttpResponseMessage Res = await client.GetAsync("api/Clientes");

                if (Res.IsSuccessStatusCode)
                {
                    var resposta = Res.Content.ReadAsStringAsync().Result;

                    listaClientes = JsonConvert.DeserializeObject<List<Cliente>>(resposta);

                }


            }
            return View(listaClientes);
        }

        public async Task<IActionResult> ClientePaginaAdicionar()
        {
            //ViewBag.DiasSemana = DiasDaSemana
            return View("ClienteAdicionar");
        }

        [HttpPost]
        public async Task<IActionResult> ClienteAdicionar(Cliente cliente)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsJsonAsync("api/Clientes/", cliente);

                response.EnsureSuccessStatusCode();

                TempData["Mensagem"] = "Cliente incluído com sucesso.";

                return RedirectToAction("ClienteLista");

            }
        }

        public async Task<IActionResult> ClientePaginaEditar(string id)
        {
            //var cliente = 
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync($"api/Clientes/{id}");

                if (response.IsSuccessStatusCode)
                {
                    var clienteEditarString = response.Content.ReadAsStringAsync().Result;

                    var clienteEditar = JsonConvert.DeserializeObject<Cliente>(clienteEditarString);

                    return View("ClienteEditar", clienteEditar);
                }


            }

            return View("Error");
        }

        public async Task<IActionResult> ClienteExcluir(string id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.DeleteAsync($"api/Clientes/{id}");

                response.EnsureSuccessStatusCode();

                return RedirectToAction("ClienteLista");


            }
        }

        public async Task<IActionResult> ClienteEditar(Cliente cliente)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PutAsJsonAsync($"api/Clientes/{cliente.IdCliente}", cliente);

                response.EnsureSuccessStatusCode();

                TempData["Mensagem"] = "Cliente alterado com sucesso.";

                return RedirectToAction("ClienteLista");


            }
        }

        public async Task<IActionResult> TesteAjax(TesteAjax varTeste1)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //HttpResponseMessage response = await client.PutAsJsonAsync($"api/Clientes/{cliente.IdCliente}", cliente);

                //response.EnsureSuccessStatusCode();

                TempData["Mensagem"] = "Cliente alterado com sucesso.";

                return RedirectToAction("ClienteLista");


            }
        }

        public async Task<IActionResult> TesteAjaxString([FromBody] string varTeste1)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUri);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //HttpResponseMessage response = await client.PutAsJsonAsync($"api/Clientes/{cliente.IdCliente}", cliente);

                //response.EnsureSuccessStatusCode();

                TempData["Mensagem"] = "Cliente alterado com sucesso.";

                return RedirectToAction("ClienteLista");


            }
        }

        [HttpPost]
        public ActionResult ProcessSaleOrder(List<XMLInvoiceGeneration> invoices)
        {
            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> ProcessSaleOrderAsync(List<XMLInvoiceGeneration> invoices)
        {
            return new EmptyResult();
        }
    }
}
