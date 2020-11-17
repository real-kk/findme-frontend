/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet,  View, Text, TextInput, TouchableOpacity} from 'react-native';

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
            console.log(res)
            this.state.question = ''
            alert("질문 등록이 완료되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(err=>console.log(err))
      }
      
      render() {
        return (
            <View style={styles.container}>
                <Text>이름: {this.props.route.params.client.client_username}</Text>
                <Text>이메일: {this.props.route.params.client.client_email}</Text>
                <Text>질문</Text>
                <TextInput
                  style={styles.diaryname}
                  placeholder="질문 내용"
                  value={this.state.question}
                  onChangeText={(text) => {
                  this.setState({question: text})             
                  }}
                />
                <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                              this.submission();
                          }}
                  >
                      <Text>제출</Text>
                  </TouchableOpacity>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionRegister)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
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
