using SGU.Data.Models;
using SGU.Service.Implement;
using SGU.Service.Interfaces;
using SGU.WebService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using SGU.Service;
using static SGU.Service.Common.Enum;

namespace SGU.WebService.Controllers
{
    [System.Web.Http.RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private readonly AccountService _accountService;
        public AccountController()
        {
            _accountService = new AccountService();
        }

        [System.Web.Http.Route("register")]
        [System.Web.Http.HttpPost]
        public JsonResult Register(RegisterViewModel model)
        {
            var response = JsonResponse();
            if (!ModelState.IsValid)
            {
                string messages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
                response.Data = new { code = HttpStatusCode.InternalServerError, message = messages };
                return response;
            }
            try
            {
                var IsExist = _accountService.IsExistUserEmail(model.Email);
                if (!IsExist)
                {
                    var _avatarUrl = "";
                    switch ((LoginProvider)model.LoginProvider)
                    {
                        case LoginProvider.System:
                            {
                                _avatarUrl = ""; //todo prefix googledrive/local
                                break;
                            }
                        case LoginProvider.Facebook:
                            {
                                _avatarUrl = "http://graph.facebook.com/" + model.Password + "/picture?type=square";
                                break;
                            }
                        case LoginProvider.Google:
                            {
                                _avatarUrl = ""; //todo prefix google photo
                                break;
                            }
                        default:
                            {
                                _avatarUrl = ""; //todo prefix googledrive/local
                                break;
                            }
                    }
               
                    var _newUser = new User()
                    {
                        UserName = model.FullName,                        
                        UserEmail = model.Email,
                        UserAvatar = _avatarUrl,                   
                        UserDayOfBirth = model.DOB,
                        CreatedDate = DateTime.UtcNow,
                        Status = (byte)UserStatus.Active
                    };
                    var resId = _accountService.CreateUser(_newUser, model.Password);
                    if (resId > 0)
                    {
                        response.Data = new { code = 202, IdUser = resId, message = "Registered success." };
                    }
                    else
                    {
                        response.Data = new { code = HttpStatusCode.ExpectationFailed, message = "Fail to register." };
                    }
                }
                else
                {                   
                    response.Data = new { code = HttpStatusCode.PreconditionFailed, message = "Email was existed." };
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }
        }

        [System.Web.Http.Route("login")]
        [System.Web.Http.HttpPost]
        public JsonResult Login(LoginViewModel model)
        {
            var response = JsonResponse();
            if (!ModelState.IsValid)
            {
                string messages = string.Join("; ", ModelState.Values
                                        .SelectMany(x => x.Errors)
                                        .Select(x => x.ErrorMessage));
                response.Data = new { code = HttpStatusCode.InternalServerError, message = messages };
                return response;
            }
            try
            {
                var user = _accountService.GetUserByEmail(model.Email);
                if (user != null)
                {
                    byte[] password = CredentialUtils.StringToBytes(model.Password);
                    var encryptedPassword = CredentialUtils.EncryptPassword(password, model.Email);

                    if (user.UserPassword == encryptedPassword)
                    {
                        response.Data = new { code = HttpStatusCode.OK, IdUser = user.UserID, message = "Login success." };
                    }
                    else
                    {
                        response.Data = new { code = HttpStatusCode.ExpectationFailed, message = "Login fail." };
                    }
                }
                else
                {
                    response.Data = new { code = HttpStatusCode.PreconditionFailed, message = "User was not existed." };
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }
        }

        [System.Web.Http.Route("checksigninstatus")]
        [System.Web.Http.HttpGet]
        public JsonResult CheckSigninStatus(long UserId)
        {
            var response = JsonResponse();
            try
            {
                var user = _accountService.GetUserByUID(UserId);
                if (user != null)
                {
                    response.Data = new { code = HttpStatusCode.OK };
                    return response;
                }
                response.Data = new { code = HttpStatusCode.PreconditionFailed };
                return response;
            }
            catch(Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }         
           
        }


        #region Private
        private JsonResult JsonResponse(string msg = "OK", int dataStatusCode = 0, HttpStatusCode statusCode = HttpStatusCode.OK)
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
