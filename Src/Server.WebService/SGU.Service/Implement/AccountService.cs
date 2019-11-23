using SGU.Data;
using SGU.Data.Interfaces;
using SGU.Data.Models;
using SGU.Service.Interfaces;
using System;
using System.Linq;
using static SGU.Service.Common.Enum;

namespace SGU.Service.Implement
{
    public class AccountService : BaseService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly DbFactory _dbFactory = new DbFactory();

        public AccountService()
        {
            _unitOfWork = new UnitOfWork(_dbFactory);
        }

        public long CreateUser(User entity, string _password)
        {

            byte[] password = CryptographyUtil.StringToBytes(_password.ToLower());
            var encryptedPassByte = CryptographyUtil.SHA1EncryptPassword(password);
            var encryptedPassword = CryptographyUtil.BytesToString(encryptedPassByte);
            entity.UserPassword = encryptedPassword;
            var Role = _unitOfWork.Repository<Role>().GetOne(x => x.RoleID == (long)RoleIdType.User);
            entity.Roles.Add(Role);
            _unitOfWork.Repository<User>().Create(entity);         
            _unitOfWork.SaveChanges();

            return entity.UserID;
        }
       
        public bool IsExistUserEmail(string email)
        {
            return _unitOfWork.Repository<User>().GetExists(x => x.UserEmail == email);
        }

        public User GetUserByUID(long id)
        {
            return _unitOfWork.Repository<User>().GetOne(x => x.UserID == id);
        }

        public User GetUserByEmail(string email)
        {
            return _unitOfWork.Repository<User>().GetOne(x => x.UserEmail.ToLower() == email.ToLower());
        }
    }
}
