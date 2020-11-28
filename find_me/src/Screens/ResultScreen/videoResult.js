/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Linking, StyleSheet,  View, Text, Image, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
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
            video: '',
            graph: '',
            name: '',
            loading_graph: true,
          }
      }
    confirmGraph = async() => {
        await axios.post('/tasks/sentiment_graphs/', {},
        { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            console.log(data)
            this.setState({
                name: data.client_username,
                graph: data.image,
                loading_wordcloud: false,
            })  
        })
        .catch(err=>console.log(err))
    }
    resultConfirm = async (id) => {
        console.log(id)
        await axios.get(`/tasks/process_videos/${id}/`,
            { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
            }}) 
        .then(({data})=>{
            Linking.openURL(data)
        })
        .catch(err=>console.log(err + 'why'))
    }

    componentDidMount(){
        this.props.navigation.addListener('tabPress', e => {
            this.confirmGraph()
        })
        this.confirmGraph();
        this._ismounted = true
    }

    componentWillUnmount(){
        this._ismounted = false
    }
      render() {
        return (
            <View style={styles.container}>
               
                <Text style={styles.result}>영상 분석 결과</Text>
                <Text style={styles.introduce}>
                    영상에서 표정 분석 결과를 총 8가지의 감정 점수 변화를 
                    시간에 따른 그래프로 표현한 결과 값입니다
                </Text>
                <Image
                    style={{marginTop:hp('2%'), width: wp('100%'), height: hp('55%')}}
                    source={{uri: this.state.graph ? this.state.graph : null}}
                />
                <TouchableOpacity
                onPress={()=>{
                    this.resultConfirm(this.props.route.params.questionID)
                }}
                >
                <View style={styles.store}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>영상 재생</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoResult)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    result: {
        fontSize: 23,
        paddingLeft: wp('5%'),
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        fontFamily: 'netmarbleB',
        color:'white',
        backgroundColor:'rgba(114,174,148,0.9)',
    },
    introduce: {
        marginTop:hp('4%'),
        width: wp('84%'),
        marginLeft: wp('8%'),
        borderRadius: 5,
        height:hp('10%'),
        fontSize: 18,
        fontFamily:'netmarbleL',
        textAlign:'center',
        color: 'gray'
    },
    store: {
        marginLeft: wp('25%'),
        width: wp('50%'),
        borderRadius: 5,
        height: hp('6%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

