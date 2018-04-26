'use strict'
import React, { Component } from 'react';
import Modal from 'react-native-modalbox';

import cityList from '../ViewController/city.json';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatListm,
  Picker
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class CityPickerModal extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      provinceSelected: cityList[0].name,
      citySelected: cityList[0].city[0].name,
      areaSelected: cityList[0].city[0].area[0],
      cityArr: cityList[0].city,
      areaArr: cityList[0].city[0].area
    };
  }
  _openModal = () => {
    this.refs.cityPickerModal.open();
  }
  render() {
    return(
      <Modal ref = {'cityPickerModal'} position = {'bottom'} style = {{ height: 250 }} swipeToClose = {false}>
          <TouchableOpacity onPress = { () => {
            let option = {
              'province': this.state.provinceSelected,
              'city': this.state.citySelected,
              'area': this.state.areaSelected
            }
            this.refs.cityPickerModal.close();
            this.props.getAddressInfo(option);
          }}>
            <View style = {{ flexDirection: 'row-reverse', alignItems: 'space-between' }}>
              <Text style = {{ fontSize: 18, marginTop: 15, marginRight: 15 }}>确定</Text>
            </View>
          </TouchableOpacity>
          <View style = {{ flexDirection: 'row' }} >
            <Picker
              style={{ height: 200, width: screenWidth / 3, marginTop: 20 }}
              itemStyle = {{ fontSize: 14 }}
              selectedValue = {this.state.provinceSelected}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  provinceSelected: itemValue,
                  cityArr: cityList[itemIndex].city,
                  citySelected: cityList[itemIndex].city[0].name,
                  areaArr: cityList[itemIndex].city[0].area,
                  areaSelected: cityList[itemIndex].city[0].area[0]
                })

              }}>
              {
                cityList.map( (item, i) => {
                  return(
                    <Picker.Item label={item.name} value = {item.name}/>
                  )
                })
              }
            </Picker>
            <Picker
              style={{ height: 200, width: screenWidth / 3, marginTop: 20 }}
              itemStyle = {{ fontSize: 14 }}
              selectedValue = {this.state.citySelected}
              onValueChange={(itemValue, itemIndex) =>{
                this.setState({
                  citySelected: itemValue,
                  areaArr: this.state.cityArr[itemIndex].area,
                  areaSelected: this.state.cityArr[itemIndex].area[0]
                })
              }}>
              {
                this.state.cityArr.map( (item, i) => {
                  return(
                    <Picker.Item label={item.name} value = {item.name}/>
                  )
                })
              }
            </Picker>
            <Picker
              style={{ height: 200, width: screenWidth / 3, marginTop: 20}}
              itemStyle = {{ fontSize: 14 }}
              selectedValue = {this.state.areaSelected}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({
                  areaSelected: itemValue
                })
              }}>
              {
                this.state.areaArr.map( (item, i) => {
                  return(
                    <Picker.Item label={item} value = {item}/>
                  )
                })
              }
            </Picker>
          </View>
      </Modal>

    )
  }
}
 
// export { Shop as default };