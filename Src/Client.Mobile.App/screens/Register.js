import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";

const { width, height } = Dimensions.get("screen");

const validate = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase())
}

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      FullName: "",
      Email: "",
      Password: "",
      RePassword: "",
      DOB: "",
    };
  }

  async OnRegister() {
    var count = 0;
    if(this.state.Password != this.state.RePassword){
      count++;
      Alert.alert(
        'Lỗi',
        'Password và Re-password không khớp',
        [            
          { text: 'OK'},
        ],
        { cancelable: true },
      );     
    }

    if(!validate(this.state.Email)){
      count++;
      Alert.alert(
        'Lỗi',
        'Email không hợp lệ.',
        [            
          { text: 'OK'},
        ],
        { cancelable: true },
      );          
    }

    if(count == 0){
      var dataBody = {
        FullName: this.state.FullName,
        Email: this.state.Email,
        Password: this.state.Password,
        DOB: this.state.DOB,
        LoginProvider: 1 // enum LoginProvider
      };
  
      var res = await API._fetch(config.REGISTER_API_ENDPOINT, 'POST', dataBody);
      if (res != null && res.Data != null) {
        if (res.Data.code == 200) {
          console.log("res.Data.IdUser: " +res.Data.IdUser);
          await AsyncStorage._storeData(config.USER_ID_STOREKEY, String(res.Data.IdUser));
          this.props.navigation.navigate('App');
        }
        else if (res.Data.code == 500) {
          Alert.alert(
            'Lỗi',
            'Lỗi không xác định.',
            [            
              { text: 'OK'},
            ],
            { cancelable: true },
          );      
          console.log(res.Data.message);
        }
        else {
          alert(res.Data.message);
        }
      }
      else {
        console.log("Call API fail at: " + config.LOGIN_API_ENDPOINT);
      }
    }    
  }

  async OnLogin() {
    this.props.navigation.navigate('Login');
  }

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    var customDate = moment(new Date(date)).format('DD/MM/YYYY');
    console.log("customDate: " + customDate);
    this.setState({ DOB: customDate });
    this.toggleDateTimePicker();
  };

  toggleDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };

  render() {
    var isDisableLoginButton = (this.state.Email != null
      && this.state.Email != ""
      && this.state.Password != null
      && this.state.Password != ""
      && this.state.FullName != null
      && this.state.FullName != ""
      && this.state.DOB != null
      && this.state.DOB != ""
    ) ? false : true;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                  <Block flex={0.25} middle style={{ marginBottom: 15, marginTop: 15 }}>
                    <Text color="#8898AA" size={25} style={{ fontWeight: "bold" }}>
                      Đăng Ký
                  </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                        <Input
                          borderless
                          value={this.state.FullName}
                          placeholder="Họ và tên"
                          onChangeText={(text) => this.setState({ FullName: text })}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="switches"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                        <Input
                          borderless
                          value={this.state.Email}
                          placeholder="Email"
                          onChangeText={(text) => this.setState({ Email: text })}
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="ic_mail_24px"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8} style={{ marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => this.toggleDateTimePicker()}>
                          <Input
                            borderless
                            value={this.state.DOB}
                            placeholder="Ngày sinh"
                            //onChangeText={(text) => this.setState({ DOB: text })}
                            editable={false}
                            iconContent={
                              <Icon
                                size={16}
                                color={argonTheme.COLORS.ICON}
                                name="calendar-date"
                                family="ArgonExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </TouchableOpacity>
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          value={this.state.Password}
                          onChangeText={(text) => this.setState({ Password: text })}
                          placeholder="Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="padlock-unlocked"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          password
                          borderless
                          value={this.state.RePassword}
                          onChangeText={(text) => this.setState({ RePassword: text })}
                          placeholder="Re-Password"
                          iconContent={
                            <Icon
                              size={16}
                              color={argonTheme.COLORS.ICON}
                              name="padlock-unlocked"
                              family="ArgonExtra"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </Block>

                      <Block middle>
                        <Button disabled={isDisableLoginButton}
                          style={{ ...styles.createButton, backgroundColor: isDisableLoginButton ? "#cccccc" : "#5E72E4" }}
                          onPress={() => this.OnRegister()}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Đăng Ký
                        </Text>
                        </Button>
                      </Block>

                      <Block middle>                        
                      <TouchableOpacity style={{
                          width: "100%", alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 15
                        }}
                          color="transparent"
                          onPress={() => this.OnLogin()}>
                          <Text style={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}>Đã có tài khoản? Đăng nhập ngay</Text>
                        </TouchableOpacity >
                      </Block>

                    </KeyboardAvoidingView>
                  </Block>
                </ScrollView>
              </Block>
            </Block>
          </Block>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.toggleDateTimePicker}
            mode='date'
            minimumDate={new Date('01/01/1900')}
            maximumDate={new Date()}
            is24Hour={false}
          />

        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

