/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from '../../axiosConfig';


class Videoanalysis extends React.Component {
    constructor(){
        super();
        
    }

    render() {
      return (
        <View style={styles.container}>
            <Text>영상 분석 결과들~</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },

});

export default Videoanalysis;
