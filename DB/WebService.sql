USE [master]
GO
/****** Object:  Database [WebService]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE DATABASE [WebService]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'WebService', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\WebService.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'WebService_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\WebService_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [WebService] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [WebService].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [WebService] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [WebService] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [WebService] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [WebService] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [WebService] SET ARITHABORT OFF 
GO
ALTER DATABASE [WebService] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [WebService] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [WebService] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [WebService] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [WebService] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [WebService] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [WebService] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [WebService] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [WebService] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [WebService] SET  ENABLE_BROKER 
GO
ALTER DATABASE [WebService] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [WebService] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [WebService] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [WebService] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [WebService] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [WebService] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [WebService] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [WebService] SET RECOVERY FULL 
GO
ALTER DATABASE [WebService] SET  MULTI_USER 
GO
ALTER DATABASE [WebService] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [WebService] SET DB_CHAINING OFF 
GO
ALTER DATABASE [WebService] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [WebService] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [WebService] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'WebService', N'ON'
GO
ALTER DATABASE [WebService] SET QUERY_STORE = OFF
GO
USE [WebService]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [WebService]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 11/29/2019 9:21:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[DetailID] [bigint] IDENTITY(1,1) NOT NULL,
	[OrderID] [bigint] NOT NULL,
	[ProductID] [bigint] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_OrderDetail] PRIMARY KEY CLUSTERED 
(
	[DetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Origin]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[Product]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[ProductType]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[Role]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[Shipment]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[ShoppingCart]    Script Date: 11/29/2019 9:21:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShoppingCart](
	[ShoppingCartID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[ProductID] [bigint] NOT NULL,
	[Quantity] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_ShoppingCart] PRIMARY KEY CLUSTERED 
(
	[ShoppingCartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trademark]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[User]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[User_Role]    Script Date: 11/29/2019 9:21:08 PM ******/
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
/****** Object:  Table [dbo].[Variant]    Script Date: 11/29/2019 9:21:08 PM ******/
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
SET IDENTITY_INSERT [dbo].[Origin] ON 

INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, N'China', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'Việt Nam', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'Malaysia', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Origin] ([OriginID], [OriginName], [Status], [CreatedDate], [UpdatedDate]) VALUES (4, N'US', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Origin] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ProductID], [ProductTypeID], [ProductPrice], [OriginID], [TrademarkID], [ProductName], [ProductInfomation], [Status], [CreatedDate], [UpdatedDate]) VALUES (96, 1, CAST(250000.00 AS Decimal(18, 2)), 2, 2, N'Vest lịch lãm', N'Bộ vest bao gồm Vest, quần âu. Tặng kèm Cà vạt và thắt lưng khi đặt mua ngay hôm nay ! Ưu đãi có hạn 

+ Thiết kế from body đẹp, chất liệu kaki loại tốt nhất mịn và thoải mái khi mặc. Bộ sưu tập thời trang kiểu Hàn Quốc mới nhất.

+ Chất liệu: Kaki tốt + lớp lót
', 1, CAST(N'2019-11-29T00:00:00.000' AS DateTime), NULL)
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
SET IDENTITY_INSERT [dbo].[Trademark] ON 

INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (2, N'NoBrand', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (3, N'Polo', 1, CAST(N'2019-11-25T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Trademark] ([TrademarkID], [TrademarkName], [Status], [CreatedDate], [UpdatedDate]) VALUES (4, N'Việt Tiến', 1, CAST(N'2019-11-27T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Trademark] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserID], [UserAvatar], [UserName], [UserPassword], [UserPhone], [UserEmail], [UserAddress], [UserDayOfBirth], [Status], [CreatedDate], [UpdatedDate]) VALUES (1, N'', N'Lê Thành Đạt', N'|J?	?7b?a? ?=?d???', NULL, N'thanhdat.it.mmo@gmail.com', NULL, CAST(N'1997-09-18T00:00:00.0000000' AS DateTime2), 1, CAST(N'2019-11-25T03:00:11.537' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
INSERT [dbo].[User_Role] ([UserID], [RoleID]) VALUES (1, 2)
SET IDENTITY_INSERT [dbo].[Variant] ON 

INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (1, 96, N'xl', N'đen', N'https://drive.google.com/uc?id=1wKYTMTRENdY4GORxDjo-QeuhAJg_P4v8', 25, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (2, 96, N'l', N'đen', N'https://drive.google.com/uc?id=1wKYTMTRENdY4GORxDjo-QeuhAJg_P4v8', 30, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (3, 96, N'm', N'xám', N'https://drive.google.com/uc?id=1fJLqpDERqEHbXlFahhNBmPYMxf39bbOD', 40, 1)
INSERT [dbo].[Variant] ([VariantID], [ProductID], [VariantSize], [VariantColor], [VariantImage], [Stock], [Status]) VALUES (4, 96, N'm', N'trắng', N'https://drive.google.com/uc?id=1pbeJ9fWQR9ZFUsh1JEyjBxS90Ivz1eDk', 50, 1)
SET IDENTITY_INSERT [dbo].[Variant] OFF
/****** Object:  Index [IX_Order_ShipmentID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_Order_ShipmentID] ON [dbo].[Order]
(
	[ShipmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_UserID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_Order_UserID] ON [dbo].[Order]
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_OrderDetail_OrderID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetail_OrderID] ON [dbo].[OrderDetail]
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_OrderDetail_ProductID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_OrderDetail_ProductID] ON [dbo].[OrderDetail]
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_OriginID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_Product_OriginID] ON [dbo].[Product]
(
	[OriginID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_ProductTypeID]    Script Date: 11/29/2019 9:21:08 PM ******/
CREATE NONCLUSTERED INDEX [IX_Product_ProductTypeID] ON [dbo].[Product]
(
	[ProductTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Product_TrademarkID]    Script Date: 11/29/2019 9:21:08 PM ******/
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
ALTER TABLE [dbo].[OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetail_Product_ProductID] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[OrderDetail] CHECK CONSTRAINT [FK_OrderDetail_Product_ProductID]
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
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_Product] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_Product]
GO
ALTER TABLE [dbo].[ShoppingCart]  WITH CHECK ADD  CONSTRAINT [FK_ShoppingCart_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[ShoppingCart] CHECK CONSTRAINT [FK_ShoppingCart_User]
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
