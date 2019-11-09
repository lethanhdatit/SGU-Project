import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Platform } from 'react-native';
import Button from "react-native-button";
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../config';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };
const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        // console.log(data, details);
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: config.GOOOGLE_PLACES_AUTOCOMPLETE,
        language: 'vi', // language of the results
        types: 'address' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}

      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

    />
  );
}

export default class Welcome extends Component {
  static navigationOptions = {
    title: "Chào mừng",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '1. Ba Đình, Hà Nội'
    }
  }

  onPressNext = async () => {
    this.props.navigation.navigate('App');
  };


  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.LocationContainer}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
          >
            <GooglePlacesInput/>
            {/* <TextInput
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
              mode='flat'
              error='true'
              style={{ width: "90%", backgroundColor: 'transparent' }}
            />

            <Ionicons name={Platform.OS === 'ios'
              ? `ios-pin`
              : 'md-pin'} size={35} /> */}

          </View>
          <Text style={{ color: 'red', marginTop: 5 }}>Rất tiếc! Khu vực của quý khách chưa được hổ trợ</Text>

        </View>
        <View style={styles.ControlContainer}>

          <Button
            containerStyle={styles.BtnContainer}
            style={styles.textWhite}
            onPress={() => this.onPressNext()}
          >
            Trải nghiệm ngay
        </Button>
        </View>
      </View >
    );
  }
}


// Styles for login page
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  BtnContainer: {
    backgroundColor: "#4267b2",
    padding: 10,
    width: "100%",
    borderRadius: 5
  },
  ControlContainer: {
    flex: 1,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    width: "100%",
  },
  LocationContainer: {
    flex: 2,
    width: "100%",
    marginTop: "50%"
  }
  ,
  textWhite: {
    color: '#fff'
  }
});
