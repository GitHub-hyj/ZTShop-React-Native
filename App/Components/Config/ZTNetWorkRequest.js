'use strict'

import React, { Component } from 'react';

class ZTNetWorkRequest extends Component {

  /**
    * post请求
    * url : 请求地址
    * data : 参数（json对象）
    * callback: 回调函数
    * */
  static post(url, data, callback) {
    var fetchOption = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringfy(data)
    };

    fetch(url, fetchOption)
    .then((response) => response.text())
    .then((responseText) => {
        callback(JSON.parse(responseText))
    })
    .done();
  }
  /**
   * get请求
   * url : 请求地址
   * callback : 回调函数
   * */
  static get(url, params, callback) {
    if (params) {
      url = url + '?';
      for(var key in params){
        url = url + key + '=' + params[key] + '&';
      }
    }
    
    //fetch请求
    fetch(url,'GET')
    .then((response) => {  
        return response.json(); 
    })  
    .then((responseText) => {  
        callback(responseText)
    })  
    .catch((error) => {  
      alert('error: ' + error)  
    })
  }
}

export default ZTNetWorkRequest;