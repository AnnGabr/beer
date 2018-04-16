using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BeerApp.Account.Services.interfaces
{
    public interface IMailService
    {
		Task Send();
    }
}
