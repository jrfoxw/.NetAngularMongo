using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Models;
using _NetAngularMongo.Data;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class CurrencyService : ServiceCollection, ICurrencyService
    {
        private readonly IConfiguration _config;
        private readonly IATMService _ATMService;

        public CurrencyService(IConfiguration config, IATMService ATMService)
        {
            _config = config;
            _ATMService = ATMService;
            //this.model = ATMService.connectToATM();
        }


        /*public void AddMessage(CurrencyModel message)
        {
            var db = new Data.MongDbContext<CurrencyModel>(_config).connect();
            var selectedCollection = db.GetCollection<CurrencyModel>("messages");
            if (message != null)
            {

                selectedCollection.InsertOne(message);
            }

        }*/

        private IMongoCollection<CurrencyModel> connectDb()
        {
            var db = new Data.MongDbContext<CurrencyModel>(_config).connect();
            return db.GetCollection<CurrencyModel>("atm_denominations");
            
        }

        public async Task<List<CurrencyModel>> getDenominations()
        {
            var denonimations = new List<CurrencyModel>();
            var collection = connectDb();
            var denominationsList = await collection.FindAsync<CurrencyModel>(_ => true);
            return denominationsList.ToList<CurrencyModel>();
        }

        public async Task UpdateDenomination(CurrencyModel currency)
        {
            Console.WriteLine("Currency Submitted: ", currency);

            var collection = connectDb();
            var filter = Builders<CurrencyModel>.Filter.Eq("name", currency.name);
            await collection.ReplaceOneAsync(filter, currency, new ReplaceOptions { IsUpsert = true});
            
        }

        public async Task<List<CurrencyModel>> updateDenominations(List<CurrencyModel> currencies)
        {
            var collection = connectDb();
            
            //var update = Builders<CurrencyModel>.Update;
            foreach(var currency in currencies)
            {
                var filter = Builders<CurrencyModel>.Filter.Eq("name", currency.name);
                await collection.ReplaceOneAsync(filter, currency, new ReplaceOptions { IsUpsert = true });
            }
            return await getDenominations();
        }

        public async Task SetDefaultDenominations(ATMmodel model)
        {
            // Set denominations to default
            var currencies = await getDenominations();
            currencies.ForEach(currency =>
            {
                currency.amount = 10;
                currency.total = currency.value * currency.amount;
            });

            var n = await updateDenominations(currencies);
            

            var connection = connectDb();
            var collection = n;

            
            model.totalCurrency = collection
                                    .Select(x => x)
                                    .Where(x => x.value > 0)
                                    .Sum(x => x.value) * 10;
            model.isOnline = true;
            model.maxCurrency = 2500;

            // Set ATM to defaults
            await this._ATMService.updateATMAsync(model);
        }
    }
}
