import { 
    REST_API_BASE_ENDPOINT
} from 'react-native-dotenv';

export default {   
    //PLUGIN CONFIGs 
    FACEBOOK_APP_ID: '737350376736261', //https://developers.facebook.com/apps/ thanhdat.it.mmo@gmail.com -> React Native Social Login
    GOOOGLE_PLACES_AUTOCOMPLETE: 'AIzaSyAjpRpRw66A8LwTDMmezxn2PZlF4iIj0ek', // https://console.cloud.google.com/apis/credentials  dattoo730@gmail.com -> Jikula

    //API ENDPOINTs
    LOGIN_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/account/login`,    
    //Add more...    

    //STORE KEYs
    USER_ID_STOREKEY: 'USER_ID_STOREKEY'
};