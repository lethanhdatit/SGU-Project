using SGU.Data.Models;
using SGU.Service.Implement;
using SGU.WebService.Models;
using SGU.WebService.Utils;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        [System.Web.Http.HttpPost]
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
                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("GetDetailsItem")]
        [System.Web.Http.HttpGet]
        public JsonResult GetDetailsItem(long ProductID)
        {
            var response = JsonResponse();
            try
            {
                var _data = _saleService.GetActiveItemByID(ProductID);
                var result = new ProductView();
                if (_data != null)
                {
                    result.ProductName = _data.ProductName;
                    result.ProductID = _data.ProductID;
                    result.OriginID = _data.OriginID;
                    result.OriginName = _data.Origin.OriginName;
                    result.ProductTypeID = _data.ProductTypeID;
                    result.ProductTypeName = _data.ProductType.TypeName;
                    result.TrademarkID = _data.TrademarkID;
                    result.TrademarkName = _data.Trademark.TrademarkName;                    
                    result.VariantColors = _data.Variants.Select(x=>x.VariantColor.ToUpper()).Distinct().ToList();
                    result.VariantSizes = _data.Variants.Select(x => x.VariantSize.ToUpper()).Distinct().ToList();                   
                    result.VariantImages = _data.Variants.Select(x => x.VariantImage).Distinct().ToList();
                    result.ProductImage = result.VariantImages.FirstOrDefault();
                    result.ProductPrice = string.Format("{0:#,0}", _data.ProductPrice);
                    result.ProductInfomation = _data.ProductInfomation;
                    result.TotalQuantity = _data.Variants.Sum(x => x.Stock);
                    result.Variants = _data.Variants.Select(x => new VariantView()
                    {
                        VariantColor = x.VariantColor.ToUpper(),
                        VariantSize = x.VariantSize.ToUpper(),
                        VariantImage = x.VariantImage,
                        Stock = x.Stock,
                        VariantID = x.VariantID
                    }).ToList();
                }              
                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("getproducttypes")]
        [System.Web.Http.HttpGet]
        public JsonResult GetProductTypes()
        {
            var response = JsonResponse();
            try
            {
                var _data = _saleService.GetAllProductTypes();
                var result = _data.Select(x => new ProductTypeView()
                {
                    TypeID = x.TypeID,
                    TypeName = x.TypeName,
                    MobileIcon = x.MobileIcon
                }).ToList();

                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("GetShipments")]
        [System.Web.Http.HttpGet]
        public JsonResult GetShipments()
        {
            var response = JsonResponse();
            try
            {
                var _data = _saleService.GetAllActiveShipments();
                var result = _data.Select(x => new ShipmentView()
                {
                    ShipmentID = x.ShipmentID,
                    ShipmentName = x.ShipmentName,
                    Price = string.Format("{0:#,0}", x.Price)
                }).ToList();

                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("getcart")]
        [System.Web.Http.HttpGet]
        public JsonResult GetCart(long UserId, long? ShipmentID) 
        {
            var response = JsonResponse();
            try
            {
                var cartView = new CartView();
                var carts = _saleService.GetCartByIdUser(UserId);
                if (carts != null && carts.Any())
                {
                    var totalItemsPrice = carts.Sum(x => (x.Quantity * x.Variant.Product.ProductPrice));
                    long? total = (long)totalItemsPrice;
                    long? shippingFee = null;

                    if(ShipmentID != null && ShipmentID != 0)
                    {
                        var shipment = _saleService.GetShipmentById(ShipmentID.Value);
                        if (shipment != null)
                        {
                            var totalQuantity = carts.Sum(x => x.Quantity);

                            if (totalQuantity < Constant.SHIPMENT_MIN_LIMIT_FREE)
                            {
                                shippingFee = (int)shipment.Price;
                            }
                            else if (totalQuantity >= Constant.SHIPMENT_MIN_LIMIT_FREE && totalQuantity <= Constant.SHIPMENT_MAX_LIMIT_FREE)
                            {
                                shippingFee = 0;
                            }
                            else
                            {
                                var phannguyen = (int)(totalQuantity / Constant.SHIPMENT_MAX_LIMIT_FREE);
                                phannguyen = phannguyen < 1 ? 1 : phannguyen;
                                shippingFee = (int)(phannguyen * shipment.Price);
                            }
                        }
                        total += shippingFee;
                    }                   

                    var itemsView = carts.Select(x => new CartItemView()
                    {
                        ProductId = x.Variant.ProductID,
                        VariantID = x.VariantID,
                        ProductPrice = string.Format("{0:#,0}", x.Variant.Product.ProductPrice),
                        ProductName = x.Variant.Product.ProductName,
                        ProductImage = x.Variant.VariantImage,
                        VariantSize = x.Variant.VariantSize.ToUpper(),
                        VariantColor = x.Variant.VariantColor.ToUpper(),
                        Quantity = x.Quantity,
                        Stock = x.Variant.Stock,
                        TotalPrice = string.Format("{0:#,0}", x.Quantity * x.Variant.Product.ProductPrice)

                    }).ToList();

                    cartView.Items = itemsView;
                    cartView.UserId = UserId;
                    cartView.UserFullName = carts?.FirstOrDefault()?.User?.UserName;
                    cartView.UserPhone = carts?.FirstOrDefault()?.User?.UserPhone;
                    cartView.UserAddress = carts?.FirstOrDefault()?.User?.UserAddress;
                    cartView.TotalShipmentPrice = shippingFee != null ? string.Format("{0:#,0}", shippingFee) : null;
                    cartView.TotalItemsPrice = string.Format("{0:#,0}", totalItemsPrice);
                    cartView.TotalPrice = string.Format("{0:#,0}", total);                    
                }
                response.Data = new { code = HttpStatusCode.OK, result = cartView, message = "Get cart success." };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("updatecart")]
        [System.Web.Http.HttpPost]
        public JsonResult UpdateCart(CartView model)
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
                if (model?.Items != null && model.Items.Any())
                {
                    if (model.Type == 1) // Update in cart
                    {
                        foreach (var i in model.Items)
                        {
                            if (i.Quantity == 0)
                            {
                                _saleService.RemoveCart(model.UserId, i.VariantID);
                            }
                            else
                            {
                                var cart = _saleService.GetCart(model.UserId, i.VariantID);
                                var currentStock = _saleService.GetVariantById(i.VariantID).Stock;
                                if (i.Quantity > currentStock)
                                {
                                    response.Data = new { code = 202, message = "Giỏ hàng của bạn đã có " + cart.Quantity + " sp. chỉ có thể đặt thêm tối đa " + (currentStock - cart.Quantity) + " sp" };
                                    return response;
                                }
                                else
                                {
                                    cart.Quantity = i.Quantity;
                                    _saleService.UpdateCart(cart);
                                }
                            }
                        }
                    }
                    else // Update out cart (Them moi/cong don)
                    {
                        foreach (var i in model.Items)
                        {

                            if (i.Quantity != 0)
                            {
                                var cart = _saleService.GetCart(model.UserId, i.VariantID);
                                if (cart != null)
                                {
                                    var currentStock = _saleService.GetVariantById(i.VariantID).Stock;
                                    var temp = cart.Quantity + i.Quantity;
                                    if (temp > currentStock)
                                    {
                                        response.Data = new { code = 202, message = "Giỏ hàng của bạn đã có "+ cart.Quantity+" sp. chỉ có thể đặt thêm tối đa " + (currentStock - cart.Quantity) + " sp"};
                                        return response;
                                    }
                                    else
                                    {
                                        cart.Quantity += i.Quantity;
                                        _saleService.UpdateCart(cart);
                                    }
                                }
                                else
                                {
                                    cart = new ShoppingCart();
                                    cart.VariantID = i.VariantID;
                                    cart.UserID = model.UserId;
                                    cart.Quantity = i.Quantity;
                                    _saleService.AddCart(cart);
                                }
                            }

                        }
                    }
                    response.Data = new { code = HttpStatusCode.OK, message = "Update cart success." };
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }
        }

        [System.Web.Http.Route("getorders")]
        [System.Web.Http.HttpGet]
        public JsonResult GetOrders(long UserId, byte OrderStatus)
        {
            var response = JsonResponse();
            try
            {
                var _data = _saleService.GetOrdersByLogic(UserId, OrderStatus);
                var result = _data.Select(x => new OrderHistoryView()
                {
                    OrderId = x.OrderID,
                    CreatedDate = x.CreatedDate.ToString(),
                    StatusName = EnumHelper.GetDisplayValue((OrderStatus)x.Status),
                    TotalProduct = x.OrderDetails.Count(),
                    TotalPrice = string.Format("{0:#,0}", x.OrderPrice)
                }).OrderByDescending(x=>x.OrderId).ToList();

                response.Data = new { result, code = HttpStatusCode.OK };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("placeorder")]
        [System.Web.Http.HttpPost]
        public JsonResult PlaceOrder(OrderView model) 
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
                var carts = _saleService.GetCartByIdUser(model.UserId);
                if (carts != null && carts.Any())
                {
                    var total = carts.Sum(x => (x.Quantity * x.Variant.Product.ProductPrice));
                    var shipment = _saleService.GetShipmentById(model.ShipmentID);
                    if(shipment != null)
                    {
                        var totalQuantity = carts.Sum(x => x.Quantity);
                        var shippingFee = 0;
                        if(totalQuantity < Constant.SHIPMENT_MIN_LIMIT_FREE)
                        {
                            shippingFee = (int)shipment.Price;
                        }
                        else if(totalQuantity >= Constant.SHIPMENT_MIN_LIMIT_FREE && totalQuantity <= Constant.SHIPMENT_MAX_LIMIT_FREE)
                        {
                            shippingFee = 0;
                        }
                        else
                        {
                            var phannguyen = (int)(totalQuantity / Constant.SHIPMENT_MAX_LIMIT_FREE);
                            phannguyen = phannguyen < 1 ? 1 : phannguyen;
                            shippingFee = (int)(phannguyen * shipment.Price);                           
                        }
                        total += shippingFee;
                    } 

                    CultureInfo provider = CultureInfo.InvariantCulture;
                    var ShippingDate = DateTime.ParseExact(model.ShippingDate, "dd/MM/yyyy hh:mm tt", provider);
                    var newOrder = new Order()
                    {
                        UserID = model.UserId,
                        OrderPrice = total,
                        OrderDate = ShippingDate,
                        OrderPhone = model.Phone,
                        OrderAddress = model.Address,
                        ShipmentID = model.ShipmentID,
                        OrderNote = model.NoteUser,
                        Status = (byte)OrderStatus.Processing,
                    };
                    var resId = _saleService.CreateOrder(newOrder);
                    if (resId > 0)
                    {
                        foreach (var item in carts)
                        {
                            var newOrderDetail = new OrderDetail()
                            {
                                OrderID = resId,
                                VariantID = item.VariantID,
                                Quantity = item.Quantity,
                                Price = item.Variant.Product.ProductPrice * item.Quantity
                            };
                            var resD = _saleService.CreateOrderDetail(newOrderDetail);
                            if (resD > 0)
                            {
                                _saleService.UpdateVariantQuantity(item.VariantID, item.Quantity);
                                _saleService.RemoveCart(item.UserID, item.VariantID);
                            }
                        }
                        response.Data = new { code = HttpStatusCode.OK, IdOrder = resId, message = "Place order success." };
                        return response;
                    }
                }
                response.Data = new { code = HttpStatusCode.PreconditionFailed, message = "Place order fail. Service cart empty" };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new
                {
                    code = HttpStatusCode.InternalServerError,
                    message = "Internal server exception: " + ex.Message
                };
                return response;
            }
        }

        [System.Web.Http.Route("cancelorder")]
        [System.Web.Http.HttpGet]
        public JsonResult CancelOrder(long OrderId) 
        {
            var response = JsonResponse();
            try
            {
                _saleService.CancelOrder(OrderId);              

                response.Data = new { code = HttpStatusCode.OK, message = "Get cart success." };
                return response;
            }
            catch (Exception ex)
            {
                response.Data = new { code = HttpStatusCode.InternalServerError, message = "Internal server exception: " + ex.Message };
                return response;
            }

        }

        [System.Web.Http.Route("countcartitem")]
        [System.Web.Http.HttpGet]
        public JsonResult CountCartItem(long userId)
        {
            var response = JsonResponse();
            try
            {
                var count = _saleService.GetShoppingCartByIdUser(userId).Count();

                response.Data = new { code = HttpStatusCode.OK, result = count, message = "Get cart success." };
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
                if (data != null && data.Any())
                {
                    result = data.Select(x => new ProductView()
                    {
                        ProductName = x.ProductName,
                        ProductID = x.ProductID,
                        OriginID = x.OriginID,
                        OriginName = x.Origin.OriginName,
                        ProductTypeID = x.ProductTypeID,
                        ProductTypeName = x.ProductType.TypeName,
                        TrademarkID = x.TrademarkID,
                        TrademarkName = x.Trademark.TrademarkName,
                        ProductImage = x.Variants.Select(y=>y.VariantImage).FirstOrDefault(),                       
                        ProductPrice = string.Format("{0:#,0}", x.ProductPrice),
                        ProductInfomation = x.ProductInfomation,
                        TotalQuantity = x.Variants.Sum(i => i.Stock)
                })
                    .ToList();
                }

                return result;
            }
            catch (Exception ex)
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