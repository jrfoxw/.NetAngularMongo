using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _NetAngularMongo.Data;

namespace _NetAngularMongo.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public UserController(IConfiguration config)
        {
            _config = config;
        }

        // GET: UserController1
        [HttpGet]
        public void Get()
        {
            
        }

        
    }
}
