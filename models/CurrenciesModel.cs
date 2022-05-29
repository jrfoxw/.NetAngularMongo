namespace _NetAngularMongo.Models
{
    public class CurrenciesModel
    {
        public List<CurrencyModel> currencies = new List<CurrencyModel>() {};
        
        public List<CurrencyModel> setCurrencyValues()
        {

            currencies.Add(new CurrencyModel().AddCurrency("fives", 5));
            currencies.Add(new CurrencyModel().AddCurrency("ones", 1));
            currencies.Add(new CurrencyModel().AddCurrency("tens", 10));
            currencies.Add(new CurrencyModel().AddCurrency("twenties", 20));
            currencies.Add(new CurrencyModel().AddCurrency("fifties", 50));
            currencies.Add(new CurrencyModel().AddCurrency("hundreds", 100));

            return currencies;
        }
    }   
}
