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
import LoginScreen from './Login';
import UserScreen from './User';
import MainScreen from './Main';

const Stack = createStackNavigator();

const StackScreen = ({Navigation}) => (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Main" component={MainScreen}/>
          <Stack.Screen name="User" component={UserScreen}/>
        </Stack.Navigator>
)

const styles = StyleSheet.create({
 
});

export default StackScreen;
