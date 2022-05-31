using _NetAngularMongo.Models;
using _NetAngularMongo.Services;
using Microsoft.AspNetCore.Mvc;

namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ATMController : ControllerBase
    {
        private readonly ILogger? _log;
        private readonly IConfiguration? _config;
        private readonly IATMService _ATMService;
        private readonly ICurrencyService _currencyService;

        public ATMController(IConfiguration config, IATMService atmService, ICurrencyService currencyService)
        {
            _config = config;
            _ATMService = atmService;
            _currencyService = currencyService;
        }

        [HttpGet]
        public async Task<ATMmodel> get()
        {

            _log?.LogInformation("Connecting to ATM... {config}", _config);

            Console.WriteLine("Connecting to ATM... Standby...");
            
            var atm = await this._ATMService.getATMAsync();
            
            // If ATM is offline when accessed reset it to defaults.
            if (!atm.isOnline)
            {
                await this._currencyService.SetDefaultDenominations(atm).ContinueWith((x) =>
                {
                    var currencies = this._currencyService.getDenominations();
                });
            }
            return atm;       
        }

        [HttpPatch]
        public async Task<ATMmodel> update(ATMmodel atm)
        {
            return await this._ATMService.updateATMAsync(atm);
        }
    }
}
