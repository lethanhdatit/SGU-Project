using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class OrderDetail
    {
        public long DetailId { get; set; }
        public long OrderId { get; set; }
        public long VariantId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public virtual Order Order { get; set; }
        public virtual Variant Variant { get; set; }
    }
}
