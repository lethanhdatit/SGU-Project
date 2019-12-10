import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity,
  Modal,
  DeviceEventEmitter,
  Alert
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
import NumericInput from 'react-native-numeric-input'
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card, Button, Header, Icon } from "../components/";
import Tabs from '../components/Tabs';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
import { MaterialIndicator } from 'react-native-indicators';
const { width } = Dimensions.get("screen");
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;



export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductID: 0,
      ProductDetails: [],
      TotalStock: 0,
      modalVisible: false,
      SelectedVariantId: 0,
      SelectedVariantStock: 0,
      BuyQuantity: 0,
      SelectedVariantImage: null,
      DefaultImage: null,
      IsAddToCart: true,
      IsLoading: false
    }
  }

  ResetToDefault() {
    this.setState({
      SelectedVariantId: 0,
      SelectedVariantStock: this.state.TotalStock,
      BuyQuantity: 0,
      SelectedVariantImage: this.state.DefaultImage,
    })
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._onFetchDetails();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentWillMount() {
    this._onFetchDetails();
  }

  _onFetchDetails = async () => {
    this.setState({ IsLoading: true });
    var ProductID = this.props.navigation.getParam('productId', '0');
    var IsAddToCart = this.props.navigation.getParam('isAddToCart', true);
    var res = await API._fetch(`${config.GET_ACTIVE_DETAILS_ITEM_API_ENDPOINT}?ProductID=${Number(ProductID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ ProductID: ProductID, IsAddToCart: IsAddToCart, ProductDetails: res.Data.result, SelectedVariantStock: res.Data.result.TotalQuantity, SelectedVariantImage: res.Data.result.ProductImage, TotalStock: res.Data.result.TotalQuantity, DefaultImage: res.Data.result.ProductImage });
      }
    }
    this.setState({ IsLoading: false });
  }


  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  renderCards = () => {
    var Images = [];
    if (this.IsEmpty(this.state.ProductDetails) == false) {
      this.state.ProductDetails.VariantImages.map((data, i) => {
        Images.push(
          <Block key={i} center style={styles.productItem}>
            <Image
              resizeMode="cover"
              style={styles.productImage}
              source={{ uri: data }}
            />
          </Block>
        );
      });
    }

    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block flex>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={true}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2,
                paddingBottom: theme.SIZES.BASE / 2
              }}
            >
              {
                Images
              }
            </ScrollView>
          </Block >
          <Block flex style={{ marginHorizontal: theme.SIZES.BASE }}>
            <Block style={styles.nameInfo}>
              <Text bold size={26} color="#32325D">
                {this.state.ProductDetails.ProductName}
              </Text>
              <Text size={16} color="red" style={{ marginTop: 10 }}>
                {this.state.ProductDetails.ProductPrice} đ
                </Text>
            </Block>
            <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block>
              <Block row>
                <Block left flex>
                  <Text bold size={16} style={{ ...styles.titleCustom }}>
                    Phân loại:
                  </Text>
                </Block>
                <Block right flex>
                  <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                    {this.state.ProductDetails.ProductTypeName}
                  </Text>
                </Block>
              </Block>

              <Block row>
                <Block left flex>
                  <Text bold size={16} style={{ ...styles.titleCustom }}>
                    Thương hiệu:
                  </Text>
                </Block>
                <Block right flex>
                  <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                    {this.state.ProductDetails.TrademarkName}
                  </Text>
                </Block>
              </Block>

              <Block row>
                <Block left flex>
                  <Text bold size={16} style={{ ...styles.titleCustom }}>
                    Xuất xứ:
                  </Text>
                </Block>
                <Block right flex>
                  <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                    {this.state.ProductDetails.OriginName}
                  </Text>
                </Block>
              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Text bold size={16} style={{ ...styles.titleCustom, marginBottom: 15 }}>
              Mô tả:
              </Text>
            <Text
              size={16}
              color="#525F7F"
              style={{ textAlign: "justify" }}
            >
              {this.state.ProductDetails.ProductInfomation}
            </Text>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
          </Block>

        </Block>

      </Block>
    );
  };

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block
        flex
        style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
      >
        <Text bold size={16} style={styles.title}>
          Sản phẩm liên quan:
        </Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate("Home")}
            >
              View All
            </Text>
          </Block>
          <Block
            row
            space="between"
            style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
          >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    );
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  AddItem = (value) => {
    if (value <= this.state.SelectedVariantStock) {
      this.setState({ BuyQuantity: value })
    }
  }

  renderTabOptions = () => {
    const tabs = [];
    if (this.IsEmpty(this.state.ProductDetails) == false) {
      this.state.ProductDetails.Variants.map((item, index) => {
        tabs.push({
          id: item.VariantID,
          title: `${item.VariantColor}, ${item.VariantSize}`,
          stock: item.Stock,
          image: item.VariantImage
        });
      });
    }
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    if (!tabs) return null;
    return (
      <Tabs
        data={tabs}
        //initialIndex={defaultTab}
        onChange={(id, stock, image) => this.setState({ SelectedVariantId: id, SelectedVariantStock: stock, SelectedVariantImage: image })}
      />
    )
  }


  OnAddToCart = (isAddToCart) => {
    this.ResetToDefault();
    this.setState({ IsAddToCart: isAddToCart });
    this.setModalVisible(true);
  }

  OnNextAction = async (isAddToCart) => {
    this.setState({ IsLoading: true });
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var _items = [
      {
        VariantID: this.state.SelectedVariantId,
        Quantity: this.state.BuyQuantity,
      }
    ];
    var dataBody = {
      UserId: UID,
      Items: _items,
      Type: 2 //update out cart
    };
    var res = await API._fetch(config.UPDATE_CART_API_ENDPOINT, 'POST', dataBody);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        DeviceEventEmitter.emit('EventListener-CountCart');
        this.setState({ modalVisible: false });
        if (isAddToCart) {
          this.props.navigation.navigate('ShoppingCart');
        } else {
          this.props.navigation.navigate('Checkout');
        }
      } else if (res.Data.code == 202) {
        Alert.alert(
          'Cảnh báo',
          res.Data.message,
          [
            { text: 'OK' },
          ],
          { cancelable: true },
        );
      }
    }
    this.setState({ IsLoading: false });
  }


  render() {
    var IsShowButton = this.state.BuyQuantity > 0 ? true : false;
    return (
      <Block flex style={styles.navbar}>
        {this.state.IsLoading ?
          <Block style={{
            width: '90%',
            height: '90%',
            position: 'absolute',
            borderRadius: 5,
            zIndex: 10,
          }}>
            <MaterialIndicator size={40} trackWidth={3} color={"#C0C0C0"} />
          </Block>
          : <Block></Block>
        }
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
          {/* {this.renderAlbum()} */}
        </ScrollView>
        <Block style={{
          ...styles.shadow,
          backgroundColor: 'transparent', // TabBar background
          marginTop: theme.SIZES.BASE * 2,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%"
        }}>
          <Block row>
            <Block flex={2}>
              <Button onPress={() => this.OnAddToCart(true)} color="success" style={styles.button}>
                <Icon
                  name={'shopping-cart'}
                  family="font-awesome"
                  // style={{ paddingRight: 8 }}
                  size={25}
                  color={argonTheme.COLORS.ICON}
                />
              </Button>
            </Block>
            <Block flex={2}>
              <Button onPress={() => this.OnAddToCart(false)} color="warning" style={styles.button}>
                Mua ngay
              </Button>
            </Block>
          </Block>

        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <Block style={{
            ...styles.shadow,
            backgroundColor: '#F4F5F7',
            padding: 10,
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            // height: "70%",
            width: "100%",
            bottom: 0,
            position: 'absolute',
          }}>
            <Block row>
              <Block right flex>
                <Icon
                  name={'close'}
                  family="font-awesome"
                  // style={{ paddingRight: 8 }}
                  size={20}
                  color={argonTheme.COLORS.ICON}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </Block>
            </Block>

            <Block row flex>
              <Block style={styles.shadowLight}>
                <Image
                  resizeMode="cover"
                  source={{ uri: this.state.SelectedVariantImage }}
                  style={styles.albumThumb}
                />
              </Block>
              <Block flex style={{
                alignItems: 'flex-start',
                alignSelf: 'flex-end',
                marginLeft: 15
              }}>
                <Block row style={{ marginBottom: 3 }}>
                  <Text bold size={16} >
                    {this.state.ProductDetails.ProductPrice} đ
                  </Text>
                </Block>

                <Block row>
                  <Text size={16}>
                    Kho:
                  </Text>
                  <Text size={16} color="red" style={{ marginLeft: 5 }}>
                    {this.state.SelectedVariantStock}
                  </Text>
                </Block>

              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block flex middle>
              <Block row left flex>
                <Text bold>Phân loại: (Màu sắc, Size)</Text>
              </Block>
              <Block row flex center middle>
                {this.renderTabOptions()}
              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block row flex>
              <Block center left flex>
                <Text bold>Số lượng:</Text>
              </Block>
              <Block right flex>
                <NumericInput
                  initValue={0}
                  editable={false}
                  minValue={0}
                  maxValue={this.state.SelectedVariantId > 0 ? this.state.SelectedVariantStock : 0}
                  iconSize={theme.SIZES.BASE}
                  totalWidth={theme.SIZES.BASE * 5}
                  totalHeight={(theme.SIZES.BASE * 4) / 2}
                  onChange={value => this.AddItem(value)}
                />
              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block row flex center>
              <Button
                onPress={() => this.OnNextAction(this.state.IsAddToCart)}
                disabled={!IsShowButton}
                color={"warning"}
                style={{ ...styles.button, height: 35, width: "100%", opacity: IsShowButton ? 1 : 0.3 }}
              >
                {this.state.IsAddToCart ? "Thêm vào giỏ" : "Mua Ngay"}
              </Button>
            </Block>
          </Block>
        </Modal>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    //margin: theme.SIZES.BASE,
    width: "100%",
    opacity: 0.8
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  titleCustom: {
    marginVertical: 5,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE * 2.5,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE * 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE * 2,
    height: cardWidth - theme.SIZES.BASE * 2,
    borderRadius: 3,
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  },
  navbar: {
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
  },
  nameInfo: {
    marginTop: 25
  },
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  shadow: {
    // backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 4,
  },
  shadowLight: {
    // backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  }
});

