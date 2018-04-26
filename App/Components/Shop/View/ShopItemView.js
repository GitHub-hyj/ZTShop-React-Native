'use strict'

import React, { Component } from 'react';

import {
	Platform,
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

export default class ShopItemView extends Component {

	render() {
		return (
			<TouchableHighlight
        underlayColor = 'gray'
        onPress = { () => this.props.navigation.navigate('GoodsDetail')}>
      	<View style = {{flexDirection: 'row'}}>
          <View >
            <Image source = {require('../../../Assets/tabbar/wode.png')} style = {{height: 90, width: 90,  marginBottom: 5 }}/>
          </View>
          <View>
            <Text numberOfLines = {2} style={{ width: 310 , lineHeight: 18,fontSize: 12, paddingLeft: 16, paddingTop: 5, marginRight: 16}} >
              714street春夏季花卉迷彩透气王艳短裤eet春夏季花卉迷彩透气王艳短裤男潮
            </Text>
            <Text style = {{ fontSize: 10, color: 'gray', marginTop: 5, marginLeft: 16 }}>上海</Text>
          <Text style = {{ fontSize: 16, color: 'red', marginTop: 10, marginLeft: 16 }}>￥280</Text>
          </View>
      	</View>
      </TouchableHighlight>
		)
	}

}
