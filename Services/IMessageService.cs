using _NetAngularMongo.Models;

namespace _NetAngularMongo.Services
{
    public interface IMessageService
    {
        void AddMessage(MessageModel message);
        Task<List<MessageModel>> getMessages();
    }
}