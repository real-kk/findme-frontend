/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react'
import {TouchableOpacity, ImageBackground, StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { connect } from 'react-redux'
import { requestSignup } from '../../Store/actions/AuthAction'
import { ScrollView } from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-picker';

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
    }

      addImage = () => {
        ImagePicker.launchImageLibrary({}, res => {
            this.setState({
                introduce: res.uri
            })
        })
    }
    render() {
        let reg = /^[a-zA-Z0-9_.+-]+@ajou.ac.kr/;

        return (
                <View style={styles.container}>
                    {/* <ImageBackground source={require('../../../images/back.png')} style={styles.image}></ImageBackground> */}
                    <View style={{backgroundColor: 'rgba(114,174,148,0.9)', width:wp('100%'), height:hp('10%')}}>
                        <Text style={styles.title}>회원가입</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            labelHorizontal={true}
                            buttonColor={'rgba(114,174,148,0.5)'}
                            selectedButtonColor={'green'}
                            selectedLabelColor={'green'}
                            animation={true}
                            buttonSize={15}
                            labelStyle={{fontSize:15}}
                            onPress={(value) => {
                                this.setState({value:value})
                            }}
                        />
                    </View>
                    <View style={styles.emailText}>
                        <Text style={{marginLeft: wp('5%'), marginBottom:hp('1%')}}>이메일 *</Text>
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
                    <Text style={{marginLeft: wp('5%'), marginBottom:hp('1%')}}>이름 *</Text>
                        <TextInput style={styles.input}
                            placeholder="name"
                            value={this.state.name}
                            onChangeText={(text) => {
                                this.setState({name: text})             
                            }}
                        />
                    </View>

                    <View style={styles.passwordContainer}> 
                    <Text style={{marginLeft: wp('5%'), marginBottom:hp('1%')}}>비밀번호 *</Text>
                        <TextInput style={styles.input}
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
                    <Text style={{marginLeft: wp('5%'), marginBottom:hp('1%')}}>비밀번호 재입력 *</Text>
                        <TextInput style={styles.input}
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
                            {this.state.passwordFlag ? <Text style={{marginLeft:20, color: 'red'}}>비밀번호 일치!</Text>
                                                    : <Text></Text>}
                        </View>
                    </View>

                    <View style={styles.introduceContainer}>
                    <Text style={{marginLeft: wp('5%'), marginBottom:hp('1%')}}>자기소개 *</Text>
                        <TextInput style={styles.input_introduce}
                            placeholder="한 줄로 자기소개를 해주세요"
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
                                    alert("can't login")
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
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    title: {
        // backgroundColor: 'rgba(114,174,148,0.9)',
        marginTop:hp('3%'),
        fontSize:30, 
        color:'black', 
        textAlign:'center',
        fontFamily:'netmarbleB'
    },
    image: {
        flex: 1,
        width:wp('100%'),
        height:hp('100%'),
        justifyContent: "center"
    },
    radioContainer: {
        width: wp('100%'),
        marginTop: hp('3%'),
        alignItems:'center'         
    },
    emailText: {
        width: '100%',
        marginTop: wp('10%'),
    },
    emailContainer: {
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    input: {
        // backgroundColor: 'white',
        width: wp('70%'),
        borderColor: 'gray',
        borderWidth: 1,
        // border: 'black',
        height: hp('6%'),
        marginLeft: wp('5%')
        // marginBottom:
    },
    nameContainer: {
        width: '100%',
        marginTop: wp('5%'),
    },
    passwordContainer: {
        width: '100%',
        marginTop: wp('5%'),
    },
    passwordConfirmationContainer: {
        width: '100%',
        marginTop: wp('5%'),
    },
    introduceContainer: {
        width: '100%',
        marginTop: wp('4%'),
    },
    introduce: {
        width: '100%',
        marginTop: wp('5%'),
    },
    input_introduce: {
       // backgroundColor: 'white',
       width: wp('90%'),
       borderColor: 'gray',
       borderWidth: 1,
       // border: 'black',
       height: hp('6%'),
       marginLeft: wp('5%')
       // marginBottom: 
    },
    authbtn: {
        width: wp('15%'), 
        height: hp('6%'), 
        borderRadius: 10,
        backgroundColor:'rgba(114,174,148,0.5)', 
        alignItems:'center', 
        justifyContent:'center', 
        marginLeft: wp('5%')
    },
    nextbtn: {
        width: wp('30%'), 
        height: hp('6%'),
        borderRadius: 10, 
        backgroundColor:'rgba(114,174,148,0.5)', 
        alignItems:'center', 
        marginTop: hp('2%'),
        justifyContent:'center', 
    }
    // titleContainer: {
    //     width: '100%',  
    //     padding: wp('10%'),
    //     alignItems: 'center',
    // },
    // authContainer: {
    //     marginTop: 50,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // nextContainer: {
    //     marginTop: 10,
    //     justifyContent:'center',
    //     alignItems: 'center',
    // }, 
    // introduce: {
    //     borderRadius: 5,
    //     backgroundColor:'white',
    //     marginLeft: 20,
    //     width:wp('80%'),
    //     height: hp('20%'),
    // },
    
    // password: {
    //     backgroundColor: '#fff',
    //     width: wp('60%'),
    //     // marginBottom: 20,
    //     marginLeft: 20,
    //     justifyContent: 'center',
    //     height: 40
    // },
    // passwordConfirmation: {
    //     backgroundColor: '#fff',
    //     width: wp('60%'),
    //     marginBottom: 10,
    //     marginLeft: 20,
    //     justifyContent: 'center',
    //     height: 40
    // },
});


