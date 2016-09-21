import React ,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ListView,
  Picker,
  AsyncStorage
}from 'react-native'

import {CommonNameHeader} from '../Header/header.js'
import Icon from 'react-native-vector-icons/Ionicons'
import DetailPage from '../Detail/detail.js'

class EditIndex extends Component {
    constructor(props){
      super(props)
      this.state = {
        title:'',
        detail:'',
        type:1
      }
    }
    public(){
      if(!this.state.title.replace(/\s/g,"")){
        alert("标题不能为空");
        return false;
      }
      if(!this.state.detail.replace(/\s/g,"")){
        alert("内容不能为空");
          return false;
      }
      AsyncStorage.getItem('userInfo',(err,result)=>{
        if(result && JSON.parse(result).state){
          this.sendData(JSON.parse(result).name)
        }else{
          alert('请先登录')
        }
      })
    }
    sendData(name){
      fetch('http://lwons.com:3000/mobile/publish',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tdetail:this.state.detail,
          ttile:this.state.title,
          type:this.state.type,
          user:name
        })
      })
      .then((response)=>response.json())
      .then((responseJson)=>{
        if(responseJson.success == 0){
            this.refs.titleInput.clear()
            this.refs.detailInput.clear()
            this.gotoDetail(responseJson.data._id,responseJson.data.title)
        }else{
          alert(responseJson.msg + '请重试')
        }
      })
    }
    gotoDetail(id,title) {
         const { navigator } = this.props;
         //这里可以取得 props.navigator:
         //<Component {...route.params} navigator={navigator} />
         //这里传递了navigator作为props
         if(navigator) {
             navigator.push({
                 name: 'DetailPage',
                 component: DetailPage,
                 params:{
                   id:id,
                   title:title
                 }
             })
         }
    }
    render (){
      return (
        <View
              style={{flex: 1, backgroundColor:'#ddd'}}
        >
            <CommonNameHeader headerName='发布文章' />
            <ScrollView>
                <View >
                    <Text style={styles.info}>标题</Text>
                    <View style={{height:40,flexDirection:'row',backgroundColor:'#fff'}}>
                      <TextInput
                        ref="titleInput"
                        style={{flex:1,paddingLeft:10,height:40}}
                        underlineColorAndroid = {'transparent'}
                        multiline={false}
                        placeholder='输入文章标题'
                        onChangeText={(text) => this.setState({title: text})}
                        />
                    </View>
                    <Text style={styles.info}>正文</Text>
                    <View style={{height:200,flexDirection:'row',backgroundColor:'#fff',marginBottom:10}}>
                      <TextInput
                        ref="detailInput"
                        style={{flex:1,paddingLeft:10,lineHeight:40,height:200}}
                        underlineColorAndroid = {'transparent'}
                        multiline={true}
                        placeholder='输入文章内容'
                        onChangeText={(text) => this.setState({detail: text})}
                        />
                    </View>
                    <View style={{flexDirection:'row',height:40,backgroundColor:'#fff',justifyContent:'center'}}>
                        <Text style={[styles.info,styles.flex1]}>文章类型</Text>
                        <Picker style={styles.flex2}
                          selectedValue={this.state.type}
                          onValueChange={(type) => this.setState({type: type})}>
                          <Picker.Item label="随笔" value="1" />
                          <Picker.Item label="JavaScript" value="2" />
                          <Picker.Item label="NodeJS" value="3" />
                          <Picker.Item label="MongoDB" value="4" />
                          <Picker.Item label="游记" value="5" />
                          <Picker.Item label="Ejs" value="6" />
                          <Picker.Item label="CSS" value="7" />
                          <Picker.Item label="HTML" value="8" />
                        </Picker>
                    </View>
                    <TouchableOpacity style={styles.login} onPress={this.public.bind(this)}>
                        <Text style={{fontSize:16,color:"#fff"}}>发布</Text>
                    </TouchableOpacity>
                </View>
              </ScrollView>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  info:{
    lineHeight: 25, color: '#888',fontSize:16,padding:10,flex:10,
  },
  center:{
    textAlign:'center'
  },
  flex1:{
    flex:2
  },
  flex2:{
    flex:6,
    alignItems:'center',
    height:40
  },
  login:{
    height:50,
    borderRadius:4,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:30,
    marginRight:30,
    marginTop:20,
    marginBottom:20,
    backgroundColor:'#33cd5f'
  }
})
export default EditIndex
