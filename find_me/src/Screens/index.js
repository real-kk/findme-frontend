/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from "react-redux"

import LoginScreen from './LoginScreen';
import Signup from './LoginScreen/SignUp';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const mapStateToProps = (state) => ({
    token: state.auth.token,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    storeUserData: (data) => dispatch(storeUserData(data)),
  })

  function AuthStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />
      </Stack.Navigator>
    )
  }

class StackScreen extends React.Component {
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
                options={{headerShown: false}}  
                name="Login" 
                component={AuthStack}
            />
            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(StackScreen)
