using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    internal interface IMailSender
    {
		Task Send();
    }
}
