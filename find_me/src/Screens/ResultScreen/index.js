/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from '../../axiosConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DiaryListScreen from './diaryList'
import VideoScreen from './videoanalysisResult';
import DiaryScreen from './dailyanalysisResult';
import VideoAnalysisScreen from './videoanalysisResult';
import diarytextanalysisResultScreen from './diarytextanalysisResult';
import WordCloudResultScreen from './wordcloudResult';

const Tab = createMaterialTopTabNavigator();


class TopBar extends React.Component {
    constructor(){
        super();     
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
                    <Tab.Screen name="감정 분석 그래프" component={diarytextanalysisResultScreen} />  
                    <Tab.Screen name="영상 분석" component={VideoAnalysisScreen} />
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

export default TopBar;

