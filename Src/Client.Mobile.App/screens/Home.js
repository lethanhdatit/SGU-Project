import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Button, Text } from 'galio-framework';
import Icon from '../components/Icon';
import Input from '../components/Input';
import { Card } from '../components';
import articles from '../constants/articles';
import argonTheme from '../constants/Theme';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";

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
      PageSize: 2
    }
  }

  componentWillMount() {
    this._OnFetchProductTypes();
    this._onRequestSearch();    
  }

  _onRequestSearch() {
    var searchOptions = {
      SearchTerm: this.state.SearchTerm,
      ProductTypeId: this.state.ProductTypeId,
      OriginID: this.state.OriginID,
      TrademarkID: this.state.TrademarkID,
    };
    this._OnSearchProducts(searchOptions);
  }

  _OnSearchProducts = async (searchOptions) => {
    console.log(JSON.stringify(searchOptions));
    var res = await API._fetch(`${config.SEARCH_PRODUCTS_API_ENDPOINT}`, 'POST', searchOptions);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var temp = [];
        res.Data.result.map((data, i) => {    
          console.log("ProductImage: " + data.ProductImage);      
          temp.push({
            title: data.ProductName,
            image: data.ProductImage,
            cta: data.ProductPrice
          });
        });       
        this.setState({ Products: temp })
      }
    }
  };

  _OnFetchProductTypes = async () => {
    var res = await API._fetch(`${config.GET_ACTIVE_PRODUCT_TYPE}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var temp = [];       
        res.Data.result.map((data, i) => {         
          temp.push({...data, IsSelected: false});
        });        
        this.setState({ ProductTypes: temp })
      }
    }    
  };


  renderProducts = () => {
    var _Items = [];
    var pageSize = this.state.PageSize;
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

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {/* <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full /> */}
          {_Items}
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

  UpdateSelectProductType(typeID) {   
    if(this.state.ProductTypeId != typeID){
      var searchOptions = {
        SearchTerm: this.state.SearchTerm,
        ProductTypeId: typeID,
        OriginID: this.state.OriginID,
        TrademarkID: this.state.TrademarkID,
      };
      this._OnSearchProducts(searchOptions);
      this.setState({ProductTypeId: typeID});
    }else{
      var searchOptions = {
        SearchTerm: this.state.SearchTerm,
        ProductTypeId: null,
        OriginID: this.state.OriginID,
        TrademarkID: this.state.TrademarkID,
      };
      this._OnSearchProducts(searchOptions);
      this.setState({ProductTypeId: null});
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
