'use strict'

import React, { Component } from 'react';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'}),
    ]
})

export default class ZTLoginVc extends Component{

  constructor(props) {
    super(props);
  
    this.state = {};
  }
  _onLoginSuccess = () => {
    this.props.navigation.dispatch(resetAction);
    // if (this.state.username === "" || this.state.password === "" ) {
    //   alert('账号密码不能为空！')
    // }else {
    //   loginUrl = `Http://47.91.167.130:8080/GetInfoService.svc/Login/7cd0fba91bbcedfcf041ac21052a92b3e/7/${this.state.username}/${this.state.password}/timespan`;
    //   fetch(loginUrl, {
    //     method: 'GET',
    //   })
    //   .then(response => response.json())
    //   .then(responseData => {
    //     if (responseData.Code === "200") {
    //       this.setState({
    //         loaded: true
    //       })
    //       this.props.navigation.dispatch(resetAction);
    //     }else {
    //       alert(responseData.Message)
    //     }
    //   }).done();
    // }

  }

  render(){
    return(
      <View style = {{ backgroundColor: 'white', flex: 1, flexDirection: 'row' }}>
         <View style = {{ width: Dimensions.get('window').width }}>
           <KeyboardAvoidingView behavior = "padding" style = {{
            flex: 1,
            backgroundColor:'white',
            justifyContent: 'center',
            // paddingHorizontal: 20,
            // paddingTop: 20,
          }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder = "账号"
            onChangeText = { (text) => {
              this.setState({
                username: text
              })
            }}
          />

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20}}
            placeholder = "密码"

            onChangeText = { (text) => {
              this.setState({
                password: text
              })
            }}
          />

        <TouchableOpacity
          onPress = {this._onLoginSuccess}>
          <View style = {{ backgroundColor: 'red', width: Dimensions.get('window').width / 7 * 2, height: 40, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: 'grey', alignSelf: 'center', marginTop: 20 }}>
            <Text style = {{ fontSize: 16, color: 'white' }}>
              登录
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {this._Register}>
          <View style = {{ backgroundColor: 'red', width: Dimensions.get('window').width / 7 * 2, height: 40, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: 'grey', alignSelf: 'center', marginTop: 20 }}>
            <Text style = {{ fontSize: 16, color: 'white' }}>
              注册
            </Text>
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>
      </View>
    )
  }

}