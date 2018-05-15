'use strict'

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Swiper from 'react-native-swiper';

import Styles from '../../../Styles/Shop';
import GoodsDetailFooterView from '../View/GoodsDetailFooterView.js'
import ChooseView from '../View/ChooseView.js'
import ZTShopPch from '../../ZTShopPch.js';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  SectionList,
  Image,
  WebView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  TextInput
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const getWebViewHeight = 
  `
    (function() {
      var height = 0;
      function changeHeight() {
        if (document.body.scrollHeight != height) {
          height = document.body.scrollHeight;
          if (window.postMessage) {
            window.postMessage(JSON.stringify({
              type: 'setHeight',
              height: height,
            }))
          };
        };
      }
      setInterval(changeHeight, 100);
    } ())
  `

export default class GoodsDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      GoodsModel: this.props.navigation.state.params.model,
      height: 0,
      commentList: [],
      option: {}
    };

  }

  static navigationOptions = {
    title: '商品详情',
    headerStyle: {

    }
  }
  /**
   * web端发送过来的交互消息
   */
  onMessage (event) {
    try {
      
      const action = JSON.parse(event.nativeEvent.data)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({ height: action.height })
      }
    } catch (error) {
      // pass
    }
  }
  
  //跳转到评论vc
  _pushToCommentList = () => {
    this.props.navigation.navigate('CommentList', {commentArr: this.state.commentList})
  }
  //评论cell
  _renderItem = (info) => {
    var item = info.item;
    var section = info.section;
    var comment = this.state.commentList[0];
     
    if (section.key === "A") {
      //选择颜色等信息
      return(
        <TouchableOpacity
          onPress = { () => {
            this.refs.chooseView._openModal()
          }} >
          <View style = {{ backgroundColor: 'white', height: 40, justifyContent: 'center' }}>
            <Text style = {{ paddingLeft: 10, color: 'black', fontSize: 14 }}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        
      )
    }else{
      //评论
      if ( this.state.commentList.length > 0) {
        return(
          <TouchableHighlight
          onPress = {this._pushToCommentList}>
            <View style = {{ backgroundColor: 'white'}}>
              <View style = {{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5}} >
                <Image source = {{ uri: ZTShopPch.ZTNetWorkConfig.SERVER_HOST+ '/' + comment._user.portrait }} style = {{ width: 30, height: 30 , borderRadius: 15}}/>
                <Text style = {{ marginLeft: 10 }} >
                  {comment._user.nickname}
                </Text>
              </View>
              <Text style = {{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                {comment.content}
              </Text>
              <View style = {{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style = {{ backgroundColor: 'rgba(250, 86, 86, 1)', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, color: 'white', marginTop: 10 }} >
                  查看全部评论
                </Text>
              </View>
              <View style = {{ backgroundColor: 'rgba(200, 199, 204, 1)', height: 0.5, marginTop: 10 }}>
              </View>
            </View>
          </TouchableHighlight>
        )
      }else{
        return (
          <View>
          </View>
        )
      }
    }
    
  }
  _renderItemImage = (item, i) => {
    return(
      <Image source={{ uri: item }} style={Styles.img} resizeMode = 'contain'/>
    )
  }
  //sectionList 的headerView
  _renderHeaderView = () => {
    var GoodsModel = this.props.navigation.state.params.model;
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
        {
          GoodsModel.coverPics.map((item, i) => this._renderItemImage(item, i))
        }
        </Swiper>
        <View>
          <Text style = {{ fontSize: 16, marginLeft: 10, marginRight: 10, marginTop: 10 }}>{GoodsModel.title}</Text>
          <Text style = {{ color: 'red', fontSize: 18, marginLeft: 10, marginTop: 10 }}>￥{GoodsModel.price}</Text>
          <Text style = {{ color: 'gray', fontSize: 12, marginLeft: 10, marginTop: 10}}>价格<Text style = {{textDecorationLine: 'line-through' }}>￥320</Text></Text>
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text style = {{ color: 'gray', fontSize: 12, marginLeft: 10, lineHeight: 14 }}>运费: {GoodsModel.yunfei}</Text>
          <Text style = {{ color: 'gray', fontSize: 12, lineHeight: 14 }}>已卖：{GoodsModel.bought} 笔</Text>
          <Text style = {{ color: 'gray', fontSize: 12, marginRight: 10, lineHeight: 14 }}>不支持退换货</Text>
        </View>
        </View>
      </View>
    )
  }
  //列表底部视图
  _renderFooterView = () => {
    var GoodsModel = this.props.navigation.state.params.model;
    return (
      <View>
        <WebView 
          bounces={false}
          injectedJavaScript={getWebViewHeight}
          style = {{ width: screenWidth, height:this.state.height }}
          source={{html:GoodsModel.content, baseUrl: '' }}
          onMessage={this.onMessage.bind(this)}
          >
        </WebView>
      </View>
    )
  }
  //列表section 头部
  _renderSectionHeader = (info) => {
    var section = info.section;
    if (section.key === "A") {
      return(
        <View style = {{ height: 20}}>

        </View>
      )
    }else if(section.key === "B"){
      return(
        <View style = {{  height: 30, justifyContent: 'center' }}>
          <Text style = {{ fontSize: 14, marginLeft: 10 }}>评价（{this.state.commentList.length}）</Text>
        </View>
      )
    }
  }
  //加入购物车
  _addToCart = () => {
    if (!this.state.option.color && !this.state.option.size) {
      this.refs.chooseView._openModal()
    }else{
      
    }
  }
  //购买
  _pushToMakeOrder = (option) => {
    this.setState({
      option: option
    })
    
    this.props.navigation.navigate('MakeOrder', {option: [option]});  
    
  }
  _buyClick = () => {
    
    if (!this.state.option.color && !this.state.option.size) {
      this.refs.chooseView._openModal()
    }else{
      this.props.navigation.navigate('MakeOrder', {option: this.state.option});  
    }
  }
  render() {
    return(
      <View style = {Styles.container}>
        <SectionList 
          renderSectionHeader = {this._renderSectionHeader}
          sections = {[
            { data : [{'title': '选择 尺码 颜色'}], key: 'A' },
            { data : [{'title': '评价'}], key: 'B' },
          ]}
          renderItem = {this._renderItem}
          ListHeaderComponent = {this._renderHeaderView} 
          ListFooterComponent = {this._renderFooterView} />
          <GoodsDetailFooterView pushToMakeOrder = { this._buyClick } addToCart = {this._addToCart} />
          <ChooseView modal = 'chooseViewModal' ref = 'chooseView' goodsModel = {this.state.GoodsModel} pushToMakeOrder = { this._pushToMakeOrder } />
      </View>
    )
  }
  //获取评论
  fetchData() {
    let url = ZTShopPch.ZTNetWorkConfig.SERVER_HOST + ZTShopPch.ZTNetWorkConfig.API_GOODSCOMMENTLIST_URL;

    let params = {
      '_goods': this.props.navigation.state.params.model._id
    }
    
    ZTShopPch.ZTNetWorkRequest.get(url, params, (response) => {
      this.setState({
        commentList: response.data
      })
    })
  }
  componentDidMount() {
    this.fetchData();
  }
}
 
// export { Shop as default };