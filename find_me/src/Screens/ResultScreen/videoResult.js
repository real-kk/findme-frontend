/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Linking, StyleSheet,  View, Text, Image, Modal, TouchableOpacity } from 'react-native';
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
    constructor(props){
        super(props);
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state={
            ideo: '',
            graph: '',
            name: '',
            loading_graph: true,
            modal: false,
        }
    }
    confirmGraph = async() => {
        await axios.post('/tasks/sentiment_graphs/', {id : this.props.route.params.questionID},
        { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            console.log(data + '!!')
            this.setState({
                name: data.client_username,
                graph: data.graph,
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
                <View style={{flexDirection:'row', backgroundColor:'rgba(114,174,148,0.9)'}}>
                    <Text style={styles.result}>영상 분석 결과</Text>
                </View>
                
                <View style={{flexDirection:'row'}}>
                <Text style={styles.introduce}>
                    영상에서 표정 분석 결과를 총 8가지의 감정 점수 변화를 
                    시간에 따른 그래프로 표현한 결과 값입니다
                </Text>
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({modal: true})
                    }}
                >
                    <Text style={styles.tutorial}>자세히</Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible = {this.state.modal}
                    overlayBackground={'rgba(0, 0, 0, 0.75)'}
                    closeOnTouchOutside={true}
                    animationType={'fade'}   
                >
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 1.0)', marginTop: hp('10%'), alignItems:'center'}}>
                        <Text style={{marginTop: hp('3%'), fontSize:20,fontFamily:'netmarbleM'}}>영상 그래프 읽는 방법</Text>
                        <Image  style={{width: wp('100%'), height: hp('50%'), resizeMode:'contain'}}
                         source={require('../../../images/graph1.png')} />
                    </View>
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 1.0)',}}>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 그래프의 가로 축은 초 단위의 영상 시간을 나타냅니다.</Text>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 그래프의 세로 축은 감정 점수를 나타내며 8가지 감정의 점수의 합이 1이 됩니다.</Text>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 8가지의 감정은 화남, 경멸, 역겨움, 공포, 행복, 무표정, 슬픔, 놀람으로 구성되어 있습니다.</Text>

                    </View> 
                        <View style={{alignItems:'center', backgroundColor: 'rgba(255, 255, 255, 1.0)', paddingVertical: hp('5%')}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        modal: false,
                                    })
                                }}
                                
                            >
                                <Text style={styles.close}>닫기</Text>
                            </TouchableOpacity>  
                        </View>
                    
                </Modal>
                </View>
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
    },
    introduce: {
        width: wp('70%'),
        marginVertical: hp('2%'),
        marginLeft: wp('5%'),
        borderRadius: 5,
        fontSize: 18,
        fontFamily:'netmarbleL',
        color: 'gray'
    },
    store: {
        marginLeft: wp('25%'),
        marginTop: hp('5%'),
        width: wp('50%'),
        borderRadius: 5,
        height: hp('6%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tutorial:{
        fontSize: 15,
        marginTop: hp('2.8%'),
        fontFamily: 'netmarbleB',
        color:'white',
        borderRadius: 5,
        width: wp('17%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        textAlignVertical:'center',
        height:hp('4%'),
        paddingTop:hp('0.2%'),
        borderColor:'white',
        textAlign:'center',
        marginLeft: wp('3%'),
    },
    close:{ 
        color: 'white', 
        fontFamily: 'netmarbleB',
        borderRadius: 5,
        textAlign:'center',
        width:wp('50%'),
        fontSize: 18,
        textAlignVertical:'center',
        height:hp('6%'),
        justifyContent:'center',
        backgroundColor: 'rgba(114,174,148,0.5)',
    }
});

