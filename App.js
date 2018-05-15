/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Login from './App/Components/Login/ZTLoginVc.js'

import Home from './App/Components/Shop/ViewController/HomeVc.js'
import Shop from './App/Components/Shop/ViewController/ShopVc.js'
import GoodsDetail from './App/Components/Shop/ViewController/GoodsDetailVc.js'
import CommentList from './App/Components/Shop/ViewController/CommentListVc.js'
import MakeOrder from './App/Components/Shop/ViewController/MakeOrderVc.js'

import Cart from './App/Components/Cart/ViewController/Cart.js'
import Show from './App/Components/Show/ViewController/Show.js'

import Mine from './App/Components/Mine/ViewController/MineVc.js'
import UserInfo from './App/Components/Mine/ViewController/UserInfoVc.js'
import UserAddress from './App/Components/Mine/ViewController/UserAddressVc.js'
import EditAddress from './App/Components/Mine/ViewController/EditAddressVc.js'
import OrderManageVc from './App/Components/Mine/ViewController/OrderManageVc.js';

import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  
    this.state = {
      selectedTab: "首页"
    };
  }
  render() {
    return(
      <MainWindow />
      // <View></View>
    )
  }
 
}

const MainScreenNavigator = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      tabbarIcon: ({tintColor}) => (
        <Image
          source={require('./App/Assets/tabbar/shop.png')}
          style={[{tintColor: tintColor},{ weight: 24, height: 24, resizeMode: 'contain'}]} />
      )

    }
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: '购物车',
      tabbarIcon: ({tintColor}) => (
        <Image
          source={require('./App/Assets/tabbar/gouwuche.png')}
          style={[{tintColor: tintColor},{ weight: 24, height: 24, resizeMode: 'contain'}]} />
      )
    }
  },
  // Show: {
  //   screen: Show,
  //   navigationOptions: {
  //     tabBarLabel: '买家秀',
  //     tabbarIcon: ({tintColor}) => (
  //       <Image
  //         source={require('./App/Assets/tabbar/maijiaxiu.png')}
  //         style={[{tintColor: tintColor},{ weight: 24, height: 24, resizeMode: 'contain'}]} />
  //     )
  //   }
  // },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabbarIcon: ({tintColor}) => (
        <Image
          source={require('./App/Assets/tabbar/wode.png')}
          style={[{tintColor: tintColor},{ weight: 24, height: 24, resizeMode: 'contain'}]} />
      )
    }
  },
},{
  swipeEnabled: true,
  backBehavior: '1',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'red',
    // showIcon: false
    indicatorStyle: {
      height: 1,
      color: 'red',
      backgroundColor: 'red',
      width: 10
    }
  }
})

const MainWindow  = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '登录'
    }
  },
  // Register: {
  //   screen: Register,
  //   navigationOptions: {
  //     headerTitle: '注册'
  //   }
  // },
  Home: {
    screen: MainScreenNavigator,
  },
  Shop: {
    screen: Shop
  },
  GoodsDetail: {
    screen: GoodsDetail
  },
  CommentList: {
    screen: CommentList
  },
  MakeOrder: {
    screen: MakeOrder
  },
  UserInfo: {
    screen: UserInfo
  },
  UserAddress: {
    screen: UserAddress
  },
  EditAddress: {
    screen: EditAddress
  },
  OrderManageVc: {
    screen: OrderManageVc
  }
  
},{

  // mode: 'modal',
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabText:{
    color:'#000000',
    fontSize:10
  },
  selectedTabText:{
    color:'#D81E06'
  },
  icon:{
    width:20,
    height:20
  }
});
// AppRegistry.registerComponent('MainWindow', () => MainWindow);