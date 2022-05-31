using _NetAngularMongo.Data;
using _NetAngularMongo.Models;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class ATMService : IATMService
    {
        public readonly IConfiguration _config;
        public ATMService(IConfiguration config)
        {
            _config = config;
        }
        public IMongoCollection<ATMmodel> connectToATM()
        {
            var db = new Data.MongDbContext<ATMmodel>(_config).connect();
            var collection = db.GetCollection<ATMmodel>("atm_self");

            return collection;
        }

        public async Task<ATMmodel> getATMAsync()
        {
            var collection = connectToATM();
            //var filter = Builders<ATMmodel>.Filter.Eq("unitName", "ATM1");
            var atm = await collection.FindAsync<ATMmodel>(_ => true);
            return atm.FirstOrDefault();
            
        }

        public async Task<ATMmodel> updateATMAsync(ATMmodel atm)
        {
            var collection = connectToATM();
            var filter = Builders<ATMmodel>.Filter.Eq("unitName","ATM1" );
            var model =  await collection.ReplaceOneAsync(filter, atm, new ReplaceOptions { IsUpsert = true });
            return await getATMAsync();
        }

       /* public async Task updateDeposits(int value, ATMmodel atm)
        {
            var collection = connectToATM();
            var filter = Builders<ATMmodel>.Filter.Eq("unitName", "ATM1");
            await collection.ReplaceOneAsync(filter, atm, new ReplaceOptions { IsUpsert = true });
        }*/
    }
}
