/*登录注册*/
import React,{Component} from 'react'
import{
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
}from 'react-native'

import { connect } from 'react-redux'
import { logOut } from '../../actions/user'

class UserInfo  extends Component {
  constructor(props){
    super(props)
    this.state={
        name:'',
        userImage:'http://7xq8iy.com1.z0.glb.clouddn.com/blog.jpeg',
        nickName:''
    }
  }
  componentWillMount(){
    AsyncStorage.getItem('userInfo',(err,result)=>{
      result = JSON.parse(result);
      this.userState = result
      this.setState({
            name:result.name,
            userImage:result.img,
            nickName:result.sign
      })
    })
  }
  startLogOut(){
    const {dispatch} = this.props;
    dispatch(logOut())
    this.userState.state = false;
    AsyncStorage.setItem('userInfo',JSON.stringify(this.userState),()=>{
    })
  }
  showImage(){
  }
  render(){
    return (
      <View>
        <View style={{height:170,flexDirection:'row',padding:20,alignItems:'center',justifyContent:'center'}}>
          <Image style={styles.img}
            source={{uri:this.state.userImage}}
          />
        </View>
        <View style={{height:50,flexDirection:'row',padding:20,alignItems:'center'}}>
          <View style={styles.login}>
              <Text style={styles.word} numberOfLines={1}>{this.state.name}：{this.state.nickName}</Text>
          </View>
        </View>
        <View style={{height:90,flexDirection:'row',padding:20}}>
          <TouchableOpacity style={styles.logout} onPress={this.startLogOut.bind(this)}>
              <Text style={styles.word}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  img:{
    height:150,
    width:150,
    borderRadius:75,
    borderColor:'#ddd',
    borderWidth:1
  },
  login:{
    height:50,
    flex:1,
    justifyContent:'center',
    marginLeft:10,
    marginRight:10,
    flexDirection:'column'
  },
  word:{
    fontSize:16
  },
  logout:{
    height:50,
    borderColor:'#ddd',
    borderWidth:2,
    borderRadius:4,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    marginRight:10
  }
})

export default connect()(UserInfo)
