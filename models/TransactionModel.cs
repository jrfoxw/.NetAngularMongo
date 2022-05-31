using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _NetAngularMongo.Models{
    public class TransactionModel{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; } = "";
        public int transactionGroupId { get; set; }
        public string user {get; set;} = "default";
        public string transaction {get; set;} = "";
        public string dateOfEntry { get; set; } = "";
    }
}