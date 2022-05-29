using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Models;
using _NetAngularMongo.Data;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class CurrencyService : ServiceCollection, IMessageService
    {
        private readonly IConfiguration _config;

        public CurrencyService(IConfiguration config)
        {
            _config = config;
        }

        public void AddMessage(MessageModel message)
        {
            var db = new Data.MongDbContext<MessageModel>(_config).connect();
            var selectedCollection = db.GetCollection<MessageModel>("messages");
            if (message != null)
            {

                selectedCollection.InsertOne(message);
            }

        }

        public async Task<List<MessageModel>> getMessages()
        {
            var messages = new List<MessageModel>();
            var db = new Data.MongDbContext<MessageModel>(_config).connect();
            var collection = db.GetCollection<MessageModel>("atm_denominations");
            var messageList = await collection.FindAsync<MessageModel>(_ => true);
            messages = messageList.ToList<MessageModel>();
            return messages;
        }

    }
}
