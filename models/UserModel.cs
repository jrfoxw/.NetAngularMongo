using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace _NetAngularMongo.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int  Id { get; set; }
        public int Role { get; set; } // set the role for the user (customer, admin, maintenance)
        public string Name { get; set; } = "default";
        public int Withdraws { get; set; } = 0;
        public int Deposits { get; set; } = 0;
        public int Balance { get; set; } = 0;
        public List<CurrencyModel> CurrenciesOwned { get; set; } = new List<CurrencyModel>() { };
        public string? Comments { get; set; }


        public void addBaseCurrency(string currencyName) {

            CurrenciesOwned = new CurrenciesModel().setCurrencyValues();
            
        }

        public void removeCurrency(string currencyName, int amount )
        {

        }

    }
}
