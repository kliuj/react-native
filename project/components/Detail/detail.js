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
    this.state={blog:null,name:'内容详细'}
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
        this.setState({blog:responseJson.data.blog,name:responseJson.data.title})
      })
  }
  render() {
    return (
      <View style={{flexDirection:'column',flex:1}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName={this.state.name} navigator={this.props.navigator}/>
          </View>
          <WebView  style={{flex:1}}
              source={{html: this.state.blog}}
              />
      </View>
    );
  }
}
const styles  = StyleSheet.create({

})
export default Detail;
