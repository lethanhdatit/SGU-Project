using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class User
    {
        public User()
        {
            Order = new HashSet<Order>();
            ShoppingCart = new HashSet<ShoppingCart>();
            UserRole = new HashSet<UserRole>();
        }

        public long UserId { get; set; }
        public string UserAvatar { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string UserPhone { get; set; }
        public string UserEmail { get; set; }
        public string UserAddress { get; set; }
        public DateTime UserDayOfBirth { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
