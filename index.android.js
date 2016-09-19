/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';

import Root from './project/root'

class pro extends Component {
    render() {
        return (
            <Root/>
        );
    }
}

AppRegistry.registerComponent('pro', () => pro);
