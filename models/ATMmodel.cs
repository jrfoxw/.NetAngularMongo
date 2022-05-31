using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _NetAngularMongo.Models
{ 

    // atm_self
    public class ATMmodel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; } = "";
        public bool isOnline { get; set; }
        public string? unitName { get; set; } = "ATM1";
        public int maxCurrency {get; set; }
        public int totalCurrency { get; set; }
        public int totalDeposits { get; set; }
        public int totalWithdraws { get; set; }
        public string maintenanceTime { get; set; } = new DateTime().ToString();


    }
}
