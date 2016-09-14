/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component ,PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View,
  ToastAndroid,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import List from '../List/list.js'
import Icon from 'react-native-vector-icons/Ionicons'
import SearchPage from '../Search/index'

class Home extends Component {
  saveData(data){
    //缓存首页数据
    AsyncStorage.setItem('HomePageData', JSON.stringify(data), () => {
        // AsyncStorage.mergeItem('HomePageData', JSON.stringify(data), () => {
        // });
    });
  }
  constructor(props) {
    super(props);
    this.state = {hotList: [],newList:[]};
  }
  componentWillMount(){
    AsyncStorage.getItem('HomePageData', (err, result) => {
        // alert(result)
        if(result){
          let value = JSON.parse(result);
          this.setState({hotList:value[0],newList:value[1]})
        }
    });
  }
  componentDidMount() {
    let postHot = new Promise((resolve,reject)=>{
      fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=3&type=', {
        method: 'GET'
      }).then((response) =>{
        resolve(JSON.parse(response._bodyInit).data.blogList)
      },()=>{
        reject('获取热门失败')
      })
    })
    let postNew = new Promise((resolve,reject)=>{
      fetch('http://lwons.com:3000/query/blog?index=1&name=&num=5&orderby=1&type=', {
        method: 'GET'
      }).then((response) =>{
        resolve(JSON.parse(response._bodyInit).data.blogList)
      },()=>{
        reject('获取最新失败')
      })
    })
    Promise.all([postHot,postNew]).then((value)=>{
        this.setState({hotList:value[0],newList:value[1]})
        this.saveData(value)
    },(value)=>{
        ToastAndroid.show(value[0], ToastAndroid.SHORT);
    })
  }
  _onPressSearch(){
    const { navigator } = this.props;
    //这里可以取得 props.navigator:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'SearchPage',
            component: SearchPage
        })
    }
  }
  _renderList(item){
    if(item._id){
      return (
        <List data={item} key={item._id} navigator={_navigator}/>
      )
    }
  }
  render() {
    let _navigator = this.props.navigator;
    return (
      <View style={{flex:1,alignItems:'stretch'}}>
        <TouchableOpacity onPress={this._onPressSearch.bind(this)}>
            <View style={styles.topHead} >
              <View style={styles.searchHead}>
                  <Icon
                      name='ios-search'
                      size={25}
                      color='#8A8686'
                  />
                <Text style={{paddingLeft:10}}>点击输入框搜索关键字</Text>
              </View>
            </View>
          </TouchableOpacity>
        <ScrollView >
          <Text style={styles.hotHead} >热门推荐</Text>
          {
            this.state.hotList.map((item,i)=>{
              return (
                <List data={item} key={item._id} navigator={_navigator}/>
              )
            })
          }
          <Text style={styles.newHead}>最新推荐</Text>
          {
            this.state.newList.map((item,i)=>{
              return (
                <List data={item} key={item._id}  navigator={_navigator}/>
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
    height:60,
    flexDirection:"row"
  },
  searchHead:{
    flexDirection: 'row', alignItems: 'center' ,backgroundColor:'#fff',flex:1,justifyContent: 'center',
    borderRadius:5
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
})
export default Home;
