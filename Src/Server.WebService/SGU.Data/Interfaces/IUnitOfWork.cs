using System;
using System.Threading.Tasks;
namespace SGU.Data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        int SaveChanges();

        Task SaveChangesAsync();

        IRepository<TEntity> Repository<TEntity>() where TEntity : class;

        void Dispose(bool disposing);
    }
}
