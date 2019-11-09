using SGU.Data.Models;
using SGU.Service.Implement;
using SGU.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Data.Entity;

namespace SGU.WebService.Controllers
{
    [System.Web.Http.RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private readonly UserService _userService;

        public UsersController()
        {
            _userService = new UserService();
        }

        [System.Web.Http.Route("all")]
        [System.Web.Http.HttpGet]
        public JsonResult GetAllUser()
        {
            var response = JsonResponse();
            try
            {
                var _result = _userService.GetAll().ToList();
                response.Data = new { code = HttpStatusCode.OK, result = _result, message = "GetUser request success!." };
                return response;
            }
            catch(Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }            
        }

        

        

        #region Private
        private JsonResult JsonResponse(string msg = "Fail", int dataStatusCode = 0, HttpStatusCode statusCode = HttpStatusCode.ExpectationFailed)
        {
            return new JsonResult
            {
                Data = new { code = dataStatusCode, message = msg },
                ContentEncoding = System.Text.Encoding.UTF8,
                ContentType = "application/json",
                JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            };
        }
        #endregion
    }
}
