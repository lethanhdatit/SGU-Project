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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//argon
import { articles, Images, argonTheme } from "../constants";
import { Card, Button, Header, Icon, Input } from "../components";
import Tabs from '../components/Tabs';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
const { width } = Dimensions.get("screen");
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;



export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      modalVisible: false,
      isDateTimePickerVisible: false,
      ShippingFullName: "",
      ShippingPhone: "",
      ShippingAddress: "",
      ShippingDate: "",
      ShippingNote: "",
      ShipmentType: null,
    }
  }

  ResetToDefault() {
    // this.setState({

    // })
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
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var res = await API._fetch(`${config.GET_CART_API_ENDPOINT}?UserId=${Number(UID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ 
          Products: res.Data.result, 
          ShippingFullName: res.Data.result.UserFullName,
          ShippingPhone: res.Data.result.UserPhone,
          ShippingAddress: res.Data.result.UserAddress
         });
      }
    }
  }


  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  ChangeQuantity = async (VariantId, value) => {
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var _items = [
      {
        VariantID: VariantId,
        Quantity: value,
      }
    ];
    var dataBody = {
      UserId: UID,
      Items: _items,
      Type: 1 //update in cart
    };
    var res = await API._fetch(config.UPDATE_CART_API_ENDPOINT, 'POST', dataBody);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        DeviceEventEmitter.emit('EventListener-CountCart');
        //this.setModalVisible(!this.state.modalVisible);
      }
    }
  }

  OnNextAction = async () => {
    //todo place order
  }

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    var customDate = moment(new Date(date)).format('DD/MM/YYYY hh:mm a');
    console.log("customDate: " + customDate);
    this.setState({ ShippingDate: customDate });
    this.toggleDateTimePicker();
  };

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };

  render() {
    var _Items = [];
    if (this.IsEmpty(this.state.Products) == false) {
      this.state.Products.Items.map((data, i) => {
        _Items.push(
          <Block key={i}>
            <Block row flex>
              <Block style={styles.shadowLight}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { productId: data.ProductId })}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: data.ProductImage }}
                    style={styles.albumThumb}
                  />
                </TouchableOpacity>
              </Block>
              <Block flex style={{
                alignItems: 'flex-start',
                alignSelf: 'flex-end',
                marginLeft: 15
              }}>
                <Block row style={{ marginBottom: 3 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', { productId: data.ProductId })}>
                    <Text bold size={14} color="#32325D">
                      {data.ProductName}
                    </Text>
                  </TouchableOpacity>
                </Block>
                <Block row left flex>
                  <Text size={12} color={argonTheme.COLORS.HEADER}>
                    Phân loại:
                  </Text>
                  <Text size={11} color={argonTheme.COLORS.HEADER} bold style={{ marginLeft: 3 }}>
                    {`${data.VariantColor}, ${data.VariantSize}`}
                  </Text>
                </Block>
                <Block row>
                  <Block left flex>
                    <Text bold size={12} color={argonTheme.COLORS.HEADER}>
                      {data.ProductPrice} đ
                    </Text>
                  </Block>
                  <Block right flex>
                    <Block row middle flex>
                      <Text bold size={12} color={argonTheme.COLORS.HEADER} style={{ marginLeft: 3 }}>
                        x{data.Quantity}
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
          </Block>
        );
      });
    }

    return (
      <Block flex style={styles.navbar}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Block flex style={styles.group}>
            <Text bold size={16} style={styles.title}>
              Thông tin giao hàng:
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Họ tên"
                iconContent={
                  <Icon
                    size={12}
                    style={{ marginRight: 10 }}
                    color={argonTheme.COLORS.ICON}
                    name="pencil"
                    family="font-awesome"
                  />
                }
                value={this.state.ShippingFullName}
                onChangeText={(text) => this.setState({ ShippingFullName: text })}
              />
            </Block>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Số điện thoại"
                iconContent={
                  <Icon
                    size={12}
                    style={{ marginRight: 10 }}
                    color={argonTheme.COLORS.ICON}
                    name="phone"
                    family="font-awesome"
                  />
                }
                value={this.state.ShippingPhone}
                onChangeText={(text) => this.setState({ ShippingPhone: text })}
              />
            </Block>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Địa chỉ giao hàng"
                iconContent={
                  <Icon
                    size={12}
                    style={{ marginRight: 10 }}
                    color={argonTheme.COLORS.ICON}
                    name="map-marker"
                    family="font-awesome"
                  />
                }
                value={this.state.ShippingAddress}
                onChangeText={(text) => this.setState({ ShippingAddress: text })}
              />
            </Block>
            <TouchableOpacity onPress={() => this.toggleDateTimePicker()}>
              <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                  placeholder="Ngày giao hàng"
                  iconContent={
                    <Icon
                      size={12}
                      style={{ marginRight: 10 }}
                      color={argonTheme.COLORS.ICON}
                      name="calendar"
                      family="font-awesome"
                    />
                  }
                  value={this.state.ShippingDate}
                  onChangeText={(text) => this.setState({ ShippingDate: text })}
                  editable={false}
                />
              </Block>
            </TouchableOpacity>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Ghi chú"
                iconContent={
                  <Icon
                    size={12}
                    style={{ marginRight: 10 }}
                    color={argonTheme.COLORS.ICON}
                    name="sticky-note"
                    family="font-awesome"
                  />
                }
                value={this.state.ShippingNote}
                onChangeText={(text) => this.setState({ ShippingNote: text })}
              />
            </Block>
          </Block>

          <Block flex style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            height: "100%",
            width: "100%",
          }}>
            <Text bold size={16} style={styles.titleCus}>
              Danh sách sản phẩm:
            </Text>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            {_Items}
          </Block>
        </ScrollView>
        <Block flex style={{
          ...styles.shadow,
          backgroundColor: '#F4F5F7', // TabBar background
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          paddingHorizontal: 5
        }}>
          <Block row style={{ height: theme.SIZES.BASE * 3 }}>
            <Block left middle flex={3} style={{ backgroundColor: "transparent", marginLeft: 3 }}>
              <Block row right>
                <Text size={14}>
                  Tổng thanh toán:
                  </Text>
                <Text color="red" size={14} bold style={{ marginLeft: 3 }}>
                  {this.state.Products.TotalPrice} đ
                </Text>
              </Block>
            </Block>
            <Block right middle flex={2}>
              <Button onPress={() => this.OnNextAction()} color="success" style={{ ...styles.button, width: "70%", height: "80%" }}>
                Đặt hàng
              </Button>
            </Block>
          </Block>
        </Block>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.toggleDateTimePicker}
          mode='datetime'
          minimumDate={new Date()}
          is24Hour={false}
        />
      </Block >
    );
  }
}

const styles = StyleSheet.create({
  button: {
    //margin: theme.SIZES.BASE,
    width: "100%",
    opacity: 0.9
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  titleCus: {
    paddingBottom: theme.SIZES.BASE,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  titleCustom: {
    marginVertical: 5,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    alignSelf: "flex-end",
    width: thumbMeasure / 1.5,
    height: thumbMeasure / 1.5
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
    marginHorizontal: theme.SIZES.BASE * 0.5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE * 2,
    height: cardWidth - theme.SIZES.BASE * 2,
    borderRadius: 3
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
    backgroundColor: 'white',
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 2,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4.5 : theme.SIZES.BASE * 1.5,
    zIndex: 5,
  },
  nameInfo: {
    marginTop: 35
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

