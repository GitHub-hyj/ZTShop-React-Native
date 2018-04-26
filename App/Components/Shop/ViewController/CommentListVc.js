'use strict'
import React, { Component } from 'react';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  FlatList,
  Image,
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      commentArr: this.props.navigation.state.params.commentArr
    };
  }
  static navigationOptions = {
    title: '商品评论'
  }
  _renderItem = (info) => {
    let item = info.item;
    return(
      <View style = {{ backgroundColor: 'white'}}>
        <View style = {{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5}} >
          <Image source = {{ uri: 'http://192.168.1.123:3000/' + item._user.portrait }} style = {{ width: 30, height: 30 , borderRadius: 15}}/>
          <Text style = {{ marginLeft: 10 }} >
            {item._user.nickname}
          </Text>
        </View>
        <View>
          <Text style = {{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
            {item.content}
          </Text>
        </View>
      </View>
    )
  }
  _separator = () => {
    return <View style={{width: screenWidth, height:1, backgroundColor:'rgba(200, 199, 204, 1)'}}/>;
  }
  render() {
    
    return(
      <View style = {{ flex: 1 }}>
        <FlatList
          data = {this.state.commentArr}
          renderItem = { this._renderItem }
          ItemSeparatorComponent = {this._separator} />
      </View>
    )
  }
  
}
 
// export { Shop as default };