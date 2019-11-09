using SGU.Data.Interfaces;
using SGU.Data.Models;
using System.Data.Entity;

namespace SGU.Data
{
    public class DbFactory : IDbFactory
    {
        //TODO
        private readonly WebServiceContext _dbContext;
        
        public DbFactory()
        {
            if (_dbContext == null)
            {
                _dbContext = new WebServiceContext();
               
            }
        }

        public DbContext GetCurrentDbContext()
        {
            return _dbContext;
        }

        public int SaveChanges()
        {
            return _dbContext.SaveChanges();
        }
    }
}
