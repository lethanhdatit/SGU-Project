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

export default class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Orders: []
    }
    this._onFetchOrders(0);
  }


  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  _onFetchOrders = async (status) => {
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var res = await API._fetch(`${config.GET_ORDERS_API_ENDPOINT}?UserId=${Number(UID)}&OrderStatus=${Number(status)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ Orders: res.Data.result });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.navigation !== nextProps.navigation) {
      this._onFetchOrders(nextProps.navigation.getParam('tabId', 0));
    }
  }

  render() {
    var _Items = [];
    if (this.IsEmpty(this.state.Orders) == false) {
      this.state.Orders.map((data, i) => {
        _Items.push(
          <Block key={i} style={{
            backgroundColor: 'white',
            marginBottom: 15
          }}>
            <Block row flex>
              <Block flex style={{
                marginLeft: 15,
                paddingVertical: 10
              }}>
                <Block row style={{ marginBottom: 3 }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetail', { OrderId: data.OrderId, 
                    OrderStatus: data.StatusName, CreatedDate: data.CreatedDate})}>
                    <Text bold size={14} color="#32325D">
                      Đơn hàng: #{data.OrderId}
                    </Text>
                  </TouchableOpacity>
                </Block>
                <Block row style={{ paddingRight: theme.SIZES.BASE }}>
                  <Block left middle flex={2}>
                    <Text size={12} color={argonTheme.COLORS.HEADER}>
                      Đặt ngày: {data.CreatedDate}
                    </Text>
                  </Block>
                  <Block row right flex>
                    <Text size={12} color={argonTheme.COLORS.HEADER} style={{ fontStyle: 'italic' }}>
                      {data.StatusName}
                    </Text>
                  </Block>
                </Block>
                <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block right flex style={{ paddingRight: theme.SIZES.BASE }}>
                  <Block row right flex>
                    <Text size={12} color="red">
                      {data.TotalProduct}
                    </Text>
                    <Text size={12} style={{ marginLeft: 3 }}>
                      Sản phẩm.
                    </Text>
                    <Text size={12} style={{ marginLeft: 3 }}>
                      Tổng cộng:
                    </Text>
                    <Text size={12} color="red" style={{ marginLeft: 3 }}>
                      {data.TotalPrice} đ
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
            {/* <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block> */}
          </Block>
        );
      });
    }

    return (
      <Block flex style={styles.navbar}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Block flex style={{
            backgroundColor: '#F4F5F7',
            borderRadius: 4,
            marginTop: 15,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            height: "100%",
            width: "100%",
          }}>
            {_Items}
          </Block>
        </ScrollView>
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
    paddingBottom: theme.SIZES.BASE * 1,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 8.5 : theme.SIZES.BASE * 4.2,
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

