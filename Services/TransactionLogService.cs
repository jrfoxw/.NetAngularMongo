using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Models;
using _NetAngularMongo.Data;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class TransactionLogService : ServiceCollection, ITransactionLogService
    {
        private readonly IConfiguration _config;

        public TransactionLogService(IConfiguration config)
        {
            _config = config;
        }


        private IMongoCollection<TransactionModel> connectDb()
        {
            var db = new Data.MongDbContext<TransactionModel>(_config).connect();
            return db.GetCollection<TransactionModel>("atm_transaction_logs");

        }

        public async Task AddTransactions(TransactionModel[] transactions)
        {

            if (transactions != null)
            {

                var collection = connectDb();
                await collection.InsertManyAsync(transactions);
            }

        }

        public async Task<List<TransactionModel>> getTransactions()
        {
            var transactions = new List<TransactionModel>();
            var collection = connectDb();
            var messageList = await collection.FindAsync<TransactionModel>(_ => true);
            transactions = messageList.ToList<TransactionModel>();
            return transactions;
        }

    }
}
