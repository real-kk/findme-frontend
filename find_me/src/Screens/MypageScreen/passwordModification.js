/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import axios from '../../axiosConfig'
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'


const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})

class passwordModificationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        password: '',
        new_password: '',
        passwordConfirm: ''
    }
  }


  submission = async() => {
    const data = {
      origin_password : this.state.password,
      new_password1 : this.state.new_password,
      new_password2 : this.state.passwordConfirm
    }
    await axios.post('/users/reset/password/', data,
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`,
          "Content-Type": "application/x-www-form-urlencoded"
      }})
      .then((res)=>{
          alert("비밀번호 변경이 완료되었습니다.")
          this.props.navigation.push('Mypage')
      })
      .catch((err)=>{
        if(err.response.status === 400){
          alert("새 비밀번호가 일치하지 않습니다.")
        }
        else if(err.response.status === 403){
          alert("기존 비밀번호가 일치하지 않습니다.")
        }
      })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>비밀번호 수정</Text>

        <View style={styles.input}>
            <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>기존 비밀번호 : </Text>
            <TextInput style={styles.title}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="기존 비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={(text) => {
                this.setState({password: text})             
            }}/>
        </View>
        <View style={styles.input}>
            <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>비밀번호 : </Text>
            <TextInput style={styles.title}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="새 비밀번호를 입력하세요."
            secureTextEntry={true}
            onChangeText={(text) => {
                this.setState({new_password: text})             
            }}/>
        </View>
        <View style={styles.input}>
            <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>비밀번호 재입력 : </Text>
            <TextInput style={styles.introduce}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="새 비밀번호를 재입력 하세요."
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({passwordConfirm: text})                
            }}/>
        </View>
        
        <TouchableOpacity
          onPress={()=>{
                this.submission();
        }}
        >
         <View style={styles.apply}>
            <Text style={{ color: 'white', fontSize: 18,  fontFamily: 'netmarbleB'}}>수정 완료</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  input:{
    flexDirection: "row",
    alignItems:'center',
    marginLeft: wp('5%'),
    marginTop: hp('3.5%'),
  },
  title: {
    borderRadius: 5,
    width:wp('78%'),
    fontSize:18,
    backgroundColor:'#fafafa',
    paddingLeft:wp('5%'),
  },
  introduce:{
    borderRadius: 5,
    width:wp('70%'),
    fontSize:18,
    backgroundColor:'#fafafa',
    paddingLeft:wp('5%'),
  },
  id:{
    borderRadius:5,
    borderWidth:0.5,
    width:wp('40%'),
    textAlign:'center',
    marginLeft:wp('30%'),
    borderColor:'gray',
    fontFamily: 'netmarbleM',
    marginBottom:hp('1%'),
  },
  get_image: {
    marginLeft: wp('35%'),
    width: wp('30%'),
    height: hp('3'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:hp('1%')
  },
  image : {
    marginTop:hp('4%'),
    marginLeft: wp('24%'),
    width:wp('52%'),
    marginBottom:hp('2%'),
    height:hp('26%'),
    borderRadius:200,
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
  apply: {
    marginTop: hp('5%'),
    marginLeft: wp('5%'),
    width: wp('90%'),
    borderRadius: 5,
    height: hp('6%'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(passwordModificationScreen)
