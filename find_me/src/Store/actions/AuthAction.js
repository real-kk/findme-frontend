import AsyncStorage from '@react-native-community/async-storage'

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_SIGNUP,
    AUTH_SIGNUP_SUCCESS,
    AUTH_SIGNUP_FAILURE,
    AUTH_LOGOUT,
    AUTH_STORE_USER_DATA,
  } from './ActionTypes';
import axios from '../../axiosConfig';

export const setUserData = async (key, data) => {
  try {
    await AsyncStorage.setItem('@FINDME:' + key, data)
  } catch (e) {
    alert('err : ', e)
  }
}

export const getUserData = async (key) => {
  try {
    const userData = await AsyncStorage.getItem('@FINDME:' + key)
    if(userData === null) {
      return false
    }
    axios.defaults.headers.common['Authorization'] = userData
    return userData
  } catch(e) {
    alert('err : ', e)
  }
}

export const removeUserData = async (key) => {
  try {
    await AsyncStorage.removeItem('@FINDME:' + key)
  } catch (e) {
    alert('err : ', e)
  }
}

/* LOGIN */
export function requestLogin(data) {
  return (dispatch) => {
      dispatch(login());
      return axios.post('/rest-auth/login/', data)
      .then((res) => {
          setUserData('userToken', res.data.key);
          axios.defaults.headers.common['Authorization'] = res.data.key;
          dispatch(loginSuccess());
          dispatch(storeUserData(res.data));
          console.log(res.data.key)
      }).catch((error) => {
        // alert('Login Failed : ' + error)
        console.log(error)
      });
  };
}
  
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

  export const requestLogout = () => {
    return (dispatch) => {
      removeUserData('userToken')
      dispatch(logout())
    }
  }
  
  export const logout = () => {
    return {
      type: AUTH_LOGOUT
    }
  }
  
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

  export function loginSuccess() {
    return {
        type: AUTH_LOGIN_SUCCESS,
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