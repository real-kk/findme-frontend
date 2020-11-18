/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
  class CounselorHome extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
              datas: [
                  {key:'0', data:'상담신청 확인', icon:'application'},
                  {key:'1', data:'영상 질문 등록', icon:'file-upload-outline'},
                  {key:'2', data:'상담 녹음 파일 변환', icon:'cast-audio' },
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
          this.props.navigation.push('Apply')
      }

      render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.logo}>Home</Text>
                <FlatList
                    data={this.state.datas}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('Apply')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('ClientList')
                                    }
                                    else if(item.key === '2'){
                                        this.props.navigation.push('STT')
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
export default CounselorHome

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

