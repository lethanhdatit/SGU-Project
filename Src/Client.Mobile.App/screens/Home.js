import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Block, theme, Button, Text } from 'galio-framework';
import Icon from '../components/Icon';
import Input from '../components/Input';
import { Card } from '../components';
import articles from '../constants/articles';
import argonTheme from '../constants/Theme';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
import { MaterialIndicator } from 'react-native-indicators';
const { width } = Dimensions.get('screen');
const cardWidth = width - theme.SIZES.BASE * 2;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      ProductTypes: [],
      SearchTerm: "",
      ProductTypeId: null,
      OriginID: null,
      TrademarkID: null,
      PageSizeRight: 2,
      IsLoading: false,
      pageSize: 10, // số lượng item mỗi lần lấy thêm khi bấm vào nút xem thêm (10 item)
      pageCurrent: 1,
      maxCount: -1,
      isShowLoadMore: true,
    }
  }

  componentWillMount() {
    this._OnFetchProductTypes();
    this._onRequestSearch();
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._OnFetchProductTypes();
      this._onRequestSearch();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  async loadItemViewMore() {
    if (this.state.IsLoading == false) {   
      await this.setState({ IsLoading: true });
      console.log(this.state.maxCount);
      if (this.state.Products.length < this.state.maxCount) {
        await this.setState({ pageCurrent: this.state.pageCurrent + 1 });
        await this._onRequestSearch(this.state.pageCurrent);
      }
      else {
        await this.setState({ isShowLoadMore: false });
      }
    }
    await this.setState({ IsLoading: false });
  }

  _onRequestSearch(pageCurrent = 1, pageSize = this.state.pageSize) {
    var searchOptions = {
      SearchTerm: this.state.SearchTerm,
      ProductTypeId: this.state.ProductTypeId,
      OriginID: this.state.OriginID,
      TrademarkID: this.state.TrademarkID,
      pageSize: pageSize,
      pageCurrent: pageCurrent,
    };
    this._OnSearchProducts(searchOptions);
  }

  _OnSearchProducts = async (searchOptions) => {
    //console.log(JSON.stringify(searchOptions));
    this.setState({ IsLoading: true });
    var res = await API._fetch(`${config.SEARCH_PRODUCTS_API_ENDPOINT}`, 'POST', searchOptions);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var temp = [];
        res.Data.result.map((data, i) => {
          //console.log("ProductImage: " + data.ProductImage);
          temp.push({
            productId: data.ProductID,
            title: data.ProductName,
            image: data.ProductImage,
            cta: data.ProductPrice
          });
        });
        var _products = searchOptions.pageCurrent == 1 ? temp : this.state.Products.concat(temp);
        var isShowLoadMore = _products.length < res.Data.maxCount;
        this.setState({ Products: _products, maxCount: res.Data.maxCount, isShowLoadMore: isShowLoadMore })
      }
    }
    this.setState({ IsLoading: false });
  };

  _OnFetchProductTypes = async () => {
    var res = await API._fetch(`${config.GET_ACTIVE_PRODUCT_TYPE}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var temp = [];
        res.Data.result.map((data, i) => {
          temp.push({ ...data, IsSelected: false });
        });
        this.setState({ ProductTypes: temp })
      }
    }
  };

  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  renderProducts = () => {
    var _Items = [];
    var pageSize = this.state.PageSizeRight;
    var length = this.state.Products.length;
    if (length != 0) {
      var du = length % pageSize;
      var nguyen = Math.floor((length / pageSize));
      // console.log("nguyen: " + nguyen);
      // console.log("du: " + du);
      var index = 0;
      for (let i = 0; i < nguyen; i++) {
        var _Temp = [];
        for (let j = index; j < index + pageSize; j++) {
          _Temp.push(
            <Card navigation={this.props.navigation} key={j} item={this.state.Products[j]} style={{ marginRight: (j == index + pageSize - 1) ? (0) : (theme.SIZES.BASE) }} />
          );
        }
        _Items.push(
          <Block key={i} flex row>
            {_Temp}
          </Block>
        );
        index = index + pageSize;
      }

      var _Temp = [];
      for (let i = length - du; i < length; i++) {
        _Temp.push(
          <Card navigation={this.props.navigation} key={i} item={this.state.Products[i]} style={{ marginRight: (i == length - 1) ? (0) : (theme.SIZES.BASE) }} />
        );
      }
      _Items.push(
        <Block key={nguyen + 1} flex row>
          {_Temp}
        </Block>
      );
    }
    var itemsIsEmpty = this.IsEmpty(_Items);
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {/* <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full /> */}
          {
            (itemsIsEmpty) ?
              (
                <Block middle center style={{
                  backgroundColor: '#F4F5F7',
                  padding: 10,
                  borderRadius: 4,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  height: "100%",
                  width: "100%",
                }}>
                  <Icon
                    name={'close'}
                    family="font-awesome"
                    // style={{ paddingRight: 8 }}
                    size={30}
                    color={argonTheme.COLORS.ICON}
                  />
                  <Text bold size={15} color="#32325D">Không có sản phẩm nào!</Text>
                </Block>
              )
              :
              (
                _Items
              )
          }
        </Block>
        <Block>
          {
            this.state.isShowLoadMore &&
            (
              <TouchableOpacity
                style={{
                  marginTop: 5,
                  height: 40,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
                activeOpacity={.7}
                onPress={this.loadItemViewMore.bind(this)}>
                <Text
                  style={{color: '#22a9e3'}}>Xem thêm</Text>
              </TouchableOpacity>
            )
          }
        </Block>
      </ScrollView>
    )
  }



  renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Bạn cần tìm gì?"
        onChangeText={
          (text) => this.setState({ SearchTerm: text })
        }
        placeholderTextColor={'#8898AA'}
        onSubmitEditing={() => this._onRequestSearch()}
        iconContent={<Icon size={16} onPress={() => this._onRequestSearch()} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }

  UpdateSelectProductType(typeID, pageCurrent = 1, pageSize = this.state.pageSize) {
    this.state.pageCurrent = -1;
    if (this.state.ProductTypeId != typeID) {
      var searchOptions = {
        SearchTerm: this.state.SearchTerm,
        ProductTypeId: typeID,
        OriginID: this.state.OriginID,
        TrademarkID: this.state.TrademarkID,
        pageSize: pageSize,
        pageCurrent: pageCurrent,
      };
      this._OnSearchProducts(searchOptions);
      this.setState({ ProductTypeId: typeID });
    } else {
      var searchOptions = {
        SearchTerm: this.state.SearchTerm,
        ProductTypeId: null,
        OriginID: this.state.OriginID,
        TrademarkID: this.state.TrademarkID,
        pageSize: pageSize,
        pageCurrent: pageCurrent,
      };
      this._OnSearchProducts(searchOptions);
      this.setState({ ProductTypeId: null });
    }

  }

  renderOptions = () => {
    var _Items = [];
    this.state.ProductTypes.map((data, i) => {
      _Items.push(
        <Button
          key={data.TypeID}
          shadowColor={"red"}
          shadowless={(this.state.ProductTypeId == data.TypeID) ? (false) : (true)} style={[styles.tab, styles.divider]}
          onPress={() => this.UpdateSelectProductType(data.TypeID)}
        >
          <Block row middle>
            <Icon name={data.MobileIcon} family="font-awesome" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{data.TypeName}</Text>
          </Block>
        </Button>
      );
    });
    return (
      <Block row style={styles.options}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
          contentContainerStyle={{
            //paddingHorizontal: theme.SIZES.BASE / 2
          }}
        >
          {_Items}
        </ScrollView>
      </Block>
    );
  }



  render() {
    return (
      <Block flex center style={styles.home}>
        {this.state.IsLoading ?
          <Block style={{
            width: '90%',
            height: '90%',
            position: 'absolute',
            borderRadius: 5,
            zIndex: 5,
          }}>
            <MaterialIndicator size={40} trackWidth={3} color={"#C0C0C0"} />
          </Block>
          : <Block></Block>
        }
        {this.renderSearch()}
        {this.renderOptions()}
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 38,
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

export default Home;
