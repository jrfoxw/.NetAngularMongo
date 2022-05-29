using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Models;
using _NetAngularMongo.Data;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class CurrencyService:  ServiceCollection
    {
        private readonly IConfiguration _config;

        public CurrencyService(IConfiguration config)
        {
            _config = config;
        }
       

        public void AddMessage(CurrencyModel message)
        {
            var db = new Data.MongDbContext<CurrencyModel>(_config).connect();
            var selectedCollection = db.GetCollection<CurrencyModel>("messages");
            if (message != null)
            {

                selectedCollection.InsertOne(message);
            }

        }

        public async Task<List<CurrencyModel>> getMessages()
        {
            var messages = new List<CurrencyModel>();
            var db = new Data.MongDbContext<CurrencyModel>(_config).connect();
            var collection = db.GetCollection<CurrencyModel>("atm_denominations");
            var messageList = await collection.FindAsync<CurrencyModel>(_ => true);
            messages = messageList.ToList<CurrencyModel>();
            return messages;
        }

    }
}
