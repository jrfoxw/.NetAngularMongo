using _NetAngularMongo.Models;
using Microsoft.AspNetCore.Mvc;


namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyController : Controller
    {
        private readonly IConfiguration _config;
        public CurrencyController()
        {

        }

        [HttpGet]
        public async Task<List<CurrencyModel>> Get()
        {

            /*var n = new ControllerFeature().Controllers;
            Console.WriteLine("Controllers: ", n.Count);*/

            var data = new Data.MongDbContext<CurrencyModel>(_config).connect();
            var messages = data.GetCollection<CurrencyModel>("atm_denominations");
            var messageList = await messages.FindAsync<CurrencyModel>(_ => true);

            return messageList.ToList<CurrencyModel>();

        }

    }
}
