import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home';
import ManagementScreen from '../screens/Management';
import NotificationScreen from '../screens/Notification';
import ProfileScreen from '../screens/Profile';

import StepOneScreen from '../screens/StepOneScreen';
import StepTwoScreen from '../screens/StepTwoScreen';
import StepThreeScreen from '../screens/StepThreeScreen';
import DetailsScreen from '../screens/Details';
import HistoryDetailScreen from '../screens/HistoryDetail';

import InfoScreen from '../screens/Info';
import Login from '../screens/Login';
import Term from '../screens/Term';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    StepOne: StepOneScreen,
    StepTwo: StepTwoScreen,
    SignIn: Login,
    Info: InfoScreen,
    Term: Term,
    StepThree: StepThreeScreen,    
    Detail: DetailsScreen,
    HistoryDetail: HistoryDetailScreen
  },
  config
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    return {
      tabBarVisible: false
    };
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home`
            : 'md-home'
        }
      />
    ),
  };

};

HomeStack.path = '';

const ManagementStack = createStackNavigator(
  {
    Management: ManagementScreen,
  },
  config
);

ManagementStack.navigationOptions = {
  tabBarLabel: 'Management',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ManagementStack.path = '';

const NotificationStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  config
);

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-notifications${focused ? '' : '-outline'}`
        : 'md-notifications'
    } />
  ),
};

NotificationStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios'
        ? `ios-information-circle${focused ? '' : '-outline'}`
        : 'md-information-circle'
    } />
  ),
};

NotificationStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ManagementStack,
  NotificationStack,
  ProfileStack
});

tabNavigator.path = '';

export default tabNavigator;
