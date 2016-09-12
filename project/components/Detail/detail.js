/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Navigator,
  View
} from 'react-native';

import List from '../List/list.js'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {hotList: [],newList:[]};
  }
  render() {
    return (
      <View style={{flex:1,alignItems:'stretch'}}>
        <View style={styles.topHead} >
          <TextInput
            style={{height: 35,backgroundColor:'#fff',alignItems:'center'}}
            placeholder="输入关键字搜索"
          />
        </View>
        <ScrollView >
          <Text style={styles.hotHead}>热门推荐</Text>

          <Text style={styles.newHead}>最新推荐</Text>

        </ScrollView>
      </View>
    );
  }
}
const styles  = StyleSheet.create({
  topHead:{
    padding:10,
    backgroundColor: '#33cd5f',
    height:60
  },
  hotHead:{
    height: 40,
    flex:1,
    backgroundColor: '#D43636',
    color: '#fff',
    paddingLeft: 10,
    paddingTop:10
  },
  newHead:{
    height: 40,
    flex:1,
    backgroundColor: '#FD692D',
    color: '#fff',
    paddingLeft: 10,
      paddingTop:10
  },
  listItem:{
    height:84,
    flex:1,
    borderBottomWidth:2,
    borderBottomColor: '#ddd',
    paddingLeft:10,
    paddingTop:15,
    paddingBottom:10
  },
  vitem:{

  }
})
export default Detail;
