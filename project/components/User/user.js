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
import About from './about'
import Reg from './reg'

import { connect,Provider } from 'react-redux'
import { getLogin } from '../../actions/user'

class User extends Component {
    constructor(props){
      super(props)

    }
    componentWillMount(){
      const { dispatch} = this.props;
      dispatch(getLogin())
    }
    getUserInfo(isLoggedIn){
      if(isLoggedIn.toString() == 'true'){
        return (
          <UserInfo />
        )
      }else if(isLoggedIn.toString() == 'false'){
        return (
          <LoginComponent />
        )
      }
    }
    gotoAbout(){
      let navigator = this.props.navigator;
      navigator.push({
        name: 'About',
        component: About
      })
    }
    gotoReg(){
      let navigator = this.props.navigator;
      navigator.push({
        name: 'Reg',
        component: Reg
      })
    }
    render() {
        const {isLoggedIn} = this.props;
        return (
            <View style={{backgroundColor:'#EFEFF4',flex:1}}>
              <CommonNameHeader headerName='登录/注册' />
              {
                this.getUserInfo(isLoggedIn)
              }
              <View style={{flexDirection:'row',paddingBottom:20,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={styles.reg} onPress={this.gotoReg.bind(this)}>
                    <Text style={styles.word}>注册账户</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10}} onPress={this.gotoAbout.bind(this)}>
                    <Text style={styles.word}>关于软件</Text>
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
  },
  reg:{
    paddingLeft:10,
    paddingRight:10,
    borderColor:'#ddd',
    borderRightWidth:2
  }
})

function getUserState(state){
  return {
    isLoggedIn:state.userState.isLoggedIn
  }
}
export default connect(getUserState)(User);
