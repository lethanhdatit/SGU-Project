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
import Welcome from '../screens/Welcome';
import MainTabNavigator from './MainTabNavigator';
import Modal from "react-native-modal";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,      
    };
  }

  componentWillMount() {
    this._AuthenAsync();
  }
 
  _AuthenAsync = async () => {

    var isAllowGPS = false; //ToDo read flag and set to 
    if (!isAllowGPS) {
      this.setState({ isModalVisible: true });
    }
    else {
      this.props.navigation.navigate('Welcome');
    }
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  OnCancel = () => {
    //ToDo save flag.

  };

  OnAllow = () => {
    //ToDo save flag
    this.toggleModal();
    this.props.navigation.navigate('Welcome');
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Cho phép truy cập hệ thống định vị </Text>
      <View style={styles.ButtonGroup}>
        <TouchableOpacity onPress={this.OnCancel}>
          <View style={styles.ModelButtonCancel}>
            <Text style={styles.textWhite}>Từ chối</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.OnAllow}>
          <View style={styles.ModelButtonNext}>
            <Text style={styles.textWhite}>Đồng ý</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, textWhite: {
    color: '#fff'
  },
  textGreen: {
    color: "green"
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  ModelButtonNext: {
    backgroundColor: '#4267b2',
    padding: 12,
    marginLeft: 20,
    left: 0,
    borderRadius: 5
  },
  ModelButtonCancel: {
    backgroundColor: "red",
    padding: 12,
    marginRight: 20,
    right: 0,
    borderRadius: 5
  },
  ButtonGroup: {
    marginTop: 50,
    flexWrap: "wrap",
    flexDirection: "row",
  }
});



export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Welcome: Welcome,       
  },
    {
      initialRouteName: 'AuthLoading'
    })
);

