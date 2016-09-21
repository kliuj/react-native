/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

import Root from './project/root'

class pro extends Component {
    render() {
        return (
          <View style={{backgroundColor:'#fff',flex:1}}>
            <Root/>
          </View>
        );
    }
}

AppRegistry.registerComponent('pro', () => pro);
