/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import TextResult from './diaryText'
import WordCloudResult from './diaryCloud'
import CounselorQuestionList from './questionList'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const Tab = createMaterialTopTabNavigator()

class ResultHome extends React.Component {
  render () {
    return (
        <View style={styles.container}>
            <StatusBar hidden= {true}/>
            <Text style={styles.result}>감정 분석 결과</Text>
            <Tab.Navigator
            tabBarOptions={{
              labelStyle: { fontSize: 16, fontFamily: 'netmarbleM' },
              tabStyle: { width: wp('33%'), height: hp('8%') },
              style: {
                borderColor: 'black',
                backgroundColor: '#fff'
              }
            }}
            >
            <Tab.Screen name="감정 분석 그래프"
              children={() => <TextResult email={this.props.route.params.client.client_email} />}/>
              <Tab.Screen name="워드 클라우드"
              children={() => <WordCloudResult email={this.props.route.params.client.client_email} />}/>
              <Tab.Screen name="영상 분석"
              children={({ navigation }) => <CounselorQuestionList email={this.props.route.params.client.client_email} navigation={navigation} />}/>
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

export default ResultHome
