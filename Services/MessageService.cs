using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Models;
using _NetAngularMongo.Data;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public class MessageService : ServiceCollection, IMessageService
    {
        private readonly IConfiguration _config;

        public MessageService(IConfiguration config)
        {
            _config = config;
        }

        public void AddMessage(TransactionModel message)
        {
            var db = new Data.MongDbContext<TransactionModel>(_config).connect();
            var selectedCollection = db.GetCollection<TransactionModel>("messages");
            if (message != null)
            {

                selectedCollection.InsertOne(message);
            }

        }

        public async Task<List<TransactionModel>> getMessages()
        {
            var messages = new List<TransactionModel>();
            var db = new Data.MongDbContext<TransactionModel>(_config).connect();
            var collection = db.GetCollection<TransactionModel>("atm_denominations");
            var messageList = await collection.FindAsync<TransactionModel>(_ => true);
            messages = messageList.ToList<TransactionModel>();
            return messages;
        }

    }
}
