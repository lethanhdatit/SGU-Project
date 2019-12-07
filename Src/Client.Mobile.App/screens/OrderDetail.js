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

export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailOrders: []
    }
  }

  ResetToDefault() {
    // this.setState({

    // })
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._onFetchDetailOrders();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentWillMount() {
    this._onFetchDetailOrders();
  }


  _onFetchDetailOrders = async (status) => {
    var OrderID = this.props.navigation.getParam('OrderId', '0');
    var res = await API._fetch(`${config.GET_DETAIL_ORDERS_API_ENDPOINT}?OrderID=${Number(OrderID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ DetailOrders: res.Data.result });
      }
    }
  }

  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  CancelOrder = async (IdOrder) => {
    var OrderID = this.props.navigation.getParam('OrderId', '0');
    var res = await API._fetch(`${config.CANCEL_ORDER_API_ENDPOINT}?OrderID=${Number(OrderID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.props.navigation.navigate('MyOrdersScreen', { tabId: 8 });
      }
    }
  }

  OnCancelOrder = async () => {
    Alert.alert(
      'Bạn xác nhận hủy đơn hàng này?',
      '',
      [
        {
          text: 'Cancel',
          //onPress: () => this._onFetchDetails(),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.CancelOrder() },
      ],
      { cancelable: true },
    );
  }

  render() {
    var OrderID = this.props.navigation.getParam('OrderId', '0');
    var OrderStatus = this.props.navigation.getParam('OrderStatus', 'Unknown');
    var CreatedDate = this.props.navigation.getParam('CreatedDate', 'Unknown');
    var _Items = [];
    if (this.IsEmpty(this.state.DetailOrders) == false) {
      this.state.DetailOrders.Items.map((data, i) => {
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
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block row left center flex={2}>
                <Text bold size={16} style={{ color: argonTheme.COLORS.HEADER }}>
                  Mã đơn:
                </Text>
                <Text size={16} style={{
                  color: "#525F7F",
                  marginLeft: 10
                }}>
                  #{OrderID}
                </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{
                  color: "#525F7F",
                  fontStyle: 'italic'
                }}>
                  {OrderStatus}
                </Text>
              </Block>
            </Block>
            <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Người nhận:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.UserFullName}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Số điện thoại:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.Phone}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Địa chỉ:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.Address}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Ngày đặt:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {CreatedDate}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Ngày giao:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.ShippingDate}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Nhà vận chuyển:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.ShipmentName}
                </Text>
              </Block>
            </Block>

            <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Thanh toán:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  Ship COD
                </Text>
              </Block>
            </Block>
          </Block>
                  
          <Block row style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block left flex>
                <Text bold size={14} style={{ ...styles.titleCustom }}>
                  Ghi chú:
                  </Text>
              </Block>
              <Block right flex>
                <Text size={14} style={{ color: "#525F7F", marginVertical: 5 }}>
                  {this.state.DetailOrders.NoteUser}
                </Text>
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
                      {this.state.DetailOrders.TotalProductPrice} đ
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
                      {this.state.DetailOrders.ShipmentTotalPrice != '0' ? (this.state.DetailOrders.ShipmentTotalPrice != null ? `${this.state.DetailOrders.ShipmentTotalPrice} đ` : "N/A") : "Free"}
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
                      {this.state.DetailOrders.TotalPrice} đ
                    </Text>
                  </Block>
                </Block>
              </Block>

            </Block>
            <Block right middle flex={1}>
              <Button onPress={() => this.OnCancelOrder()}
                color="success"
                style={{ ...styles.button, width: "90%", height: "60%", backgroundColor: !this.state.DetailOrders.IsAvailableCancel ? "#cccccc" : "#5E72E4" }}
                disabled={!this.state.DetailOrders.IsAvailableCancel}
              >
                Hủy Đơn
              </Button>
            </Block>
          </Block>
        </Block>
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

