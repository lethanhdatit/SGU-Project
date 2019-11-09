using System.Data.Entity;

namespace SGU.Data.Interfaces
{
    public interface IDbFactory
    {
        DbContext GetCurrentDbContext();
        int SaveChanges();
    }
}
