import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Facebook from 'expo-facebook';
import Button from "react-native-button";
import config from '../config';
import * as AsyncStorage from '../components/AsyncStorage';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Đăng Nhập Để Tiếp Tục',
    // headerBackTitle: null,
  };

  constructor(props) {
    super(props);
  }

  onPressFacebook = async () => {    
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(config.FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email
        &access_token=${token}`);
        const result = await response.json();
        if (result != null) {

          var dataBody = {
            UID: result.id,
            Token: token,
            Name: result.name,
            Email: result.email,
            ExpireDate: expires
          };

          console.log("config.LOGIN_API_ENDPOINT: " + config.LOGIN_API_ENDPOINT);

          var resSave = await fetch(config.LOGIN_API_ENDPOINT, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody)
          });
          var res = (await resSave.json());
          if (res != null && res.Data != null) {

            //200: Login success
            //202: First login && registered success
            if (res.Data.code == 200 || res.Data.code == 202) {              
              await AsyncStorage._storeData(config.USER_ID_STOREKEY, String(res.Data.IdUser));
              this.props.navigation.navigate('Info');             
            }else {
              //Fail with reason
              alert(res.Data.message);
            }
          } else {
            //Fail without reason
          }
        
         
        }


      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  };


  render() {
    return (
      <View style={styles.Container}>
        <Button
          containerStyle={styles.BtnContainer}
          style={styles.textWhite}
          onPress={() => this.onPressFacebook()}
        >
          ĐĂNG NHẬP BẰNG FACEBOOK
      </Button>
      </View>

    );
  }
}


// Styles for login page
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    padding: 10,
    marginHorizontal: 15,
    alignSelf: 'stretch',
    borderRadius: 5
  },
  textWhite: {
    color: '#fff'
  }
});
