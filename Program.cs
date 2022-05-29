using MongoDB.Driver;
using _NetAngularMongo.Controllers;
using _NetAngularMongo.Services;
using Microsoft.AspNetCore.Mvc.Controllers;
using Serilog;
using Serilog.Configuration;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IATMService, ATMService>();
builder.Services.AddScoped<ICurrencyService, CurrencyService>();

builder.Configuration.GetConnectionString("db");

/*builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.d.json", optional: false, reloadOnChange: true);*/

var app = builder.Build();

Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

Log.Logger.Information("Application Startup...");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
}

app.UseSwagger();
app.UseSwaggerUI();
/*app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = String.Empty;
});*/


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.MapControllers();



app.Run();


