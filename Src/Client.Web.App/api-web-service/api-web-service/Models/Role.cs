using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Role
    {
        public Role()
        {
            UserRole = new HashSet<UserRole>();
        }

        public long RoleId { get; set; }
        public string Name { get; set; }
        public byte Status { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
    }
}
