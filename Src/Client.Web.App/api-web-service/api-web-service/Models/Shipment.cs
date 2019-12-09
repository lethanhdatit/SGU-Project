using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Shipment
    {
        public Shipment()
        {
            Order = new HashSet<Order>();
        }

        public long ShipmentId { get; set; }
        public string ShipmentName { get; set; }
        public decimal Price { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ICollection<Order> Order { get; set; }
    }
}
