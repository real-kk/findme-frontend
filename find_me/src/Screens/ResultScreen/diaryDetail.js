/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, ScrollView, Platform, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

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
    return (
        <View style={styles.container}>
          <Text style={styles.result}>감정일기 확인</Text>
          <View>
            <Text style={styles.diary}>
             Diary
            </Text>
            <View style={styles.inside}>
            <Text style={styles.title}>{this.props.route.params.diary.title}</Text>
            <Text style={styles.date}>{this.props.route.params.diary.create_date} </Text>
            <Text style={styles.text}>
              {this.props.route.params.diary.content}
            </Text>
            </View>
          </View>
        </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResult)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  date: {
    paddingTop: hp('2%'),
    textAlign:'center',
    fontFamily: 'netmarbleR',
    fontSize: 14,
    color: 'gray'
  },
  diary: {
    marginTop: hp('2%'),
    borderRadius: 2,
    fontSize: 40,
    width: wp('100%'),
    color: 'gray',
    fontFamily: 'Niconne-Regular',
    textAlign: 'center'
  },
  inside: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
    height: hp('70%'),
    marginTop: hp('2%'),
    marginRight: wp('5%'),
    marginLeft: wp('5%'),
  },
  title: {
    paddingTop: hp('3%'),
    textAlign:'center',
    fontFamily: 'netmarbleR',
    fontSize: 25,
  },
  text: {
    paddingTop: hp('5%'),
    fontSize: 15,
    fontFamily:'netmarbleL',
    paddingHorizontal: wp('5%'),
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color:'white',
    backgroundColor:'rgba(114,174,148,0.9)',
  },
})
