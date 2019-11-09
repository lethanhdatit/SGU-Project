import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View, 
} from "react-native";

import Button from "react-native-button";

export default class NotificationScreen extends Component {
  static navigationOptions = {
    title: "Notification"
  };
  
  constructor(props) {
    super(props);    
  }

  render() {
    return (
    <View style={styles.Container}>
    
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
    width: 100,
    borderRadius: 5
  },
  ControlContainer: {
    marginBottom: 10,
    position: 'absolute',
    bottom:0
  },
  textWhite: {
    color: '#fff'
  }
});
