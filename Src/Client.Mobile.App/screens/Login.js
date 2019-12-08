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
import { MaterialIndicator } from 'react-native-indicators';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";

const { width, height } = Dimensions.get("screen");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Remember: false,
      IsLoading: false
    };
  }


  async OnFBLogin() {

  }

  async OnGGLogin() {

  }

  async OnFBLogin() {

  }

  async OnBasicLogin() {
    this.setState({IsLoading: true});
    var dataBody = {
      Email: this.state.Email,
      Password: this.state.Password,
      IsRemember: this.state.Remember,
      LoginProvider: 1 // enum LoginProvider
    };

    var res = await API._fetch(config.LOGIN_API_ENDPOINT, 'POST', dataBody);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        console.log("res.Data.IdUser: " + res.Data.IdUser);
        if (this.state.Remember) {
          await AsyncStorage._storeData(config.USER_ID_STOREKEY, String(res.Data.IdUser));
        }
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
        Alert.alert(
          'Lỗi',
          res.Data.message,
          [            
            { text: 'OK'},
          ],
          { cancelable: true },
        );       
      }
    }
    else {
      console.log("Call API fail at: " + config.LOGIN_API_ENDPOINT);
    }
    this.setState({IsLoading: false});
  }

  async OnRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    var isDisableLoginButton = (this.state.Email != null
      && this.state.Email != ""
      && this.state.Password != null
      && this.state.Password != "") ? false : true;
    return (
      <Block flex middle>
        <StatusBar hidden />        
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
          { this.state.IsLoading ?
            <Block style={{              
              width: '90%', 
              height: '90%',
              borderRadius: 5
            }}>
              <MaterialIndicator size={30} trackWidth={3} color={"#C0C0C0"}/>
            </Block>
           : <Block></Block>
        }
            <Block style={styles.registerContainer}>
              <Block flex>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                  <Block flex={0.25} middle style={{ marginBottom: 15, marginTop: 15 }}>
                    <Text color="#8898AA" size={25} style={{ fontWeight: "bold" }}>
                      Đăng Nhập
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

                      <Block row width={width * 0.75} style={{ marginTop: 10 }}>
                        <Checkbox
                          initialValue={this.state.Remember}
                          onChange={(value) => this.setState({ Remember: value })}
                          checkboxStyle={{
                            borderWidth: 3
                          }}
                          color={argonTheme.COLORS.PRIMARY}
                          label="Ghi nhớ đăng nhập"
                        />
                      </Block>

                      <Block middle>
                        <Button disabled={isDisableLoginButton}
                          style={{ ...styles.createButton, backgroundColor: isDisableLoginButton ? "#cccccc" : "#5E72E4" }}
                          onPress={() => this.OnBasicLogin()}>
                          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                            Đăng Nhập
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
                          onPress={() => this.OnRegister()}>
                          <Text style={{
                            color: argonTheme.COLORS.PRIMARY,
                            fontSize: 14
                          }}>Chưa có tài khoản? Tạo ngay</Text>
                        </TouchableOpacity >
                      </Block>

                    </KeyboardAvoidingView>
                  </Block>
                </ScrollView>
              </Block>

              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  Hoặc
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-facebook"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons} onPress={() => this.OnFBLogin()}>FACEBOOK</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons} onPress={() => this.OnGGLogin()}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>

            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.65,
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

