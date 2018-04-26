import {
  StyleSheet,
  Dimensions
} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row'
  },
  img: {
      width: Dimensions.get('window').width,
      height: 200,
      backgroundColor: 'gray'
    },
    detailBottomBtn: {
      backgroundColor: 'rgba(250, 86, 86, 1)', 
      width: Dimensions.get('window').width / 3, 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    detailBottomBtnBorder: {
       borderRightWidth: 0.5, 
       borderRightColor: 'white' 
    },
    detailBottomText: {
      fontSize: 14, 
      color: 'white'
    }
})