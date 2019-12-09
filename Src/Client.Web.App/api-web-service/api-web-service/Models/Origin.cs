using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Origin
    {
        public Origin()
        {
            Product = new HashSet<Product>();
        }

        public long OriginId { get; set; }
        public string OriginName { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
