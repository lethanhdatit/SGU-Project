using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class ProductType
    {
        public ProductType()
        {
            Product = new HashSet<Product>();
        }

        public long TypeId { get; set; }
        public string TypeName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string MobileIcon { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
