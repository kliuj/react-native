import React,{Component} from 'react'
import {
  View,
  Text,
  WebView
}from 'react-native'

import Header from '../Header/header'
export default class Reg extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={{flex:1}}>
        <Header headerName='注册账户' navigator={this.props.navigator}/>
        <WebView source={{uri: 'http://lwons.com:3000/reg'}}
            style={{flex:1}}
          />
      </View>
    )
  }
}
