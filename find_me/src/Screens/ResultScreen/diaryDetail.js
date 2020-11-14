/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import axios from '../../axiosConfig'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})

class DiaryResult extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    // console.log(this.props.route.)
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>
                    날짜: {this.props.route.params.diary.create_date}
                </Text>
                <Text style={styles.text}>
                    제목: {this.props.route.params.diary.title}
                </Text>
                <Text style={styles.text}>
                    내용: {this.props.route.params.diary.content}
                </Text>
            </ScrollView>

        </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResult)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
