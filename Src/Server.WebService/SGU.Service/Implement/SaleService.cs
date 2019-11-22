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
    }
}
