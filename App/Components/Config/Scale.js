'use strict'
 import React, {Component} from 'react';

 import {
   AppRegistry,
   PixelRatio,
   Dimensions
 } from 'react-native'

var scaleSizeToFit = (s) => {
   return s * Dimensions.get('window').width / 414;
 }

export {scaleSizeToFit as default}
// module.exports = scaleSizeToFit;
