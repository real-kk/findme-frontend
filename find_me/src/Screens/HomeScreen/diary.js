/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })
var date = new Date().getDate()
var month = new Date().getMonth() + 1; //To get the Current Month
var year = new Date().getFullYear(); //To get the Current Year

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
class DiaryScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diaryTitle: '',
            diaryContent: '',
        }
    }
    
    submission = async () => {
        const data = {
            title: this.state.diaryTitle,
            content: this.state.diaryContent
        }

        await axios.post('/diaries/', data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            this.state.diaryTitle = ''
            this.state.diaryContent = ''
            alert("제출이 완료되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
            <Text style={styles.day}> {year}년  {month}월  {date}일 </Text>
            <Text style={styles.today}> 오늘 하루 어떠셨나요??</Text>
            <TextInput
                style={styles.diaryname}
                placeholder="일기 제목"
                value={this.state.diaryTitle}
                onChangeText={(text) => {
                    this.setState({diaryTitle: text})             
                }}
            />
            <TextInput
                multiline={true}
                style={styles.diarytext}
                placeholder="하루 동안 있었던 일, 느꼈던 감정을 적어주세요"
                value={this.state.diaryContent}
                onChangeText={(text) => {
                    this.setState({diaryContent: text})             
                }}
            />
            <TouchableOpacity
                style={styles.submission}
                onPress={()=>{
                    this.submission();
                }}
            >
                <Text style={{color:'white', fontSize:18, fontFamily:'netmarbleL' }}>제출하기</Text>
            </TouchableOpacity>
          </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems:'center', 
        justifyContent:'center',
    },
    today:{
        marginTop: hp('2%'),
        fontSize: 20,
        color: 'rgba(114,174,148,0.8)',
        textAlign:'center',
        fontFamily:'netmarbleL'
    },
    day:{
        fontSize: 30,
        color: 'rgba(114,174,148,0.8)',
        textAlign:'center',
        fontFamily:'netmarbleL'
    },
    diaryname:{
        borderRadius: 5,
        backgroundColor:"#FAFAFA",
        paddingHorizontal:wp('3%'),
        marginVertical: hp('2%'),
        width:wp('90%'),
        fontFamily:'netmarbleL'
    },
    diarytext: {
        borderRadius: 5,
        paddingHorizontal:wp('3%'),
        backgroundColor:"#FAFAFA",
        width:wp('90%'),
        height: hp('50%'),
        fontFamily:'netmarbleL' 
    },
    submission:{
        marginVertical: hp('2%'),
        width: wp('90%'),
        borderRadius: 5,
        height: hp('6%'), 
        backgroundColor:'rgba(114,174,148,0.5)',
        alignItems:'center', 
        justifyContent:'center',
        
    }
});


