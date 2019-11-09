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
import { TextInput } from 'react-native-paper';

export default class Info extends Component { 
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Thông Tin Mặc Định',
    headerBackTitle: null,
    headerLeft: () => <Ionicons style={{ marginLeft: 10 }} name={
                                        Platform.OS === 'ios'
                                          ? `ios-close`
                                          : 'md-close'
                                      } 
                                size={35} onPress={() => {                                  
                                  navigation.navigate('StepTwo');
                                 }} />,
    
  });
  constructor(props) {
    super(props);
    this.state = { 
      checked: true,
      NameText: 'Nguyễn Văn A',
      EmailText: 'nguyenvana@gmail.com',
      PhoneText: '0123456789',
      AddressText: '10 Đinh Bộ Lĩnh, Phường 24, Quận Bình Thạnh, HCM'
    };
  }

  onPressNext = () => {
    this.props.navigation.navigate('Term');
  };


  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ContentContainer}>
         <TextInput
          //label='Name'
          value={this.state.NameText}
          onChangeText={NameText => this.setState({ NameText })}
          mode='flat'
          style={{marginBottom: 5, backgroundColor: 'transparent'}}
        />
         <TextInput
          //label='Email'
          value={this.state.EmailText}
          onChangeText={EmailText => this.setState({ EmailText })}
          mode='flat'     
          style={{marginBottom: 5, backgroundColor: 'transparent'}}                  
        />
         <TextInput
          //label='Phone'
          value={this.state.PhoneText}
          onChangeText={PhoneText => this.setState({ PhoneText })}
          mode='flat'     
          style={{marginBottom: 5, backgroundColor: 'transparent'}}                  
        />
         <TextInput
          //label='Address'
          value={this.state.AddressText}
          onChangeText={AddressText => this.setState({ AddressText })}
          mode='flat'     
          style={{marginBottom: 5, backgroundColor: 'transparent'}}                  
        />
         </View>
        <View style={styles.ControlContainer}>         
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
  },
  ContentContainer: {
    flex: 1,   
    width: "100%"
  },
  ControlContainer: {
    flex: 1,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: "100%"
  },
  textWhite: {
    color: '#fff'
  }
});
