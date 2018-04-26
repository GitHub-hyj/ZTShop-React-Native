'use strict'

import React, { Component } from 'react';
import AutoResponisve from 'autoresponsive-react-native';
import resolveAssetSource from 'resolveAssetSource';

import {
  Platform,
  // AppRegistery,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var getUrl = "http://192.168.1.123:3000/api/note/list?page=1&pageSize=20";

const screenWidth = Dimensions.get('window').width;

export default class Show extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      datas: [],
      imgSizes: []
    };
  }
  static navigationOptions = {
    title: '买家秀'
  }
  
  getChildrenStyle(i) {
    var option = this.state.imgSizes[i];
    return{
      width: option.width ? option.width : 0,
      height:  option.height ? option.height : 0 + scaleSizeToFit(77),
      borderRadius: 5,
      backgroundColor: 'white',
      marginLeft: scaleSizeToFit(6),
      borderWidth: scaleSizeToFit(1),
      borderColor: 'rgba(200, 199, 204, 1)',
      shadowColor:'rgba(200, 199, 204, 1)',
      shadowOffset:{h:4,w:4},
      shadowRadius:3,
      shadowOpacity:0.8,
    }
    
  }
  getAutoResponsiveProps() {
    return {
        
    };
  };
  getImageSize = () => {
    for (var i = 0; i < this.state.datas.length; i++) {
      let imgUrl = 'http://192.168.1.123:3000/' + this.state.datas[i].pics[0];
      Image.getSize(imgUrl, (width, height) => {
        var option = {
          width: '',
          height: ''
        }
        let imgWidth = (Dimensions.get('window').width - scaleSizeToFit(18)) / 2;
        let rate = imgWidth / width;
        let imgHeight = height * rate;
        option.width = imgWidth;
        option.height = imgHeight;
        this.state.imgSizes.push(option);
        
        if ( this.state.imgSizes.length === this.state.datas.length - 1) {

          this.setState({
            imgSizes: this.state.imgSizes

          })
        }
        
      });
    };
    
  }
  render() {
    this.getImageSize();
    return(
      <View style = {{ flex: 1 }}>
        <AutoResponisve {...this.getAutoResponsiveProps()}>
          {
            this.state.datas.map( (item, i) => {
              return(
                <View style = {this.getChildrenStyle(i)}>
                  <View style = {{ flexDirection: 'row' }}>
                    <Image source = {{ uri: 'http://192.168.1.123:3000/' + item._user.portrait }} style = {{ width: 32, height: 32 }} />
                    <View>
                      <Text>
                        {item._user.nickname}
                      </Text>
                      <Text>
                        {item._user.createdAt}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </AutoResponisve>
      </View>
    )
  }
  fetchData() {
    fetch(getUrl,'GET')
    .then((response) => {  
        return response.json();  
    })  
    .then((responseText) => {  
        this.setState({
          datas: responseText.data
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
const scaleSizeToFit = (s) => {
   return s * Dimensions.get('window').width / 414;
 }
 
// export { Shop as default };