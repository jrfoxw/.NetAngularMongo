using _NetAngularMongo.Models;

namespace _NetAngularMongo.Services
{
    public interface ITransactionLogService
    {
        Task AddTransactions(TransactionModel[] transactions);
        Task<List<TransactionModel>> getTransactions();
    }
}