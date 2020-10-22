import * as types from '../actions/ActionTypes';

const initialState = {
    signin: {
      status: 'INIT',
    },
    token: null
  }
  
  export default function authentication(state = initialState, action) {
    switch(action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                login: {
                    status: 'WAITING'
                }
            }
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.email
                }
            }
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login:{
                    status: 'FAILURE'
                }
            }
        // case types.AUTH_SIGNOUT:
        //     return {
        //         ...initialState
        //     }
        // case types.AUTH_STORE_USER_DATA:
        //     return {
        //         token: action.response.token
        //     }
        default:
        return state
    }
  }