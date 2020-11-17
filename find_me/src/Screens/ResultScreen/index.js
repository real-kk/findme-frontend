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
import QuestionListScreen from './questionList';
import DiaryTextAnalysisResultScreen from './diaryTextAnalysisResult';
import WordCloudResultScreen from './wordCloudResult';

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
          <Text style={styles.result}>분석 결과</Text>
          <Tab.Navigator
           tabBarOptions={{
             labelStyle: { fontSize: 15 },
             tabStyle: { width: 100 },
             style: {
               borderColor: 'transparent',
               backgroundColor: 'white'
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
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  result: {
    textAlign: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
