import React ,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet,
  TextInput
}from 'react-native'

import {CommonNameHeader} from '../Header/header.js'

class EditIndex extends Component {
    constructor(props){
      super(props)
    }
    render (){
      return (
        <View
              style={{flex: 1, backgroundColor:'#ddd'}}
        >
            <CommonNameHeader headerName='发布文章' />
            <View >
                <Text style={styles.info}>标题</Text>
                <View style={{height:40,flexDirection:'row',backgroundColor:'#fff'}}>
                  <TextInput style={{flex:1,paddingLeft:10,height:40}}
                    underlineColorAndroid = {'transparent'}
                    multiline={false}
                    placeholder='输入文章标题'
                    />
                </View>
                <Text style={styles.info}>正文</Text>
                <View style={{height:200,flexDirection:'row',backgroundColor:'#fff'}}>
                  <TextInput style={{flex:1,paddingLeft:10,lineHeight:40,height:200}}
                    underlineColorAndroid = {'transparent'}
                    multiline={true}
                    placeholder='输入文章内容'
                    />
                </View>
            </View>

        </View>
      )
    }
}
const styles = StyleSheet.create({
  info:{
    lineHeight: 25, color: '#888',fontSize:16,padding:10
  }
})
export default EditIndex
