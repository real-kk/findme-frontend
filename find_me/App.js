/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppNav from './src/Screens';
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './src/Store/configureStore';

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <AppNav/>
    </Provider>
  ) 
}
export default App
