/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Navigator,
  TouchableOpacity,
  WebView,
  View
} from 'react-native';

import Header from '../Header/header.js'


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state={blog:'<div style="margin-top:50px;text-align:center">正在加载数据...</div>'}
  }
  componentDidMount(){
      fetch('http://lwons.com:3000/query/blogDetail', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          detailId:this.props.id
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(this.refs.webWiewId){
          this.setState({blog:responseJson.data.blog})
        }
      })
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName={this.props.title} navigator={this.props.navigator}/>
          </View>
          <WebView
              ref = "webWiewId"
              style={{flex:1}}
              source={{html: this.state.blog}}
              />
      </View>
    );
  }
}
const styles  = StyleSheet.create({

})
export default Detail;
