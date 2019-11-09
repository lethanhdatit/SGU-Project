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

export default class StepThreeScreen extends React.Component {
  static navigationOptions = {
    title: "Xác Nhận",
    headerBackTitle: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      NameText: 'Nguyễn Văn A',
      PhoneText: '0123456789',
      AddressText: '10 Đinh Bộ Lĩnh, Phường 24, Quận Bình Thạnh, HCM',
      Schedule: '',
      Note: ''
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  onBackToHome = () => {
    this.toggleModal();
    this.props.navigation.navigate('Home');   
  }

  onNext = () => {
    this.toggleModal();
    this.props.navigation.navigate('Detail');   
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>Cảm ơn quý khách. Yêu cầu đang được xử lý</Text>
      <View style={styles.ButtonGroup}>
        <TouchableOpacity onPress={this.onBackToHome}>
          <View style={{ ...styles.ModelButtonCancel, borderRadius: 5 }}>
            <Text style={styles.textGreen}>Trang chủ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onNext}>
          <View style={{ ...styles.ModelButtonNext, borderRadius: 5 }}>
            <Text style={styles.textWhite}>Xem yêu cầu</Text>
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
            <RadioGroup
              // onSelect={(index, value) => this.onSelect(index, value)}
              selectedIndex={0}
              style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginVertical: 10 }}
            >
              <RadioButton style={{ width: 150 }} color='green' value={'item1'} >
                <Text>Thông tin mặc định</Text>
              </RadioButton>
              <RadioButton style={{ width: 150 }} color='green' value={'item2'}>
                <Text>Thông tin khác</Text>
              </RadioButton>
            </RadioGroup>
            <TextInput
              //label='Name'
              value={this.state.NameText}
              onChangeText={NameText => this.setState({ NameText })}
              mode='flat'
              style={{ marginBottom: 5, backgroundColor: 'transparent' }}
            />
            <TextInput
              //label='Phone'
              value={this.state.PhoneText}
              onChangeText={PhoneText => this.setState({ PhoneText })}
              mode='flat'
              style={{ marginBottom: 5, backgroundColor: 'transparent' }}
            />
            <TextInput
              //label='Address'
              value={this.state.AddressText}
              onChangeText={AddressText => this.setState({ AddressText })}
              mode='flat'
              style={{ marginBottom: 5, backgroundColor: 'transparent' }}
            />
          </View>
        </View>
        <View style={{ ...styles.ItemAreaContent, flex: 1, padding: 10 }}>
          <Text style={styles.ItemTextTitle}>Thông Tin Thêm</Text>
          <View style={{ 
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%" 
            }}>
          <TextInput
            label='Ngày giờ hẹn'
            onChangeText={Schedule => this.setState({ Schedule })}
            mode='flat'
            style={{ marginBottom: 5, backgroundColor: 'transparent', width: "95%" }}
          />
           <Ionicons name={ Platform.OS === 'ios'
            ? `ios-calendar`
            : 'md-calendar'}  size={25}  />
          </View>
          <TextInput
            label='Ghi chú'
            onChangeText={Note => this.setState({ Note })}
            mode='flat'
            style={{ marginBottom: 5, backgroundColor: 'transparent', width: "95%"  }}
          />
        </View>
        <View style={{ ...styles.ItemAreaContent, flex: 3, paddingHorizontal: 0, }}>
          <View style={{ padding: 10 }}>
            <Text style={{ ...styles.ItemTextTitle, marginBottom: 10 }}>Yêu Cầu</Text>
            <Text style={{ marginBottom: 5 }}>Điện - Thay mới thiết bị</Text>
            <Text style={{ marginBottom: 5 }}>Nước - Hỗ trợ tư vấn</Text>
            <Text style={{ marginBottom: 5 }}>Hình thức thanh toán: Tiền mặt khi hoàn tất</Text>
          </View>
          <View style={{ backgroundColor: "grey" }}>
            <View style={styles.ItemContainer}>
              <View style={{ flex: 2, padding: 5 }}>
                <View style={styles.SquareShapeView} >
                </View>
              </View>
              <View style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: 'column',
              }}
              >
                <Text style={styles.ItemText}>Thiết bị 1</Text>
              </View>
              <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              >
                <Text style={styles.ItemText}>10.000VND x 2</Text>
              </View>
            </View>
            <View style={styles.ItemContainer}>
              <View style={{ flex: 2, padding: 5 }}>
                <View style={styles.SquareShapeView} >
                </View>
              </View>
              <View style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: 'column',
              }}
              >
                <Text style={styles.ItemText}>Thiết bị 2</Text>
              </View>
              <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
              >
                <Text style={styles.ItemText}>150.000VND x 1</Text>
              </View>
            </View>
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
              <Text style={styles.ItemTextBody}>170.000 VND</Text>
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <Button
              containerStyle={styles.BtnContainer}
              style={styles.textWhite}
              onPress={() => this.toggleModal()}
            >
              Gửi yêu cầu
            </Button>
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
