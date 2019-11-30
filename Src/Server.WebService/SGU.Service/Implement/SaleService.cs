using SGU.Data;
using SGU.Data.Interfaces;
using SGU.Data.Models;
using SGU.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using static SGU.Service.Common.Enum;

namespace SGU.Service.Implement
{
    public class SaleService : BaseService
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly DbFactory _dbFactory = new DbFactory();

        public SaleService()
        {
            _unitOfWork = new UnitOfWork(_dbFactory);
        }              

        public List<Product> GetAllActiveItems()
        {
            return _unitOfWork.Repository<Product>().Get(x => x.Status == (byte)ProductStatus.Active)?.ToList();
        }

        public Product GetActiveItemByID(long productId)
        {
            return _unitOfWork.Repository<Product>().GetOne(x => x.ProductID == productId
                                                              && x.Status == (byte)ProductStatus.Active);
        }

        public List<Product> GetActiveItemsByProductTypeId(long productTypeId)
        {
            return _unitOfWork.Repository<Product>().Get(x => x.ProductTypeID == productTypeId 
                                                              && x.Status == (byte)ProductStatus.Active)?
                                                              .ToList();
        }
        

        public List<Product> GetActiveItemsByOriginID(long originID)
        {
            return _unitOfWork.Repository<Product>().Get(x => x.OriginID == originID
                                                              && x.Status == (byte)ProductStatus.Active)?
                                                              .ToList();
        }

        public List<Product> GetActiveItemsByTrademarkID(long trademarkID)
        {
            return _unitOfWork.Repository<Product>().Get(x => x.TrademarkID == trademarkID
                                                              && x.Status == (byte)ProductStatus.Active)?
                                                              .ToList();
        }

        public List<ProductType> GetAllActiveProductTypes()
        {
            return _unitOfWork.Repository<ProductType>().GetAll()?.ToList();
        }

        public List<ShoppingCart> GetShoppingCartByIdUser(long idUser)
        {
            return _unitOfWork.Repository<ShoppingCart>().Get(x => x.UserID == idUser)?.ToList();
        }

        public List<ShoppingCart> GetCartByIdUser(long idUser)
        {
            return _unitOfWork.Repository<ShoppingCart>().Get(x => x.UserID == idUser)?.ToList();
        }

        public ShoppingCart GetCart(long userId, long variantID)
        {
            return _unitOfWork.Repository<ShoppingCart>().GetOne(x => x.UserID == userId && x.VariantID == variantID);           
        }

        public bool RemoveCart(long userId, long variantID)
        {
            var cart = _unitOfWork.Repository<ShoppingCart>().GetOne(x => x.UserID == userId && x.VariantID == variantID);
            _unitOfWork.Repository<ShoppingCart>().Delete(cart);

            return _unitOfWork.SaveChanges() > 0;
        }
        

        public void UpdateCart(ShoppingCart entity)
        {            
             entity.UpdatedDate = DateTime.UtcNow;
            _unitOfWork.Repository<ShoppingCart>().Update(entity);
            _unitOfWork.SaveChanges();
        }

        public void AddCart(ShoppingCart entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            _unitOfWork.Repository<ShoppingCart>().Create(entity);
            _unitOfWork.SaveChanges();
        }

        public long CreateOrder(Order entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            _unitOfWork.Repository<Order>().Create(entity);
            _unitOfWork.SaveChanges();

            return entity.OrderID;
        }

        public long CreateOrderDetail(OrderDetail entity)
        {            
            _unitOfWork.Repository<OrderDetail>().Create(entity);
            _unitOfWork.SaveChanges();

            return entity.DetailID;
        }

        
        public long CancelOrder(long OrderId)
        {
            var order = _unitOfWork.Repository<Order>().GetOne(x => x.OrderID == OrderId);
            order.Status = (byte)OrderStatus.Cancelled;
            _unitOfWork.Repository<Order>().Update(order);
            _unitOfWork.SaveChanges();

            return order.OrderID;
        }

    }
}
