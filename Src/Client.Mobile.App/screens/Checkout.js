import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
//argon
import { argonTheme } from "../constants";
import { Button, Icon, Input, Select } from "../components";
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
import { MaterialIndicator } from 'react-native-indicators';
const { width } = Dimensions.get("screen");
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const validateEmail = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase())
}

const validatePhone = (phone) => {
  const expression = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  return expression.test(String(phone).toLowerCase())
}

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      Shipments: [],
      modalVisible: false,
      isDateTimePickerVisible: false,
      SelectedShipment: 0,
      ShippingFullName: "",
      ShippingPhone: "",
      ShippingAddress: "",
      ShippingDate: "",
      ShippingNote: "",
      IsLoading: false
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
    var res = await this._onFetchProducts();
    if (res != null) {
      this.setState({
        ShippingFullName: res.UserFullName != null ? res.UserFullName : "",
        ShippingPhone: res.UserPhone != null ? res.UserPhone : "",
        ShippingAddress: res.UserAddress != null ? res.UserAddress : ""
      });
    }
    this._onFetchShipments();
  }

  _onFetchProducts = async () => {
    this.setState({ IsLoading: true });
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var res = await API._fetch(`${config.GET_CART_API_ENDPOINT}?UserId=${Number(UID)}&ShipmentID=${this.state.SelectedShipment}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({
          Products: res.Data.result,
        });
        this.setState({ IsLoading: false });
        return res.Data.result;
      }
    }
    this.setState({ IsLoading: false });
    return null;
  }

  _onFetchShipments = async () => {
    this.setState({ IsLoading: true });
    var res2 = await API._fetch(`${config.GET_ACTIVE_SHIPMENT}`, 'GET');
    if (res2 != null && res2.Data != null) {
      if (res2.Data.code == 200) {
        var temp = [];
        var defaultShipment = 0;
        res2.Data.result.map((item, index) => {
          temp.push(`${item.ShipmentID}-${item.ShipmentName}`);
          if (index == 0) defaultShipment = item.ShipmentID;
        });

        this.setState({ Shipments: temp, SelectedShipment: defaultShipment });
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

  OnSelectShipment(value) {
    var ShipmentID = value.split('-')[0];
    this.state.SelectedShipment = ShipmentID;
    this._onFetchProducts();
  }

  OnPlaceOrder = async () => {
    this.setState({ IsLoading: true });
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var dataBody = {
      UserId: UID,
      Address: this.state.ShippingAddress,
      Phone: this.state.ShippingPhone,
      ShippingDate: this.state.ShippingDate,
      ShipmentID: this.state.SelectedShipment,
      NoteUser: this.state.ShippingNote
    };
    await API._fetch(config.PLACE_ORDER_API_ENDPOINT, 'POST', dataBody);
    this.setState({ IsLoading: false });
    DeviceEventEmitter.emit('EventListener-CountCart');
    this.props.navigation.navigate('MyOrdersScreen', { tabId: 1 });
  }

  OnNextAction = async () => {
    Alert.alert(
      'Đặt hàng cho bạn ngay nhé?',
      '',
      [
        {
          text: 'Cancel',
          //onPress: () => this._onFetchDetails(),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.OnPlaceOrder() },
      ],
      { cancelable: true },
    );
  }


  handleDatePicked = date => {
    var customDate = moment(new Date(date)).format('DD/MM/YYYY hh:mm a');
    this.toggleDateTimePicker();
    this.setState({ ShippingDate: customDate });
  };

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };

  render() {
    var isDisableLoginButton = (
      this.state.SelectedShipment != 0
      && this.state.SelectedShipment != null
      && validatePhone(this.state.ShippingPhone)
      && this.state.ShippingFullName != null
      && this.state.ShippingAddress != null
      && this.state.ShippingDate != null
      && this.state.ShippingDate != ""
    ) ? false : true;

    var _Items = [];
    if (this.IsEmpty(this.state.Products) == false && this.IsEmpty(this.state.Products.Items) == false) {
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
        {this.state.IsLoading ?
          <Block style={{
            width: '90%',
            height: '90%',
            position: 'absolute',
            borderRadius: 5,
            zIndex: 5,
          }}>
            <MaterialIndicator size={40} trackWidth={3} color={"#C0C0C0"} />
          </Block>
          : <Block></Block>
        }
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
                  <Block
                    middle
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: this.state.ShippingFullName.length != null ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
                      marginRight: 10
                    }}
                  >
                    <Icon
                      size={11}
                      color={argonTheme.COLORS.ICON}
                      name="pencil"
                      family="font-awesome"
                    />
                  </Block>
                }
                value={this.state.ShippingFullName}
                onChangeText={(text) => this.setState({ ShippingFullName: text })}
              />
            </Block>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Số điện thoại"
                iconContent={
                  <Block
                    middle
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: validatePhone(this.state.ShippingPhone) ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
                      marginRight: 10
                    }}
                  >
                    <Icon
                      size={11}
                      color={argonTheme.COLORS.ICON}
                      name="phone"
                      family="font-awesome"
                    />
                  </Block>
                }
                value={this.state.ShippingPhone}
                onChangeText={(text) => this.setState({ ShippingPhone: text })}
                error={!validatePhone(this.state.ShippingPhone)}
              />
            </Block>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Địa chỉ giao hàng"
                iconContent={
                  <Block
                    middle
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: this.state.ShippingAddress.length != null ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
                      marginRight: 10
                    }}
                  >
                    <Icon
                      size={11}
                      color={argonTheme.COLORS.ICON}
                      name="map-marker"
                      family="font-awesome"
                    />
                  </Block>
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
                    <Block
                      middle
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: this.state.ShippingDate.length != 0 ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
                        marginRight: 10
                      }}
                    >
                      <Icon
                        size={11}
                        color={argonTheme.COLORS.ICON}
                        name="calendar"
                        family="font-awesome"
                      />
                    </Block>
                  }
                  value={this.state.ShippingDate}
                  //onChangeText={(text) => this.setState({ ShippingDate: text })}
                  editable={false}
                  disabled={true}
                />
              </Block>
            </TouchableOpacity>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Input
                placeholder="Ghi chú"
                iconContent={
                  <Block
                    middle
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: argonTheme.COLORS.INPUT_SUCCESS,
                      marginRight: 10
                    }}
                  >
                    <Icon
                      size={11}
                      color={argonTheme.COLORS.ICON}
                      name="sticky-note"
                      family="font-awesome"
                    />
                  </Block>
                }
                value={this.state.ShippingNote}
                onChangeText={(text) => this.setState({ ShippingNote: text })}
              />
            </Block>
          </Block>
          <Block flex style={styles.group}>
            <Text bold size={16} style={styles.title}>
              Chọn nhà vận chuyển:
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block flex left>
                <Select
                  defaultIndex={0}
                  DefaultValue={this.state.Shipments && this.state.Shipments[0]}
                  options={this.state.Shipments}
                  style={{ width: "50%" }}
                  onSelect={(index, item) => this.OnSelectShipment(item)}
                />
              </Block>
            </Block>
          </Block>
          <Block flex style={styles.group}>
            <Text bold size={16} style={styles.title}>
              Thanh toán:
            </Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left>
                <Text size={16} style={{ color: "#525F7F", marginVertical: 5, marginLeft: 5 }}>
                  [Ship COD]
                </Text>
              </Block>
            </Block>
          </Block>
          <Block flex style={{
            backgroundColor: 'white',
            padding: 14,
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
          <Block row style={{ height: theme.SIZES.BASE * 5 }}>
            <Block left middle flex={3} style={{ backgroundColor: "transparent", padding: 5 }}>

              <Block row style={{ marginVertical: theme.SIZES.BASE / 2.4 }}>
                <Block left flex>
                  <Text size={12} color={argonTheme.COLORS.HEADER}>
                    Tiền sản phẩm:
                  </Text>
                </Block>
                <Block right flex>
                  <Block row middle flex>
                    <Text bold size={12} color={argonTheme.COLORS.HEADER} style={{ marginLeft: 3 }}>
                      {this.state.Products.TotalItemsPrice} đ
                      </Text>
                  </Block>
                </Block>
              </Block>

              <Block row style={{ marginBottom: theme.SIZES.BASE / 2.4 }}>
                <Block left flex>
                  <Text size={12} color={argonTheme.COLORS.HEADER}>
                    Phí ship:
                    </Text>
                </Block>
                <Block right flex>
                  <Block row middle flex>
                    <Text bold size={12} color={argonTheme.COLORS.HEADER} style={{ marginLeft: 3 }}>
                      {this.state.Products.TotalShipmentPrice != 0 ? (this.state.Products.TotalShipmentPrice != null ? `${this.state.Products.TotalShipmentPrice} đ` : "N/A") : "Free"}
                    </Text>
                  </Block>
                </Block>
              </Block>

              <Block row middle>
                <Block style={styles.divider} />
              </Block>

              <Block row style={{ marginVertical: theme.SIZES.BASE / 2.4 }}>
                <Block left flex>
                  <Text bold size={12} color={argonTheme.COLORS.HEADER}>
                    Tổng thanh toán:
                  </Text>
                </Block>
                <Block right flex>
                  <Block row middle flex>
                    <Text color="red" size={14} bold style={{ marginLeft: 3 }}>
                      {this.state.Products.TotalPrice} đ
                    </Text>
                  </Block>
                </Block>
              </Block>

            </Block>
            <Block right middle flex={1}>
              <Button onPress={() => this.OnNextAction()}
                color="success"
                style={{ ...styles.button, width: "90%", height: "60%", backgroundColor: isDisableLoginButton ? "#cccccc" : "#5E72E4" }}
                disabled={isDisableLoginButton}
              >
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
    paddingBottom: theme.SIZES.BASE * 5.1,
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

