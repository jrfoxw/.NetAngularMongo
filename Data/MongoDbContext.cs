using MongoDB.Driver;
using _NetAngularMongo.Models;
using MongoDB.Bson;
namespace _NetAngularMongo.Data;


public class MongDbContext<T> {
    //public string connectionString = "mongodb+srv://jrfoxw:packard@cluster0.rda3b.mongodb.net/?retryWrites=true&w=majority";
    public string databaseName = "atm_manager";
    public MongoClient? client = null;

    private readonly IConfiguration _config;

    public MongDbContext(IConfiguration config)
    {
        _config = config;
    }

    public string GetDataBaseString()
    {
        return _config.GetConnectionString("db");
    }

    public IMongoDatabase connect(){
        
        client = new MongoClient(_config.GetConnectionString("db"));
        Console.WriteLine("Connecting to DB: ", client);
        IMongoDatabase db = client.GetDatabase(databaseName);
        return db;
    }

    public IMongoCollection<T> getCollection(in string collection)
    {
        var db = connect();
        return db.GetCollection<T>(collection);
    }

     


}