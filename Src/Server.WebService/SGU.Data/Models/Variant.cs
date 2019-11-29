namespace SGU.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Variant")]
    public partial class Variant
    {
        public long VariantID { get; set; }

        public long ProductID { get; set; }

        public string VariantSize { get; set; }

        public string VariantColor { get; set; }

        public string VariantImage { get; set; }

        public long Stock { get; set; }

        public byte? Status { get; set; }

        public virtual Product Product { get; set; }
    }
}
