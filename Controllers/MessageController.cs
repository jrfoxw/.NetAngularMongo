using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using _NetAngularMongo.Models;
using Microsoft.AspNetCore.Mvc.Controllers;
using _NetAngularMongo.Data;
using _NetAngularMongo.Services;

namespace _NetAngularMongo.Controllers;

[ApiController]
[Route("[controller]")]

public class MessageController : ControllerBase
{

    private readonly ILogger<MessageController> _logger;
    private readonly IMessageService _messageService;
    private readonly IConfiguration _config;
    

    public MessageController(ILogger<MessageController> logger, IMessageService messageService, IConfiguration config)
    {
        _logger = logger;
        _messageService = messageService;
        _config = config;
    }

    [HttpGet]
    public async Task<List<CurrencyModel>> Get()
    {

        var n = new ControllerFeature().Controllers;
        Console.WriteLine("Controllers: ", n.Count);

        var data = new Data.MongDbContext<CurrencyModel>(_config).connect();
        var messages = data.GetCollection<CurrencyModel>("atm_denominations");
        var messageList = await messages.FindAsync<CurrencyModel>(_ => true);

        return messageList.ToList<CurrencyModel>();
        
    }




    [HttpPost]
    public void Post(MessageModel message)
    {

        var messageService = new MessageService(_config);
        messageService.AddMessage(message);
    }
}
