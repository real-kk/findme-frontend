/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import axios from '../../axiosConfig'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
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
    }
  }

  submission = () => {
    const formData = new FormData();
    formData.append('time_table', {
      uri: this.state.time_table,
      type: 'image/png',
      name: 'time_table.jpg'
    })
    formData.append('content', this.props.route.params.Apply_data.content);
    formData.append('phone_number', this.props.route.params.Apply_data.phone_number);
    formData.append('student_number', this.props.route.params.Apply_data.student_number);
    formData.append('major', this.props.route.params.Apply_data.major);
    formData.append('counselor', this.props.route.params.Apply_data.counselor_email)
    
    axios.put(`/counsels/${this.props.route.params.Apply_data.id}/`, formData,
    { headers: {
      'Authorization' : `Token ${this.props.token.auth.token}`
    }})
    .then(res=> {
      console.log(res)
      this.props.navigation.push('Mypage')
    })
    .catch(err=> {
      console.log(err)
    })
  }

  addImage = () => {
    ImagePicker.launchImageLibrary({}, res => {
        this.setState({
            time_table: res.uri
        })
        console.log(this.state.time_table)
    })
  }
  componentDidMount(){
    this.setState({
      time_table: this.props.route.params.Apply_data.time_table
    })
    console.log(this.props.route.params.Apply_data.time_table)
  }
  render () {
    return (
          <View style={styles.container}>
            <Text style={styles.result}>상담신청서 수정</Text>
            <ScrollView>
                <Text style={styles.text1}>상담 가능 시간표</Text>
                <View style={{flexDirection:'row'}}>
                <Text style={styles.text2}>학교 시간표 사진을 첨부해주세요</Text>
                <TouchableOpacity
                    style={styles.get_image}
                    onPress={()=>{this.addImage()}}>
                    <Text style={{ color: 'white', fontSize: 12, fontFamily:'netmarbleL'}}>시간표 가져오기</Text>
                </TouchableOpacity>
                </View>
                <Image
                    source={{uri: this.state.time_table ? this.state.time_table : null}}
                    style={styles.time_table}
                />
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={styles.submission}
                        onPress={()=>{
                            this.props.navigation.goBack()
                        }}
                >
                    <Text style={{color:'white', fontSize:18}}>이전 페이지</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submission}
                        onPress={()=>{
                            this.submission();
                        }}
                >
                <Text style={{color:'white', fontSize:18}}>제출하기</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
},
time_table : {
    width:wp('90%'),
    marginLeft:wp('5%'),
    marginBottom:hp('3%'),
    height:hp('54%'),
    borderWidth: 2,
    borderRadius: 5,
},
text1:{
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
    marginBottom: hp('2%'),
    fontSize: 18,
    fontFamily: 'netmarbleL'
},
text2:{
    marginLeft: wp('5%'),
    fontSize: 14,
    color:'#aaa',
    paddingTop: hp('0.5%'),
    marginBottom: hp('3%'),
    fontFamily: 'netmarbleL',
    alignItems: 'center',
    justifyContent: 'center',
},
get_image: {
    marginLeft: wp('5%'),
    width: wp('30%'),
    borderRadius: 5,
    height: hp('3'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
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
submission:{    
    borderRadius: 5,
    height: hp('6%'), 
    backgroundColor:'rgba(114,174,148,0.5)',
    alignItems:'center', 
    justifyContent:'center',
    width: wp('40%'),
    marginHorizontal:wp('5%'),
}
})

export default connect(mapStateToProps, mapDispatchToProps)(applicationFormModificationScreen)
