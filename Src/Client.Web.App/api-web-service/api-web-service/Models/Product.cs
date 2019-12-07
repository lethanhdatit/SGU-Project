using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Product
    {
        public Product()
        {
            Variant = new HashSet<Variant>();
        }

        public long ProductId { get; set; }
        public long ProductTypeId { get; set; }
        public decimal ProductPrice { get; set; }
        public long OriginId { get; set; }
        public long TrademarkId { get; set; }
        public string ProductName { get; set; }
        public string ProductInfomation { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual Origin Origin { get; set; }
        public virtual ProductType ProductType { get; set; }
        public virtual Trademark Trademark { get; set; }
        public virtual ICollection<Variant> Variant { get; set; }
    }
}
