import React,{Component} from 'react'
import {
  View,
  Text
}from 'react-native'

import Header from '../Header/header'
export default class About extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={{flex:1}}>
        <Header headerName='关于软件' navigator={this.props.navigator}/>
        <View style={{justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'#fff'}}>
            <Text>author：k.liu</Text>
            <Text>version：1.0.0</Text>
        </View>
      </View>
    )
  }
}
