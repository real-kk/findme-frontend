/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { requestLogin } from '../../Store/actions/AuthAction';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })
  
const mapDispatchToProps = (dispatch) => ({
    requestLogin: (data) => dispatch(requestLogin(data))
  })


var radio_props = [
    {label: '내담자', value: 0 },
    {label: '상담사', value: 1 }
  ];

  
  class LoginScreen extends React.Component {
      constructor(props) {
          super(props)
          this.state = {
              emailInput: '',
              pwInput: ''
            }
        }

        // onclickLogin = async () => {
        //     const data = {
        //         email: this.state.emailInput,
        //         password: this.state.pwInput
        //         }
        //     await this.props.requestLogin(data)
        
        // }
        render() {
            return (
                <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Find Me</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        labelHorizontal={true}
                        formHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        radioStyle={{paddingRight: 20}}
                        buttonSize={15}
                        labelStyle={{fontSize:15}}
                        selectedLabelStyle={{color:'red'}}
                        onPress={(value) => {this.setState({value:value})}}
                    />
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        placeholder="Email"
                        value={this.state.emailInput}
                        onChangeText={(text) => {
                            this.setState({emailInput: text})             
                        }}
                    />
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
                            // this.onclickLogin()
                        }}>
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
    container: {
        flex: 1,
        backgroundColor: '#2ACAB9',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea:{
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    radioContainer: {
        width: '100%',
        paddingLeft: wp('8%'),
        alignItems:'center',
        marginBottom: 10  
    },
    formArea: {
        width: '100%',
        backgroundColor:'#F0F5F4',
        alignItems: 'center'
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    title: {
        fontSize: wp('10%'),
    },
    button: {
        backgroundColor: "#569CDA",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      },
      buttonTitle: {
        color: 'white',
      }

});

