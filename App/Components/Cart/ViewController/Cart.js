'use strict'
import React, { Component } from 'react';
import SwipeOut from 'react-native-swipeout'

import ZTShopPch from '../../ZTShopPch.js';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Cart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      datas: [],
      itemIsSelected: [],
      totalPrice: 0,
      isAllSelected: false,
      selectOption: []
    };
    
  }
  static navigationOptions = {
    title: '购物车'
  }
  _isSelectedClick = (index) => {

    var arr = this.state.itemIsSelected;

    let isSelected = this.state.itemIsSelected[index];

    arr[index] = !isSelected;
    this.setState({
      itemIsSelected: arr
    })
  }
  _renderItem = (info) => {
    let index = info.index;
    let item = info.item;

    let isSelected = this.state.itemIsSelected[index];
    return(
        <SwipeOut>
          <View style = {{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress = { () => {
                
                this.state.itemIsSelected[index] = !this.state.itemIsSelected[index];

                this.state.totalPrice = this.state.itemIsSelected[index] ? this.state.totalPrice + parseInt(item.price) : this.state.totalPrice - parseInt(item.price);
                if (this.state.itemIsSelected.indexOf(false) < 0) {
                  this.state.isAllSelected = true;
                }else{
                  this.state.isAllSelected = false;
                }

                if (this.state.itemIsSelected[index]) {
                  var option = item;
                  this.state.selectOption.push(option)
                }else{
                  for (var i = 0; i < this.state.selectOption.length; i++) {
                    console.log(item._id)
                    if (this.state.selectOption[i]._id === item._id) {
                      this.state.selectOption.splice(i, 1);
                    }
                  };
                }
                console.log(this.state.selectOption);
                this.setState({
                  itemIsSelected: this.state.itemIsSelected,
                  totalPrice: this.state.totalPrice,
                  isAllSelected: this.state.isAllSelected,
                  selectOption: this.state.selectOption
                })
              }}>
                <Image source = { isSelected ? require('../../../Assets/cart/select.png') : require('../../../Assets/cart/unSelect.png')} style = {{ width: 20, height: 20, alignSelf: 'center', marginLeft: 10 }} />
              </TouchableOpacity>
              <TouchableOpacity 
              onPress = {() => {
                this.props.navigation.navigate('GoodsDetail', {model: item._goods});
              }}>
                <View style = {{ flexDirection: 'row' }}>
                  <Image source = {{ uri: item._goods.coverPics[0] }} style = {{ width: 80, height: 80, alignSelf: 'center', marginLeft: 10, marginRight: 10 }} />
                  <View style = {{ flexDirection: 'column', width: screenWidth - 140 }}>
                    <Text style = {{ flexWrap: 'wrap' }}>
                      {item._goods.title}
                    </Text>
                    <Text style = {{ marginTop: 5 }}>
                      {item.color}，{item.size}
                    </Text>
                    <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                      <Text style = {{color: 'rgba(250, 86, 86, 1)', fontSize: 16}}>￥{item.price}</Text>
                      <Text>x {item.count}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
          </View>
        </SwipeOut>
    )
  }
  render() {
    
    return(
      <View style = {{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          data = {this.state.datas}
          extraData = {this.state}
          renderItem = { this._renderItem }/>
        <View style = {{ height: 40, width: Dimensions.get('window').width, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress = { () => {
              this.state.isAllSelected = !this.state.isAllSelected;
              if (this.state.isAllSelected) {
                for (var i = 0; i < this.state.datas.length; i++) {
                  if (!this.state.itemIsSelected[i]) {
                    this.state.totalPrice += parseInt(this.state.datas[i].price);  
                  }
                  this.state.selectOption.push(this.state.datas[i])
                };
              }else{
                this.state.totalPrice = 0;
                this.state.selectOption = [];
              }
              for (var i = 0; i < this.state.itemIsSelected.length; i++) {
                this.state.itemIsSelected[i] = this.state.isAllSelected;
              }
              this.setState({
                isAllSelected: this.state.isAllSelected,
                itemIsSelected: this.state.itemIsSelected,
                selectOption: this.state.selectOption
              })
            }}>
            <View style = {{ flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width / 3, height: 40 }}>
              <Image source = {this.state.isAllSelected ? require('../../../Assets/cart/select.png') : require('../../../Assets/cart/unSelect.png')} style = {{ width: 20, height: 20, marginLeft: 10 }}/>
            <Text style = {{ marginLeft: 5 }}>全选</Text>
            </View>
          </TouchableOpacity>
          <View style = {{ alignItems: 'center', width: Dimensions.get('window').width / 3, justifyContent: 'center', height: 40 }}>
            <Text style = {{ fontSize: 12 }}>合计：{this.state.totalPrice} <Text style = {{ color:'red' }}></Text></Text>
          </View>
          <TouchableOpacity 
            onPress = {this._makeOrder}>
            <View style = {{ alignItems: 'center', width: Dimensions.get('window').width / 3,justifyContent: 'center', backgroundColor: 'rgba(250, 86, 86, 1)', height: 40 }}>
            <Text style = {{ color: 'white', fontSize: 16 }}>结算 </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  _makeOrder = () => {
    this.props.navigation.navigate('MakeOrder', {option: this.state.selectOption})
  }
  fetchData() {
    let url = ZTShopPch.ZTNetWorkConfig.SERVER_HOST + ZTShopPch.ZTNetWorkConfig.API_SHOPPINGLIST_URL;

    let params = {
      _user: '5a4b3abd97f0f42f26372ddf'
    }
    
    ZTShopPch.ZTNetWorkRequest.get(url, params, (response) => {
      for (var i = 0; i < response.data.length; i++) {
          this.state.itemIsSelected.push(false);
        };
        this.setState({
          datas: response.data,
          itemIsSelected: this.state.itemIsSelected
        })
    })
  }
  componentDidMount() {
    this.fetchData();
  }
}
 
// export { Shop as default };