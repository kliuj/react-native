import React ,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView
}from 'react-native'
import {CommonNameHeader} from '../Header/header.js'
import ScrollableTabView ,{ScrollableTabBar}from 'react-native-scrollable-tab-view';
import Edit from '../Edit/index'
import List from './list.js'

class ScrollList extends Component {
    constructor(props) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        super(props);
        this.state={
          listResource:[],
          isAllLoad:false,
          pageIndex:1,
          ds:ds
        };
    }
    componentDidMount(){
      let url = this.props.type ? 'http://lwons.com:3000/query/blog?name=&num=10&orderby=1&type='+this.props.type+'&index=1': 'http://lwons.com:3000/query/blog?name=&num=10&orderby=1&type=&index=1';
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data.blogList.length == 10){
          this.setState({
            listResource:responseJson.data.blogList,
            pageIndex:2,
            ds: this.state.ds.cloneWithRows(responseJson.data.blogList)
          })
        }else{
          this.setState({
            listResource:responseJson.data.blogList,
            pageIndex:2,
            isAllLoad:true,
            ds: this.state.ds.cloneWithRows(responseJson.data.blogList)
          })
        }
      })
    }
    _onEndReached(){
      if(this.state.isAllLoad){
        return ;
      }
      let url = this.props.type ? 'http://lwons.com:3000/query/blog?name=&num=10&orderby=1&type='+this.props.type+'&index='+this.state.pageIndex : 'http://lwons.com:3000/query/blog?name=&num=10&orderby=1&type=&index='+this.state.pageIndex;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data.blogList.length == 10){
          this.setState({
            listResource:this.state.listResource.concat(responseJson.data.blogList),
            pageIndex:this.state.pageIndex +1,
            ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.data.blogList))
          })
        }else{
          this.setState({
            listResource:this.state.listResource.concat(responseJson.data.blogList),
            pageIndex:this.state.pageIndex +1,
            ds:this.state.ds.cloneWithRows(this.state.listResource.concat(responseJson.data.blogList)),
            isAllLoad:true
          })
        }
      })
    }
    render() {
      if(this.state.listResource.length){
        return (
          <ListView
             dataSource={this.state.ds}
             onEndReached={this._onEndReached.bind(this)}
             renderRow={(rowData) =><List data={rowData} navigator={this.props.navigator}/>}
           />
        )
      }else{
        return (
           <View
                 style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
           >
               <Text style={styles.info}>正在加载</Text>
           </View>
        )
      }

    }
}


class ListIndex extends Component {
    constructor(props){
      super(props)
      this.state = {
          tabNames: ['全部', '随笔', 'JavaScript','NodeJS','CSS','HTML','MongoDB','游记','EJS'],
          tabType:[,1,2,3,7,8,4,5,6]
      }
    }
    render (){
      return (
        <View
              style={{flex: 1}}
        >
            <CommonNameHeader headerName='分类列表'/>
            <ScrollableTabView
                style={{backgroundColor: '#FCFCFC'}}
                locked={false}
                tabBarUnderlineColor="#33cd5f"
                tabBarActiveTextColor="#33cd5f"
                scrollWithoutAnimation={true}
                tabBarPosition={'top'}
                renderTabBar={() => <ScrollableTabBar tabNames={this.state.tabNames} />}
            >
            {
              this.state.tabNames.map((item,i)=>{
                return (
                  <ScrollList tabLabel={item} navigator={this.props.navigator} key={i} name={item} type={this.state.tabType[i]}/>
                )
              })
            }
            </ScrollableTabView>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  info:{
    textAlign: 'center', lineHeight: 25, color: '#888'
  },
  tabs: {
      flexDirection: 'row',
      height: 55,
      borderTopWidth: 1,
      borderColor: '#ddd',
  },
  tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  tabItem: {
      flexDirection: 'column',
      alignItems: 'center',
      padding:10,
      fontSize:16
  }
})

export default ListIndex
