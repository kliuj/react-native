import React ,{Component} from 'react'
import{
  View,
  Text,
  StyleSheet
}from 'react-native'

class EditIndex extends Component {
    constructor(props){
      super(props)
    }
    render (){
      return (
        <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        >
            <Text style={styles.info}>填写页正在完善</Text>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  info:{
    textAlign: 'center', lineHeight: 25, color: '#888'
  }
})
export default EditIndex
