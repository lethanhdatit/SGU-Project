import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import Button from "react-native-button";

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home",
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isButtonOneSelected: false,
      isButtonTwoSelected: false,
      isButtonThreeSelected: false,
      isButtonNextVisible: false
    }
  }


  onPressNext = () => {
    this.props.navigation.navigate('StepOne');
  };
  onPressDetailBtn = () => {
    this.props.navigation.navigate('Detail');
  };
  onPressBtn = (type) => {
    switch (type) {
      case 1: {
        //  this.props.navigation.navigate('StepOne');
        this.setState({ isButtonOneSelected: !this.state.isButtonOneSelected })
        break;
      }
      case 2: {
        //this.props.navigation.navigate('StepOne');
        this.setState({ isButtonTwoSelected: !this.state.isButtonTwoSelected })
        break;
      }
      case 3: {
        //this.props.navigation.navigate('StepOne');
        this.setState({ isButtonThreeSelected: !this.state.isButtonThreeSelected })
        break;
      }
    }


  };

  render() {
    return (
      <View style={styles.Container}>
        <View style={{ flex: 1, flexDirection: "row", marginHorizontal: 10 }}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={{ ...styles.ItemTextTitle, marginBottom: 10 }}>
              Yêu Cầu hiện tại
            </Text>
            <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
              Điện - Thay mới thiết bị
            </Text>
            <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
              Nước - Hỗ trợ tư vấn
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
              containerStyle={styles.BtnControlContainer}
              style={styles.textWhite}
              onPress={() => this.onPressDetailBtn()}
            >
              Chi tiết
            </Button>
          </View>
        </View>

        <View style={{ ...styles.ContentGroup, borderWidth: 0.5, borderTopColor: 'grey' }}>

          <View style={styles.CaptionContainer}>

            <Text style={styles.CaptionText}>BẠN CẦN GÌ?</Text>
          </View>
          <View style={styles.ButtonGroup}>
            <Button
              containerStyle={{ ...styles.BtnContainer, backgroundColor: this.state.isButtonOneSelected ? "grey" : "white" }}
              style={styles.textBlack}
              onPress={() => this.onPressBtn(1)}
            >
              Điện
            </Button>

            <Button
              containerStyle={{ ...styles.BtnContainer, backgroundColor: this.state.isButtonTwoSelected ? "grey" : "white" }}
              style={styles.textBlack}
              onPress={() => this.onPressBtn(2)}
            >
              Nước
            </Button>

            <Button
              containerStyle={{ ...styles.BtnContainer, backgroundColor: this.state.isButtonThreeSelected ? "grey" : "white" }}
              style={styles.textBlack}
              onPress={() => this.onPressBtn(3)}
            >
              Đồ gia dụng
            </Button>

          </View>
          {
            (
              this.state.isButtonOneSelected == true ||
              this.state.isButtonTwoSelected == true ||
              this.state.isButtonThreeSelected == true
            )
              ?
              (
                <View style={{ ...styles.ButtonGroup, marginTop: 20 }}>
                  <Button
                    containerStyle={{
                      ...styles.BtnControlContainer, width: 90,
                      height: 40,
                    }}
                    style={styles.textWhite}
                    onPress={() => this.onPressNext()}
                  >
                    Tiếp tục
                  </Button>
                </View>
              )
              :
              (<View></View>)
          }
        </View>


      </View>
    );
  }
}



const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ContentGroup: {
    flex: 3,
    paddingTop: 20
  },
  ButtonGroup: {
    marginTop: 5,
    justifyContent: 'center',
    flexDirection: "row"
  },
  CaptionContainer: {

  },
  CaptionText: {
    fontSize: 25,
    alignSelf: "center"
  },
  ItemTextTitle: {
    fontSize: 17,
    color: 'black',
    fontWeight: "bold"
  },
  InfoText: {
    fontSize: 16,
    color: 'rgba(96,100,109, 1)',
  },
  BtnContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: 64,
    height: 64,
    justifyContent: 'center',
    margin: 18
  },
  BtnControlContainer: {
    backgroundColor: "#4267b2",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 5
  },
  textWhite: {
    color: '#fff'
  },
  textBlack: {
    color: 'black'
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: 'grey',
    // marginTop: 120,
    marginBottom: 10
  },
  ModelButtonNext: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 5
  },
  ButtonGroupNext: {
    marginTop: 50,
    flexWrap: "wrap",
    flexDirection: "row",
  }
});

