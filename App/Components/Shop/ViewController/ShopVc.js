'use strict'
import React, { Component } from 'react';
import ShopItemView from '../View/ShopItemView.js';
import ZTShopPch from '../../ZTShopPch.js';
import Swiper from 'react-native-swiper';

import {
  Platform,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Shop extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      datas: [],
      indexPathSelected: 0
    };
  }
  static navigationOptions = {
    title: '首页'
  }

  _renderLeftItem = (item) => {

    return(
      <TouchableOpacity 
        onPress = { () => {
          this.setState({
            indexPathSelected: item.index
          })
        }}>
        <View style = {{ height: scaleSizeToFit(50), width: screenWidth / 5, backgroundColor: this.state.indexPathSelected === item.index ? 'white' : 'rgba(200, 199, 204, 1)', justifyContent: 'center'}}>
          <Text style = {{ fontSize: 14, textAlign: 'center' }} numberOfLines = {1}>{item.item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderItem = (info) => {
    var item = info.item
    // var index = info.index
    return(
      <TouchableHighlight
        underlayColor = 'gray'
        onPress = { () => this.props.navigation.navigate('GoodsDetail', {model: item})}>
      <View style = {{flexDirection: 'row', paddingLeft: scaleSizeToFit(10)}}>
          <View style = {{justifyContent: 'center' }}>
            <Image source = {{ uri: item.coverPics[1] }} style = {{ height: scaleSizeToFit(80), width: scaleSizeToFit(80),  marginBottom: 5 }}/>
          </View>
          <View style = {{ width: screenWidth * 4 / 5 }}>
            <Text numberOfLines = {2} style={{ width: screenWidth * 4 / 5 - scaleSizeToFit(80), lineHeight: scaleSizeToFit(24), fontSize: scaleSizeToFit(16), paddingLeft: scaleSizeToFit(16), paddingTop: 5, paddingRight: scaleSizeToFit(10), color: 'black'}} >
              {item.title}
            </Text>
            <Text style = {{ fontSize: 12, color: 'gray', marginTop: 5, marginLeft: 16 }}>运费: {item.yunfei}</Text>
            <Text style = {{ fontSize: 16, color: 'red', marginTop: 10, marginLeft: 16 }}>￥{item.price} <Text style = {{ color: 'gray', fontSize: 12 }} >{item.bought}人已买</Text></Text>
          </View>
      </View>
      </TouchableHighlight>
    )
  }
  _separator = () => {
    return <View style={{ width: screenWidth * 4 / 5 - scaleSizeToFit(10), marginLeft: screenWidth / 5 + scaleSizeToFit(10), height:1, backgroundColor:'rgba(200, 199, 204, 1)'}}/>;
  }
  fetchData() {
    
    let url = ZTShopPch.ZTNetWorkConfig.SERVER_HOST + ZTShopPch.ZTNetWorkConfig.API_GOODSLIST_URL;

    let params = {
      'page': 1,
      'pageSize': 20
    }
    
    ZTShopPch.ZTNetWorkRequest.get(url, params, (response) => {
      
      
      this.setState({
        datas: response.data
      })
    })
  }
  componentDidMount() {

    this.fetchData();
  }
  
  render() {
    
    return(
      <View style = {{flex: 1, backgroundColor: 'white', flexDirection: 'row'}}>
        <FlatList 
        style = {{ width: screenWidth / 5 }}
        data = {['全部', 'Nike/耐克', 'adiddas/阿迪达斯']}
        renderItem = {this._renderLeftItem}
        ItemSeparatorComponent = {this._separator}/>
        <FlatList
          style = {{ width: screenWidth * 4 / 5 }}
          data = {this.state.datas}//{this.state.datas}
          renderItem = { this._renderItem }
          ListHeaderComponent={this._headerView}
          // ListFooterComponent={this._footer}
          ItemSeparatorComponent = {this._separator}
          // onRefresh = { () => {
          //   this.fetchData();
          // } }
          refreshing = {true} />
          
      </View>
    )
  }
}
 
const scaleSizeToFit = (s) => {
  return s * Dimensions.get('window').width / 414;
}
// export { Shop as default };