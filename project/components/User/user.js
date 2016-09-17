import React ,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {CommonNameHeader} from '../Header/header.js'
class User extends Component {
    //ToastAndroid.show('自动更新', ToastAndroid.SHORT);

    render() {
        return (
            <View
                  style={{flex: 1, alignItems: 'center'}}
            >
                <CommonNameHeader headerName='用户信息' />
                <Text style={styles.info}>当前最新版</Text>
                <Text style={styles.info}>当前版本: 0.01 {'\r'} 版权所有: lk</Text>
                <Text style={styles.info}>最后一次更新时间: 20160914</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  info:{
    textAlign: 'center', lineHeight: 25, color: '#888'
  }
})

export default User
