using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace _NetAngularMongo.Models
{
    // atm_denominations
    public class CurrencyModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; } = "";
        public string name { get; set; } = "";
        public int value { get; set; } = 0;
        public int amount { get; set; } = 0;

        public CurrencyModel AddCurrency(string _name, int _value)
        {
            name = _name;
            value = _value;

            return this;
        }
    }
}
