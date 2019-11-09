using System.Collections.Generic;

namespace SGU.Data.Interfaces
{
    public interface IRepository<TEntity> : IReadOnlyRepository<TEntity> where TEntity : class
    {
        void Create(TEntity entity);

        void Create(IEnumerable<TEntity> entities);

        void Update(TEntity entity);

        void Delete(object id);

        void Delete(TEntity entity);
    }
}
