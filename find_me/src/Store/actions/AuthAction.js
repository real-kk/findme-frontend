import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILURE,
    AUTH_STORE_USER_DATA,
  } from './ActionTypes';
import axios from '../../axiosConfig';

/* LOGIN */
// export function requestLogin(email, password) {
//     return (dispatch) => {
//         // Inform Login API is starting
//         dispatch(login());
   
//         // API REQUEST
//         return axios.post('/rest-auth/login/', { email, password })
//         .then((response) => {
//             // SUCCEED
//             dispatch(loginSuccess(email));
//         }).catch((error) => {
//             // FAILED
//             dispatch(loginFailure());
//         });
//     };
//   }
  
export const requestSignup = (data) => {
  return (dispatch) => {
    dispatch(signup())
    return axios.post('/rest-auth/registration/', data)
      .then((res) => {
        console.log(res)
        dispatch(signupSuccess())
      }).catch((error) => {
        console.log(error)
        dispatch(signupFailure(error))
      })
  }
}

//   export const requestSignout = () => {
//     return (dispatch) => {
//       removeUserData('userToken')
//       dispatch(signout())
//     }
//   }
  
//   export const signout = () => {
//     return {
//       type: AUTH_SIGNOUT
//     }
//   }
  
  export const login = () => {
    return {
      type: AUTH_LOGIN
    }
  }

  export const signup = () => {
    return {
      type: AUTH_SIGNUP
    }
  }

  export function loginSuccess(email) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        email
    };
}
export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

  export const storeUserData = (response) => {
    return {
      type: AUTH_STORE_USER_DATA,
      response
    }
  }
  
  export const signupSuccess = () => {
    return {
      type: AUTH_SIGNUP_SUCCESS
    }
  }
  
  export const signupFailure = (error) => {
    return {
      type: AUTH_SIGNUP_FAILURE,
      error
    }
  }
  
  export const signinSuccess = () => {
    return {
      type: AUTH_SIGNIN_SUCCESS
    }
  }
  
  export const signinFailure = (error) => {
    return {
      type: AUTH_SIGNIN_FAILURE,
      error
    }
  }