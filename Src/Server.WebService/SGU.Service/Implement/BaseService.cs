using SGU.Data.Models;

namespace SGU.Service.Implement
{
    public class BaseService
    {
        protected WebServiceContext WebServiceContext { get; set; }
        public BaseService()
        {
            WebServiceContext = new WebServiceContext();
        }
    }
}
