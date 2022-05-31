using _NetAngularMongo.Models;
using _NetAngularMongo.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _NetAngularMongo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionLogService _transactionLogService;
        private readonly IConfiguration _config;

        public TransactionController(IConfiguration config, ITransactionLogService transactionLogService)
        {
            _config = config;
            _transactionLogService = transactionLogService;
        }

        // GET: TransactionController
        [HttpGet]
        public async Task<List<TransactionModel>> Get()
        {
            return await _transactionLogService.getTransactions();
        }

        [HttpPost]
        public void Post(TransactionModel[] transactions)
        {
            _transactionLogService.AddTransactions(transactions);
        }
    }
}
