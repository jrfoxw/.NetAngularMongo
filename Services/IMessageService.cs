using _NetAngularMongo.Models;

namespace _NetAngularMongo.Services
{
    public interface IMessageService
    {
        void AddMessage(TransactionModel message);
        Task<List<TransactionModel>> getMessages();
    }
}