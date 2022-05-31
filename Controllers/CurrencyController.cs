using _NetAngularMongo.Models;
using _NetAngularMongo.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyController : Controller
    {
        private readonly IConfiguration _config;
        private readonly ICurrencyService _currencyService;
        public CurrencyController(IConfiguration config, ICurrencyService currencyService)
        {
            _config = config;
            _currencyService = currencyService;
        }

        [HttpGet]
        public async Task<List<CurrencyModel>> Get()
        {

            return await _currencyService.getDenominations();

        }

        [HttpPut]
        public async Task<List<CurrencyModel>> UpdateCurrencies(List<CurrencyModel> currency)
        {
            return await _currencyService.updateDenominations(currency);
        }


    }
}
