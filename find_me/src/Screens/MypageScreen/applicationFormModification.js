/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
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

class applicationFormModificationScreen extends React.Component {
  constructor(){
    super();
    this.state={
        client_email: '',
        name: '',
        content: '',
        time_table: '',
        student_number: '',
        phone_number: '',
        major: '',
        counselor_email: '',
    }
  }
  
  componentDidMount(){
    axios.get('/counsels/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
        console.log("신청서")
        console.log(res.data[0])
        this.setState({
          client_email: res.data.[0].client_email,
          name: res.data[0].client_username,
          content: res.data[0].content,
          phone_number: res.data[0].phone_number,
          student_number: res.data[0].student_number,
          time_table: res.data[0].time_table,
          major: res.data[0].major,
          id: res.data[0].id,
          counselor_email: res.data[0].counselor_email,
        })
      })
      .catch(err=>console.log(err))
  }

  next = () => {
    const data = {
        major: this.state.major,
        student_number: this.state.student_number,
        phone_number: this.state.phone_number,
        content: this.state.content,
        time_table: this.state.time_table,
        id: this.state.id,
        counselor_email: this.state.counselor_email
    }
    this.props.navigation.navigate('applicationFormModification2', {
        Apply_data: data
    })
  }
  render () {
    return (
          <View style={styles.container}>
             <View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>전공 : </Text>
                <TextInput style={styles.title}
                value={this.state.major}
                placeholder= {this.state.major}
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={(text) => {
                    this.setState({major: text})             
                }}
                />
                </View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>학번 : </Text>
                <TextInput style={styles.title}
                placeholder={this.state.student_number}
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.student_number}
                onChangeText={(text) => {
                    this.setState({student_number: text})             
                }}
                />
                </View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>전화번호 : </Text>
                <TextInput style={styles.title}
                placeholder="ex) 010-1234-5678"
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.phone_number}
                onChangeText={(text) => {
                    this.setState({phone_number: text})             
                }}
                />
                </View>
                <Text style={styles.text_title}>하고싶은 말</Text>
                <TextInput style={styles.text}
                multiline={true}
                placeholder="상담사님께 하고 싶은 말을 적어주세요"
                value={this.state.content}
                onChangeText={(text) => {
                    this.setState({content: text})             
                }}
                />

                <TouchableOpacity
                    onPress={()=>{
                        this.next();
                    }}
                >
                <View style={styles.apply}>
                    <Text style={{ color: 'white', fontSize: 18 }}>다음 페이지</Text>
                </View>
                </TouchableOpacity>
            
            </View>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  input:{
    flexDirection: "row",
    alignItems:'center',
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },
  text: {
      borderRadius: 20,
      borderColor:'rgba(114,174,148,0.5)',
      borderWidth:2,
      backgroundColor:'#fafafa',
      marginVertical: hp('5%'),
      marginHorizontal: wp('5%'),
      paddingLeft:wp('5%'),
      height:hp('30%'),
  },
  title: {
      borderRadius: 5,
      width:wp('50%'),
  },
  text_title: {
      alignItems:'center',
      marginLeft: wp('5%'),
      marginTop: hp('3%'),
      fontSize: 18 ,
      fontFamily: 'netmarbleL'
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
      marginLeft: wp('5%'),
      width: wp('90%'),
      borderRadius: 50,
      height: hp('6%'),
      backgroundColor: 'rgba(114,174,148,0.5)',
      alignItems: 'center',
      justifyContent: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(applicationFormModificationScreen)
