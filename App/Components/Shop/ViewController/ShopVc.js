'use strict'
import React, { Component } from 'react';
import ShopItemView from '../View/ShopItemView.js';
import {
  Platform,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  Dimensions
} from 'react-native';

var getUrl = "http://192.168.1.123:3000/api/goods?page=1&pageSize=20";

const screenWidth = Dimensions.get('window').width;

export default class Shop extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      datas: []
    };
  }
  static navigationOptions = {
    title: '首页'
  }

  _renderItem = (info) => {
    var item = info.item
    // var index = info.index
    return(
      <TouchableHighlight
        underlayColor = 'gray'
        onPress = { () => this.props.navigation.navigate('GoodsDetail', {model: item})}>
      <View style = {{flexDirection: 'row'}}>
          <View >
            <Image source = {{ uri: item.coverPics[1] }} style = {{ height: scaleSizeToFit(120), width: scaleSizeToFit(120),  marginBottom: 5 }}/>
          </View>
          <View>
            <Text numberOfLines = {2} style={{ width: screenWidth - scaleSizeToFit(120), lineHeight: scaleSizeToFit(24), fontSize: scaleSizeToFit(17), paddingLeft: scaleSizeToFit(16), paddingTop: 5, paddingRight: scaleSizeToFit(10), color: 'black'}} >
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
    return <View style={{ width: screenWidth - scaleSizeToFit(120), marginLeft: scaleSizeToFit(120), height:1, backgroundColor:'rgba(200, 199, 204, 1)'}}/>;
  }
  fetchData() {
    fetch(getUrl,'GET')
    .then((response) => {  
        return response.json();  
    })  
    .then((responseText) => {  
        this.setState({
          datas: responseText.data
        })
    })  
    .catch((error) => {  
      alert('error: ' + error)  
    })
  }
  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    
    return(
      <View style = {{flex: 1, backgroundColor: 'white'}}>
         <FlatList
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