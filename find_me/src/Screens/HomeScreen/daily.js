/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import axios from '../../axiosConfig'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})

class DailyScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
          <View style={styles.container}>
              <Text>일일활동 작성</Text>
          </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    justifyContent: 'center',
    backgroundColor: '#fffff0'
  }
})
