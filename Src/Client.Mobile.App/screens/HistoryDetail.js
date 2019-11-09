import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  SafeAreaView,
} from 'react-native';
import Button from "react-native-button";
import Modal from "react-native-modal";
import { NavigationActions, StackActions } from 'react-navigation';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default class HistoryDetail extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Chi Tiết",
    headerBackTitle: null,
    headerLeft: () => <Ionicons style={{ marginLeft: 10, color: "blue" }} name={
      Platform.OS === 'ios'
        ? `ios-arrow-back`
        : 'md-arrow-back'
    }
      size={35} onPress={() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        navigation.dispatch(resetAction);
        navigation.navigate('Management');
      }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      NameText: 'Nguyễn Văn A',
      PhoneText: '0123456789',
      AddressText: '10 Đinh Bộ Lĩnh, Phường 24, Quận Bình Thạnh, HCM'
    };
  }


  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onNext = () => {
    this.toggleModal();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Management');
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Quý khách muốn hủy yêu cầu này?</Text>
      <View style={styles.ButtonGroup}>
        <TouchableOpacity onPress={this.toggleModal}>
          <View style={{ ...styles.ModelButtonCancel, borderRadius: 5 }}>
            <Text style={styles.textGreen}>Không</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onNext}>
          <View style={{ ...styles.ModelButtonNext, borderRadius: 5 }}>
            <Text style={styles.textWhite}>Đồng ý</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );


  Content() {

    return (
      <View style={styles.ContentContainer}>
        <View style={{ ...styles.ItemAreaContent, flex: 2 }}>
          <View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}>
              <View>
                <Text style={{ ...styles.ItemText }}>Mã: [] </Text>
              </View>
              <View>
                <Text style={{ ...styles.ItemText }}>Ngày: []</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}>
              <View>
                <Text style={{ ...styles.ItemText }}>Trạng thái: [] </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}>
              <View>
                <Text style={{ ...styles.ItemText }}>Nguyễn Văn A </Text>
              </View>
              <View>
                <Text style={{ ...styles.ItemText }}>0981234567</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}>
              <View>
                <Text style={{ ...styles.ItemText }}>10 Đinh Bộ Lĩnh, Phường 24, Quận Bình Thạnh, HCM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ ...styles.ItemAreaContent, flex: 1, padding: 10 }}>
          <Text style={{ ...styles.ItemTextTitle, marginBottom: 20 }}>Thông Tin Thêm</Text>
          <Text style={{ ...styles.ItemText, marginBottom: 10 }}>
            Ngày giờ hẹn: 20/10/19 17h30
          </Text>
          <Text style={{ ...styles.ItemText, marginBottom: 10 }}>
            Ghi chú: gọi điện trước 30p
          </Text>
        </View>
        <View style={{ ...styles.ItemAreaContent, flex: 3, paddingHorizontal: 0, }}>
          <View style={{ padding: 10 }}>
            <Text style={{ ...styles.ItemTextTitle, marginBottom: 15 }}>Yêu Cầu</Text>
            <Text style={{ marginBottom: 10 }}>[Yêu cầu 1]</Text>
            <Text style={{ marginBottom: 10 }}>[Yêu cầu 2]</Text>
            <Text style={{ marginBottom: 10 }}>Hình thức thanh toán: Tiền mặt khi hoàn tất</Text>
          </View>
        </View>
      </View>
    );
  }



  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={[{ title: 'temp', data: ['temp'] }]}
          keyExtractor={(item, index) => item + index}
          renderItem={() => this.Content()}
        />

        <View style={styles.tabBarInfoBottomContainer}>
          <View style={styles.TextContainer}>
            <View style={{ flex: 1, alignItems: "flex-start", justifyContent: 'center', }}>
              <Text style={styles.ItemTextBody}>Tạm tính:</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'center', }}>
              <Text style={styles.ItemTextBody}>[]</Text>
            </View>
          </View>

          <View style={styles.ButtonContainer}>
           
          </View>
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn={'slideInLeft'}
          animationOut={'slideOutRight'}
        >
          {this._renderModalContent()}
        </Modal>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    width: "100%",
    height: 45,
    justifyContent: "center",
    borderRadius: 5
  },
  ContentContainer: {
    backgroundColor: 'lightgrey',
    paddingTop: 10,
    flexDirection: "column"
  },
  ItemAreaContent: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  SquareShapeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 64,
    height: 64,
    backgroundColor: '#00BCD4'
  },
  ItemTextBody: {
    fontSize: 18
  },
  ItemText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  },
  ItemContainer: {
    backgroundColor: 'white',
    marginVertical: 1,
    paddingHorizontal: 10,
    flexDirection: "row"
  },
  ItemTextTitle: {
    fontSize: 17,
    color: 'black',
    fontWeight: "bold"
  },
  textWhite: {
    color: '#fff'
  },
  tabBarInfoBottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    backgroundColor: '#fbfbfb',
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  TextContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10
  },
  ButtonContainer: {
    alignItems: "center",
    width: "100%",
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
    backgroundColor: 'green',
    padding: 12,
    marginLeft: 20,
    left: 0,
    borderRadius: 5
  },
  ModelButtonCancel: {
    backgroundColor: "lightgrey",
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
