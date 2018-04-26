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

export default class EditUserInfo extends Component {
  static navigationOptions = {
    title: '编辑'
  }
  render() {
    return(
      <View style = {{ flex: 1, backgroundColor: 'white'}}>
        
      </View>

    )
  }
}
 
// export { Shop as default };