using SGU.Data.Models;
using System.Linq;
using static SGU.Service.Common.Enum;

namespace SGU.Service.Interfaces
{
    public interface IUserService
    {
        long Create(User entity);
        User GetByID(long id);
        IQueryable<User> GetByStatus(UserStatus status);
        IQueryable<User> GetAll();
        long MarkStatusTo(long userId, UserStatus targetStatus);
        long MarkStatusToDeleted(long userId);
        long Update(User entity);
    }
}
