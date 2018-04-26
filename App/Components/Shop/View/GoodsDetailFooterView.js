'use strict'

import React, {Component} from 'react';
import Styles from '../../../Styles/Shop';

import {
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

export default class GoodsDetailFooterView extends Component {
  render() {
    return(
      <View style = {{ flexDirection: 'row', height: 50, width: Dimensions.get('window').width}}>

          <TouchableOpacity>
            <View style = {[ Styles.detailBottomBtn, Styles.detailBottomBtnBorder ]}>
              <Text style = {Styles.detailBottomText}>
                联系客服
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
          onPress = {this.props.addToCart}>
            <View style = {[ Styles.detailBottomBtn, Styles.detailBottomBtnBorder ]}>
              <Text style = {Styles.detailBottomText}>
                加入购物车
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress = {this.props.pushToMakeOrder}>
            <View style = { Styles.detailBottomBtn }>
              <Text style = {Styles.detailBottomText}>
                立即购买
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    )
  }
}