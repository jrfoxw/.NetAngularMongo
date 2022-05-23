﻿using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Threading.Tasks;
using _NetAngularMongo.Models;
namespace _NetAngularMongo.Controllers;


[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

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
                User = "Paul",
                Message="Helped Rick move chair to disassembly",
                DateOfEntry = new DateTime()
            };

        Console.Write("Adding Db entry");

        var data = new List<MessageModel>(){};
        await collection.InsertOneAsync(message);
    }
}
