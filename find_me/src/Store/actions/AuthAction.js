import AsyncStorage from '@react-native-community/async-storage'

import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_LOGOUT,
  AUTH_STORE_USER_DATA
} from './ActionTypes'
import axios from '../../axiosConfig'

export const setUserData = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item))
  } catch (e) {
    console.log(e)
  }
}

export const saveStorage = (item) => {
  setUserData('FINDME', item)
}

// export const readStorage = () => {
//   console.log("DDDD")
//   getUserData("FINDME").then(result => {
//     let jsonObject = JSON.parse(result)
//     console.log("readStorge")
//     console.log(jsonObject)
//   })
// }

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('FINDME')
    const user = JSON.parse(userData)
    if (user === null) {
      return false
    }
    const userToken = user[0][1]
    if (userData === null) {
      return false
    }

    axios.defaults.headers.common.Authorization = userToken
    return userData
  } catch (e) {
    alert('err : ', e)
  }
}

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('FINDME')
  } catch (e) {
    alert('err : ', e)
  }
}

/* LOGIN */
// export function requestLogin (data) {
//   return (dispatch) => {
//     dispatch(login())
//     return axios.post('/rest-auth/login/', data)
//       .then((res) => {
//         axios.get('/users/type/',
//         { headers: {
//             'Authorization' : `Token ${res.data.key}`
//         }})
//         .then(({data})=>{
//           // const obj = JSON.parse(res.config.data)
//           const item = [['userToken', res.data.key], ['userType', data.user_type]]
//           console.log(item)
//           saveStorage(item)
//           axios.defaults.headers.common.Authorization = res.data.key
//           dispatch(loginSuccess())
//           dispatch(storeUserData(res.data))
//         })
//         .catch(err=>console.log(err))
//       }).catch((error) => {
//         console.log(error)
//       })
//   }
// }

/* LOGIN */
export function requestLogin (data) {
  return (dispatch) => {
    dispatch(login())
    return axios.post('/rest-auth/login/', data)
      .then((res) => {
        const obj = JSON.parse(res.config.data)
        const item = [['userToken', res.data.key], ['userType', obj.user_type]]
        saveStorage(item)
        // setUserData('userToken', res.data.key);
        axios.defaults.headers.common.Authorization = res.data.key
        dispatch(loginSuccess())
        dispatch(storeUserData(res.data))
      }).catch((error) => {
        // alert('Login Failed : ' + error)
        console.log(error)
      })
  }
}

export const requestSignup = (data) => {
  return (dispatch) => {
    dispatch(signup())
    return axios.post('/rest-auth/registration/', data)
      .then((res) => {
        dispatch(signupSuccess())
      })
      .catch((error) => {
        console.log(error)
        dispatch(signupFailure(error))
      })
  }
}

export const requestLogout = () => {
  return (dispatch) => {
    removeUserData()
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

export function loginSuccess () {
  return {
    type: AUTH_LOGIN_SUCCESS
  }
}
export function loginFailure () {
  return {
    type: AUTH_LOGIN_FAILURE
  }
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
