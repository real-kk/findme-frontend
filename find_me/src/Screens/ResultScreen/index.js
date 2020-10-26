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
                {key:'0', data:'감정일기 분석 결과'},
                {key:'1', data:'워드클라우드 분석 결과'},
              //   {key:'1', data:'bbb'},
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
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },
    list: {
        borderWidth: 1,
        borderRadius: 8,
        padding:40,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ResultScreen;
