using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _NetAngularMongo.Models{
    public class MessageModel{

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = "";
        public int MessageId { get; set; }
        public string User {get; set;} = "default";
        public string Message {get; set;} = "message";
        public string DateOfEntry { get; set; } = "";
    }
}