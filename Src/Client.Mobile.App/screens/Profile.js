import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Input, Icon } from "../components";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
import * as API from "../components/Api";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const validateEmail = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase())
}

const validatePhone = (phone) => {
  const expression = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  return expression.test(String(phone).toLowerCase())
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: null,
      Email: null,
      Avatar: null,
      UserID: null,
      Phone: null,
      Address: null,
      DOB: null
    }
  }

  componentWillMount() {
    this._OnFetchUserInfo();
  }

  async _OnFetchUserInfo() {
    var UserId = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var res = await API._fetch(`${config.GET_USER_INFO_API_ENDPOINT}?UserId=${Number(UserId)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var user = res.Data.result;
        this.setState({
          isDateTimePickerVisible: false,
          UserID: user.UserID,
          FullName: user.FullName,
          Email: user.Email,
          Avatar: user.Avatar,
          Phone: user.Phone,
          Address: user.Address,
          DOB: user.DOB
        });
      }
    }
  }

  async _UpdateUserInfo() {

    var dataBody = {
      UserID: this.state.UserID,
      FullName: this.state.FullName,
      Phone: this.state.Phone,
      Address: this.state.Address,
      DOB: this.state.DOB
    };

    var res = await API._fetch(config.UPDATE_USER_INFO_API_ENDPOINT, 'POST', dataBody);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        Alert.alert(
          'Thông Báo',
          'Cập nhật thông tin thành công',
          [
            { text: 'OK' },
          ],
          { cancelable: true },
        );
        this._OnFetchUserInfo();
      } else {
        Alert.alert(
          'Lỗi.',
          res.Data.message,
          [
            { text: 'OK' },
          ],
          { cancelable: true },
        );
      }
    } else {

    }
  }

  async _OnUpdateUserInfo() {
    Alert.alert(
      'Cập nhật thông tin ngay?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this._UpdateUserInfo() },
      ],
      { cancelable: true },
    );
  }

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };

  handleDatePicked = date => {
    var customDate = moment(new Date(date)).format('DD/MM/YYYY');
    this.toggleDateTimePicker();
    this.setState({ DOB: customDate });
  };

  render() {
    var isDisableLoginButton = (
      validatePhone(this.state.Phone)
      && this.state.FullName != null
      && this.state.FullName != ""
      && this.state.Address != null
      && this.state.Address != ""
      && this.state.DOB != null
      && this.state.DOB != ""
    ) ? false : true;
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: (this.state.Avatar != null && this.state.Avatar != "" ? this.state.Avatar : '../assets/default-profile.png') }}
                    defaultSource={require('../assets/default-profile.png')}
                  />
                </Block>


                <Block flex style={styles.group}>
                  <Text bold center size={16} style={styles.title}>
                    Thông tin tài khoản
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
                            backgroundColor: this.state.FullName.length != null && this.state.FullName.length != "" ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
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
                      value={this.state.FullName}
                      onChangeText={(text) => this.setState({ FullName: text })}
                    />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                      placeholder="Email"
                      iconContent={
                        <Block
                          middle
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: this.state.Email.length != null && this.state.Email.length != "" ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
                            marginRight: 10
                          }}
                        >
                          <Icon
                            size={11}
                            color={argonTheme.COLORS.ICON}
                            name="mail-reply"
                            family="font-awesome"
                          />
                        </Block>
                      }
                      value={this.state.Email}
                      onChangeText={(text) => this.setState({ Email: text })}
                      // error={!validatePhone(this.state.ShippingPhone)}
                      editable={false}
                      disabled={true}
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
                      value={this.state.Phone}
                      onChangeText={(text) => this.setState({ Phone: text })}
                    // error={!validatePhone(this.state.ShippingPhone)}
                    />
                  </Block>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                      placeholder="Địa chỉ"
                      iconContent={
                        <Block
                          middle
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: this.state.Address.length != null && this.state.Address.length != "" ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
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
                      value={this.state.Address}
                      onChangeText={(text) => this.setState({ Address: text })}
                    // error={!validatePhone(this.state.ShippingPhone)}
                    />
                  </Block>
                  <TouchableOpacity onPress={() => this.toggleDateTimePicker()}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                      <Input
                        placeholder="Ngày sinh"
                        iconContent={
                          <Block
                            middle
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              backgroundColor: this.state.DOB.length != null && this.state.DOB.length != "" ? argonTheme.COLORS.INPUT_SUCCESS : argonTheme.COLORS.INPUT_ERROR,
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
                        value={this.state.DOB}
                        //onChangeText={(text) => this.setState({ DOB: text })}
                        editable={false}
                        disabled={true}
                      />
                    </Block>
                  </TouchableOpacity>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Button onPress={() => this._OnUpdateUserInfo(isDisableLoginButton)}
                    color="success"
                    style={{ ...styles.button, backgroundColor: isDisableLoginButton ? "#cccccc" : "#5E72E4" }}
                    disabled={isDisableLoginButton}
                  >
                    Cập Nhật
                  </Button>
                </Block>

              </Block>
            </ScrollView>
          </ImageBackground>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.toggleDateTimePicker}
            mode='date'
            minimumDate={new Date('01/01/1900')}
            maximumDate={new Date()}
            is24Hour={false}
          />
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: theme.SIZES.BASE,
    width: "100%"
  },
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }, title: {
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
});

export default Profile;
