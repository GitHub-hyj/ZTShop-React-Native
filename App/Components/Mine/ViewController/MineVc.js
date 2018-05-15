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

const titleArr = [
                    {
                      'title': '待付款',
                      'icon': require('../../../Assets/mine/obligation.png')
                    },
                    {
                      'title': '待发货',
                      'icon': require('../../../Assets/mine/daifahuo.png')
                    },
                    {
                      'title': '待收货',
                      'icon': require('../../../Assets/mine/daishouhuo.png')
                    },
                    {
                      'title': '待评价',
                      'icon': require('../../../Assets/mine/daipingjia.png')
                    },
                    {
                      'title': '退款/售后',
                      'icon': require('../../../Assets/mine/tuikuan.png')
                    },
                  ]

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
        <View style = {{ flexDirection: 'row', marginTop: 10 }}>
          {
            titleArr.map( (item, i) => {
              return(
                <TouchableOpacity
                  onPress = { () => {
                    this.props.navigation.navigate('OrderManageVc', {index: i})
                  }}>
                  <View style = {{ width: screenWidth / 5, alignItems: 'center' }}>
                    <Image style = {{ width: 36, height: 36 }} source = {item.icon} />
                    <Text style = {{ marginTop: 10 }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
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