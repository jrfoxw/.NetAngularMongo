using Microsoft.AspNetCore.Mvc;

namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ATMController : ControllerBase
    {
        private readonly ILogger? _log;
        private readonly IConfiguration? _config;

        public ATMController(ILogger log, IConfiguration config)
        {
            _log = log;
            _config = config;
        }

        [HttpGet]
        public string Index()
        {
            _log?.LogInformation("Connecting to ATM... {config}", _config);

            Console.WriteLine("Connecting to ATM... Standby...");
            return "Connecting to ATM... Standby...";
           
        }
    }
}
