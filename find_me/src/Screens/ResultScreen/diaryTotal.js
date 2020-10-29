import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from '../../axiosConfig';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import VideoScreen from './videoanalysisResult';
import DiaryScreen from './dailyanalysisResult';
const Tab = createMaterialTopTabNavigator();


class diaryTotal extends React.Component {
    constructor(){
        super();     
    }
    render(){
        return(
            <View style={styles.container}>
                <Tab.Navigator>
                    <Tab.Screen name="워드 클라우드" component={VideoScreen} />
                    <Tab.Screen name="감정 분석 그래프" component={DiaryScreen} />
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

export default diaryTotal;
