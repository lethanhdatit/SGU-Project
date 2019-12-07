using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class ShoppingCart
    {
        public long ShoppingCartId { get; set; }
        public long UserId { get; set; }
        public long VariantId { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual User User { get; set; }
        public virtual Variant Variant { get; set; }
    }
}
