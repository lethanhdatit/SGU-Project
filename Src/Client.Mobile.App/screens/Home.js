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
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {/* <Card item={articles[0]} horizontal  /> */}
          <Block flex row>
            {
              this.state.Products.map((data, i) => {
                console.log("data: " + JSON.stringify(data));
                <Card item={data} style={{ marginRight: theme.SIZES.BASE }} />
              })
            } 
          </Block>
          {/* <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block> */}
          {/* <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full /> */}
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
