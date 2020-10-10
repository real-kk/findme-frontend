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

import SignUp from './SignUp';
import SignUpNext from './SignUpNext';
const Stack = createStackNavigator();

const StackScreen = ({Navigation}) => (
        <Stack.Navigator>
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="SignUpNext" component={SignUpNext}/>

        </Stack.Navigator>
)

const styles = StyleSheet.create({
 
});

export default StackScreen;
