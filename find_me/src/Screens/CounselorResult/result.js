/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, Button, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialIcons'

  class ResultHome extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
            datas: [
                {key:'0', data:'감정분석 결과 조회', icon:'sort'},
                {key:'1', data:'워드클라우드 조회', icon:'wb-cloudy'},
                {key:'2', data:'영상분석 결과 조회', icon:'tv'},
                {key:'3', data:'일일활동 분석 결과 조회', icon:'insert-emoticon'}
            ],
         
          }
      }

    //   componentDidMount(){
    //       foreUpdateHandler = () =>{
    //           this.forceUpdate();
    //       };
    //       foreUpdateHandler();
    //   }

      _onPress = () => {
          this.props.navigation.push('Diary')
      }
      
      render() {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('TextResult', {
                                            email: this.props.route.params.client.client_email
                                        })
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('WordCloudResult', {
                                            email: this.props.route.params.client.client_email
                                        })
                                    }
                                    else if(item.key === '2'){
                                        this.props.navigation.push('CounselorQuestionList', {
                                            email: this.props.route.params.client.client_email
                                        })
                                    }
                                    else if(item.key === '3'){
                                        this.props.navigation.push('Daily')
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Icon name= {item.icon} size={20}/>  
                                    <Text style={styles.list_text}>{item.data}</Text> 
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
               
            </View>
        )
    }
}
export default ResultHome

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FAFAFA',
    },
    list: {
        borderWidth: 0.2,
        borderRadius: 5,
        padding: '5%',
        marginTop : hp('10%'),
        justifyContent: 'center',
        flexDirection:'row',
        alignItems: 'center',
        width: wp('60%'),
        height: hp('10%'),
        backgroundColor: 'white'
    },
    list_text: {
        marginLeft: 5,
        fontSize: 18,
    },
    logo : {
       textAlign : 'center'
    },
  
});
