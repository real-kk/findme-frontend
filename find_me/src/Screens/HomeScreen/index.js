/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, Image, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';
import Icon from 'react-native-vector-icons/AntDesign'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'

  class HomeScreen extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
              datas: [
                  {key:'0', data:'감정일기 작성', icon:'form'},
                  {key:'1', data:'일일활동 기록', icon:'smileo'},
                  {key:'2', data:'영상 촬영', icon:'videocamera'},
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
                <Text style = {styles.logo}>Home</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('Diary')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('Daily')
                                    }
                                    else if(item.key === '2'){
                                        this.props.navigation.push('Video')
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
export default HomeScreen

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
        fontSize: 20,
    },
    logo : {
       textAlign : 'center'
    }
});

