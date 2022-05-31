using _NetAngularMongo.Models;

namespace _NetAngularMongo.Services
{
    public interface ICurrencyService
    {
        //void AddMessage(CurrencyModel currency);
        Task<List<CurrencyModel>> getDenominations();

        Task UpdateDenomination(CurrencyModel currency);

        Task<List<CurrencyModel>> updateDenominations(List<CurrencyModel> currencies);

        Task SetDefaultDenominations(ATMmodel model);
    }
}