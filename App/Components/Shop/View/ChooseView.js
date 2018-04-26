'use strict'

import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

import {
  View,
  Image,
  Text,
  FlatList,
  Dimensions,
  TextInput
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const sizeUrl = "http://192.168.1.123:3000/api/goods/size?goodsId=5a4aeecde743e6036eb3d2ad"

var dic = {};
var sizeData = {
  "kind": "尺码",
  "arr": []
};

var colorData = {
  "kind": "颜色分类",
  "arr": []
};

export default class ChooseView extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      sizeSelectIndex: -1, //选择尺码的位置（-1时未选）
      colorSelectIndex : -1, //选择颜色的位置（-1时未选）
      datasArr: [],
      price: this.props.goodsModel.price,
      totalCount: this.props.goodsModel.totalCount,
      buyCount: 1
    }
  }
   _modalRenderItem = (data, index) => { 
    var arr = data.arr;
    
    if (index != 2) {

      return(
        <View>
          <Text style = {{ fontSize: 15, marginLeft: 8, marginTop: 10 }}>
            {data.kind}
          </Text>

          <View style = {{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 15 }}>
            {
              arr.map( (item, i) => {
                var backGroundColor;
                var textColor = 'black';
                var isDisabled = true;

                let selectIndex = index ? this.state.colorSelectIndex : this.state.sizeSelectIndex;

                let colorSelectIndex = this.state.colorSelectIndex;

                let sizeSelectIndex = this.state.sizeSelectIndex;

                if (selectIndex === i) {
                  backGroundColor = "rgba(250, 86, 86, 1)";
                  textColor = 'white';
                }else{
                  backGroundColor = 'rgba(240, 240, 240, 1)';
                }

                if (sizeSelectIndex < 0 && colorSelectIndex < 0) {
                  isDisabled = false;
                }else if(sizeSelectIndex >= 0 && colorSelectIndex < 0){
                  if (index) {
                    let colorDic = dic[sizeData.arr[sizeSelectIndex]];
                    for (let key in colorDic){
                      if (key === item) {
                        isDisabled = false;
                      }
                    }
                  }else{
                    isDisabled = false;
                  }
                  
                }else if(sizeSelectIndex < 0 && colorSelectIndex >= 0 ){
                  if (index) {
                    isDisabled = false;
                  }else{
                    let sizeDic = dic[colorData.arr[colorSelectIndex]];
                    for (let key in sizeDic){
                      if (key === item) {
                        isDisabled = false;
                      }
                    }
                  }
                }else{
                  if (index) {
                    let colorDic = dic[sizeData.arr[sizeSelectIndex]];
                    for (let key in colorDic){
                      if (key === item) {
                        isDisabled = false;
                      }
                    }
                  }else{
                    let sizeDic = dic[colorData.arr[colorSelectIndex]];
                    for (let key in sizeDic){
                      if (key === item) {
                        isDisabled = false;
                      }
                    }
                  }
                }
                return (
                   <Button
                    style={{ fontSize: 16, color: textColor }}
                    styleDisabled={{ color: 'grey' }}
                    disabled = {isDisabled}
                    containerStyle={{ paddingTop: 2, paddingBottom: 2, paddingLeft:15, paddingRight:15, overflow: 'hidden', borderRadius: 4, backgroundColor: backGroundColor , marginLeft: 10 }}
                    disabledContainerStyle={{ backgroundColor: 'rgba(200, 199, 204, 1)' }}
                    onPress={() => this._buttonPress(item, i, index)}
                  >
                    {item}
                  </Button>
                )
              })
            }
          </View>
        </View>
      )
    }else{

      return(
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
          <Text style = {{marginLeft: 8}}>
            购买数量
          </Text>
          <View style = {{flexDirection: 'row', marginRight: 8, alignItems: 'center'}}>
            <Button
              style = {{ width: 40, paddingTop: 5, paddingBottom: 5, backgroundColor: 'rgba(240, 240, 240, 1)', color: 'black', marginRight: 5}}
              onPress = { () => {
                if (this.state.buyCount > 1) {
                  this.setState({
                    buyCount: --this.state.buyCount
                  })
                }else{

                }
              }}>-</Button>
              <TextInput
                style={{width: 40, paddingTop: 5, paddingBottom: 5, backgroundColor: 'rgba(240, 240, 240, 1)', color: 'black', textAlign: 'center' }}
                onChangeText = { (text)=> {
                  if (text <= this.state.totalCount) {
                    this.setState({
                      buyCount: text
                    })
                  }
                }}
                defaultValue= {this.state.buyCount.toString()} 
                keyboardType = "numeric"/>
            <Button
              style = {{ width: 40, paddingTop: 5, paddingBottom: 5, backgroundColor: 'rgba(240, 240, 240, 1)', color: 'black', marginLeft: 5 }}  
              onPress = { () => {
                if (this.state.buyCount < this.state.totalCount) {
                  this.setState({
                    buyCount: ++this.state.buyCount
                  })
                }else{
                  alert('数量超出范围');
                }
              }}
            >+</Button>
          </View>
        </View>
      )
    }

  }
  //选择商品信息
  _buttonPress = (item, j, index) => {

    var colorSelectIndex = this.state.colorSelectIndex;

    var sizeSelectIndex = this.state.sizeSelectIndex;

    var totalCount = 0;

    var price = this.state.price;

    if (index) {
      if (colorSelectIndex < 0 || colorSelectIndex !== j) {
        colorSelectIndex = j;
      }else {
        colorSelectIndex = -1;
      }
    }else{
      if (sizeSelectIndex < 0 || sizeSelectIndex !== j) {
        sizeSelectIndex = j;
      }else {
        sizeSelectIndex = -1;
      }
    }
    if (sizeSelectIndex < 0 && colorSelectIndex < 0) {
      totalCount = this.state.GoodsModel.totalCount;
      price = this.state.GoodsModel.price;
    }else if(sizeSelectIndex >= 0 && colorSelectIndex < 0){
      let colorDic = dic[sizeData.arr[sizeSelectIndex]];
      for (let key in colorDic){
        totalCount += parseInt(colorDic[key].count);
      }
    }else if(sizeSelectIndex < 0 && colorSelectIndex >= 0 ){
      let sizeDic = dic[colorData.arr[colorSelectIndex]];
      for (let key in sizeDic){
        totalCount += parseInt(sizeDic[key].count);
      }
    }else{
      let sizeSelect = sizeData.arr[sizeSelectIndex];
      let colorSelect = colorData.arr[colorSelectIndex];
      totalCount = parseInt(dic[sizeSelect][colorSelect].count);
      price = dic[sizeSelect][colorSelect].price;
    }
    this.setState({
      sizeSelectIndex: sizeSelectIndex,
      colorSelectIndex: colorSelectIndex,
      price: price,
      totalCount: totalCount
    })
  }
  //判断是否选择颜色尺码
  _judgeIsSelected = () => {
    if (this.state.colorSelectIndex < 0 && this.state.sizeSelectIndex < 0) {
      return alert('请选择 颜色 尺码')
    }else if (this.state.colorSelectIndex >= 0 && this.state.sizeSelectIndex < 0) {
      return alert('请选择 尺码')
    }else if (this.state.colorSelectIndex < 0 && this.state.sizeSelectIndex >= 0) {
      return alert('请选择 颜色')
    }
  }
  //加入购物车
  _addToCart = () => {
    this._judgeIsSelected();
  }
  //购买
  _buyClick = () => {
    this._judgeIsSelected();
    if (this.state.colorSelectIndex >= 0 && this.state.sizeSelectIndex >= 0) {
      let option = {
        'count': this.state.buyCount,
        'price': this.state.price,
        'color': colorData.arr[this.state.colorSelectIndex],
        'size': sizeData.arr[this.state.sizeSelectIndex],
        '_goods': this.props.goodsModel
      }
      this.props.pushToMakeOrder(option);
    };
  }
  _openModal = () => {
    this.refs.chooseViewModal.open();
  }
  render(){

    for (var i = 0; i < this.state.datasArr.length; i++) {
      if (sizeData.arr.indexOf(this.state.datasArr[i].size) < 0) {
        sizeData.arr.push(this.state.datasArr[i].size);
        
      }
      if (colorData.arr.indexOf(this.state.datasArr[i].color) < 0) {
        colorData.arr.push(this.state.datasArr[i].color);
        
      }
    }
    
    for (var i = 0; i < sizeData.arr.length; i++) {
      var size = sizeData.arr[i];
      var dic1 = {};
      for (var j = 0; j < this.state.datasArr.length; j++) {
        
        if (this.state.datasArr[j].size  === size) {
          dic1[this.state.datasArr[j].color] = {
            "price": this.state.datasArr[j].price,
            "count": this.state.datasArr[j].count,
          }
        }
      }
      dic[size] = dic1;
    }
    for (var i = 0; i < colorData.arr.length; i++) {
      var color = colorData.arr[i];
      var dic1 = {};
      for (var j = 0; j < this.state.datasArr.length; j++) {
        if (this.state.datasArr[j].color === color) {
          dic1[this.state.datasArr[j].size] = {
            "price": this.state.datasArr[j].price,
            "count": this.state.datasArr[j].count,
          }
        };
      }
      dic[color] = dic1;
    };
    return(
        <Modal ref = {'chooseViewModal'} position = {'bottom'} style = {{ height: 500 }} swipeToClose = {false}>
          <View style = {{ flexDirection: 'row' }}>
            <View>
              <Image
              source = {{uri: this.props.goodsModel.coverPics[0]}} 
              style = {{ width: 100, height: 100, marginLeft: 10, marginTop: -20 }} />
            </View>
            <View style = {{ flexDirection: 'column' }}>
              <Text style = {{ color: 'red', fontSize: 16, marginLeft: 16, marginTop: 20 }}>￥{this.state.price}</Text>
              <Text style = {{  fontSize: 12, marginLeft: 16, marginTop: 5 }}>库存{this.state.totalCount}件</Text>
              <Text style = {{  fontSize: 12, marginLeft: 16, marginTop: 5 }}>选择 尺码 颜色</Text>
            </View>
          </View>
          <FlatList
            style = {{ width: Dimensions.get('window').width }}
            height = {100}
            data = {[sizeData, colorData, {}]}
            renderItem = { ({item, index}) => this._modalRenderItem(item, index) }
            ItemSeparatorComponent = {this._separator} />
          <View style = {{ width: screenWidth, flexDirection: 'row' }}>
            <Button
                style={{ fontSize: 16, color: 'white', backgroundColor: 'rgba(250, 86, 86, 1)', width: screenWidth / 2 - 0.5, paddingTop: 20, paddingBottom: 20 }}
                onPress = {this._addToCart}
                >
                加入购物车
            </Button>
            <Button
                style={{ fontSize: 16, color: 'white', backgroundColor: 'rgba(250, 86, 86, 1)', width: screenWidth / 2 - 0.5, paddingTop: 20, paddingBottom: 20  }}
                onPress = {this._buyClick.bind(this)}
                >
                购买
            </Button>
          </View>
        </Modal>
    )
  }
   fetchSizeData() {
    fetch(sizeUrl,'GET')
    .then((response) => {  
        return response.json(); 
    })  
    .then((responseText) => {  
        this.setState({
          datasArr: responseText.data,
        })
    })  
    .catch((error) => {  
      alert('error: ' + error)  
    })
  }
  componentDidMount() {
    this.fetchSizeData();
  }
}