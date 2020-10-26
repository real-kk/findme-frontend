/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class MypageScreen extends React.Component {
    
    _onclickLogout = () => {
        console.log("gfg")
        this.props.requestLogout()
        console.log("pass")
        alert("로그아웃 되었다.")
    }
    render() {
      return (
          <View style={styles.container}>
             <TouchableOpacity 
                    onPress={ this._onclickLogout.bind(this)}>
                  <Text>로그아웃</Text>
            </TouchableOpacity>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen)
