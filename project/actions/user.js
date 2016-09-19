'use strict'

import * as TYPES from './types'
import {AsyncStorage} from 'react-native'

export function logIn(opt){
  return{
    'type':TYPES.LOGGED_IN
  }
}

export function logOut(){
  return {
    'type':TYPES.LOGGED_OUT
  }
}
export function logIng(){
  return {
    'type':TYPES.LOGGED_DOING
  }
}

export function getLogin(){
    return (dispatch)=>{
      dispatch({'type':TYPES.LOGGED_DOING})
      new Promise((resolve,reject)=>{
        AsyncStorage.getItem('userInfo', (err, result) => {
            if(result && JSON.parse(result).state){
              resolve(result)
            }else{
              reject()
            }
        });
      }).then((res)=>{
        dispatch({'type':TYPES.LOGGED_IN})
      }).catch((e)=>{
        dispatch({'type':TYPES.LOGGED_OUT})
      })
    }

}
