using System.Threading.Tasks;

namespace BeerApp.Account.Services
{
    public interface IMailSender
    {
		Task Send();
    }
}
