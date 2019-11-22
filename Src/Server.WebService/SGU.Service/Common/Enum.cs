using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SGU.Service.Common
{
    public class Enum
    {
        public enum UserStatus : byte
        {           
            [Display(Name = "Active")]
            Active = 1, 
            [Display(Name = "Inactive")]
            Inactive = 2,
            [Display(Name = "Deleted")]
            Deleted = 4,
            //... add more ...
        }

        public enum ProductStatus : byte
        {
            [Display(Name = "Active")]
            Active = 1,
            [Display(Name = "Inactive")]
            Inactive = 2,
           
            //... add more ...
        }

        public enum RoleIdType : long
        {
            [Display(Name = "Admin")]
            Admin = 1,
            [Display(Name = "Người Dùng")]
            User = 2,           
            //... add more ...
        }

        public enum LoginProvider : byte
        {
            [Display(Name = "System")]
            System = 1,

            [Display(Name = "Google")]
            Google = 2,

            [Display(Name = "Facebook")]
            Facebook = 3,

        }
    }
}
