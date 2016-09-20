import React ,{Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'

import Header from '../Header/header'
import Icon from 'react-native-vector-icons/Ionicons'
import SearchList from './searchList'

class Search extends Component{
  constructor(props){
    super(props)
    this.state = {
      history:[]
    }
  }
  saveData(text){
    let historyList = this.state.history,
        newHistory = [text];
    //利用数组搬用。重复直接跳过
    for(var i = 0;i < historyList.length;i++){
        if(historyList[i] != text && newHistory.length < 5){
          newHistory.push(historyList[i])
        }else if(newHistory.length == 5){
          break
        }
    }
    AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory), () => {
        // AsyncStorage.mergeItem('HomePageData', JSON.stringify(data), () => {
        // });
    });
  }
  _submitSearch(event){
    if(event.nativeEvent.text.replace(/\s/g,'')){
        this.goToDetail(event.nativeEvent.text)
    }else{
        alert("请输入关键字")
    }
  }
  goToDetail(text){
    const {navigator} = this.props;
    navigator.replace({
        name: 'SearchList',
        component: SearchList,
        params:{
          keyword:text
        }
    })
    //缓存数据
    this.saveData(text)
  }
  componentWillMount(){
    AsyncStorage.getItem('searchHistory', (err, result) => {
        if(result){
          let value = JSON.parse(result);
          this.setState({history:value})
        }
    });
  }
  _renderHistory(){
    if(this.state.history.length){
      return (
        <View style={styles.historyItem}>
            <Text>搜索历史</Text>
        </View>
      )
    }else{
      return false
    }
  }
  _pressHistory(item){
    this.goToDetail(item)
  }
  render(){
    return (
      <View style={{flexDirection:'column',flex:1,backgroundColor:'#fff'}}>
          <View style={{alignItems:'stretch',height:50}}>
            <Header headerName='搜索关键字' navigator={this.props.navigator}/>
          </View>
          <View style={styles.searchMain}>
              <Icon
                  name='ios-search'
                  size={25}
                  color='#8A8686'
                  style={{flex:1}}
              />
              <TextInput style={styles.searchInput}
                underlineColorAndroid = {'transparent'}
                multiline={false}
                placeholder='输入标题关键字'
                keyboardType ='web-search'
                onSubmitEditing = {(event) => this._submitSearch(event)}
              />
          </View>
          {this._renderHistory()}
          {
            this.state.history.map((item,i)=>{
              return (
                <TouchableOpacity onPress={this._pressHistory.bind(this,item)} key={i}>
                    <View style={styles.historyItem} >
                        <Text >{item}</Text>
                    </View>
                </TouchableOpacity>
              )
            })
          }
      </View>
    )
  }
}
const styles = StyleSheet.create({
    searchMain:{
      height:40,
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center',
      borderColor: '#ddd',
      borderWidth: 1,
      margin:10,
      borderRadius:5,
      paddingLeft:10
    },
    searchInput:{
      height:40,
      flex:9,
      marginTop:8
    },
    historyItem:{
      height:40,
      borderBottomWidth:1,
      borderColor:'#ddd',
      padding:10
    }
})
export default Search
