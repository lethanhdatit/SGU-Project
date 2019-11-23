import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { NavigationActions, StackActions } from 'react-navigation';
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
const { width } = Dimensions.get("screen");

class Elements extends React.Component {
  state = {
    "switch-1": true,
    "switch-2": false
  };

  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });
    

  async OnLogout(){
    await AsyncStorage._storeData(config.USER_ID_STOREKEY, "");
    this.props.navigation.navigate('AuthLoading');
  }

  async OnContinues(){ 
    this.props.navigation.navigate('Home');
  }

  renderButtons = () => {
    return (
      <Block flex>
        <Text bold size={16} style={styles.title}>
          Bạn có chắc muốn đăng xuất?
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button color="default" style={styles.button} onPress = {()=>this.OnLogout()}>
              Đăng Xuất Ngay
            </Button>
          </Block>
          <Block center>
            <Button
              color="secondary"
              textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
              style={styles.button}
              onPress = {()=>this.OnContinues()}
            >
              Tiếp Tục Mua Sắm
            </Button>
          </Block>
         </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {this.renderButtons()}         
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});

export default Elements;