import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card, Button, Header, Icon } from "../components/";
import * as API from "../components/Api";
import * as AsyncStorage from '../components/AsyncStorage';
import config from "../config";
const { width } = Dimensions.get("screen");
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;



export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductDetails: [],
    }
  }


  componentWillMount() {
    this._onFetchDetails();
  }

  _onFetchDetails = async () => {
    var ProductID = this.props.navigation.getParam('productId', '0');
    var res = await API._fetch(`${config.GET_ACTIVE_DETAILS_ITEM_API_ENDPOINT}?ProductID=${Number(ProductID)}`, 'GET');
    if (res != null && res.Data != null) {
      if (res.Data.code == 200) {
        this.setState({ ProductDetails: res.Data.result })
      }
    }
  }


  IsEmpty(obj) {
    for (var key in obj) {
      return false; // not empty
    }

    return true; // empty
  }

  renderCards = () => {
    var Images = [];
    if (this.IsEmpty(this.state.ProductDetails) == false) {
      this.state.ProductDetails.VariantImages.map((data, i) => {
        Images.push(
          <Block key={i} center style={styles.productItem}>
            <Image
              resizeMode="cover"
              style={styles.productImage}
              source={{ uri: data }}
            />
          </Block>
        );
      });
    }

    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={true}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {
                Images
              }

            </ScrollView>

            <Block flex style={{ marginHorizontal: theme.SIZES.BASE }}>
              <Block style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  {this.state.ProductDetails.ProductName}
                </Text>
                <Text size={16} color="red" style={{ marginTop: 10 }}>
                  {this.state.ProductDetails.ProductPrice} đ
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block>
                <Block row>
                  <Block left flex>
                    <Text bold size={16} style={{ ...styles.titleCustom }}>
                      Phân loại:
                  </Text>
                  </Block>
                  <Block right flex>
                    <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                      {this.state.ProductDetails.ProductTypeName}
                    </Text>
                  </Block>
                </Block>

                <Block row>
                  <Block left flex>
                    <Text bold size={16} style={{ ...styles.titleCustom }}>
                      Thương hiệu:
                  </Text>
                  </Block>
                  <Block right flex>
                    <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                      {this.state.ProductDetails.TrademarkName}
                    </Text>
                  </Block>
                </Block>

                <Block row>
                  <Block left flex>
                    <Text bold size={16} style={{ ...styles.titleCustom }}>
                      Xuất xứ:
                  </Text>
                  </Block>
                  <Block right flex>
                    <Text size={16} style={{ color: "#525F7F", marginVertical: 5 }}>
                      {this.state.ProductDetails.OriginName}
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Text bold size={16} style={{ ...styles.titleCustom, marginBottom: 15 }}>
                Mô tả:
              </Text>
              <Text
                size={16}
                color="#525F7F"
                style={{ textAlign: "justify" }}
              >
                {this.state.ProductDetails.ProductInfomation}
              </Text>
              <Block middle style={{ marginTop: 16, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
            </Block>
          </Block>
        </Block>

      </Block>
    );
  };

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block
        flex
        style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}
      >
        <Text bold size={16} style={styles.title}>
          Sản phẩm liên quan:
        </Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate("Home")}
            >
              View All
            </Text>
          </Block>
          <Block
            row
            space="between"
            style={{ marginTop: theme.SIZES.BASE, flexWrap: "wrap" }}
          >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center style={styles.navbar}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
          {this.renderAlbum()}
        </ScrollView>
        <Block flex style={{
          backgroundColor: 'transparent', // TabBar background
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,         
          width: "100%"
        }}>
          <Block row>
            <Block flex ={2}>
              <Button color="success" style={styles.button}>
                Add To Cart
              </Button>
            </Block>
            <Block flex={2}>
              <Button color="warning" style={styles.button}>
                Buy Now
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    //margin: theme.SIZES.BASE,
    width: "100%",
    opacity: 0.8
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  titleCustom: {
    marginVertical: 5,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE * 0.5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE * 2,
    height: cardWidth - theme.SIZES.BASE * 2,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  }
});

