'use strict'

import React, { Component } from 'react';

import OrderList from './OrderList.js'

import { StackNavigator, TabNavigator } from 'react-navigation'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import {
  Platform,
  View,
  Text,
  FlatList,
  Image,
  
} from 'react-native';

export default class OrderManageVc extends Component {
  
  render() {
    return(
      <View style = {{ flex: 1 }}>
        <ScrollableTabView
          style = {{ 
            height: 16,
            backgroundColor: 'white'
          }}
          initialPage = {this.props.navigation.state.params.index}
          tabBarUnderlineStyle = {{
            height: 3,
            backgroundColor: 'rgba(250, 86, 86, 1)'
          }}
          tabBarActiveTextColor = 'rgba(250, 86, 86, 1)'
          onChangeTab = { () => {
          }}>
          <OrderList tabLabel='待付款' index = {0} />
          <OrderList tabLabel='待发货' index = {1} />
          <OrderList tabLabel='待收货' index = {2} />
          <OrderList tabLabel='待评价' index = {3} />
          <OrderList tabLabel='退款/售后' index = {4} />
        </ScrollableTabView>
      </View>
    )
  }
  
}