using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SGU.WebService.Models
{

    public class SearchOptionModel
    {
        public string SearchTerm { get; set; }
        public long? ProductTypeId { get; set; }
        public long? OriginID { get; set; }
        public long? TrademarkID { get; set; }
    }

    public class ProductView
    {
        public long ProductID { get; set; }

        public long ProductTypeID { get; set; }

        public string ProductSize { get; set; }

        public string ProductColor { get; set; }

        public string ProductImage { get; set; }

        public decimal ProductPrice { get; set; }

        public long OriginID { get; set; }

        public long TrademarkID { get; set; }

        public string ProductName { get; set; }

        public string ProductInfomation { get; set; }

    }
}