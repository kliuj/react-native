/*登录注册*/
import React,{Component} from 'react'
import{
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
}from 'react-native'

export default class UserInfo  extends Component {
  render(){
    return (
      <View style={{height:180}}>
        <View style={{height:90,flexDirection:'row',padding:20}}>
          <Image style={styles.img}
            source={{uri:'http://7xq8iy.com1.z0.glb.clouddn.com/blog.jpeg'}}
          />
          <View style={styles.login}>
              <Text style={styles.word}>用户名：姓名</Text>
              <Text style={styles.word} numberOfLines={1}>签名：xxx</Text>
          </View>
        </View>
        <View style={{height:90,flexDirection:'row',padding:20}}>
          <TouchableOpacity style={styles.logout}>
              <Text style={styles.word}>退出登录</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  img:{
    height:50,
    width:50,
    borderRadius:25,
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
    fontSize:14
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
