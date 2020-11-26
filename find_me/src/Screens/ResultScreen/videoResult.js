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
import { connect } from 'react-redux'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'

  const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  class VideoResult extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
              datas: [
                  {key:'0', data:'영상 보기'},
                  {key:'1', data:'그래프 확인'},
                ],
          }
      }

    resultConfirm = async (id) => {
        console.log(id)
        await axios.get(`/tasks/process_videos/${id}/`,
            { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
            }}) 
        .then(({data})=>{
            console.log(data)
            this.props.navigation.navigate('VideoAnalysisResult', {
                questionID: id,
                uri: data
            })
        })
        .catch(err=>console.log(err + 'why'))
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
                                        this.resultConfirm(this.props.route.params.questionID)
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('VideoGraphResult')
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Text style={styles.text}>{item.data}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoResult)

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

