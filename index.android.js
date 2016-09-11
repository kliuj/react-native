/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Navigator,
  View
} from 'react-native';

class list extends Component{
  constructor(props) {
    super(props);
    this.state = {list:[]};
  }
  render (){
    let list = [];
    return (
      <Text style={styles.listItem}>
        第一条
      </Text>
    )
  }
}
class pro extends Component {
  constructor(props) {
    super(props);
    this.state = {hotList: [],newList:[]};
  }
  render() {
    fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=3&type=', {
      method: 'GET'
    }).then((response) =>{
      // alert(JSON.stringify(response._bodyInit))
      this.setState({hotList:JSON.parse(response._bodyInit).data.blogList})
    })
    fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=1&type=', {
      method: 'GET'
    }).then((response) =>{
      // alert(JSON.stringify(response._bodyInit))
      this.setState({newList:JSON.parse(response._bodyInit).data.blogList})
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
                <View key={item._id} style={styles.listItem}>
                  <Text  numberOfLines={1} style={{height:30}}>
                    {item.title}
                  </Text>
                  <View style={{flex:1,flexDirection: 'row',height:30,paddingRight:10}}>
                    <Text style={{flex:1}} numberOfLines={1}>
                      {item.user}
                    </Text>
                    <Text style={{flex:1,textAlign: 'right'}} numberOfLines={1}>
                      点击量：{item.sum}
                    </Text>
                  </View>
                </View>
              )
            })
          }
          <Text style={styles.newHead}>最新推荐</Text>
          {
            this.state.newList.map((item,i)=>{
              return (
                <View key={item._id} style={styles.listItem}>
                  <Text  numberOfLines={1} style={{height:30}}>
                    {item.title}
                  </Text>
                  <View style={{flex:1,flexDirection: 'row',height:30,paddingRight:10}}>
                    <Text style={{flex:1}} numberOfLines={1}>
                      {item.user}
                    </Text>
                    <Text style={{flex:1,textAlign: 'right'}} numberOfLines={1}>
                      发布时间：{item.time.split("T")[0]}
                    </Text>
                  </View>
                </View>
              )
            })
          }
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
AppRegistry.registerComponent('pro', () => pro);
