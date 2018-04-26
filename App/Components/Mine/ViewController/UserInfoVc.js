'use strict'
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SectionList
} from 'react-native';

const userInfoUrl = 'http://192.168.1.123:3000/';

const screenWidth = Dimensions.get('window').width;

let options = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      avatarSource: ''
    };
  }
  static navigationOptions = {
    title: '个人信息'
  }
  _renderHeaderComponent = () => {
    return(
      <View style = {{ height: 20 }}></View>
    )
  }
  _renderItem = (info) => {
    let index = info.index;
    let item  = info.item;
    let key = info.section.key;
    if (key === 'A' && index === 0) {
      return(
        <TouchableOpacity 
         onPress = {this.setPortrait}>
          <View style = {{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, backgroundColor: 'white', alignItems: 'center' }}>
            <Text style = {{ fontSize: 16 }}>
              {item.title}
            </Text>
            <Image source = { this.state.avatarSource } style = {{ width: 40, height: 40 }} cornerRadius = {20}/>
          </View>
        </TouchableOpacity>
      )
    }else if(key === 'A'){
      return(
        <View style = {{ justifyContent: 'center', paddingTop: 15, paddingBottom: 15, paddingLeft: 15, backgroundColor: 'white' }}>
          <Text style = {{ fontSize: 16 }}>
            {item.title}
          </Text>
        </View>
      )
    }else{
      
      return(
        <TouchableOpacity 
         onPress = { () => {
          this.props.navigation.navigate('UserAddress');
         }}>
          <View style = {{ justifyContent: 'center', paddingTop: 15, paddingBottom: 15, paddingLeft: 15, backgroundColor: 'white' }}>
            <Text style = {{ fontSize: 16 }}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    
  }
  _separator = () => {
    return <View style={{ width: screenWidth, height:0.5, backgroundColor:'rgba(200, 199, 204, 1)'}}/>;
  }
  setPortrait = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        this.setState({
          avatarSource: source
        });
      }
    });
  }
  pushToVc = (index) => {
    alert('111')
    if (index) {
      this.props.navigation.navigate('UserAddress');
    }else{
      this.props.navigation.navigate('')
    }
  }
  render() {
    return(
      <View style = {{ flex: 1 }}>
        <SectionList 
          sections = {[
            { data : [{'title': '头像'}, {'title': '昵称'}, {'title': '性别'}], key: 'A' },
            { data : [{'title': '修改密码'}, {'title': '管理收货地址'}], key: 'B' },
          ]}
          renderItem = {this._renderItem}
          ListHeaderComponent = {this._renderHeaderComponent}
          ItemSeparatorComponent = {this._separator}
          renderSectionHeader = {this._renderHeaderComponent}
          />
      </View>

    )
  }
}
 
// export { Shop as default };