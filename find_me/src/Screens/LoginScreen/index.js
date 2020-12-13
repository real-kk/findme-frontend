/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, StatusBar, StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm from 'react-native-simple-radio-button';
import { requestLogin } from '../../Store/actions/AuthAction';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Fontisto'
import Icons from 'react-native-vector-icons/Ionicons'
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
            console.log(this.props.token.auth.token)
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
            
                this.props.storeUserData({token : userToken})
                console.log(user)
                console.log(this.props.token.auth.token)        
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
                <Image source={require('../../../images/ajou.png')} style={styles.image}/>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Find</Text>
                    <Text style={styles.title2}>Me</Text>
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
                    <View style ={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="email" size={20} style={{paddingRight:wp('3%')}}/>
                    <TextInput
                        style={{width:wp('70%')}}
                        placeholder="Email"
                        value={this.state.emailInput}
                        onFocus={this.handleFocus}
                        underlineColorAndroid={'rgba(114,174,148,0.9)'}
                        onChangeText={(text) => {
                            this.setState({emailInput: text})             
                        }}
                    />
                    </View>
                </View>
                <View style={styles.pw}>
                <View style ={{flexDirection:'row', alignItems:'center'}}>
                    <Icons name="lock-closed-outline" size={20} style={{paddingRight:wp('3%')}}/>
                    <TextInput
                        style={{width:wp('70%')}}
                        placeholder="Password"
                        secureTextEntry={true}
                        onFocus={this.handleFocus}
                        underlineColorAndroid={'rgba(114,174,148,0.9)'}
                        value={this.state.pwInput}
                        onChangeText={(text) => {
                            this.setState({pwInput: text})             
                        }}
                    />
                </View>
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
        paddingTop: hp('10%'),
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    titleArea:{
        width: wp('100%'),
        paddingHorizontal: wp('26%'),
        paddingTop: hp('5%'),
        paddingBottom: hp('2%'),
        alignItems: 'center',
        flexDirection: 'row'
    },
    radioContainer: {
        width: '100%',
        paddingLeft: wp('7%'),
        alignItems:'center',
        marginBottom: 10  
    },
    id: {
        width: wp('80%'),
        marginTop: hp('2%'),
    },
    pw: {
        width: wp('80%'),
        marginTop: 8,
    },
    buttonArea: {
        width: wp('100%'),
        marginTop: 30,
        marginLeft:wp('20%'),
        height: hp('5%'),
    },
    title: {
        fontSize: 50,
        fontFamily: 'NanumSquare_acEB',
    },
    title2: {
        fontSize: 50,
        color: 'rgba(114,174,148,0.9)',
        fontFamily: 'NanumSquare_acEB'
    },
    image:{
        width:wp('42%'),
        height:hp('22%')
    },
    button: {
        backgroundColor: 'rgba(114,174,148,0.9)',
        borderRadius: 5,
        width: wp('80%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp('2%')
      },
    buttonTitle: {
        color: 'white',
        fontFamily:'netmarbleB',
        fontSize: 18,
    }

});

