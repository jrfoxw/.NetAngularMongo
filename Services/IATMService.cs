using _NetAngularMongo.Models;
using MongoDB.Driver;

namespace _NetAngularMongo.Services
{
    public interface IATMService
    {
        IMongoCollection<ATMmodel> connectToATM();
        Task<ATMmodel> updateATMAsync(ATMmodel atm);
        Task<ATMmodel> getATMAsync();
        //Task updateDeposits(int value, ATMmodel atm);
    }
}