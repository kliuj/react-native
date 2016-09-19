'use strict'
import * as TYPES from '../actions/types'

const initialState = {
      isLoggedIn:''
}

export default function user(state=initialState,action){

      switch(action.type){
        case TYPES.LOGGED_IN:
          return{
            ...state,
            isLoggedIn:true,
            status:'done'
          }
        case TYPES.LOGGED_OUT:
          return{
            ...state,
            isLoggedIn:false,
            status:'done'
          }
        case TYPES.LOGGED_DOING:
          return{
            ...state,
            status:'doing'
          }
        default :
          return state
      }
}
