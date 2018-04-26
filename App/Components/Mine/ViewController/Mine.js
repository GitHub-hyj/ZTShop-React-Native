'use strict'
import React, { Component } from 'react';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Mine extends Component {
  static navigationOptions = {
    title: '我的'
  }
  _renderHeaderComponent = () => {
    return(
      <View>
        <TouchableOpacity 
        onPress = { () => {
          this.props.navigation.navigate('UserInfo')
        } }>
        <View style = {{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Image style = {{ width: 60, height: 60, marginLeft: 10, marginRight: 10 }} source = { require('../../../Assets/mine/userPic.png') } />
            <Text style = {{ fontSize: 16 }}>点击登录</Text>
        </View>
        </TouchableOpacity>

        <View style = {{ flexDirection: 'row', marginTop: 30 }}>
          <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
            <Image style = {{ width: 36, height: 36 }} source = { require('../../../Assets/mine/obligation.png') } />
            <Text style = {{ marginTop: 10 }}>待付款</Text>
          </View>
          <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
            <Image style = {{ width: 36, height: 36 }} source = { require('../../../Assets/mine/daifahuo.png') } />
            <Text style = {{ marginTop: 10 }}>待发货</Text>
          </View>
          <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
            <Image style = {{ width: 36, height: 36 }} source = { require('../../../Assets/mine/daishouhuo.png') } />
            <Text style = {{ marginTop: 10 }}>待收货</Text>
          </View>
          <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
            <Image style = {{ width: 36, height: 36 }} source = { require('../../../Assets/mine/daipingjia.png') } />
            <Text style = {{ marginTop: 10 }}>待评价</Text>
          </View>
          <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
            <Image style = {{ width: 36, height: 36 }} source = { require('../../../Assets/mine/tuikuan.png') } />
            <Text style = {{ marginTop: 10 }}>退款/售后</Text>
          </View>
        </View>
        <View style = {{ backgroundColor: 'rgba(200, 199, 204, 1)', height: 0.5, width: screenWidth, marginTop: 10 }}></View>
      </View>
      
    )
  }
  _renderItem = (info) => {
    return(
      <View style = {{ justifyContent: 'center' }}>
        <View style = {{ flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, alignItems: 'center' }}>
          <Image style = {{ width: 36, height: 36, marginRight: 10 }} source = { require('../../../Assets/mine/product_collect.png') } />
          <Text style = {{ fontSize: 16 }}>{info.item.title}</Text>
        </View>
      </View>
    )
  }
  render() {
    return(
      <View style = {{ flex: 1, backgroundColor: 'white'}}>
        <FlatList 
          data = {[{title: '收藏夹'}]}
          renderItem = {this._renderItem}
          ListHeaderComponent = {this._renderHeaderComponent}
          />
      </View>

    )
  }
}
 
// export { Shop as default };