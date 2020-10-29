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


class ResultScreen extends React.Component {
    constructor(){
        super();
        this.state={
            datas: [
                {key:'0', data:'감정일기 리스트'},
                {key:'1', data:'일일 활동 통계 확인'},
                {key:'2', data:'영상 분석 결과 확인'},
              ],
        }
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style = {styles.logo}>Result</Text>
            <FlatList
                data={this.state.datas}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity
                            onPress={()=> {
                                if(item.key === '0'){
                                    this.props.navigation.push('DiaryResultList')
                                }
                                else if(item.key === '1'){
                                    this.props.navigation.push('DailyAnalysis')
                                }
                                else if(item.key === '2'){
                                    this.props.navigation.push('VideoAnalysis')
                                }
                            }}
                        >
                            <View style={styles.list}>
                                <Text style={{color: '#ffffff' , fontWeight: '700'}}>{item.data}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
      )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
        padding:20,
        marginTop : '5%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#00C78C',
        borderColor : '#00C78C',
       
    },
    logo : {
        textAlign : 'center',
        marginBottom : '50%',
     }
});

export default ResultScreen;
