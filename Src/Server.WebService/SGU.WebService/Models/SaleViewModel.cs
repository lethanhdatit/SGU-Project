using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SGU.WebService.Models
{

    public class SearchOptionModel
    {
        public string SearchTerm { get; set; }
        public long? ProductTypeId { get; set; }
        public long? OriginID { get; set; }
        public long? TrademarkID { get; set; }
    }

    public class ProductView
    {
        public long ProductID { get; set; }

        public long ProductTypeID { get; set; }
        public long OriginID { get; set; }
        public long TrademarkID { get; set; }


        public string ProductTypeName { get; set; }

        public string OriginName { get; set; }

        public string TrademarkName { get; set; }       

        public string ProductPrice { get; set; }

        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        
        public string ProductInfomation { get; set; }

        public List<string> VariantColors { get; set; } = new List<string>();
        public List<string> VariantSizes { get; set; } = new List<string>();
        public List<string> VariantImages { get; set; } = new List<string>();
        public long TotalQuantity { get; set; }
        public List<VariantView> Variants { get; set; } = new List<VariantView>();
    }

    public class VariantView
    {
        public long VariantID { get; set; }

        public string VariantSize { get; set; }

        public string VariantColor { get; set; }

        public string VariantImage { get; set; }

        public long Stock { get; set; }

    }


    public class ProductTypeView
    {       
        public long TypeID { get; set; }

        public string TypeName { get; set; }
        public string MobileIcon { get; set; }        

    }

    public class OrderView
    {
        [Required]
        public long UserId { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string ShippingDate { get; set; }
        [Required]
        public long ShipmentID { get; set; }
        public string NoteUser { get; set; }

    }

    public class CartView
    {
        [Required]
        public long UserId { get; set; }
        public byte Type { get; set; }
        public List<CartItemView> Items { get; set; }

        public decimal TotalPrice { get; set; }
    }

    public class CartItemView
    {
        [Required]
        public long VariantID { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }
}