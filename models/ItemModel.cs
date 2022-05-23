using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace _NetAngularMongo.Models;


public class ItemModel{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id {get; set;} = "";
    public string Name { get; set; } = "";
    public int Dmg { get; set; }
    public int Price { get; set; }
    public bool IsEdible { get; set; } = false;

}