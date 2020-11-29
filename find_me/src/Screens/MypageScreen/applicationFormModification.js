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
        this.setState({
          client_email: this.props.route.params.client_email,
          name: this.props.route.params.client_name,
          content: this.props.route.params.content,
          phone_number: this.props.route.params.phone_number,
          student_number: this.props.route.params.student_number,
          time_table: this.props.route.params.time_table,
          major: this.props.route.params.major,
          id: this.props.route.params.id,
          counselor_email: this.props.route.params.counselor_email,
        })
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
            <Text style={styles.result}>상담신청서 수정</Text>
             <View>
                <Text style={styles.link_man}>신청 상담사 : {this.props.route.params.link_man}</Text>
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
                    <Text style={{ color: 'white', fontSize: 18, fontFamily:'netmarbleB'}}> 다음 페이지</Text>
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
    link_man:{
      marginLeft: wp('15%'),
      marginTop: hp('3%'),
      fontSize: 18 , 
      fontFamily: 'netmarbleM',
      backgroundColor: 'rgba(114,174,148,0.5)',
      color: 'white',
      width: 'auto',
      paddingVertical:hp('0.4%'),
      paddingLeft: wp('3%'),
      borderBottomLeftRadius:5,
      borderTopLeftRadius: 5,
    },
    text: {
        borderRadius: 20,
        borderColor:'rgba(114,174,148,0.5)',
        borderWidth:2,
        backgroundColor:'#fafafa',
        marginTop: hp('3%'),
        marginBottom: hp('5%'),
        marginHorizontal: wp('5%'),
        paddingLeft:wp('5%'),
        height:hp('26%'),
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
        borderRadius: 5,
        height: hp('6%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(applicationFormModificationScreen)
