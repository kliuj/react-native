/*登录注册*/
import React,{Component} from 'react'
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
}from 'react-native'

export default class LoginComponent  extends Component {
  render(){
    return (
      // <View style={{height:90,flexDirection:'row',padding:20}}>
      //   <TouchableOpacity style={styles.login}>
      //       <Text style={styles.word}>登录</Text>
      //   </TouchableOpacity>
      //   <TouchableOpacity style={styles.login}>
      //       <Text style={styles.word}>注册</Text>
      //   </TouchableOpacity>
      // </View>
      <View style={{height:180}}>
          <View style={styles.input}>
            <TextInput placeholder="QQ号/手机号/邮箱" underlineColorAndroid ="transparent" />
          </View>
          <View style={styles.input}>
            <TextInput placeholder="密码" underlineColorAndroid ="transparent" secureTextEntry={true}/>
          </View>
          <View style={{height:90,flexDirection:'row',padding:20}}>
            <TouchableOpacity style={styles.login}>
                <Text style={styles.word}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.login}>
                <Text style={styles.word}>注册</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  login:{
    height:50,
    borderColor:'#ddd',
    borderWidth:2,
    borderRadius:4,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    marginRight:10
  },
  word:{
    fontSize:16
  },
  input:{
    paddingLeft:20,
    borderColor:'#ddd',
    borderBottomWidth:1,
    justifyContent:'center'
  }
})
