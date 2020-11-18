/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react'
import {TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { connect } from 'react-redux'
import { requestSignup } from '../../Store/actions/AuthAction'
import { ScrollView } from 'react-native-gesture-handler'

const mapDispatchToProps = (dispatch) => ({
    requestSignup: (data) => dispatch(requestSignup(data))
  })

var radio_props = [
    {label: '내담자', value: '0' },
    {label: '상담사', value: '1' }
  ];
  
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          name: '',
          password: '',
          passwordConfirmation: '',
          passwordFlag : false,
          authFlag: false,
          emailFlag: true,
          value: '0',
          introduce:'',
        }
      }
    
      onClickSignUp = async () => {
        try {
          const data = {
            email: this.state.email,
            username: this.state.name,
            password1: this.state.password,
            password2: this.state.passwordConfirmation,
            user_type: this.state.value,
            introduce: this.state.introduce
          }
          await this.props.requestSignup(data)
          alert('회원가입에 성공하였습니다!')
          this.props.navigation.navigate('Login')
        } catch (e) {
          alert('error' + e)
        }
      }

    render() {
        let reg = /^[a-zA-Z0-9_.+-]+@ajou.ac.kr/;

        return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>회원가입</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            labelHorizontal={true}
                            buttonColor={'#81BEF7'}
                            animation={true}
                            buttonSize={15}
                            labelStyle={{fontSize:15}}
                            selectedLabelStyle={{color:'red'}}
                            onPress={(value) => {
                                this.setState({value:value})
                            }}
                        />
                    </View>
                    <View style={styles.emailContainer}>
                        <TextInput style={styles.input}
                            placeholder="email"
                            value={this.state.email}
                            onChangeText={(text) => {
                                this.setState({email: text})             
                            }}
                        />
                            <TouchableOpacity
                                style={styles.authbtn}
                                onPress={()=>{
                                    if(reg.test(this.state.email)){
                                        alert('아주대학교 메일입니다.')
                                        this.setState({
                                            emailFlag: true,
                                        })
                                    } 
                                    else {
                                        alert("아주대학교 메일이 아닙니다!")
                                        this.setState({
                                            emailFlag: false,
                                        })
                                    }
                                }}
                            >
                            <Text>인증</Text>
                            </TouchableOpacity>
                            
                    </View>

                    <View style={styles.nameContainer}>
                        <TextInput style={styles.input}
                            placeholder="name"
                            value={this.state.name}
                            onChangeText={(text) => {
                                this.setState({name: text})             
                            }}
                        />
                    </View>
                    <View style={styles.passwordContainer}> 
                        <TextInput style={styles.password}
                            placeholder="비밀번호 입력"
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({password: text})
                                if(this.state.passwordConfirmation === text){
                                    this.state.passwordFlag = true
                                } 
                                else {
                                    this.state.passwordFlag = false
                                }
                            }}
                        />
                    </View>
                    <View style={styles.passwordConfirmationContainer}>
                        <TextInput style={styles.passwordConfirmation}
                            placeholder="비밀번호 재입력"
                            value={this.state.passwordConfirmation}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({passwordConfirmation: text})
                                if(this.state.password === text){
                                    this.state.passwordFlag = true
                                } 
                                else {
                                    this.state.passwordFlag = false
                                }                
                            }}
                        />
                        <View>
                            {this.state.passwordFlag ? <Text style={{marginLeft:20}}>비밀번호가 일치합니다!</Text>
                                                    : <Text></Text>}
                        </View>
                    </View>
                
                    <View style={styles.introduceContainer}>
                        <TextInput 
                            style={styles.introduce}
                            multiline={true}
                            placeholder="자기소개"
                            value={this.state.introduce}
                            onChangeText={(text) => {
                            this.setState({introduce: text})                  
                            }}
                        />
                    </View>

                    <View style={styles.nextContainer}>
                        <TouchableOpacity
                            style={styles.nextbtn}
                            onPress={()=>{
                                if(this.state.passwordFlag && this.state.emailFlag && this.state.name != ''){
                                    this.onClickSignUp()                              
                                }
                                else {
                                    alert("can't pass next page")
                                }
                            }}
                        >
                            <Text>가입 완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}

export default connect(() => ({}), mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FAFAFA',
    },
    titleContainer: {
        width: '100%',  
        padding: wp('10%'),
        alignItems: 'center',
    },
    radioContainer: {
        width: wp('100%'),
        alignItems:'center'         
    },
    emailContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    authContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordConfirmationContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    introduceContainer: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nextContainer: {
        marginTop: 10,
        justifyContent:'center',
        alignItems: 'center',
    },

    title: {
        fontSize: wp('10%'),
    },
    authbtn: {
        width: wp('15%'), 
        height: hp('6%'), 
        borderRadius: 10,
        backgroundColor:'#81BEF7', 
        alignItems:'center', 
        justifyContent:'center', 
        marginLeft: wp('10%')
    },
    introduce: {
        borderRadius: 5,
        backgroundColor:'white',
        marginLeft: 20,
        width:wp('80%'),
        height: hp('20%'),
    },
    input: {
        backgroundColor: 'white',
        width: wp('60%'),
        height: hp('6%'),
        marginLeft: 20,
        // marginBottom:
    },
    password: {
        backgroundColor: '#fff',
        width: wp('60%'),
        // marginBottom: 20,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    },
    passwordConfirmation: {
        backgroundColor: '#fff',
        width: wp('60%'),
        marginBottom: 10,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    },
    nextbtn: {
        width: wp('30%'), 
        height: hp('6%'),
        borderRadius: 10, 
        backgroundColor:'#81BEF7', 
        alignItems:'center', 
        justifyContent:'center', 
    }
});


