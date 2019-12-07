using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Variant
    {
        public Variant()
        {
            OrderDetail = new HashSet<OrderDetail>();
            ShoppingCart = new HashSet<ShoppingCart>();
        }

        public long VariantId { get; set; }
        public long ProductId { get; set; }
        public string VariantSize { get; set; }
        public string VariantColor { get; set; }
        public string VariantImage { get; set; }
        public long Stock { get; set; }
        public byte? Status { get; set; }

        public virtual Product Product { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
    }
}
