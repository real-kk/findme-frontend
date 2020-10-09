/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet,  View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login';
import User from './src/User';
import StackScreen from './src/StackScreen';


const Stack = createStackNavigator();
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackScreen/>
        {/* <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator> */}
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
 
});

export default App;
