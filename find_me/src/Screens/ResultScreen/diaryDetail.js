/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Platform, StatusBar } from 'react-native'
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
        <ScrollView style={styles.container}>
          <Text style={styles.result}>감정일기 확인</Text>
          <View>
            <Text style={styles.diary}>
             Emotional Diary
            </Text>
            <View style={styles.inside}>
            <Text style={styles.title}>{this.props.route.params.diary.title}</Text>
            <Text style={styles.date}>{this.props.route.params.diary.create_date} </Text>
            <Text style={styles.text}>
              {this.props.route.params.diary.content}
            </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              /* this.props.navigation.navigate('CounselingRequest', {
              }) */
            }}
                >
            <View style={styles.store}>
              <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>수정하기</Text>
            </View>
        </TouchableOpacity>
        </ScrollView>
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
    textAlign: 'center',
    fontFamily: 'netmarbleL',
    fontSize: 14,
    color: 'gray'
  },
  diary: {
    marginVertical: hp('2%'),
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
    padding: '5%',
    marginHorizontal: wp('5%')
  },
  title: {
    paddingTop: hp('3%'),
    textAlign: 'center',
    fontFamily: 'netmarbleM',
    fontSize: 25
  },
  text: {
    paddingTop: hp('5%'),
    fontSize: 15,
    fontFamily: 'netmarbleL',
    paddingHorizontal: wp('5%')
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color: 'white',
    backgroundColor: 'rgba(114,174,148,0.9)'
  },
  store: {
    marginLeft: wp('25%'),
    marginTop: hp('5%'),
    width: wp('50%'),
    borderRadius: 5,
    height: hp('6%'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
