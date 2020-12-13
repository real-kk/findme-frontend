/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { connect } from 'react-redux'
import axios from '../../axiosConfig'

import DiaryListScreen from './diaryList'
import QuestionListScreen from './questionList'
import DiaryTextAnalysisResultScreen from './diaryTextAnalysisResult'
import WordCloudResultScreen from './wordCloudResult'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const Tab = createMaterialTopTabNavigator()
const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  // eslint-disable-next-line no-undef
  requestLogout: () => dispatch(requestLogout())
})

class TopBar extends React.Component {
  constructor () {
    super()
    this.state = {
      diaryList: []
    }
  }

  render () {
    return (
        <View style={styles.container}>
          <StatusBar hidden= {true}/>
          <Text style={styles.result}>감정 분석 결과</Text>
          <Tab.Navigator
           tabBarOptions={{
             labelStyle: { fontSize: 16, fontFamily: 'netmarbleM' },
             tabStyle: { width: wp('25%'), height: hp('8%') },
             style: {
               borderColor: 'black',
               backgroundColor: '#fff'
             }
           }}
          >
              <Tab.Screen name="감정일기 리스트" component={DiaryListScreen}
              navigation={this.props.navigation}/>
              <Tab.Screen name="워드 클라우드" component={WordCloudResultScreen}
              navigation={this.props.navigation}/>
              <Tab.Screen name="감정 분석 그래프" component={DiaryTextAnalysisResultScreen}
              navigation={this.props.navigation}/>
              <Tab.Screen name="영상 분석" component={QuestionListScreen}/>
          </Tab.Navigator>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color: 'white',
    backgroundColor: 'rgba(114,174,148,0.9)'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
