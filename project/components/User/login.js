/*登录注册*/
import React,{Component} from 'react'
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AsyncStorage,
  ToastAndroid
}from 'react-native'

import { connect,Provider } from 'react-redux'
import { logIn } from '../../actions/user'

class LoginComponent  extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:''
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('userInfo',(err,result)=>{
      result = JSON.parse(result);
      result && this.setState({
            username:result.name
      })
    })
  }
  startLogin(){
    if(!this.state.username.replace(/\s/g,'')){
        ToastAndroid.show('用户名不能为空', ToastAndroid.SHORT);
        return false;
    }
    if(!this.state.password.replace(/\s/g,'')){
        ToastAndroid.show('密码不能为空', ToastAndroid.SHORT);
        return false;
    }
    const {dispatch} = this.props;
    fetch('http://lwons.com:3000/mobile/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password:this.state.password,
        username:this.state.username
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.success == 0){
        AsyncStorage.setItem('userInfo', JSON.stringify(Object.assign({state:true},responseJson.data)), () => {
            dispatch(logIn())
        });
      }else{
          ToastAndroid.show(responseJson.msg, ToastAndroid.SHORT);
      }
    })
  }
  onChangeName(text){
    this.setState({username:text})
  }
  onChangePswd(text){
    this.setState({password:text})
  }
  render(){
    return (
      <View style={{backgroundColor:'#fff',marginTop:20}}>
          <View style={styles.input}>
            <TextInput placeholder="用户名" defaultValue={this.state.username} underlineColorAndroid ="transparent"
              onChangeText={this.onChangeName.bind(this)}/>
          </View>
          <View style={styles.input}>
            <TextInput placeholder="密码" underlineColorAndroid ="transparent" secureTextEntry={true}
              onChangeText={this.onChangePswd.bind(this)}/>
          </View>
          <TouchableOpacity style={styles.login} onPress={this.startLogin.bind(this)}>
              <Text style={{fontSize:16,color:"#fff"}}>登录</Text>
          </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  word:{
    fontSize:14
  },
  input:{
    paddingLeft:20,
    borderBottomWidth:1,
    justifyContent:'center',
    borderColor:'#EFEFF4',
    height:50
  }
})

export default connect()(LoginComponent);
