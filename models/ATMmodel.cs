using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _NetAngularMongo.Models
{ 

    // atm_self
    public class ATMmodel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }
        public bool IsOnline { get; set; }
        public int MaxCurrency {get; set; }
        public int TotalCurrency { get; set; }
        public int TotalDeposits { get; set; }
        public int TotalWithdraws { get; set; }
        public DateTime MaintenanceTime { get; set; }


    }
}
