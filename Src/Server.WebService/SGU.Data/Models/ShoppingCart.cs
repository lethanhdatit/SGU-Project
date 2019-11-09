namespace SGU.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ShoppingCart")]
    public partial class ShoppingCart
    {
        public long ShoppingCartID { get; set; }

        public long UserID { get; set; }

        public long ProductID { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public virtual Product Product { get; set; }

        public virtual User User { get; set; }
    }
}
