using _NetAngularMongo.Data;
using _NetAngularMongo.Models;

namespace _NetAngularMongo.Services
{
    public class ATMService : IATMService
    {
        public readonly IConfiguration _config;
        public ATMService(IConfiguration config)
        {
            _config = config;
        }
        public void connectToATM()
        {
            var data = new Data.MongDbContext<MessageModel>(_config);
            var messages = data.getCollection("messages");
            //var messageList = await messages.FindAsync<MessageModel>(_ => true);

            //return messageList.ToList<MessageModel>();
        }
    }
}
