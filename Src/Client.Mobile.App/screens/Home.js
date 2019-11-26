import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";

const { width } = Dimensions.get('screen');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Products: [],
      SearchTerm: "",
      ProductTypeId: null,
      OriginID: null,
      TrademarkID: null
    }
  }

  componentWillMount() {
    var searchOptions = {
      SearchTerm: this.state.SearchTerm,
      ProductTypeId: this.state.ProductTypeId,
      OriginID: this.state.OriginID,
      TrademarkID: this.state.TrademarkID,
    };
    this._OnSearchProducts(searchOptions);
  }

  _OnSearchProducts = async (searchOptions) => {
    var res = await API._fetch(`${config.SEARCH_PRODUCTS_API_ENDPOINT}`, 'POST', searchOptions);
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        var temp = [];
        // console.log("res.Data.result: " + JSON.stringify(res.Data.result));
        res.Data.result.map((data, i) => {
          //console.log("data: " + JSON.stringify(data));
          temp.push({
            title: data.ProductName,
            image: data.ProductImage,
            cta: data.ProductPrice
          });
        });
        //console.log("temp: " + JSON.stringify(temp));
        this.setState({ Products: temp })
      }
    }
  };


  renderArticles = () => {
    var _Items = [];
    var pageSize = 3;
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
          if(j == index + pageSize - 1){            
            _Temp.push(
              <Card key={j} item={this.state.Products[j]} />
            );
          }else{
            _Temp.push(
              <Card key={j} item={this.state.Products[j]} style={{ marginRight: theme.SIZES.BASE }} />
            );
          }          
        }
        _Items.push(
          <Block key={i} flex row>
            {
              _Temp
            }
          </Block>
        );
        _Temp = null;
        index=index+pageSize;
      }

      var _Temp = [];
      for (let i = length - du ; i < length; i++) {
        if(i == length - 1){
          _Temp.push(
            <Card key={i} item={this.state.Products[i]} />
          );
        }else{
          _Temp.push(
            <Card key={i} item={this.state.Products[i]} style={{ marginRight: theme.SIZES.BASE }} />
          );
        }       
      }
      _Items.push(
        <Block key={nguyen + 1} flex row>
          {
            _Temp
          }
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
          {
            _Items
          }
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
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
});

export default Home;
