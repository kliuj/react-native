import React,{Component} from 'react';
import{
  View,
  Text,
  ListView,
  StyleSheet
} from 'react-native';

import Header from '../Header/header.js'
import {SearchList} from '../List/list.js'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default  class SearchResult extends Component {
   constructor(props){
     super(props)
     this.state = {resultList:null,notice:'正在搜索数据...'}
   }
   componentDidMount(){
     fetch('http://lwons.com:3000/mobile/search?page=1&q='+this.props.keyword)
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.data.data.length && this.refs.searchContent){
         this.setState({resultList:ds.cloneWithRows(responseJson.data.data)})
       }else{
         this.setState({notice:'暂无相关数据'})
       }
     })
   }
   getData(){

   }
   _renderList(){
     if(this.state.resultList){
        return (
          <ListView
             dataSource={this.state.resultList}
             renderRow={(rowData) =><SearchList data={rowData} navigator={this.props.navigator}/>}
           />
        )
     }else{
       return (
          <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
              <Text style={styles.info}>{this.state.notice}</Text>
          </View>
       )
     }
   }
   render(){
     return (
       <View style={{flexDirection:'column',flex:1}} ref="searchContent" >
           <View style={{alignItems:'stretch',height:50}}>
             <Header headerName={this.props.keyword} navigator={this.props.navigator}/>
           </View>
           {this._renderList()}
       </View>
     )
   }
}

const styles = StyleSheet.create({
  info:{
    textAlign: 'center', lineHeight: 25, color: '#888',fontSize:20
  }
})
