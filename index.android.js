/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';

import Main from './project/components/Main'

class pro extends Component {
    render() {
        return (
            <Main/>
        );
    }
}

AppRegistry.registerComponent('pro', () => pro);
