using SGU.Data;
using SGU.Data.Interfaces;
using SGU.Data.Models;
using SGU.Service.Interfaces;
using System;
using System.Linq;
using static SGU.Service.Common.Enum;

namespace SGU.Service.Implement
{
    public class UserService : BaseService/*, IUserService*/
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly DbFactory _dbFactory = new DbFactory();

        public UserService()
        {           
            _unitOfWork = new UnitOfWork(_dbFactory);
        }

        public long Create(User entity)
        {
            var role = _unitOfWork.Repository<Role>().GetOne(x => x.RoleID == (long)RoleIdType.User);
            entity.Roles.Add(role);
            _unitOfWork.Repository<User>().Create(entity);
            _unitOfWork.SaveChanges();

            return entity.UserID;
        }

        public long Update(User entity)
        {           
            _unitOfWork.Repository<User>().Update(entity);
            _unitOfWork.SaveChanges();

            return entity.UserID;
        }

        public long MarkStatusToDeleted(long userId)
        {
            var entity = GetByID(userId);
            entity.Status = (byte) UserStatus.Deleted;
            _unitOfWork.Repository<User>().Update(entity);
            _unitOfWork.SaveChanges();

            return entity.UserID;
        }

        public long MarkStatusTo(long userId, UserStatus targetStatus)
        {
            var entity = GetByID(userId);
            entity.Status = (byte)targetStatus;
            _unitOfWork.Repository<User>().Update(entity);
            _unitOfWork.SaveChanges();

            return entity.UserID;
        }

        public User GetByID(long id)
        {
            return _unitOfWork.Repository<User>().GetOne(x=>x.UserID == id);
        }

        public IQueryable<User> GetAll()
        {
            return _unitOfWork.Repository<User>().Get();
        }

        public IQueryable<User> GetByStatus(UserStatus status)
        {
            return _unitOfWork.Repository<User>().Get(x=>x.Status == (byte)status);
        }
        
    }
}
