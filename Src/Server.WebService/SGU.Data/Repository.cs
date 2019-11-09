using System;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using SGU.Data.Interfaces;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SGU.Data
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly IDbFactory _dbFactory;

        public Repository(IDbFactory dbFactory){
            _dbFactory = dbFactory;
        }

        public virtual IQueryable<TEntity> GetQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = null,
            int? skip = null,
            int? take = null)
        {
            includeProperties = includeProperties ?? string.Empty;
            IQueryable<TEntity> query = _dbFactory.GetCurrentDbContext().Set<TEntity>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (skip.HasValue)
            {
                query = query.Skip(skip.Value);
            }

            if (take.HasValue)
            {
                query = query.Take(take.Value);
            }

            return query;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync(Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            return await _dbFactory.GetCurrentDbContext().Set<TEntity>().ToListAsync();
        }

        public virtual IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.ToListAsync();
        }

        public virtual TEntity GetOne(Expression<Func<TEntity, bool>> filter)
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>().SingleOrDefault(filter);
        }

        public virtual async Task<TEntity> GetOneAsync(
            Expression<Func<TEntity, bool>> filter)
        {
            return await _dbFactory.GetCurrentDbContext().Set<TEntity>().SingleOrDefaultAsync(filter);
        }

        public virtual TEntity GetFirst(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query.FirstOrDefault();
        }

        public virtual async Task<TEntity> GetFirstAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return await query.FirstOrDefaultAsync();
        }

        public virtual TEntity GetById(object id)
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>().Find(id);
        }

        public virtual Task<TEntity> GetByIdAsync(object id)
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>().FindAsync(id);
        }

        public virtual int GetCount(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query.Count();
        }

        public virtual Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            var query = _dbFactory.GetCurrentDbContext().Set<TEntity>().AsQueryable();
            if (filter != null)
            {
                query = query.Where(filter);
            }
            return query.CountAsync();
        }

        public virtual bool GetExists(Expression<Func<TEntity, bool>> filter)
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>().Where(filter).Any();
        }

        public virtual Task<bool> GetExistsAsync(Expression<Func<TEntity, bool>> filter)
        {
            return _dbFactory.GetCurrentDbContext().Set<TEntity>().Where(filter).AnyAsync();
        }

        public IQueryable<TEntity> Include(params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> query = null;
            foreach (var include in includes)
            {
                query = _dbFactory.GetCurrentDbContext().Set<TEntity>().Include(include);
            }

            return query ?? _dbFactory.GetCurrentDbContext().Set<TEntity>();
        }

        public virtual void Create(TEntity entity)
        {
            
            _dbFactory.GetCurrentDbContext().Set<TEntity>().Add(entity);
        }

        public virtual void Create(IEnumerable<TEntity> entities)
        {
            _dbFactory.GetCurrentDbContext().Set<TEntity>().AddRange(entities);
        }

        public virtual void Update(TEntity entity)
        {
            _dbFactory.GetCurrentDbContext().Set<TEntity>().Attach(entity);
            _dbFactory.GetCurrentDbContext().Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(object id)
        {
            TEntity entity = _dbFactory.GetCurrentDbContext().Set<TEntity>().Find(id);
            Delete(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            var dbSet = _dbFactory.GetCurrentDbContext().Set<TEntity>();
            if (_dbFactory.GetCurrentDbContext().Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            dbSet.Remove(entity);
        }

        protected virtual void ThrowEnhancedValidationException(DbEntityValidationException e)
        {
            var errorMessages = e.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

            var fullErrorMessage = string.Join("; ", errorMessages);
            var exceptionMessage = string.Concat(e.Message, " The validation errors are: ", fullErrorMessage);
            throw new DbEntityValidationException(exceptionMessage, e.EntityValidationErrors);
        }
    }
}
