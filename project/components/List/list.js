import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  TouchableOpacity,
  Text
} from 'react-native';
import DetailPage from '../Detail/detail.js'
class List extends Component{
  constructor(props) {
    super(props);
  }
  _pressButton(id) {
       const { navigator } = this.props;
       //这里可以取得 props.navigator:
       //<Component {...route.params} navigator={navigator} />
       //这里传递了navigator作为props
       if(navigator) {
           navigator.push({
               name: 'DetailPage',
               component: DetailPage,
               params:{
                 id:id
               }
           })
       }
  }
  render(){
    let item = this.props.data;
    return (
      <View  style={styles.listItem} >
       <TouchableOpacity onPress={this._pressButton.bind(this,item._id)}>
          <View style={{flex:1,flexDirection: 'row',height:30,paddingRight:10}}>
            <Text  numberOfLines={1} style={{flex:8}}>
              {item.title}
            </Text>
            <Text style={{flex:2,textAlign: 'right',color :'#33cd5f'}} numberOfLines={1}>
              {item.user}
            </Text>
          </View>
          <View style={{flex:1,flexDirection: 'row',height:30,paddingRight:10}}>
            <Text style={{flex:2}} numberOfLines={1}>
              时间：{item.time.split("T")[0]}
            </Text>
            <Text style={{flex:1,textAlign: 'right'}} numberOfLines={1}>
              点击量：{item.sum}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles  = StyleSheet.create({
  listItem:{
    height:84,
    flex:1,
    borderBottomWidth:2,
    borderBottomColor: '#ddd',
    paddingLeft:10,
    paddingTop:15,
    paddingBottom:10
  }
})
export default List
