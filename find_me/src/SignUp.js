/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {TouchableOpacity, StyleSheet,  View, Text, Button, TextInput } from 'react-native';


class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
          passwordConfirmation: '',
          passwordFlag : false,
          authFlag: false,
        }
      }

    render() {
        let reg = /^[a-zA-Z0-9_.+-]+@ajou.ac.kr/;

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize: 30}}>회원가입</Text>
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
                            style={{width: '15%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center', marginLeft: 40}}
                            onPress={()=>{
                                if(reg.test(this.state.email)){
                                    console.log("correct")
                                    alert('인증번호 발송')
                                } 
                                else {
                                    console.log("no")
                                    this.setState({
                                        email: ''
                                    })
                                }
                            }}
                        >
                        <Text>인증</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.authContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder="인증번호"
                            id = "auth"
                        />
                        <TouchableOpacity
                            style={{width: '15%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center', marginLeft: 40}}
                            onPress={()=>{
                                alert('인증되었습니다.')
                                this.state.authFlag = true;
                                document.getElementById('auth').editable
                            }}
                        >
                            <Text>확인</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput style={styles.password}
                        placeholder="비밀번호 입력"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <TextInput style={styles.passwordConfirmation}
                        placeholder="비밀번호 재입력"
                        value={this.state.passwordConfirmation}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({passwordConfirmation: text})
                            if(this.state.password === text){
                                // alert("password same")
                                this.state.passwordFlag = true
                            } 
                            else {
                                this.state.passwordFlag = false
                                console.log("no")
                            }                
                        }}
                    />
                    <View>
                        {this.state.passwordFlag ? <Text style={{marginLeft:20}}>비밀번호가 일치합니다!</Text>
                                                 : <Text></Text>}
                    </View>
                </View>
                <View style={styles.nextContainer}>
                    <TouchableOpacity
                        style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center', marginLeft: 200}}
                        onPress={()=>{
                            if(this.state.passwordFlag){
                                console.log("pass")
                                this.props.navigation.navigate('SignUpNext')
                            }
                            else {
                                alert("don't pass next page")
                            }
                        }}
                    >
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3EB489'
    },
    titleContainer: {
        paddingTop:30,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
    },
    emailContainer: {
        // flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    authContainer: {
        // flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordContainer: {
        // flex: 2,
        marginTop: 50,
    },
    nextContainer: {
        // flex: 1,
        marginTop: 50,
        justifyContent:'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        width: '60%',
        marginLeft: 20,
        height: 40
    },
    password: {
        backgroundColor: '#fff',
        width: '60%',
        marginBottom: 20,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    },
    passwordConfirmation: {
        backgroundColor: '#fff',
        width: '60%',
        marginBottom: 10,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    }
});

export default SignUp;
