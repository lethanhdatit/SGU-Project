using SGU.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SGU.Data
{
    public sealed class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory _dbFactory;
        private Dictionary<string, object> _repositories;
        private bool _disposed;

        public UnitOfWork(IDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
            _repositories = new Dictionary<string, object>();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                _dbFactory.GetCurrentDbContext().Dispose();
            }
            _disposed = true;
        }

        public int SaveChanges()
        {
            return _dbFactory.GetCurrentDbContext().SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await _dbFactory.GetCurrentDbContext().SaveChangesAsync();
        }
        public IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            if (_repositories == null)
            {
                _repositories = new Dictionary<string, object>();
            }

            var type = typeof(TEntity).Name;

            if (_repositories.ContainsKey(type))
            {
                return (IRepository<TEntity>)_repositories[type];
            }

            var repositoryType = typeof(Repository<TEntity>);
            _repositories.Add(type, Activator.CreateInstance(repositoryType, _dbFactory));

            return (IRepository<TEntity>)_repositories[type];
        }
    }
}
