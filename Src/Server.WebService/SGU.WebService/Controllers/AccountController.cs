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
using System.Globalization;

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
                    CultureInfo provider = CultureInfo.InvariantCulture;
                    var UserDayOfBirth = DateTime.ParseExact(model.DOB, "dd/MM/yyyy", provider);
                    var _newUser = new User()
                    {
                        UserName = model.FullName,                        
                        UserEmail = model.Email,
                        UserAvatar = _avatarUrl,                   
                        UserDayOfBirth = UserDayOfBirth,
                        CreatedDate = DateTime.UtcNow,
                        Status = (byte)UserStatus.Active
                    };
                    var resId = _accountService.CreateUser(_newUser, model.Password);
                    if (resId > 0)
                    {
                        response.Data = new { code = HttpStatusCode.OK, IdUser = resId, message = "Registered success." };
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
                    byte[] password = CryptographyUtil.StringToBytes(model.Password.ToLower());
                    var encryptedPassByte = CryptographyUtil.SHA1EncryptPassword(password);
                    var encryptedPassword = CryptographyUtil.BytesToString(encryptedPassByte);

                    if (user.UserPassword == encryptedPassword)
                    {
                        response.Data = new { code = HttpStatusCode.OK, IdUser = user.UserID, message = "Login success." };
                    }
                    else
                    {
                        response.Data = new { code = HttpStatusCode.ExpectationFailed, message = "Sai mật khẩu." };
                    }
                }
                else
                {
                    response.Data = new { code = HttpStatusCode.PreconditionFailed, message = "Tài khoản không tồn tại." };
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


        
        [System.Web.Http.Route("GetUserInfo")]
        [System.Web.Http.HttpGet]
        public JsonResult GetUserInfo(long UserId)
        {
            var response = JsonResponse();
            try
            {
                var _data = _accountService.GetUserByUID(UserId);
                var result =  new UserViewModel()
                {
                    UserID = _data.UserID,
                    Email = _data.UserEmail,
                    Avatar = _data.UserAvatar,
                    FullName = _data.UserName,
                    Phone = _data.UserPhone,
                    Address = _data.UserAddress,
                    DOB = _data.UserDayOfBirth.ToString("dd/MM/yyyy")
                };

                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("UpdateUserInfo")]
        [System.Web.Http.HttpPost]
        public JsonResult UpdateUserInfo(UserViewModel model)
        {
            var response = JsonResponse();
            try
            {
                var _data = _accountService.GetUserByUID(model.UserID);
                if(_data != null)
                {                    
                    _data.UserName = model.FullName;
                    _data.UserPhone = model.Phone;
                    _data.UserAddress = model.Address;
                    _data.UserDayOfBirth = DateTime.Parse(model.DOB);
                    _accountService.UpdateUser(_data);
                    response.Data = new { code = HttpStatusCode.OK };
                }
                else
                {
                    response.Data = new { code = HttpStatusCode.NotFound };
                }
                return response;
            }
            catch (Exception ex)
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
