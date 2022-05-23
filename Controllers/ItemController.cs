using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using _NetAngularMongo.Models;
namespace _NetAngularMongo.Controllers;

[ApiController]
[Route("[controller]")]
public class ItemController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        ""
    };

    private readonly ILogger<ItemController> _logger;

    public ItemController(ILogger<ItemController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<ItemModel> Get()
    {
        var items = new List<ItemModel>(){};
        return items.ToArray();
        // return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        // {
        //     Date = DateTime.Now.AddDays(index),
        //     TemperatureC = Random.Shared.Next(-20, 55),
        //     Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        // })
        // .ToArray();
    }
}
