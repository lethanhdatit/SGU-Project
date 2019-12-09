import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import Screens from './Screens';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentWillMount() {
    this._AuthenAsync();
  }

  _AuthenAsync = async () => {
    var userId = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    if (userId == null || userId == "") {
      this.props.navigation.navigate('Login');
    }
    else {
      var res = await API._fetch(`${config.CHECK_LOGIN_STATUS_API_ENDPOINT}?UserId=${userId}`, 'GET');
      if (res != null && res.Data != null) {
        if (res.Data.code == 200) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('Login');
        }
      } else {
        this.props.navigation.navigate('Login');
      }
    }
  };


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});



export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: Screens,
    Login: LoginScreen,
    Register: RegisterScreen
  },
    {
      initialRouteName: 'AuthLoading'
    })
);

