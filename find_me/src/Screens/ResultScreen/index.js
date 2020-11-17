/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux'


import DiaryListScreen from './diaryList'
import QuestionListScreen from './questionList';
import DiaryTextAnalysisResultScreen from './diaryTextAnalysisResult';
import WordCloudResultScreen from './wordCloudResult';

const Tab = createMaterialTopTabNavigator();
const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })


class TopBar extends React.Component {
    constructor(){
        super();     
        this.state={
            diaryList:[],
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Tab.Navigator
                    tabBarOptions={{
                        scrollEnabled: true
                    }}
                >
                    <Tab.Screen name="감정일기 리스트" component={DiaryListScreen} />
                    <Tab.Screen name="워드 클라우드" component={WordCloudResultScreen} />
                    <Tab.Screen name="감정 분석 그래프" component={DiaryTextAnalysisResultScreen} />  
                    <Tab.Screen name="영상 분석" component={QuestionListScreen} />
                </Tab.Navigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '5%',
       
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

