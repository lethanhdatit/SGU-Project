import { 
    REST_API_BASE_ENDPOINT
} from 'react-native-dotenv';

export default {   
    //PLUGIN CONFIGs 
    FACEBOOK_APP_ID: '737350376736261', //https://developers.facebook.com/apps/ thanhdat.it.mmo@gmail.com -> React Native Social Login
    GOOGLE_PLACES_AUTOCOMPLETE: 'AIzaSyAjpRpRw66A8LwTDMmezxn2PZlF4iIj0ek', // https://console.cloud.google.com/apis/credentials  dattoo730@gmail.com -> Jikula

    //API ENDPOINTs
    LOGIN_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/account/login/`,
    REGISTER_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/account/register/`,    
    CHECK_LOGIN_STATUS_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/account/checksigninstatus/`,
    SEARCH_PRODUCTS_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/sale/searchitems/`,
    GET_ACTIVE_PRODUCT_TYPE: `${REST_API_BASE_ENDPOINT}api/sale/getproducttypes/`,
    GET_ALL_ACTIVE_ITEM_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/sale/getavailableitems/`,
    GET_CART_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/sale/getusercart/`,
    PLACE_ORDER_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/sale/placeorder/`,
    UPDATE_CART_API_ENDPOINT: `${REST_API_BASE_ENDPOINT}api/sale/updateusercart/`,    
    

    //STORE KEYs
    USER_ID_STOREKEY: 'USER_ID_STOREKEY',

    //CONSTANT
    MIN_ITEM_QUANTITY: 0,
    MAX_ITEM_QUANTITY: 100,

    // "//Todo default IdUser"
};