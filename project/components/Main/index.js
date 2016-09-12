/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component ,PropTypes } from 'react';
import {
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  TouchableHighlight
} from 'react-native';

import List from '../List/list.js'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {hotList: [],newList:[]};
  }
  render() {
    let postHot = new Promise((resolve,reject)=>{
      fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=3&type=', {
        method: 'GET'
      }).then((response) =>{
        resolve(JSON.parse(response._bodyInit).data.blogList)
      })
    })
    let postNew = new Promise((resolve,reject)=>{
      fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=1&type=', {
        method: 'GET'
      }).then((response) =>{
        resolve(JSON.parse(response._bodyInit).data.blogList)
      })
    })
    let _post = Promise.all([postHot,postNew]).then((value)=>{
        this.setState({hotList:value[0],newList:value[1]})
    },()=>{

    })
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
          {
            this.state.hotList.map((item,i)=>{
              return (
                <List data={item} key={item._id}/>
              )
            })
          }
          <Text style={styles.newHead}>最新推荐</Text>
          {
            this.state.newList.map((item,i)=>{
              return (
                <List data={item} key={item._id}/>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}
class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
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
export default Home;
