/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class CounselorDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
      
        }
    }

    render() {
      return (
          <View style={styles.container}>
              <Text>상담사 상세정보</Text>
          </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselorDetail)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});


