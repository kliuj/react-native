import React ,{Component} from 'react'
import {
    View,
    Text,
    Navigator,
    TouchableOpacity,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons.js'
class DetailHeader extends Component {
  constructor(props) {
    super(props);
    this.state={headerName:this.props.headerName}
  }
  _onPressBack(){
    const { navigator } = this.props;
    navigator.pop()
  }
  render(){
    return (
      <View style={{
          height: 50,
          backgroundColor:'#33cd5f',
          flexDirection: 'row',
          alignItems: 'center'
      }}>

          <View style={{flex:1,flexDirection: 'row', alignItems: 'center' , paddingLeft: 10, paddingRight: 10,height: 50}}>
              <TouchableOpacity  style={{flex:2,alignItems: 'center' }} onPress={this._onPressBack.bind(this)}>
                <Text style={{color: '#fff', fontSize: 16}}> 返回</Text>
              </TouchableOpacity>
              <Text numberOfLines={2} style={{color: '#fff', fontSize: 16,flex:4,textAlign:'center'}}>{this.props.headerName}</Text>
              <Text style={{flex:2}}></Text>
          </View>
      </View>
    )
  }
}
export default DetailHeader;
