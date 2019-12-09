using System;
using System.Collections.Generic;

namespace api_web_service.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetail = new HashSet<OrderDetail>();
        }

        public long OrderId { get; set; }
        public long UserId { get; set; }
        public bool OrderStatus { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderPhone { get; set; }
        public string OrderAddress { get; set; }
        public decimal OrderPrice { get; set; }
        public long ShipmentId { get; set; }
        public string OrderNote { get; set; }
        public byte? Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual Shipment Shipment { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
