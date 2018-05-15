'use strict'

import React, { Component } from 'react';

import ZTShopPch from '../../ZTShopPch.js';

import {
  Platform,
  View,
  Text,
  FlatList,
  Image,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class OrderList extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      datas: []
    };
  }
  _renderItem = (info) => {
    var item = info.item
    
    return(
      <View>
        <View style = {{ flexDirection:'row', justifyContent: 'space-between' }}>
          <Text style = {{ marginTop: 8, marginLeft: 8 }}>订单号：</Text>
          <Text style = {{ marginTop: 8, marginRight: 8 }}>待收货</Text>
        </View>
        {
          item.goods.map( (item, i) => {
            return(
              <View style = {{ flexDirection: 'row', marginTop: 8  }}>
                <Image source = {{ uri: item.coverPic }} style = {{ height: scaleSizeToFit(120), width: scaleSizeToFit(120),  marginBottom: 5 }}/>
                <View style = {{ flexDirection: 'column', width: screenWidth - scaleSizeToFit(130) }}>
                  <Text>{item.title}</Text>
                  <Text style = {{ marginTop: 8 }}>尺码：{item.size} 颜色：{item.color}</Text>
                  <Text style = {{ marginTop: 8, alignSelf: 'flex-end', marginRight: 8 }}>x {item.count}</Text>
                </View>
              </View>
            )
          })
        }
        <Text style = {{ marginTop: 8, alignSelf: 'flex-end', marginRight: 8 }}>共{item.totalCount}件商品合计￥{item.totalPrice}(含运费)元</Text>
        <View style = {{ width: screenWidth, height: 1, backgroundColor: 'rgba(200, 199, 204, 1)', marginTop: 6 }}></View>
        
      </View>
    )
  }
  
  render() {
    return(
      <View style = {{ flex: 1 }}>
        <FlatList
          data = {this.state.datas}
          renderItem = { this._renderItem }
          ListHeaderComponent={this._headerView}
          ItemSeparatorComponent = {this._separator}
          refreshing = {true} />
      </View>
    )
  }
  fetchData() {

    let url = ZTShopPch.ZTNetWorkConfig.SERVER_HOST + ZTShopPch.ZTNetWorkConfig.API_ORDERLIST_URL;

    let params = {
      'pageSize': 1,
      '_user': '5a4b3abd97f0f42f26372ddf',
      'status': this.props.index
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
}
const scaleSizeToFit = (s) => {
  return s * Dimensions.get('window').width / 414;
}