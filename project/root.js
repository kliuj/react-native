import React,{Component} from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/index'

import Main from './components/Main'

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
         <Main />
      </Provider>
    )
  }
}

export default Root;
