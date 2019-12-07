import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, DeviceEventEmitter } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';
import * as API from "./Api";
import * as AsyncStorage from './AsyncStorage';
import config from "../config";

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('MyOrdersScreen', { tabId: '0' })}>
    <Icon
      family="ArgonExtra"
      size={20}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    {/* <Block middle style={styles.notify}>
      <Text style={{fontSize: 8, color: "white"}}>10</Text>
    </Block> */}
  </TouchableOpacity>
  // <Block />
);

const BasketButton = ({ isWhite, style, navigation, CountCart }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('ShoppingCart')}>
    <Icon
      family="font-awesome"
      size={22}
      name="shopping-cart"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify}>
      <Text style={{ fontSize: 9, color: "white" }}>{CountCart}</Text>
    </Block>
  </TouchableOpacity>
);

const SearchButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('ProductDetail')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CountCart: 0,
    }
    this._handleCountCart();
  }

  componentWillMount() {
    //add listener
    this.eventListener = DeviceEventEmitter.addListener('EventListener-CountCart', this._handleCountCart);
  }

  componentWillUnmount() {
    this.eventListener.remove();
  }

  _handleCountCart = async () => {
    var UID = await AsyncStorage._getData(config.USER_ID_STOREKEY);
    var res = await API._fetch(`${config.COUNT_CART_API_ENDPOINT}?userId=${Number(UID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ CountCart: res.Data.result });
      }
    }
  };

  handleLeftPress = (backCus, backHome) => {
    const { navigation } = this.props;
    return (backCus ? (backHome ? navigation.navigate('HomeScreen') : navigation.goBack()) : navigation.openDrawer());
  }

  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;

    if (title === 'Title') {
      return [
        <BellButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (routeName) {
      case 'HomeScreen':
        return ([
          <BellButton key='chat-home' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-home' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'Deals':
        return ([
          <BellButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' CountCart={this.state.CountCart} navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'ProductDetail':
        return ([
          <BellButton key='chat-profile' navigation={navigation} />,
          <BasketButton key='basket-deals' CountCart={this.state.CountCart} navigation={navigation} />
        ]);
      case 'ShoppingCart':
        return (
          <BellButton key='chat-profile' navigation={navigation} />
        );
      case 'Elements':
        return ([]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' CountCart={this.state.CountCart} navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }


  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        onChangeText={
          (text) => alert(text)
        }
        placeholderTextColor={'#8898AA'}
        // onFocus={() => navigation.navigate('ProductDetail')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('ProductDetail')}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('ProductDetail')}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;

    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const {backHome, backCus, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          hideLeft={false}
          title={title}
          style={navbarStyles}
          leftIconName={''}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{}}
          //onLeftPress={}
          left={
            <TouchableOpacity style={[backCus ? styles.button : null]} onPress={() => this.handleLeftPress(backCus, backHome)}>
              <Icon
                name={backCus ? 'chevron-left' : "menu-8"} family={backCus ? "evilicons" : "ArgonExtra"}
                size={backCus ? theme.SIZES.BASE * 2.4 : 14}                
                color={iconColor || argonTheme.COLORS.ICON} />
            </TouchableOpacity>
          }
          leftStyle={{ paddingVertical: backCus ? 0 : 12, flex: backCus ? 0 : 0.2 }}
          titleStyle={[
            {
              width: backCus ? "auto" : '100%',
              alignItems: backCus ? 'center' : 'stretch',
              alignSelf:  backCus ? 'center' : 'flex-start',
              fontSize: 16,
              fontWeight: 'bold'
            },
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: theme.SIZES.BASE / 1.5,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 3 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 1.4,
    width: theme.SIZES.BASE / 1.4,
    position: 'absolute',
    top: 9,
    right: 5,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);
