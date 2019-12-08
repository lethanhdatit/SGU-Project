using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SGU.WebService.Models
{  

    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        
        public bool IsRemember{ get; set; }

        public byte LoginProvider { get; set; }
    }

    public class RegisterViewModel
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }        
        [Required]
        public string Password { get; set; }
        [Required]
        public string DOB { get; set; }
        public byte LoginProvider { get; set; }
    }

    public class UserViewModel
    {       
        public long UserID { get; set; }
        public string Email { get; set; }
        public string Avatar { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string DOB { get; set; }
    }

}