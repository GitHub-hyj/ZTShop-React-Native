'use strict'
import React, { Component } from 'react';
import Button from 'react-native-button';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  SectionList,
  TouchableHighlight,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class MakeOrder extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      option: this.props.navigation.state.params.option,
    };
  }
  static navigationOptions = {
    title: '确认订单'
  }
  _renderItem = (info) => {
    let section = info.section;
    let data = section.data;
    let key = section.key;

    if ( key === 'A') {
      
      return(
        <TouchableHighlight>
          <View style = {{ flexDirection: 'row'}}>
            <Image source = { require('../../../Assets/shouye/location.png') } style = {{ width: 18, height: 18, alignSelf: 'center', marginLeft: 5}} />
            <View style = {{flexDirection: 'column', marginTop: 10, marginRight: 10, marginLeft: 5, width: screenWidth - 28 }}>
              <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10 }} >
                <Text>收货人：zt</Text>
                <Text>18638508802</Text>
              </View>
              <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginTop: 10, marginBottom: 10 }} >
                <Text style = {{ flexWrap: 'wrap' }}>
                  收货地址：上海市上海市普陀区曹杨五村速度快解放拉市解放路看上架
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )
    }else if(key === 'B'){
      return(
        <View style = {{ flexDirection: 'row', marginRight: 10 }}>
          {
            data.map( (item, i) => {
              return(
                <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                  <Image source = {{ uri: item._goods.coverPics[0] }} style = {{ width: 80, height: 80, marginLeft: 5, alignSelf: 'center' }} />
                  <View style = {{flexDirection: 'column', width: screenWidth - 100, marginLeft: 5 }}>
                    <Text style = {{flexWrap: 'wrap', fontSize: 14}}>
                      {item._goods.title}
                    </Text>
                    <Text style = {{color: 'rgba(200, 199, 204, 1)', marginTop: 10}}>颜色：{item.color}，尺码：{item.size}</Text>
                    <View style = {{ flexDirection: 'row', marginRight: 10, justifyContent: 'space-between', marginTop: 10 }} >
                      <Text style = {{ color: 'rgba(250, 86, 86, 1)', fontSize: 18 }}>￥：{item.price}</Text>
                      <Text>x {item.count}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      )
    }else{
      
      return(
        <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style = {{ marginLeft: 10 }}>买家留言：</Text>
          <TextInput></TextInput>
        </View>
      )
    }
  }
  render() {
    var datas = ['', this.state.option, ''];
    return(
      <View style = {{ backgroundColor: 'white', flex: 1 }}>
        <SectionList 
          sections = {[
            { data : ['1'], key: 'A' },
            { data : this.state.option, key: 'B' },
            { data : ['1'], key: 'C' },
          ]}
          renderItem = {this._renderItem}/>
        <View style = {{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style = {{fontSize: 17}}>
           合计金额：￥699.0
          </Text>
          <Button
              style = {{ width: 120, paddingTop: 15, paddingBottom: 15, backgroundColor: 'rgba(250, 86, 86, 1)', color: 'white', marginLeft: 5 , fontSize: 18}}  
              onPress = { () => alert(1)}
            >提交订单</Button>
        </View>
      </View>
    )
  }
}
 
// export { Shop as default };