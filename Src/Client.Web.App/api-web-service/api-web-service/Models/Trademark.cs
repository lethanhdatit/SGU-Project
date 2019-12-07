using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Trademark
    {
        public Trademark()
        {
            Product = new HashSet<Product>();
        }

        public long TrademarkId { get; set; }
        public string TrademarkName { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
