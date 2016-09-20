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
     this.state = {
       resultList:[],
       isAllLoad:false,
       pageIndex:1,
       ds:ds,
       notice:'正在搜索数据...'
      }
   }
   componentDidMount(){
    //  fetch('http://lwons.com:3000/mobile/search?page=1&q='+this.props.keyword)
    //  .then((response) => response.json())
    //  .then((responseJson) => {
    //    if(responseJson.data.data.length && this.refs.searchContent){
    //      this.setState({
    //        resultList:responseJson.data.data,
    //        ds:ds.cloneWithRows(responseJson.data.data),
    //        pageIndex:2
    //      })
    //    }else{
    //      this.setState({notice:'暂无相关数据'})
    //    }
    //    if(responseJson.data.data.length != 5){
    //      this.setState({isAllLoad:true})
    //    }
    //  })
     let urls = ['http://lwons.com:3000/mobile/search?page=1&q='+this.props.keyword,'http://lwons.com:3000/mobile/search?page=2&q='+this.props.keyword];
     Promise.all(urls.map((url) =>
         fetch(url).then((response) => response.json())
     )).then((response) => {
         let list = response[0].data.data.concat(response[1].data.data)
        //  alert( JSON.stringify(list))
         if(list.length && this.refs.searchContent){
              this.setState({
                resultList:list,
                ds:ds.cloneWithRows(list),
                pageIndex:3
              })
          }else{
            this.setState({notice:'暂无相关数据'})
          }
          if(list.length != 10){
            this.setState({isAllLoad:true})
          }
     })
   }
   _onEndReached(){
     if(this.state.isAllLoad){
       return ;
     }
     fetch('http://lwons.com:3000/mobile/search?page='+this.state.pageIndex+'&q='+this.props.keyword)
     .then((response) => response.json())
     .then((responseJson) => {
       if(responseJson.data.data.length == 5){
         this.setState({
           resultList:this.state.resultList.concat(responseJson.data.data),
           pageIndex:this.state.pageIndex +1,
           ds:this.state.ds.cloneWithRows(this.state.resultList.concat(responseJson.data.data))
         })
       }else{
         this.setState({
           listResource:this.state.resultList.concat(responseJson.data.data),
           pageIndex:this.state.pageIndex +1,
           ds:this.state.ds.cloneWithRows(this.state.resultList.concat(responseJson.data.data)),
           isAllLoad:true
         })
       }
     })
   }
   _renderList(){
     if(this.state.resultList.length){
        return (
          <ListView
             dataSource={this.state.ds}
             onEndReached={this._onEndReached.bind(this)}
              onEndReachedThreshold  ={0}
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
       <View style={{flexDirection:'column',flex:1,backgroundColor:'#fff'}} ref="searchContent" >
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
