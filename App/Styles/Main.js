import {
  StyleSheet,
  Dimensions
} from 'react-native';

export default StyleSheet.create({
  container: {
        flex:1,
        flexDirection:'row',
    },
    circleContainer: {
        position:'absolute',
        left:0,
        top:120,
    },
    circle: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#f4797e',
        marginHorizontal:5,
    },
    circleSelected: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#ffffff',
        marginHorizontal:5,
    },
    text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      padding: 5,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'gray',
      backgroundColor: 'gray',
      fontSize: 12,
    },
    androidTextBlackColor: {
      color: 'black'
    }
})
