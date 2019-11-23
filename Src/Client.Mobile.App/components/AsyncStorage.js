import {
  AsyncStorage
} from "react-native";

export const _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

export const _getData = async (key) => {
    return await AsyncStorage.getItem(key);
}