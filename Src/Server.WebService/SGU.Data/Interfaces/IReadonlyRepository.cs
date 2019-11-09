using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SGU.Data.Interfaces
{
    public interface IReadOnlyRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = null,
            int? skip = null,
            int? take = null);

        IQueryable<TEntity> GetAll();

        Task<IEnumerable<TEntity>> GetAllAsync(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null);

        IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null);

        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null);

        TEntity GetOne(Expression<Func<TEntity, bool>> filter = null);

        Task<TEntity> GetOneAsync(Expression<Func<TEntity, bool>> filter = null);

        TEntity GetFirst(Expression<Func<TEntity, bool>> filter = null);

        Task<TEntity> GetFirstAsync(Expression<Func<TEntity, bool>> filter = null);

        TEntity GetById(object id);

        Task<TEntity> GetByIdAsync(object id);

        int GetCount(Expression<Func<TEntity, bool>> filter = null);

        Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null);

        bool GetExists(Expression<Func<TEntity, bool>> filter = null);

        Task<bool> GetExistsAsync(Expression<Func<TEntity, bool>> filter = null);

        IQueryable<TEntity> Include(params Expression<Func<TEntity, object>>[] includes);
    }
}
