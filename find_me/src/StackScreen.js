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

import Login from './Login';
import SignUp from './SignUp';
import Main from './Main';
const Stack = createStackNavigator();

// function HomeStack() {
//   return (
//         <Stack.Navigator>
//           <Stack.Screen 
//             options={{headerShown: false}} 
//             name="SignUp" 
//             component={SignUp}
//           />
//           <Stack.Screen
//             options={{headerShown: false}} 
//             name="SignUpNext" 
//             component={SignUpNext}
//           />
//         </Stack.Navigator>
//   )
// }
class StackScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          options={{headerShown: false}} 
          name="Login" 
          component={Login}
        />
        <Stack.Screen 
          options={{headerShown: false}} 
          name="SignUp" 
          component={SignUp}
        />
        <Stack.Screen 
          options={{headerShown: false}} 
          name="Main" 
          component={Main}
        />
    </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
 
});

export default StackScreen;
