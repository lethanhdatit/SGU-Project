import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { CheckBox } from 'react-native-elements'
import Button from "react-native-button";
import { Ionicons } from '@expo/vector-icons';

export default class Term extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Điều Khoản Sử Dụng',
    headerBackTitle: null,
    headerLeft: () => <Ionicons style={{ marginLeft: 10 }} name={
      Platform.OS === 'ios'
        ? `ios-close`
        : 'md-close'
    }
      size={35} onPress={() => { navigation.navigate('StepTwo'); }} />,

  });
  constructor(props) {
    super(props);
    this.state = { checked: true };
  }

  onPressNext = () => {
    this.props.navigation.navigate('StepThree');
  };


  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ControlContainer}>
          <View style={{
            width: 140
          }}>
            <CheckBox
              title='Đồng ý'
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}

            />
          </View>

          <Button
            containerStyle={styles.BtnContainer}
            style={styles.textWhite}
            onPress={() => this.onPressNext()}
          >
            Tiếp Tục
          </Button>
        </View>
      </View>
    );
  }
}


// Styles for login page
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    padding: 10
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    padding: 10
  },
  ControlContainer: {
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: "100%",  
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWhite: {
    color: '#fff'
  }
});
