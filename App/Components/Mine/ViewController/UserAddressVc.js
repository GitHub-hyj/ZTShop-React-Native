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

const url = 'http://192.168.1.123:3000/api/address/list?_user=5a4b3abd97f0f42f26372ddf';
const address_default_url = 'http://192.168.1.123:3000/api/address/default';

export default class UserAddress extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      addressData: []
    };
  }
  static navigationOptions = {
    title: '管理收货地址'
  }
  _renderHeaderComponent = () => {
    return(
      <View style = {{ height: 20 }}></View>
    )
  }
  
  _renderItem = (info) => {
    
    let item = info.item;
    let index = info.index;
    return(
      <View style = {{ justifyContent: 'center', backgroundColor: 'white', paddingBottom: 8 }}>
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 8, marginTop: 8, paddingRight: 8 }}>
          <Text>{item.recipient}</Text>
          <Text>{item.phonenumber}</Text>
        </View>
        <Text style = {{marginLeft: 8}}>{item.province} {item.city} {item.address}</Text>
        <View style = {{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity onPress = { () => this.setDefaultAddress(item) } >
            <View style = {{ marginLeft: 8, flexDirection: 'row', alignItems: 'center' }}>
              <Image style = {{ width: 20, height: 20, marginRight: 2 }} source = { item.isDefault ? require('../../../Assets/cart/select.png') : require('../../../Assets/cart/unSelect.png') } />
              <Text>设为默认</Text>
            </View>
          </TouchableOpacity>
          <View style = {{ flexDirection: 'row', marginRight: 8 }}>
            <TouchableOpacity
             onPress = { () => this._editAddress(item)}>
              <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style = {{ width: 20, height: 20, marginRight: 2 }} source = { require('../../../Assets/mine/edit.png') } />
                <Text>编辑</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style = {{ flexDirection: 'row', alignItems: 'center'  }}>
                <Image style = {{ width: 20, height: 20, marginRight: 2 }} source = { require('../../../Assets/mine/delete.png') } />
                <Text>删除</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  _editAddress = (item) => {

    this.props.navigation.navigate('EditAddress', { addressModel: item, isEdit: true })
  }
  _separator = () => {
    return <View style={{ width: screenWidth, height:10}}/>;
  }
  render() {

    return(
      <View style = {{ flex: 1 }}>
        <FlatList 
          data = {this.state.addressData}
          renderItem = {this._renderItem}
          ItemSeparatorComponent = {this._separator} />
          <TouchableOpacity onPress = { () => {
            var option = {
              recipient: '',
              phonenumber: '',
              province: '',
              city: '',
              area: '',
              address: '',
              isDefault: ''
            }
            this.props.navigation.navigate('EditAddress', {addressModel: option, isEdit: false});
          }}>
            <View style = {{ backgroundColor: 'rgba(250, 86, 86, 1)', width: screenWidth, height: 50, justifyContent: 'center', alignItems: 'center' }}>
              <Text style = {{ color: 'white', fontSize: 16}}>添加地址</Text>
            </View>  
          </TouchableOpacity>
      </View>
    )
  }
  setDefaultAddress = (item) => {
    
    if (!item.isDefault) {  

      let formData = new FormData();
      formData.append("_user", "5a4b3abd97f0f42f26372ddf");
      formData.append("addressId", item._id);
      
      fetch(address_default_url, {
      method:'POST',
      headers:{
        'Content-Type':'multipart/form-data'
      },
      body:formData,
      }).then((response)=>{
          if (response.ok) {
              return response.json();
          }
      }).then((json)=>{
        
          alert(JSON.stringify(json));
      })
      .catch((error)=>{
          console.error(error);
      })
    }
  }

  fetchData() {
    fetch(url,'GET')
    .then((response) => {  

        return response.json();  
    })  
    .then((responseText) => {  
        this.setState({
          addressData: responseText.data
        })
    })  
    .catch((error) => {  
      alert('error: ' + error)  
    })
  }
  componentDidMount() {
    this.fetchData();
  }
}
 
// export { Shop as default };