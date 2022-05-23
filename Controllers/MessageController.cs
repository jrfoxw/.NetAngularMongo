using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using _NetAngularMongo.Models;

namespace _NetAngularMongo.Controllers;

[ApiController]
[Route("[controller]")]

public class MessageController : ControllerBase
{

    private readonly ILogger<MessageController> _logger;

    public MessageController(ILogger<MessageController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("message")]
    [Route("message/get")]
    [HttpGet]
    public async Task Get()
    {
        string databaseName = "heroeslegends";
        string collectionName = "messages";
        var client = new MongoClient("mongodb+srv://jrfoxw:packard@cluster0.rda3b.mongodb.net/?retryWrites=true&w=majority");
        var db = client.GetDatabase(databaseName);
        var collection = db.GetCollection<MessageModel>(collectionName);

        var message = new MessageModel{
                MessageId = 3,
                User = "Gary",
                Message="Contacted customer about issues with chair #225",
                DateOfEntry = new DateTime()
            };

        Console.Write("Adding Db entry");

        var data = new List<MessageModel>(){};
        await collection.InsertOneAsync(message);
    }

    [HttpPost]
    public async Task Post(){
        //
    }
}
