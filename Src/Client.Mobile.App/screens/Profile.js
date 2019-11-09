import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View, 
} from "react-native";

import Button from "react-native-button";

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  
  constructor(props) {
    super(props);    
  }

  onPressNext = () => {    
    this.props.navigation.navigate('AuthLoading'); 
  };


  render() {
    return (
      <View style={styles.Container}>
      <View style={styles.ControlContainer}>        
        <Button
          containerStyle={styles.BtnContainer}
          style={styles.textWhite}
          onPress={() => this.onPressNext()}
        >
          LOG OUT
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
    justifyContent: 'center'
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    padding: 10,
    width: 100 ,
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
