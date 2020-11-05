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
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class Dailyanalysis extends React.Component {
    constructor(){
        super();
        this.state = {
            date: '',
            
        }       
    }


    render() {
      return (
        <View style={styles.container}>
            <Text>일일 감정 분석 결과들~</Text>
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dailyanalysis);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },

});
