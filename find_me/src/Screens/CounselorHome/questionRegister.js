/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,  View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  class QuestionRegister extends React.Component {
      constructor(){
          super();
          this.state={
            question: '',
          }
      }

      submission = async() => {
          const data = {
              question : this.state.question,
              client: this.props.route.params.client.client_email
          }
          await axios.post('/tasks/questions/', data, 
          { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then(res=>{
            this.state.question = ''
            alert("질문 등록이 완료되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(err=>console.log(err))
      }
      
      render() {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>영상 질문 등록</Text>
                <View style={styles.title}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL', marginBottom:hp('1%')}}>내담자 : {this.props.route.params.client.client_username}</Text>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL', color:'gray'}}>이메일 : {this.props.route.params.client.client_email}</Text>
                </View>
                <View style={styles.input}>
                <TextInput
                  style={styles.diaryname}
                  multiline={true}
                  placeholder="내담자에게 물어보고 싶은 질문을 적어주세요!"
                  value={this.state.question}
                  onChangeText={(text) => {
                  this.setState({question: text})             
                  }}
                />
                </View>
                <TouchableOpacity
                    style={styles.apply}
                    onPress={()=>{
                        this.submission();
                     }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontFamily:'netmarbleB' }}>제출</Text>
                 </TouchableOpacity>
                 
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionRegister)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    diaryname : {
        fontSize: 18 , 
        fontFamily: 'netmarbleM', 
        padding:'4%',
        
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
    title:{
        marginHorizontal:hp('2.5%'),
        paddingTop: hp('5%'), 
        paddingBottom: hp('2%'), 
        borderBottomColor: 'gray', 
        borderBottomWidth: 0.8
    },
    input:{
        width: wp('90%'),
        marginTop: hp('2%'),
        marginBottom: hp('3%'),
        marginHorizontal:wp('5%'), 
        height: hp('50%'), 
        backgroundColor:'#fafafa',
        borderRadius: 5,
    },
    apply: {
        marginLeft: wp('5%'),
        width: wp('90%'),
        borderRadius: 5,
        height: hp('6%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
