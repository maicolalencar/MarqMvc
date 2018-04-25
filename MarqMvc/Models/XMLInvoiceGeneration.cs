using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MarqMvc.Models
{
    public class XMLInvoiceGeneration
    {
        public Int64 XmlOid { get; set; }
        public string CourierCompany { get; set; }
        public string CourierService { get; set; }
        public Int64? StoreId { get; set; }
    }
}
