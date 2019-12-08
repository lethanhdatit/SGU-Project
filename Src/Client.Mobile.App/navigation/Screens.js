import React from "react";
import { Easing, Animated, Text } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import ProductDetail from "../screens/ProductDetail";
import ShoppingCart from "../screens/ShoppingCart";
import Checkout from "../screens/Checkout";
import Profile from "../screens/Profile";
import Elements from "../screens/Elements";
import MyOrders from "../screens/Elements-copy";
import OrderDetail from "../screens/OrderDetail";
// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";
import { tabs } from "../constants";
// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const MyOrdersStack = createStackNavigator({
  MyOrdersScreen: {
    screen: MyOrders,
    navigationOptions: ({ navigation }) => ({
      header: <Header tabIndex={'0'} tabs={[
        { id: '0', title: 'Tất Cả' },
        { id: 1, title: 'Đang Xử Lý' },
        { id: 2, title: 'Chờ Vận Chuyển' },
        { id: 4, title: 'Đã Hoàn Tất' },
        { id: 8, title: 'Đã Hủy' },
      ]}
        backCus backHome title="Đơn Hàng Của Tôi" navigation={navigation} />,
        headerTransparent: true
    })
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: ({ navigation }) => ({
      header: <Header backCus title="Chi Tiết Đơn Hàng" navigation={navigation} />,
      headerTransparent: true
    })
  },
  // Home: {
  //   screen: Home,
  //   navigationOptions: ({ navigation }) => ({
  //     header: <Header title="Mua Sắm" navigation={navigation} />
  //   })
  // }
}, {
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Đăng Xuất" navigation={navigation} />
    })
  }
}, {
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Cá Nhân" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Mua Sắm" navigation={navigation} />
      })
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: ({ navigation }) => ({
        header: <Header backCus title="Chi Tiết" navigation={navigation} />,
        headerTransparent: true
      })
    },
    ShoppingCart: {
      screen: ShoppingCart,
      navigationOptions: ({ navigation }) => ({
        header: <Header backCus title="Giỏ Hàng" navigation={navigation} />,
        headerTransparent: true
      })
    },
    Checkout: {
      screen: Checkout,
      navigationOptions: ({ navigation }) => ({
        header: <Header backCus title="Thanh Toán" navigation={navigation} />,
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "transparent"
    },
    transitionConfig,
    initialRouteName: 'HomeScreen'
  }
);
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    // Onboarding: {
    //   screen: Onboarding,
    //   navigationOptions: {
    //     drawerLabel: () => {}
    //   }
    // },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Mua Sắm" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Cá Nhân" />
        )
      })
    },
    MyOrders: {
      screen: MyOrdersStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="MyOrders" title="Đơn Hàng" />
        )
      })
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Articles" title="Đăng Xuất" />
        )
      })
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
