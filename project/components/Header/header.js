import React ,{Component} from 'react'
import {
    View,
    Text,
    Navigator,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from '../Home/index'
import User from '../User/user'
import List from '../List/index'
import Edit from '../Edit/index'
//详情页header
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
              <TouchableOpacity  style={{flex:1}} onPress={this._onPressBack.bind(this)}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name='ios-arrow-dropleft'
                        size={25}
                        color='#fff'
                    />
                </View>
              </TouchableOpacity>
              <Text numberOfLines={2} style={{color: '#fff', fontSize: 16,flex:4,textAlign:'center'}}>{this.props.headerName}</Text>
              <Text style={{flex:1}}></Text>
          </View>
      </View>
    )
  }
}

class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _renderTab(tab, i) {
        let color = this.props.activeTab == i ? "#E07A38" : "#888";
        return (
            <TouchableOpacity
                onPress={()=>this.props.goToPage(i)}
                style={styles.tab}
                key={i}
            >
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]}
                        size={25}
                        color={color}
                    />
                    <Text style={{color: color}}>{tab}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this._renderTab(tab, i))}
            </View>
        )
    }
}

//fotter
class FotterHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['首页', '列表', '发布','我的'],
            tabIconNames: ['ios-home-outline', 'ios-list-outline', 'ios-create-outline','ios-contact-outline',]
        }
    }

    render() {
        return (
            <ScrollableTabView
                style={{backgroundColor: '#FCFCFC'}}
                locked={false}
                scrollWithoutAnimation={true}
                tabBarPosition={'bottom'}
                renderTabBar={() => <Tabbar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames}/>}
            >
                <Home tabLabel="首页" navigator={this.props.navigator}/>
                <List tabLabel="列表" navigator={this.props.navigator}/>
                <Edit tabLabel="发布" navigator={this.props.navigator}/>
                <User tabLabel="我的" navigator={this.props.navigator}/>
            </ScrollableTabView>
        )
    }
}


const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 55,
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center'
    }
});
export default DetailHeader;
export {FotterHeader}
