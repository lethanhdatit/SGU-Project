
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  Platform,
  Image
} from 'react-native';
import Button from "react-native-button";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import NumericInput from 'react-native-numeric-input'

export default class StepTwoScreen extends React.Component {
  static navigationOptions = {
    title: "Nước",
    headerBackTitle: null,
    headerRight: <Text style={{ fontWeight: "bold", marginRight: 10 }}>2/2</Text>,
  };

  constructor(props) {
    super(props);
    this.state = {
      SelectedRadioValue: ""
    }
  }

  onSelect(index, value) {
    this.setState({
      SelectedRadioValue: `Selected index: ${index} , value: ${value}`
    });
    alert(`value: ${value}`);
  }

  onPressBtn = () => {
    this.props.navigation.navigate('SignIn');
  };

  Content() {
    var payments = [];

    for (let i = 1; i < 10; i++) {
      payments.push(
        <View style={styles.ItemContainer} key={i}>
          <View style={{ flex: 2, padding: 5 }}>
            <View style={styles.SquareShapeView} >
              {(i % 2 == 0)
                ?
                (
                  <Image
                    style={styles.backgroundImage}
                    source={require('../assets/images/robot-dev.png')}
                    defaultSource={require('../assets/images/robot-dev.png')}
                  />
                )
                :
                (<View />)
              }
            </View>
          </View>
          <View style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: 'column',
          }}
          >
            <Text style={styles.ItemText}>Thiết bị {i}</Text>
          </View>
          <View style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          >
            <NumericInput onChange={value => console.log(value)} />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.ContentContainer}>
        {payments}
      </View>
    );
  }

  Header() {
    return (
      <View style={styles.tabBarInfoTopContainer}>
        <RadioGroup
          onSelect={(index, value) => this.onSelect(index, value)}
          style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}
          selectedIndex={2}
        >
          <RadioButton style={{ width: 150 }} color='green' value={'item1'} >
            <Text>Thay mới thiết bị</Text>
          </RadioButton>

          <RadioButton style={{ width: 150 }} color='green' value={'item2'}>
            <Text>Lắp đặt thiết bị</Text>
          </RadioButton>

          <RadioButton style={{ width: 150 }} color='green' value={'item3'}>
            <Text>Kiểm tra</Text>
          </RadioButton>

          <RadioButton style={{ width: 150 }} color='green' value={'item3'}>
            <Text>Hỗ trợ tư vấn</Text>
          </RadioButton>
        </RadioGroup>
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
          stickySectionHeadersEnabled={true}
          renderSectionHeader={() => this.Header()}
        />

        <View style={styles.tabBarInfoBottomContainer}>
          <Text style={styles.tabBarInfoText}>
            Tạm tính: 0 VND
          </Text>
          <View style={[styles.navigationFilename]}>
            <Button
              containerStyle={styles.BtnContainer}
              style={styles.textWhite}
              onPress={() => this.onPressBtn()}
            >
              Tiếp tục
            </Button>
          </View>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ItemText: {
    fontSize: 18
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
  backgroundImage: {
    flex: 1,
    width: 64,
    height: 64,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    width: 100,
    height: 45,
    justifyContent: "center",
    borderRadius: 5
  },
  textWhite: {
    color: '#fff'
  },
  tabBarInfoTopContainer: {
    backgroundColor: '#fbfbfb',
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
  tabBarInfoBottomContainer: {
    flexDirection: "row",
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
  tabBarInfoContentContainer: {
    height: 100,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  tabBarInfoText: {
    flex: 2,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    alignSelf: 'flex-start',
    marginVertical: 13
  },
  navigationFilename: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 5,
  },
  ContentContainer: {
    backgroundColor: 'grey',
  },
  ItemContainer: {
    backgroundColor: 'white',
    marginVertical: 1,
    paddingHorizontal: 10,
    flexDirection: "row"
  }
});
