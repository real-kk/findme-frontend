/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm from 'react-native-simple-radio-button';
import { requestLogin } from '../../Store/actions/AuthAction';
import { connect } from 'react-redux'

import {
    getUserData,
    storeUserData,
  } from "../../Store/actions/AuthAction"
;
const mapStateToProps = (state) => ({
    token: state
  })
  
const mapDispatchToProps = (dispatch) => ({
    requestLogin: (data) => dispatch(requestLogin(data)),
    storeUserData: (data) => dispatch(storeUserData(data)),
  })


var radio_props = [
    {label: '내담자', value: '0' },
    {label: '상담사', value: '1' }
  ];

  
  class LoginScreen extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
              emailInput: '',
              pwInput: '',
              value: '0'
            }
        }

        onclickLogin = async () => {
            const data = {
                email: this.state.emailInput,
                password: this.state.pwInput,
                user_type: this.state.value
            }
            await this.props.requestLogin(data)

            this.setState({
                emailInput: '',
                pwInput: '',
            })

            getUserData()
            .then((data) => { 
              
                if (!data) {
                    this.props.storeUserData({token : null})
                    return
                }
        
                let user = JSON.parse(data)
                let userToken = user[0][1];
                let currentuserType = user[1][1];
            
                console.log(userToken + ' ' + currentuserType)
                this.props.storeUserData({token : userToken})
                        
                this.props.navigation.navigate('User', {userType: currentuserType});
            })
            .catch((err) => {
                console.log(err)
                alert("Failed to login!!!!!! : ", err)
            })
        }
        render() {
            return (
                <View style={styles.container}>
                <StatusBar hidden= {true}/>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Find Me</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        labelHorizontal={true}
                        formHorizontal={true}
                        buttonColor={'rgba(114,174,148,0.5)'}
                        selectedButtonColor={'green'}
                        selectedLabelColor={'green'}
                        animation={true}
                        radioStyle={{paddingRight: 20}}
                        buttonSize={15}
                        labelStyle={{fontSize:15}}
                        selectedLabelStyle={{color:'red'}}
                        onPress={(value) => {this.setState({value:value})}}
                    />
                </View>
                <View style={styles.id}>
                    <TextInput
                        placeholder="Email"
                        value={this.state.emailInput}
                        onChangeText={(text) => {
                            this.setState({emailInput: text})             
                        }}
                    />
                </View>
                <View style={styles.pw}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.pwInput}
                        onChangeText={(text) => {
                            this.setState({pwInput: text})             
                        }}
                    />
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            this.onclickLogin()
                        }}
                    >
                    <Text style={styles.buttonTitle}>로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate('Signup')
                        }}
                    >
                        <Text style={styles.buttonTitle}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FAFAFA',
    },
    titleArea:{
        width: wp('100%'),
        padding: wp('10%'),
        alignItems: 'center',
    },
    radioContainer: {
        width: '100%',
        paddingLeft: wp('8%'),
        alignItems:'center',
        marginBottom: 10  
    },
    id: {
        width: wp('70%'),
        backgroundColor:'white',
        alignItems: 'center'
    },
    pw: {
        width: wp('70%'),
        marginTop: 8,
        backgroundColor:'white',
        alignItems: 'center'
    },
    buttonArea: {
        width: wp('50%'),
        marginTop: 30,
        height: hp('5%'),
    },
    title: {
        fontSize: wp('10%'),
    },
    button: {
        backgroundColor: 'rgba(114,174,148,0.9)',
        borderRadius: 10,
        width: wp('50%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      },
    buttonTitle: {
        color: 'white',
    }

});

