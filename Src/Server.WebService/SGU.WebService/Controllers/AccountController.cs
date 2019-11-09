using SGU.Service.Implement;
using SGU.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SGU.WebService.Controllers
{
    [System.Web.Http.RoutePrefix("api/Values")]
    public class AccountController : ApiController
    {
        private readonly UserService _userService;

        public AccountController(UserService userService)
        {
            _userService = userService;
        }
       


    }
}
