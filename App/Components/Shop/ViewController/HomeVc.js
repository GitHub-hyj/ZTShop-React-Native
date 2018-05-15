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

const bannerList = ['1', '2', '3', '4'];

export default class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      datas: ['1', '2', '3', '4'],
    };
  }
  static navigationOptions = {
    title: '首页'
  }

  _renderHeaderView = () => {
    let channelWidth = screenWidth /  4;
    return(
      <View style = {{ backgroundColor: 'white' }}>
        <Swiper
                height={200}
                horizontal={true}
                autoplay = {true}
                autoplayTimeout = {1}
                paginationStyle = {{bottom: 10}}
                showsPagination={true}
                dot = { <View style = {{ width: 10, height: 2, marginRight: 3, marginLeft: 0}} /> }
                >
          <TouchableOpacity onPress = { () => {
                  } }>
            <Image source = { require('../../../Assets/1.png') }  style = {{ width: screenWidth, height: 200, resizeMode: 'contain', backgroundColor: 'red' }} resizeMode = 'contain' onPress = { () => {
              }}/>
          </TouchableOpacity>
        </Swiper>
        <View style = {{ flexDirection: 'row', marginTop: scaleSizeToFit(8) }}>
          {
            bannerList.map( (item, i) => {
              return(
                <TouchableOpacity 
                  onPress = { () => {
                    this.props.navigation.navigate('Shop', {index: i})
                  }}>
                  <View style = {{ width: channelWidth, alignItems: 'center' }}>
                    <Image style = {{ height: scaleSizeToFit(55), width: scaleSizeToFit(55), backgroundColor: 'red' }} />
                    <Text style = {{ marginTop: scaleSizeToFit(8) }}>衣服</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
        
      </View>
    )
  }

  _renderItem = (info) => {
    var item = info.item
    // var index = info.index
    return(
      <TouchableHighlight>
      <View style = {{flexDirection: 'row'}}>
          
      </View>
      </TouchableHighlight>
    )
  }
  _separator = () => {
    return <View style={{ width: screenWidth - scaleSizeToFit(120), marginLeft: scaleSizeToFit(120), height:1, backgroundColor:'rgba(200, 199, 204, 1)'}}/>;
  }
  fetchData() {
    
    let url = ZTShopPch.ZTNetWorkConfig.SERVER_HOST + ZTShopPch.ZTNetWorkConfig.API_GOODSLIST_URL;
console.log(url)
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
      <View style = {{flex: 1, backgroundColor: 'white'}}>
        <FlatList 
          renderSectionHeader = {this._renderSectionHeader}
          data = {["1"]}
          renderItem = {this._renderItem}
          ListHeaderComponent = {this._renderHeaderView} 
          ListFooterComponent = {this._renderFooterView} />
          
      </View>
    )
  }
}
 
const scaleSizeToFit = (s) => {
  return s * Dimensions.get('window').width / 414;
}
// export { Shop as default };