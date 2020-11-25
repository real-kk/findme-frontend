/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
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
          <Text style={styles.result}>감정 분석 결과</Text>
          <Tab.Navigator
           tabBarOptions={{
             labelStyle: { fontSize: 16},
             tabStyle: { width: wp('25%'), height: hp('8%')},
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
    paddingTop: '10%',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
