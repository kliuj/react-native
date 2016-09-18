import React ,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {CommonNameHeader} from '../Header/header.js'
import Icon from 'react-native-vector-icons/Ionicons'
import LoginComponent from './login'
import UserInfo from './userInfo'


class User extends Component {
    constructor(props){
      super(props)
      this.state={
        isLogin:false
      }
    }
    getUserInfo(){
      if(this.state.isLogin){
        return (
          <UserInfo />
        )
      }else{
        return (
          <LoginComponent />
        )
      }
    }
    render() {
        return (
            <View>
              <CommonNameHeader headerName='用户信息' />
              {
                this.getUserInfo()
              }
              <View style={styles.funCon}>
                <TouchableOpacity style={styles.moreFun}>
                  <Text style={{flex:8}}>清除缓存</Text>
                  <View  style={{flex:2,alignItems:'flex-end'}}>
                      <Icon
                          name='ios-arrow-forward'
                          size={25}
                          color='#ddd'
                      />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.funCon}>
                <TouchableOpacity style={styles.moreFun}>
                  <Text style={{flex:8}}>关于软件</Text>
                  <View  style={{flex:2,alignItems:'flex-end'}}>
                      <Icon
                          name='ios-arrow-forward'
                          size={25}
                          color='#ddd'
                      />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  info:{
    textAlign: 'center', lineHeight: 25, color: '#888'
  },
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
  funCon:{
    height:50,
    flexDirection:'row',
    marginBottom:10,
    borderColor:'#ddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    paddingLeft:20,
    paddingRight:20
  },
  moreFun:{
    flex:1,
    height:50,
    justifyContent:'center',
    flexDirection:'row',
    alignItems: 'center'
  },
  word:{
    fontSize:16
  }
})

export default User
