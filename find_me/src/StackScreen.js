/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Login/LoginScreen';
import SignUpScreen from './Login/SignUpScreen';
import ExperienceStart from './Experience/ExperienceStart';
import ExperienceMain from './Experience/ExperienceMain';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
        <Stack.Navigator>
          <Stack.Screen 
            options={{headerShown: false}} 
            name="Login" 
            component={LoginScreen}
          />
          <Stack.Screen 
            options={{headerShown: false}} 
            name="SignUp" 
            component={SignUpScreen}
          />
        </Stack.Navigator>
  )
}

const ExperienceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}} 
        name="ExperienceStart" 
        component={ExperienceStart}
      />
      <Stack.Screen 
        options={{headerShown: false}} 
        name="ExperienceMain" 
        component={ExperienceMain}
      />
    </Stack.Navigator>
  )
}

class StackScreen extends React.Component {
  render() {
    return (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}  
            name="Login" 
            component={LoginStack}
          />
          <Stack.Screen 
            options={{headerShown: false}} 
            name="Experience" 
            component={ExperienceStack}
          />
        </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
 
});

export default StackScreen;
