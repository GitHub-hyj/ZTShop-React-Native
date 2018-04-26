'use strict'
import React, { Component } from 'react';
import CityPickerModal from '../View/CityPickerModal.js'

import cityList from './city.json';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList,
  Picker,
  TextInput,
  Switch
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class EditAddress extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      province: this.props.navigation.state.params.addressModel.province,
      city: this.props.navigation.state.params.addressModel.city,
      area: this.props.navigation.state.params.addressModel.area,
      switchValue: this.props.navigation.state.params.addressModel.isDefault,
      addressModel: this.props.navigation.state.params.addressModel
    };
  }

  static navigationOptions = {
    title: '地址',
    headerRight: (
      <TouchableOpacity 
        onPress = { () => {
          
        }}>
        <View>
          <Text style = {{ fontSize: 15, marginRight: 16 }}>保存</Text>
        </View>
      </TouchableOpacity>
    )
  }
  goBackToVc = () => {

  }
  _renderHeaderComponent = () => {
    return <View style = {{ height: 20, width: screenWidth }}></View>
  }
  _renderItem = (info) => {
    let key = info.section.key;
    let item = info.item;
    let index = info.index;
    
    if (key === 'A' && index < 2) {
      
      return(
        <View style = {{ flexDirection: 'row', paddingLeft: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: 'white' }}>
          <Text style = {{ fontSize: 15 }}>{item.title}</Text>
          <TextInput style = {{ marginLeft: 20, width: screenWidth - 60 }} value = {index ? this.state.addressModel.phonenumber : this.state.addressModel.recipient} ></TextInput>
        </View>
      )
    }else if(key === 'A' && index === 2){
      return(
        <TouchableOpacity 
          onPress = {this.showDatePicker}>
          <View style = {{ flexDirection: 'row', paddingLeft: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: 'white', justifyContent: 'space-between' }}>
            <Text>{item.title}</Text>
            <View style ={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style = {{ marginRight: 6 }}>{this.state.province} {this.state.city} {this.state.area}</Text>
              <Image source = { require('../../../Assets/mine/forward.png')} style = {{ width: 20, height: 20, marginRight: 10 }}  />
            </View>
          </View>
        </TouchableOpacity>
      )

    }else if(key === 'A' && index === 3){
      return(
        <View style = {{ height: 100, width: screenWidth, backgroundColor: 'white' }}>
          <TextInput 
          style = {{ flex: 1, paddingLeft: 10, paddingRight: 10}} 
          placeholder = '请填写详细地址，不少于5个字'
          value = {this.state.addressModel.address}>
          </TextInput>
        </View>
      )
    }else{
      return(
        <View style = {{ flexDirection: 'row', paddingLeft: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style = {{ fontSize: 15 }}>{item.title}</Text>
          <Switch 
          style = {{  marginRight: 10 }} 
          onTintColor = 'rgba(250, 86, 86, 1)'
          value = {this.state.switchValue} 
          onValueChange = { () => {
            this.setState({
              switchValue: !this.state.switchValue
            })
          } }/>
        </View>
      )
    }
  }
  _getAddressInfo = (option) => {
    this.state.address = option.province + ' ' + option.city + ' ' + option.area;
    this.setState({
      address: this.state.address
    })
  }
  showDatePicker = () => {
    this.refs.CityPickerView._openModal();
  }
  _separator = () => {
    return <View style={{ width: screenWidth, height:0.5}}/>;
  }
  render() {

    return(
      <View style = {{ flex: 1}}>
        <SectionList 
          sections = {[
            { data : [{'title': '收件人'}, {'title': '联系电话'}, {'title': '地区'}, {'title': '请填写详细地址，不少于5个字'}], key: 'A' },
            { data : [{'title': '设为默认'}], key: 'B' },
          ]}
          renderItem = {this._renderItem}
          ItemSeparatorComponent = {this._separator}
          renderSectionHeader = {this._renderHeaderComponent} />
          <CityPickerModal ref = {'CityPickerView'} getAddressInfo = {this._getAddressInfo} />
      </View>
      
    )
  }
}
 
// export { Shop as default };