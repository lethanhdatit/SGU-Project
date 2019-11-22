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
        public DateTime DOB { get; set; }
        public byte LoginProvider { get; set; }
    }

    public class EditUserViewModel
    {       
        public long UserID { get; set; }
        public string FullName { get; set; }    
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime DOB { get; set; }
    }

}