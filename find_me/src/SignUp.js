/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet,  View, Text, Button, TextInput } from 'react-native';


class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          email: '',
          password: '',
          passwordConfirmation: '',
          passwordFlag : false,
        }
      }

    
    // nextPage = () => {
    //     if(this.state.passwordFlag){
    //         console.log("pass")
    //         this.props.navigation.navigate('SignUpNext', {
    //             email: this.state.email
    //         })
    //     }
    //     else {
    //         alert("don't pass next page")
    //     }
    // }
    
    render() {
        let reg = /^[a-zA-Z0-9_.+-]+@ajou.ac.kr/;

        return (
            <View>
                <Text>회원가입</Text>
                <TextInput style={styles.input}
                    placeholder="email"
                    value={this.state.email}
                    onChangeText={(text) => {
                        this.setState({email: text})
                        // if(reg.test(text)){
                        //     console.log("correct")
                        // } 
                        // else {
                        //     console.log("no")
                        // }                
                    }}
                />
                <Button
                    title="인증번호 발송"
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
                />
                <TextInput style={styles.input}
                    placeholder="인증번호"
                />
                <Button
                    title="인증"
                    onPress={()=>{
                        alert('인증되었습니다.')
                    }}
                />
                <TextInput style={styles.input}
                    placeholder="비밀번호 입력"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                />
                <TextInput style={styles.input}
                    placeholder="비밀번호 재입력"
                    value={this.state.passwordConfirmation}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({passwordConfirmation: text})
                        if(this.state.password === text){
                            alert("password same")
                            this.state.passwordFlag = true
                        } 
                        else {
                            console.log("no")
                        }                
                    }}
                />
                <Button
                    title="다음"
                    onPress={()=>{
                        if(this.state.passwordFlag){
                            console.log("pass")
                            this.props.navigation.navigate('SignUpNext')
                        }
                        else {
                            alert("don't pass next page")
                        }
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        width: '60%',
        marginTop: 20,
    },
    // btn: {
    //     width: '20%'
    // }
});

export default SignUp;
