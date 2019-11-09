import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Button from "react-native-button";

export default class ManagementScreen extends Component {
  static navigationOptions = {
    title: "Management"
  };

  constructor(props) {
    super(props);
  }

  onPressDetailBtn = () => {
    this.props.navigation.navigate('Detail');
  };

  OnHistoryDetail = () => {
    this.props.navigation.navigate('HistoryDetail');
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
        <View style={styles.CaptionContainer}>
          <Text style={styles.CaptionText}>Lịch Sử</Text>
        </View>
        <View style={{ ...styles.ContentGroup }}>
          <ScrollView>

            <TouchableOpacity onPress={this.OnHistoryDetail}>
              <View style={styles.HictoryItem}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Ngày: 20/10/19 17h30
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Điện - Thay mới thiết bị
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10, color: "green" }}>
                    Hoàn tất
                </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                  <Ionicons name={Platform.OS === 'ios'
                    ? `ios-done-all`
                    : 'md-done-all'} size={35} color={"green"} />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.OnHistoryDetail}>
              <View style={styles.HictoryItem}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Ngày: 19/07/19 15h30
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Điện - Thay mới thiết bị
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10, color: "red" }}>
                    Đã hủy
                </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "flex-end" }}>
                  <Ionicons name={Platform.OS === 'ios'
                    ? `ios-close`
                    : 'md-close'} size={35} color={"red"} />
                </View>
              </View>
            </TouchableOpacity>



            <TouchableOpacity onPress={this.OnHistoryDetail}>
              <View style={styles.HictoryItem}>
                <View style={{ flex: 2, justifyContent: 'center' }}>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Ngày: 15/05/19 12h30
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10 }}>
                    Nước - Kiểm tra
                </Text>
                  <Text style={{ ...styles.InfoText, marginBottom: 10, color: "green" }}>
                    Hoàn tất
                </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "flex-end" }}>
                  <Ionicons name={Platform.OS === 'ios'
                    ? `ios-done-all`
                    : 'md-done-all'} size={35} color={"green"} />
                </View>
              </View>
            </TouchableOpacity>


          </ScrollView>
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
    borderWidth: 2,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    paddingVertical: 20
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
  HictoryItem: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.5,
    borderBottomColor: 'grey',
    borderTopColor: "white",
    padding: 10,
    justifyContent: "space-between"
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

