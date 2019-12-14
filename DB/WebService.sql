USE [master]
GO
/****** Object:  Database [WebService]    Script Date: 12/14/2019 2:20:29 PM ******/
CREATE DATABASE [WebService]
GO
ALTER DATABASE [WebService] SET QUERY_STORE = OFF
GO
USE [WebService]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[OrderID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[OrderStatus] [bit] NOT NULL,
	[OrderDate] [datetime2](7) NOT NULL,
	[OrderPhone] [nvarchar](max) NULL,
	[OrderAddress] [nvarchar](max) NULL,
	[OrderPrice] [decimal](18, 2) NOT NULL,
	[ShipmentID] [bigint] NOT NULL,
	[OrderNote] [nvarchar](max) NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[DetailID] [bigint] IDENTITY(1,1) NOT NULL,
	[OrderID] [bigint] NOT NULL,
	[VariantID] [bigint] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[DetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Origin]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Origin](
	[OriginID] [bigint] IDENTITY(1,1) NOT NULL,
	[OriginName] [nvarchar](max) NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Origin] PRIMARY KEY CLUSTERED 
(
	[OriginID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductID] [bigint] IDENTITY(1,1) NOT NULL,
	[ProductTypeID] [bigint] NOT NULL,
	[ProductPrice] [decimal](18, 2) NOT NULL,
	[OriginID] [bigint] NOT NULL,
	[TrademarkID] [bigint] NOT NULL,
	[ProductName] [nvarchar](max) NULL,
	[ProductInfomation] [nvarchar](max) NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductType]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductType](
	[TypeID] [bigint] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
	[MobileIcon] [nvarchar](50) NULL,
 CONSTRAINT [PK_ProductType] PRIMARY KEY CLUSTERED 
(
	[TypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [bigint] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Status] [tinyint] NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shipment]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shipment](
	[ShipmentID] [bigint] IDENTITY(1,1) NOT NULL,
	[ShipmentName] [nvarchar](max) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Shipment] PRIMARY KEY CLUSTERED 
(
	[ShipmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ShoppingCart]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCart](
	[ShoppingCartID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[VariantID] [bigint] NOT NULL,
	[Quantity] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_ShoppingCart] PRIMARY KEY CLUSTERED 
(
	[ShoppingCartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trademark]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trademark](
	[TrademarkID] [bigint] IDENTITY(1,1) NOT NULL,
	[TrademarkName] [nvarchar](max) NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_Trademark] PRIMARY KEY CLUSTERED 
(
	[TrademarkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserAvatar] [nvarchar](max) NULL,
	[UserName] [nvarchar](max) NULL,
	[UserPassword] [nvarchar](max) NULL,
	[UserPhone] [nvarchar](max) NULL,
	[UserEmail] [nvarchar](max) NULL,
	[UserAddress] [nvarchar](max) NULL,
	[UserDayOfBirth] [datetime2](7) NOT NULL,
	[Status] [tinyint] NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Role]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Role](
	[UserID] [bigint] NOT NULL,
	[RoleID] [bigint] NOT NULL,
 CONSTRAINT [PK_User_Role] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Variant]    Script Date: 12/14/2019 2:20:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Variant](
	[VariantID] [bigint] IDENTITY(1,1) NOT NULL,
	[ProductID] [bigint] NOT NULL,
	[VariantSize] [nvarchar](max) NULL,
	[VariantColor] [nvarchar](max) NULL,
	[VariantImage] [nvarchar](max) NULL,
	[Stock] [bigint] NOT NULL,
	[Status] [tinyint] NULL,
 CONSTRAINT [PK_Variant] PRIMARY KEY CLUSTERED 
(
	[VariantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Order] ON 

INSERT [dbo].[Order] ([OrderID], [UserID], [OrderStatus], [OrderDate], [OrderPhone], [OrderAddress], [OrderPrice], [ShipmentID], [OrderNote], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, 3, 0, CAST(N'2019-12-11T14:10:00.0000000' AS DateTime2), N'0707358289', N'305/11, Trần Phú, P8,Q5,HCM', CAST(1080000.00 AS Decimal(18, 2)), 1, N'', 8, CAST(N'2019-12-11T07:14:29.180' AS DateTime), NULL)
INSERT [dbo].[Order] ([OrderID], [UserID], [OrderStatus], [OrderDate], [OrderPhone], [OrderAddress], [OrderPrice], [ShipmentID], [OrderNote], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, 3, 0, CAST(N'2019-12-11T15:53:00.0000000' AS DateTime2), N'0707358289', N'305/11, Trần Phú, P8,Q5,HCM', CAST(277000.00 AS Decimal(18, 2)), 1, N'', 8, CAST(N'2019-12-11T08:55:43.573' AS DateTime), NULL)
INSERT [dbo].[Order] ([OrderID], [UserID], [OrderStatus], [OrderDate], [OrderPhone], [OrderAddress], [OrderPrice], [ShipmentID], [OrderNote], [Status], [CreatedDate], [UpdatedDate]) VALUES (10002, 3, 0, CAST(N'2019-12-11T18:49:00.0000000' AS DateTime2), N'0707358289', N'305/11, Trần Phú, P8,Q5,HCM', CAST(1219000.00 AS Decimal(18, 2)), 1, N'', 2, CAST(N'2019-12-11T11:57:45.690' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Order] OFF
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([DetailID], [OrderID], [VariantID], [Quantity], [Price]) VALUES (1, 1, 7, 3, CAST(1080000.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([DetailID], [OrderID], [VariantID], [Quantity], [Price]) VALUES (2, 2, 3, 1, CAST(250000.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([DetailID], [OrderID], [VariantID], [Quantity], [Price]) VALUES (10002, 10002, 11, 2, CAST(720000.00 AS Decimal(18, 2)))
INSERT [dbo].[OrderDetail] ([DetailID], [OrderID], [VariantID], [Quantity], [Price]) VALUES (10003, 10002, 75, 1, CAST(499000.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
SET IDENTITY_INSERT [dbo].[Origin] ON 

INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, N'China', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'Việt Nam', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'Malaysia', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (4, N'US', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (8, N'Nhật Bản', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (9, N'Pháp', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (11, N'Tây Ban Nha', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Origin] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (96, 1, CAST(250000.00 AS Decimal(18, 2)), 2, 2, N'Vest lịch lãm', N'Bộ vest bao gồm Vest, quần âu. Tặng kèm Cà vạt và thắt lưng khi đặt mua ngay hôm nay ! Ưu đãi có hạn 

+ Thiết kế from body đẹp, chất liệu kaki loại tốt nhất mịn và thoải mái khi mặc. Bộ sưu tập thời trang kiểu Hàn Quốc mới nhất.

+ Chất liệu: Kaki tốt + lớp lót
', 1, CAST(N'2019-11-29T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (102, 2, CAST(360000.00 AS Decimal(18, 2)), 1, 3, N'Đầm dạ hội sang trọng', N'Màu: xanh, ruốc, đỏ

Vải: phi lụa cao cấp

Phom xoè tạo sự sang trọng, vải phi lụa đang là trend năm nay nên mọi thiết kế trên nền vải này đều bán rất chạy,', 1, CAST(N'2019-12-01T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (107, 1, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Vest Sang Trọng', N'Bộ vest', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (109, 1, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Vest Phong Cách', N'Vest', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (110, 1, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Vest Thời Trang', N'Vest', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (111, 1, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Vest Đẳng Cấp', N'Vest', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (114, 2, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Qúy Bà', N'Đầm', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (115, 2, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Qúy Bà', N'Đầm', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (116, 2, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Qúy Bà', N'Đầm', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (117, 2, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Qúy Bà', N'Đầm', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (118, 2, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Qúy Bà', N'Đầm', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (119, 5, CAST(400000.00 AS Decimal(18, 2)), 1, 2, N'Hot Trend', N'Trend', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (120, 5, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Hot Trend	', N'Trend', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (121, 5, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Hot Trend	', N'Trend', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (122, 5, CAST(360000.00 AS Decimal(18, 2)), 2, 2, N'Hot Trend	', N'Trend', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (123, 6, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Công sở', N'công sở', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (124, 6, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Công sở', N'công sở', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (125, 6, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Công sở', N'công sở', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (126, 6, CAST(360000.00 AS Decimal(18, 2)), 1, 2, N'Công sở', N'công sở', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (128, 4, CAST(460000.00 AS Decimal(18, 2)), 1, 2, N'FreeStyle', N'chất', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (129, 4, CAST(460000.00 AS Decimal(18, 2)), 1, 2, N'FreeStyle', N'cá tính', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (130, 4, CAST(460000.00 AS Decimal(18, 2)), 1, 2, N'FreeStyle', N'mạnh mẽ ', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (131, 4, CAST(460000.00 AS Decimal(18, 2)), 1, 2, N'FreeStyle', N'FreeStyle', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (132, 3, CAST(850000.00 AS Decimal(18, 2)), 1, 2, N'bé yêu', N'bé yêu', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (133, 3, CAST(850000.00 AS Decimal(18, 2)), 1, 2, N'bé yêu', N'bé yêu', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (134, 3, CAST(850000.00 AS Decimal(18, 2)), 1, 2, N'bé yêu', N'bé yêu', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (135, 3, CAST(850000.00 AS Decimal(18, 2)), 1, 2, N'bé yêu', N'bé yêu', 1, CAST(N'2019-12-07T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (136, 1, CAST(499000.00 AS Decimal(18, 2)), 8, 6, N'NAM ÁO SƠ-MI EASY CARE SLIM FIT', N'Nhanh khô và chống nhăn.
- Với công nghệ DRY khô nhanh.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (141, 1, CAST(599000.00 AS Decimal(18, 2)), 8, 6, N'NAM ÁO SƠ-MI EASY CARE REGULAR FIT DÀI TAY', N'Vải trơn, ít nhăn', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (143, 1, CAST(370000.00 AS Decimal(18, 2)), 9, 7, N'Men Shirts Túi Sọc Ca Rô Đen Và Trắng Casual', N'Loại áo sơ mi:	Áo sơ mi
Chi tiết:	Túi
Chiều dài tay:	Tay áo dài
Mùa:	Mùa Xuân/ Mùa Thu
Thành phần:	100% Bông
Vật liệu:	Bông
Fabric:	Vải không có căng
Loại Phù hợp:	Phù hợp thường
Loại túi váy:	Không nút', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (144, 1, CAST(799000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI OXFORD DỆT THOI', N'Áo sơ mi dáng slim fit, cổ ve lật đính khuy, dài tay, cài khuy ở cổ tay. Có hàng khuy cài phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (145, 1, CAST(1199000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI VẢI KỸ THUẬT THIẾT KẾ THOẢI MÁI', N'Áo sơ mi dáng suông, chất liệu vải nhẹ và co giãn. Cổ ve lật, dài tay, cổ tay cài khuy. Một túi đáp trước ngực. Khuy bấm ở mặt trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (146, 1, CAST(1199000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI DÁNG SUÔNG', N'Áo sơ mi dáng suông, cổ ve lật, dài tay, cài khuy ở cổ tay. Có túi vuông đáp trước ngực. Kiểu bạc màu. Cài khuy phía trước', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (147, 1, CAST(999000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI KẺ', N'Áo sơ mi dáng suông, cổ ve lật, dài tay, cài khuy ở cổ tay. Có một túi vuông cài khuy trước ngực. Có hàng khuy cài ở thân áo phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (148, 1, CAST(699000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI VẢI OXFORD CỔ TRỤ', N'Áo sơ mi dáng suông, cổ trụ, dài tay, cài khuy ở cổ tay. Có hàng khuy cài phía trước', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (149, 1, CAST(1299000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI ĐÁP KIM SA TRƯỚC NGỰC', N'Áo sơ mi dáng slim fit, cổ ve lật, dài tay, cổ tay cài khuy. Phần ngực phối vải và đính kim sa khác màu. Có hàng khuy cài phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (150, 1, CAST(999000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI TUXEDO NGỰC XẾP LI', N'Áo sơ mi dáng slim fit, cổ ve lật, ve áo nhọn, dài tay, cổ tay cài khuy bọc vải. Xếp li ở ngực. Có hàng khuy cài bọc vải ở thân áo phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (151, 1, CAST(899000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI CHẤM BI MÀU ÁNH KIM', N'Áo sơ mi dáng slim fit, cổ ve lật, dài tay, cổ tay cài khuy. Có hàng khuy cài phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (152, 2, CAST(999000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO DÁNG DÀI VẢI RŨ', N'Áo dáng dài, cổ ve lật, dài tay. Phía trước đáp túi vuông có nắp. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (153, 2, CAST(699000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI NHUNG TĂM CÓ TÚI', N'Áo sơ mi cổ ve lật, dài tay. Có túi vuông đáp phía trước. Gấu bất đối xứng. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (154, 2, CAST(549000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI TRANG TRÍ HỌA TIẾT', N'Áo sơ mi vải rũ, cổ ve lật, dài tay, nhún li ở cổ tay. Đáp túi vuông có nắp phía trước. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (155, 2, CAST(489000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI VẢI POPLIN CÓ BÈO', N'Áo sơ mi cổ tròn, dài tay, nhún li ở vai. Ráp bèo ở cổ và thân áo phía trước. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (156, 2, CAST(1690000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI HỌA TIẾT HOA', N'Áo sơ mi cổ ve lật, dài tay, cổ tay nhún bèo. Ráp bèo trang trí phía trước. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (157, 2, CAST(599000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO PHỐI VẢI Ở NGỰC', N'Áo cổ ve lật, tay dài rộng. Phối vải khác màu. Hàng khuy cài ẩn dưới vạt che phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (158, 2, CAST(989000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI DENIM RÁP BÈO', N'Áo sơ mi cổ ve lật, dài tay. Ráp bèo trang trí. Khuy bấm ở mặt trước', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (159, 2, CAST(769000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI THẮT NÚT PHÍA TRƯỚC', N'Áo sơ mi dáng thụng, cổ chữ V có ve lật, dài tay. Buộc thắt nút trang trí phía trước. Cài khuy phía trước.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (160, 2, CAST(1190000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI LỤA ORGANZA HỌA TIẾT DA ĐỘNG VẬT', N'Áo sơ mi cổ ve lật, tay lỡ, cổ tay bo co giãn. Cài khuy phía trước, khuy bọc vải', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (161, 3, CAST(649000.00 AS Decimal(18, 2)), 11, 8, N'ÁO SƠ MI NHUNG TĂM GÂN NHỎ THÊU HỌA TIẾT', N'Áo sơ mi vải nhung tăm với gân bản nhỏ, cổ ve lật, tay dài có khuy cài. Cài khuy phía trước, có hai túi vuông đáp trước ngực. Thêu họa tiết sau lưng, gấu lệch và xẻ hai bên.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (162, 3, CAST(349000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI DÀI HỌA TIẾT KẺ CA RÔ', N'Áo sơ mi dáng dài, có mũ trùm đầu, dài tay. Cài khuy phía trước, có túi vuông đáp trước ngực. Họa tiết ca rô.', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (163, 3, CAST(429000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI CÓ TÚI', N'Áo sơ mi denim cổ ve lật, dài tay. Phía trước cài khuy bấm và có túi', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (164, 3, CAST(459000.00 AS Decimal(18, 2)), 11, 8, N'
ÁO SƠ MI POPLIN OVERSIZE', N'Áo sơ mi oversize vải poplin, cổ ve lật, dài tay. Cài khuy phía trước, có túi có nắp trước ngực. Gấu xẻ.
', 1, CAST(N'2019-12-10T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[ProductType] ON 

INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (1, N'Quý Ông', CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL, N'coffee')
INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (2, N'Quý Bà', CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL, N'shopping-bag')
INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (3, N'Bé Yêu', CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL, N'child')
INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (4, N'FreeStyle', CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL, N'free-code-camp')
INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (5, N'Hot Trend', CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL, N'fire')
INSERT [dbo].[ProductType] ([TypeID], [TypeName], [CreatedDate], [UpdatedDate], [MobileIcon]) VALUES (6, N'Công Sở', CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL, N'building')
SET IDENTITY_INSERT [dbo].[ProductType] OFF
INSERT [dbo].[Role] ([RoleID], [Name], [Status]) VALUES (1, N'Admin', 1)
INSERT [dbo].[Role] ([RoleID], [Name], [Status]) VALUES (2, N'Người Dùng', 1)
SET IDENTITY_INSERT [dbo].[Shipment] ON 

INSERT [dbo].[Shipment] ([ShipmentID], [ShipmentName], [Price], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, N'Giao Hàng Nhanh', CAST(27000.00 AS Decimal(18, 2)), 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Shipment] ([ShipmentID], [ShipmentName], [Price], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'Viettel Post', CAST(22000.00 AS Decimal(18, 2)), 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Shipment] ([ShipmentID], [ShipmentName], [Price], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'Giao Hàng Tiết Kiệm', CAST(15000.00 AS Decimal(18, 2)), 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Shipment] OFF
SET IDENTITY_INSERT [dbo].[ShoppingCart] ON 

INSERT [dbo].[ShoppingCart] ([ShoppingCartID], [UserID], [VariantID], [Quantity], [CreatedDate], [UpdatedDate]) VALUES (1, 1, 3, 20, CAST(N'2019-11-30T17:15:35.337' AS DateTime), CAST(N'2019-11-30T17:48:17.233' AS DateTime))
INSERT [dbo].[ShoppingCart] ([ShoppingCartID], [UserID], [VariantID], [Quantity], [CreatedDate], [UpdatedDate]) VALUES (4, 1, 2, 1, CAST(N'2019-11-30T17:49:53.023' AS DateTime), NULL)
INSERT [dbo].[ShoppingCart] ([ShoppingCartID], [UserID], [VariantID], [Quantity], [CreatedDate], [UpdatedDate]) VALUES (5, 2, 74, 2, CAST(N'2019-12-10T08:27:09.907' AS DateTime), CAST(N'2019-12-10T08:27:52.477' AS DateTime))
SET IDENTITY_INSERT [dbo].[ShoppingCart] OFF
SET IDENTITY_INSERT [dbo].[Trademark] ON 

INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'NoBrand', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'Polo', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (4, N'Việt Tiến', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (6, N'Uniqlo', 1, CAST(N'2019-11-28T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (7, N'Shein', 1, CAST(N'2019-11-28T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (8, N'Zara', 1, CAST(N'2019-11-28T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Trademark] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserID], [UserAvatar], [UserName], [UserPassword], [UserPhone], [UserEmail], [UserAddress], [UserDayOfBirth], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, N'', N'Lê Thành Đạt', N'|J?	?7b?a? ?=?d???', NULL, N'thanhdat.it.mmo@gmail.com', NULL, CAST(N'1997-09-18T00:00:00.0000000' AS DateTime2), 1, CAST(N'2019-11-25T03:00:11.537' AS DateTime), NULL)
INSERT [dbo].[User] ([UserID], [UserAvatar], [UserName], [UserPassword], [UserPhone], [UserEmail], [UserAddress], [UserDayOfBirth], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'', N'Duy', N'5j+y?LTWMF?9T(?', NULL, N'duywoan1307@gmail.com', NULL, CAST(N'2019-12-10T00:00:00.0000000' AS DateTime2), 1, CAST(N'2019-12-10T06:36:54.913' AS DateTime), NULL)
INSERT [dbo].[User] ([UserID], [UserAvatar], [UserName], [UserPassword], [UserPhone], [UserEmail], [UserAddress], [UserDayOfBirth], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'', N'Lê Thành Đạt', N'b??_ջ=_"??????????', N'0707358289', N'Dat@gmail.com', N'305/11, Trần Phú, P8,Q5,HCM', CAST(N'1997-09-18T00:00:00.0000000' AS DateTime2), 1, CAST(N'2019-12-11T06:59:01.420' AS DateTime), CAST(N'2019-12-11T09:19:55.297' AS DateTime))
SET IDENTITY_INSERT [dbo].[User] OFF
INSERT [dbo].[User_Role] ([UserID], [RoleID]) VALUES (1, 2)
INSERT [dbo].[User_Role] ([UserID], [RoleID]) VALUES (2, 2)
INSERT [dbo].[User_Role] ([UserID], [RoleID]) VALUES (3, 2)
SET IDENTITY_INSERT [dbo].[Variant] ON 

INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (1, 96, N'xl', N'đen', N'https://drive.google.com/uc?id=1dCjzDX2WMIVGX7SI8SYSsKGVmncrsA5T', 25, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (2, 96, N'l', N'đen', N'https://drive.google.com/uc?id=1wKYTMTRENdY4GORxDjo-QeuhAJg_P4v8', 30, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (3, 96, N'm', N'xám', N'https://drive.google.com/uc?id=1fJLqpDERqEHbXlFahhNBmPYMxf39bbOD', 39, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (4, 96, N'm', N'trắng', N'https://drive.google.com/uc?id=1pbeJ9fWQR9ZFUsh1JEyjBxS90Ivz1eDk', 50, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (6, 102, N'freesize', N'cam', N'https://drive.google.com/uc?id=1FfEW1VnZaj_nWi3gdxXzy_0GeJeIvqJ4', 54, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (7, 102, N'freesize', N'vàng', N'https://drive.google.com/uc?id=1WK-m2KnGIFAnRfnhIuQIz_A1UbXQ6HbO', 117, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (8, 102, N'freesize', N'đen', N'https://drive.google.com/uc?id=1uo_NBL84Wuuh1swLz9BEi5YtM6ThAhOY', 75, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (9, 107, N'xl', N'xám', N'https://drive.google.com/uc?id=1fJLqpDERqEHbXlFahhNBmPYMxf39bbOD', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (10, 107, N'l', N'đen', N'https://drive.google.com/uc?id=13RDAq5-1Sr-g-h2J6e7GdEj55ui4xGke', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (11, 107, N'm', N'xám đen', N'https://drive.google.com/uc?id=1dCjzDX2WMIVGX7SI8SYSsKGVmncrsA5T', 98, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (12, 109, N'xl', N'xám', N'https://drive.google.com/uc?id=1cvbZJqk_GLE01F6_TyR6rY7mbeb7THcA', 150, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (13, 109, N'l', N'trắng', N'https://drive.google.com/uc?id=1pbeJ9fWQR9ZFUsh1JEyjBxS90Ivz1eDk', 150, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (14, 109, N'm', N'xanh đen', N'https://drive.google.com/uc?id=1wKYTMTRENdY4GORxDjo-QeuhAJg_P4v8', 150, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (15, 110, N'xl', N'xanh nhạt', N'https://drive.google.com/uc?id=1oneb7rCJEL6IonOKw0Xj9ytN0S_y1i3Q', 120, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (16, 110, N'l', N'xám', N'https://drive.google.com/uc?id=1a5_28GCFd1jyXpPLJXekGsyT87miJOom', 120, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (17, 111, N'l', N'đen', N'https://drive.google.com/uc?id=1E-ZWUAqoc3fDp4ji1x4aDNnZmN0ozge5', 90, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (19, 114, N'l', N'Đen', N'https://drive.google.com/uc?id=1uo_NBL84Wuuh1swLz9BEi5YtM6ThAhOY', 150, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (20, 114, N'm', N'Đỏ đen', N'https://drive.google.com/open?id=1FfEW1VnZaj_nWi3gdxXzy_0GeJeIvqJ4', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (21, 114, N'xl', N'Đen', N'https://drive.google.com/uc?id=18za_cxKt9BrJF3b5Crl3fgjYo-_XpKzz', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (22, 115, N'l', N'Cam', N'https://drive.google.com/uc?id=1v-pR1wwqScfpoBh7IC7uW1PRLJFmYEh9', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (23, 115, N'm', N'Vàng đen', N'https://drive.google.com/uc?id=1aL1j1pecrhdiOebmfzuwcb4tPvmU-aqc', 80, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (24, 115, N'xl', N'chấm bi', N'https://drive.google.com/uc?id=1EEBQ8Z-CWtwjddMncS5pL5Bo1nYSo0i_', 90, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (25, 116, N'l', N'bi đỏ', N'https://drive.google.com/uc?id=1WK-m2KnGIFAnRfnhIuQIz_A1UbXQ6HbO', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (26, 117, N'm', N'đỏ đen', N'https://drive.google.com/ouc?id=17iJsHt2FOSZCJUjsvjVpzsM1t91WH1vf', 110, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (27, 117, N'l', N'trắng xanh', N'https://drive.google.com/ouc?id=1DC34IxeXuSMi_du7JTqJn9ZNdcRr-j2W', 89, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (28, 118, N'xl', N'sọc đen', N'https://drive.google.com/uc?id=1I-VM7isliaJGTfD-bdhryhwmFIrKIjpd', 111, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (29, 119, N'l', N'xám', N'https://drive.google.com/uc?id=106HQjSr5qM1XcV057Q2_duRHAMcSEyMO', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (30, 119, N'xl', N'đen', N'https://drive.google.com/uc?id=1ybivdhSnewR2ZkjfnV3GMyxx3j9nYi40', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (31, 119, N'm', N'kem', N'https://drive.google.com/uc?id=1dOCmEFN6ssI12A9B4m7C26Lw15o8C3iq', 67, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (32, 120, N'l', N'trắng', N'https://drive.google.com/uc?id=1ju2b7EyCCTg4zWfMTobLewKK0BFcGW1f', 110, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (34, 120, N'xl', N'đen', N'https://drive.google.com/uc?id=1XBhQwetql1IX9a1dibMn6f-3t4X_pW-W', 110, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (35, 120, N'm', N'Kem', N'https://drive.google.com/uc?id=1LWMvfn9RJwU8on6WMSp2qWDfmtPJmAE8', 90, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (36, 121, N'l', N'xám', N'https://drive.google.com/uc?id=1aSrKxj4L6UjUpBpGji0X542fbZkzz4fQ', 80, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (37, 121, N'xl', N'đen', N'https://drive.google.com/uc?id=1XEkhUPb85yQgJY_gocf9S-W3IArMV2LL', 111, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (38, 121, N'm', N'đen', N'https://drive.google.com/uc?id=1fiovODvSjiSUNvkCIFsmDULJDR5JDFCf', 88, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (39, 122, N'l', N'xanh kem', N'https://drive.google.com/uc?id=1oWUwvXPStlSmt46DeuLguD_WZY17FQZa', 52, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (40, 123, N'l', N'Xanh nhạt', N'https://drive.google.com/uc?id=1Q_K1Qy66fFZgO_J3m_d5ICBuhFRwC0ZL', 111, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (41, 124, N'm', N'Xám', N'https://drive.google.com/uc?id=1R3sKhpfVbnsqhtWJVqYmDyAVasIQN1iR', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (42, 123, N'xl', N'xanh đậm', N'https://drive.google.com/uc?id=1LaqEYq2yHu33lkzuN-inB7sYT3Dcy4hw', 50, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (43, 123, N'm', N'xanh hiển', N'https://drive.google.com/uc?id=1ieywBmIshZyxVsU10BalOuiNt8VgFZ5l', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (44, 124, N'xl', N'Xanh biển nhạt', N'https://drive.google.com/uc?id=1kZ9raFtpeDOTtaujIozmuewoQS8Bt2EM', 70, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (45, 124, N'm', N'xanh trắng', N'https://drive.google.com/uc?id=1J0enZ9JXtve2VM-5vOpjsriESToCEVLa', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (46, 125, N'm', N'Trắng', N'https://drive.google.com/uc?id=12j_H5y0u0CblxeArALwOSWenc1VOx7Uc', 70, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (47, 125, N'xl', N'Trắng', N'https://drive.google.com/uc?id=1pWSCIhAFuingoVjX4Kv8fJKm9z5G8B5E', 80, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (48, 125, N'l', N'xanh đen', N'https://drive.google.com/uc?id=1M8y7ikiN9rQWIfNF5p70kxBFd5vs-2I8', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (49, 126, N'm', N'sọc tím', N'https://drive.google.com/uc?id=1qBwR3V8LsKG75Ax13nAcHq2gO4RqgUyn', 120, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (51, 128, N'm', N'trắng', N'https://drive.google.com/uc?id=1rB2VH66py1vx0uyWDpNWVjDXzost-9pc', 120, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (52, 128, N'l', N'sọc trắng đen', N'https://drive.google.com/uc?id=1TKVWM1oiMGavcihqG59QCGsQrEoQmtbW', 50, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (53, 128, N'xl', N'trắng ', N'https://drive.google.com/uc?id=1pPh1XsLleWqm-0KyVlYfTFpRmWZgo8-t', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (54, 129, N'l', N'xám ', N'https://drive.google.com/uc?id=1q4J2Ezi8t7-rgno5bQgpFPAEbnAPhguV', 70, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (55, 129, N'm', N'nâu', N'https://drive.google.com/uc?id=1iEXjLAKCEIjgJ2BAvNk70MpxD_iKe2kn', 55, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (57, 129, N'xl', N'đen', N'https://drive.google.com/uc?id=1LTAI04lfVjTwM7qz4U9gnycAyCCK4FZ2', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (58, 130, N'l', N'xám', N'https://drive.google.com/uc?id=1ZSfxoub-eUSVBqZ9qFBrac8wA_K4u7zf', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (59, 130, N'm', N'Xanh', N'https://drive.google.com/uc?id=14OwWVkIgcYv9F5xlZqBCjssaVhDHpP-P', 120, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (60, 130, N'xl', N'xanh', N'https://drive.google.com/uc?id=1cPiCCKnV3EEkvtxn9IaPjeCiPEbsUfrg', 140, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (61, 131, N'm', N'đen', N'https://drive.google.com/uc?id=1DEAIarWcr7OsMvNmK-WIjb0SS99_8ZPr', 150, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (64, 132, N'm', N'sọc ', N'https://drive.google.com/uc?id=16oB_J9_IXmkKUK8sntaX5RuFJ7hC0T27', 20, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (65, 132, N'm', N'sọc caro', N'https://drive.google.com/open?id=16OpaQAeC3fAjg_yhVNSbr9LK9Uk-TH8L', 50, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (66, 132, N'xl', N'vàng hồng', N'https://drive.google.com/uc?id=1k5rbJpIwS5cH0FbAOjEKfvoRXdyra3cB', 60, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (67, 133, N'm', N'hồng', N'https://drive.google.com/uc?id=1PegWNM3_AHMclOWvi4EEG4soi6xjx-0n', 70, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (68, 133, N'l', N'đỏ hông xanh', N'https://drive.google.com/uc?id=15LjiY2z8TbpxuZcb8Ak4Gn_TNegqM1Pa', 100, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (69, 133, N'xl', N'hồng đen', N'https://drive.google.com/uc?id=16cyQv1xZki7cGKFqJu-HoC-bC1w7uC0A', 80, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (70, 134, N'l', N'vàng hông trắng bông', N'https://drive.google.com/uc?id=1WjR44X_E0KRZsBYLliARVbVVT4zc2fkD', 50, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (72, 134, N'm', N'đen', N'https://drive.google.com/uc?id=1wJYVs5Hs0jEqh8RnFh2fvSa4ewq5PTLe', 180, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (73, 134, N'xl', N'cảnh sát', N'https://drive.google.com/uc?id=1-5e_moDrIPk-dpeNxS2fYWsJwqAvtfJo', 80, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (74, 136, N'x', N'xanh ', N'http://im.uniqlo.com/images/common/pc/goods/422250/item/63_422250_large.jpg', 10, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (75, 136, N'm', N'trắng', N'http://im.uniqlo.com/images/common/pc/goods/422250/item/00_422250_large.jpg', 14, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (77, 136, N'x', N'đen', N'http://im.uniqlo.com/images/common/pc/goods/422250/item/09_422250_large.jpg', 20, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (78, 141, N's', N'xanh', N'http://im.uniqlo.com/images/common/pc/goods/421146/item/64_421146_large.jpg', 2, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (79, 141, N'xl', N'xanh', N'http://im.uniqlo.com/images/common/pc/goods/421146/item/64_421146_large.jpg', 5, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (80, 141, N'm', N'xanh', N'http://im.uniqlo.com/images/common/pc/goods/421146/item/64_421146_large.jpg', 9, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (83, 143, N'm', N'caro đen trắng', N'https://img.ltwebstatic.com/images2_pi/2019/07/16/15632677303569251998_thumbnail_600x799.webp', 4, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (84, 143, N'xl', N'caro đen trắng', N'https://img.ltwebstatic.com/images2_pi/2019/07/16/15632677302784288015_thumbnail_600x799.webp', 10, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (85, 144, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/7545/310/800/2/w/1010/7545310800_1_1_1.jpg?ts=1574082832880', 20, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (86, 144, N'm', N'đỏ marsala', N'https://static.zara.net/photos///2019/I/0/2/p/7545/310/172/2/w/1010/7545310172_1_1_1.jpg?ts=1574076177728', 11, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (87, 144, N'm', N'xanh da trời', N'https://static.zara.net/photos///2019/I/0/2/p/7545/310/403/2/w/1010/7545310403_1_1_1.jpg?ts=1574243644630', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (88, 145, N'l', N'xanh nước biển', N'https://static.zara.net/photos///2020/V/0/2/p/0397/305/401/2/w/1010/0397305401_1_1_1.jpg?ts=1575909337126', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (89, 145, N'XL', N'xám', N'https://static.zara.net/photos///2020/V/0/2/p/0397/305/802/2/w/1010/0397305802_1_1_1.jpg?ts=1575896015004', 1, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (90, 145, N'm', N'xám', N'https://static.zara.net/photos///2020/V/0/2/p/0397/305/802/2/w/1010/0397305802_2_1_1.jpg?ts=1575896021661', 6, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (92, 146, N'm', N'nâu đất', N'https://static.zara.net/photos///2019/I/0/2/p/6917/382/703/2/w/1369/6917382703_1_1_1.jpg?ts=1570703192132', 31, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (93, 146, N'xl', N'xanh lục', N'https://static.zara.net/photos///2019/I/0/2/p/6917/382/500/2/w/1369/6917382500_1_1_1.jpg?ts=1570703146706', 6, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (94, 146, N'm', N'xanh lục', N'https://static.zara.net/photos///2019/I/0/2/p/6917/382/500/2/w/1369/6917382500_2_1_1.jpg?ts=1570794082076', 12, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (95, 146, N'l', N'đỏ', N'https://static.zara.net/photos///2019/I/0/2/p/6917/382/600/2/w/1369/6917382600_1_1_1.jpg?ts=1570703197885', 21, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (96, 147, N's', N'nâu đất', N'https://static.zara.net/photos///2019/I/0/2/p/6103/305/703/2/w/1369/6103305703_1_1_1.jpg?ts=1570174723515', 4, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (97, 147, N'm', N'nâu đất', N'https://static.zara.net/photos///2019/I/0/2/p/6103/305/703/2/w/1369/6103305703_2_1_1.jpg?ts=1570174746363', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (98, 147, N'l', N'nâu đất', N'https://static.zara.net/photos///2019/I/0/2/p/6103/305/703/2/w/1369/6103305703_2_2_1.jpg?ts=1570174771477', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (99, 147, N'xl', N'nâu đất', N'https://static.zara.net/photos///2019/I/0/2/p/6103/305/703/2/w/1369/6103305703_2_3_1.jpg?ts=1570174777711', 6, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (100, 148, N'm', N'xanh nước biển', N'https://static.zara.net/photos///2019/I/0/2/p/7545/426/401/2/w/1369/7545426401_2_5_1.jpg?ts=1568815769058', 31, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (101, 148, N'm', N'xanh da trời', N'https://static.zara.net/photos///2019/I/0/2/p/7545/426/403/2/w/1369/7545426403_2_1_1.jpg?ts=1568815278569', 24, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (102, 148, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/8211/426/800/2/w/1369/8211426800_2_1_1.jpg?ts=1569581421446', 19, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (103, 149, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/6455/824/800/2/w/1369/6455824800_2_1_1.jpg?ts=1574433349099', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (104, 149, N'l', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/6455/824/800/2/w/1369/6455824800_2_4_1.jpg?ts=1574433356121', 5, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (105, 149, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/6455/824/800/2/w/1369/6455824800_6_1_1.jpg?ts=1575361991973', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (106, 150, N'm', N'trắng', N'https://static.zara.net/photos///2019/I/0/2/p/5757/425/250/4/w/1369/5757425250_2_1_1.jpg?ts=1574432616031', 9, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (107, 150, N'xl', N'trắng', N'https://static.zara.net/photos///2019/I/0/2/p/5757/425/250/4/w/1369/5757425250_2_4_1.jpg?ts=1574432629045', 11, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (108, 151, N's', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/5970/968/800/2/w/1369/5970968800_1_1_1.jpg?ts=1570452272292', 14, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (109, 151, N'xl', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/5970/968/800/2/w/1369/5970968800_2_1_1.jpg?ts=1570452297224', 6, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (110, 151, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/2/p/5970/968/800/2/w/1369/5970968800_2_3_1.jpg?ts=1570452310251', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (111, 152, N'm', N'trắng', N'https://static.zara.net/photos///2019/I/0/1/p/8733/263/251/3/w/1369/8733263251_1_1_1.jpg?ts=1575566948915', 19, 1)
GO
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (112, 152, N'l', N'trắng', N'https://static.zara.net/photos///2019/I/0/1/p/8733/263/251/3/w/1369/8733263251_2_1_1.jpg?ts=1575567018617', 9, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (113, 153, N's', N'xanh rêu', N'https://static.zara.net/photos///2019/I/0/1/p/8741/247/505/2/w/1369/8741247505_1_1_1.jpg?ts=1571126052987', 18, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (114, 153, N'm', N'xanh rêu', N'https://static.zara.net/photos///2019/I/0/1/p/8741/247/505/2/w/1369/8741247505_2_1_1.jpg?ts=1571126045683', 9, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (115, 153, N's', N'đỏ marsala', N'https://static.zara.net/photos///2019/I/0/1/p/4387/276/172/2/w/1369/4387276172_1_1_1.jpg?ts=1571125097944', 31, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (116, 153, N'm', N'đỏ marsala', N'https://static.zara.net/photos///2019/I/0/1/p/4387/276/172/2/w/1369/4387276172_2_1_1.jpg?ts=1571125102516', 6, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (117, 154, N's', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/8408/464/800/2/w/1369/8408464800_2_1_1.jpg?ts=1575537810859', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (118, 154, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/8408/464/800/2/w/1369/8408464800_1_1_1.jpg?ts=1575537685865', 1, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (119, 155, N's', N'trắng', N'https://static.zara.net/photos///2019/I/0/1/p/8701/157/250/2/w/1369/8701157250_2_1_1.jpg?ts=1570634416190', 41, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (120, 155, N'm', N'trắng', N'https://static.zara.net/photos///2019/I/0/1/p/8701/157/250/2/w/1369/8701157250_2_2_1.jpg?ts=1570630707449', 13, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (121, 155, N'l', N'trắng', N'https://static.zara.net/photos///2019/I/0/1/p/8701/157/250/2/w/1369/8701157250_2_4_1.jpg?ts=1570630720245', 7, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (122, 156, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/9479/276/800/2/w/1369/9479276800_2_1_1.jpg?ts=1573576170067', 13, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (123, 156, N'l', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/9479/276/800/2/w/1369/9479276800_2_4_1.jpg?ts=1573576136574', 7, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (124, 156, N's', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/9479/276/800/2/w/1369/9479276800_2_6_1.jpg?ts=1573723356072', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (125, 157, N's', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/8729/941/800/2/w/1369/8729941800_1_1_1.jpg?ts=1573636984650', 14, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (126, 157, N'm', N'đen', N'https://static.zara.net/photos///2019/I/0/1/p/8729/941/800/2/w/1369/8729941800_2_1_1.jpg?ts=1573636984766', 28, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (127, 158, N's', N'xanh', N'https://static.zara.net/photos///2019/I/0/1/p/6929/216/406/2/w/1369/6929216406_1_1_1.jpg?ts=1574356505259', 12, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (128, 158, N'l', N'xanh', N'https://static.zara.net/photos///2019/I/0/1/p/6929/216/406/2/w/1369/6929216406_2_2_1.jpg?ts=1574356526066', 2, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (129, 159, N's', N'xám', N'https://static.zara.net/photos///2019/I/0/1/p/7693/911/064/2/w/1369/7693911064_1_1_1.jpg?ts=1573666994118', 56, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (130, 159, N'm', N'xám', N'https://static.zara.net/photos///2019/I/0/1/p/7693/911/064/2/w/1369/7693911064_2_4_1.jpg?ts=1573569919564', 9, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (131, 159, N'l', N'xám', N'https://static.zara.net/photos///2019/I/0/1/p/7693/911/064/2/w/1369/7693911064_6_1_1.jpg?ts=1573569945332', 8, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (132, 160, N's', N'LEOPARDO ', N'https://static.zara.net/photos///2019/I/0/1/p/4437/275/051/2/w/1369/4437275051_1_1_1.jpg?ts=1571677123195', 17, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (133, 160, N'm', N'LEOPARDO ', N'https://static.zara.net/photos///2019/I/0/1/p/4437/275/051/2/w/1369/4437275051_2_1_1.jpg?ts=1571677159865', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (134, 160, N'xl', N'LEOPARDO ', N'https://static.zara.net/photos///2019/I/0/1/p/4437/275/051/2/w/1369/4437275051_2_3_1.jpg?ts=1571677172641', 18, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (135, 161, N'122 cm', N'xanh dương', N'https://static.zara.net/photos///2020/V/0/3/p/8574/604/400/4/w/1369/8574604400_1_1_1.jpg?ts=1575282607890', 12, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (136, 161, N'134 cm', N'xanh dương', N'https://static.zara.net/photos///2020/V/0/3/p/8574/604/400/4/w/1369/8574604400_2_10_1.jpg?ts=1575282682818', 13, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (137, 162, N'128 cm', N'đỏ', N'https://static.zara.net/photos///2020/V/0/3/p/0517/600/600/2/w/1369/0517600600_1_1_1.jpg?ts=1574881196539', 10, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (138, 162, N'134 cm', N'đỏ', N'https://static.zara.net/photos///2020/V/0/3/p/0517/600/600/2/w/1369/0517600600_2_2_1.jpg?ts=1574881217559', 11, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (139, 163, N'116 cm', N'xanh rêu', N'https://static.zara.net/photos///2019/I/0/3/p/8246/705/505/2/w/1369/8246705505_2_2_1.jpg?ts=1567757603715', 13, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (140, 163, N'116 cm', N'hồng', N'https://static.zara.net/photos///2019/I/0/3/p/8246/705/633/2/w/1369/8246705633_1_1_1.jpg?ts=1567757585939', 23, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (141, 163, N'128 cm', N'hồng', N'https://static.zara.net/photos///2019/I/0/3/p/8246/705/633/2/w/1369/8246705633_2_3_1.jpg?ts=1567757617211', 3, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (142, 164, N'122 cm', N'trắng', N'https://static.zara.net/photos///2019/I/0/3/p/6293/700/250/2/w/1369/6293700250_1_1_1.jpg?ts=1565959854604', 2, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (143, 164, N'128 cm ', N'trắng ', N'https://static.zara.net/photos///2019/I/0/3/p/6293/700/250/2/w/1369/6293700250_2_1_1.jpg?ts=1565959795645', 4, 1)
SET IDENTITY_INSERT [dbo].[Variant] OFF
/****** Object:  Index [IX_Order_ShipmentID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_Order_ShipmentID] ON [dbo].[Order]
(
	[ShipmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_UserID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_Order_UserID] ON [dbo].[Order]
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_OrderDetail_OrderID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetail_OrderID] ON [dbo].[OrderDetail]
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_OrderDetail_ProductID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetail_ProductID] ON [dbo].[OrderDetail]
(
	[VariantID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_OriginID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_Product_OriginID] ON [dbo].[Product]
(
	[OriginID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_ProductTypeID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_Product_ProductTypeID] ON [dbo].[Product]
(
	[ProductTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_TrademarkID]    Script Date: 12/14/2019 2:20:31 PM ******/
CREATE NONCLUSTERED INDEX [IX_Product_TrademarkID] ON [dbo].[Product]
(
	[TrademarkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Shipment_ShipmentID] FOREIGN KEY([ShipmentID])
REFERENCES [dbo].[Shipment] ([ShipmentID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Shipment_ShipmentID]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_User_UserID] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_User_UserID]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Order_OrderID] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Order] ([OrderID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Order_OrderID]
GO
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Variant] FOREIGN KEY([VariantID])
REFERENCES [dbo].[Variant] ([VariantID])
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Variant]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Origin_OriginID] FOREIGN KEY([OriginID])
REFERENCES [dbo].[Origin] ([OriginID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Origin_OriginID]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductType_ProductTypeID] FOREIGN KEY([ProductTypeID])
REFERENCES [dbo].[ProductType] ([TypeID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductType_ProductTypeID]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Trademark_TrademarkID] FOREIGN KEY([TrademarkID])
REFERENCES [dbo].[Trademark] ([TrademarkID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Trademark_TrademarkID]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_User]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_Variant] FOREIGN KEY([VariantID])
REFERENCES [dbo].[Variant] ([VariantID])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_Variant]
GO
ALTER TABLE [dbo].[User_Role]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[User_Role] CHECK CONSTRAINT [FK_User_Role_Role]
GO
ALTER TABLE [dbo].[User_Role]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[User_Role] CHECK CONSTRAINT [FK_User_Role_User]
GO
ALTER TABLE [dbo].[Variant]  WITH CHECK ADD  CONSTRAINT [FK_Variant_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[Variant] CHECK CONSTRAINT [FK_Variant_Product]
GO
USE [master]
GO
ALTER DATABASE [WebService] SET  READ_WRITE 
GO
