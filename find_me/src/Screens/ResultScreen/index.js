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
                {key:'0', data:'감정일기 분석 결과 확인'},
                {key:'1', data:'일일 활동 통계 확인'},
                {key:'2', data:'영상 분석 결과 확인'},
              //   {key:'2', data:'ccc'},
              ],
        }
    }

    _onPress = () => {
        this.props.navigation.push('WordCloud')
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
                            onPress={()=> this._onPress()}
                        >
                            <View style={styles.list}>
                                <Text>{item.data}</Text>
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
        backgroundColor : '#fffff0',
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
        padding:20,
        marginTop : '25%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo : {
        textAlign : 'center'
     }
});

export default ResultScreen;
