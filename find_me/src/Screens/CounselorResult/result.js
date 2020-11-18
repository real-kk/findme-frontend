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
  class ResultHome extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
            datas: [
                {key:'0', data:'감정분석 결과 조회'},
                {key:'1', data:'워드클라우드 조회'},
                {key:'2', data:'영상분석 결과 조회'},
                {key:'3', data:'일일활동 분석 결과 조회'}
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
export default ResultHome

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
    },
    list: {
        borderWidth: 0.2,
        borderRadius: 5,
        padding:20,
        marginTop : '15%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo : {
       textAlign : 'center'
    },
  
});
