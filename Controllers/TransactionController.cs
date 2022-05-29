using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        // GET: TransactionController
        [HttpGet]
        public void Index()
        {
            Console.WriteLine("Conntected to Transaction controller");
        }
    }
}
