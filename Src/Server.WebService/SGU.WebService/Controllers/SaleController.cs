using SGU.Data.Models;
using SGU.Service.Implement;
using SGU.WebService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using static SGU.Service.Common.Enum;

namespace SGU.WebService.Controllers
{
    [System.Web.Http.RoutePrefix("api/sale")]
    public class SaleController : ApiController
    {
        private readonly SaleService _saleService;
        public SaleController()
        {
            _saleService = new SaleService();
        }


        [System.Web.Http.Route("searchitems")]
        [System.Web.Http.HttpGet]
        public JsonResult SearchItems(SearchOptionModel model)
        {
            var response = JsonResponse();
            try
            {                
                var _data = _saleService.GetAllActiveItems();

                if (model.ProductTypeId != null)
                {
                    _data = _data.Where(x => x.ProductTypeID == model.ProductTypeId.Value).ToList();
                }

                if (model.OriginID != null)
                {
                    _data = _data.Where(x => x.ProductTypeID == model.OriginID.Value).ToList();
                }

                if (model.TrademarkID != null)
                {
                    _data = _data.Where(x => x.ProductTypeID == model.TrademarkID.Value).ToList();
                }

                if (!String.IsNullOrEmpty(model.SearchTerm))
                {
                    _data = _data.Where(x => x.ProductName.ToLower().Contains(model.SearchTerm.ToLower())).ToList();
                }
               
                var result = ConvertToProductView(_data);
                response.Data = new { data = result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        #region Private
        private List<ProductView> ConvertToProductView(List<Product> data)
        {
            var result = new List<ProductView>();
            try
            {
                if(data != null && data.Any())
                {
                    result = data.Select(x => new ProductView()
                    {
                        ProductName = x.ProductName,
                        ProductID = x.ProductID,
                        OriginID = x.OriginID,
                        ProductTypeID = x.ProductTypeID,
                        TrademarkID = x.TrademarkID,
                        ProductSize = x.ProductSize,
                        ProductColor = x.ProductColor,
                        ProductImage = x.ProductImage,
                        ProductPrice = x.ProductPrice,
                        ProductInfomation = x.ProductInfomation
                    })
                    .ToList();
                }               

                return result;
            }
            catch(Exception ex)
            {
                return result;
            }
        }

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