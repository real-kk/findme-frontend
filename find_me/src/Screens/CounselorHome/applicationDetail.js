import React from 'react';
import { StyleSheet,  View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import axios from '../../axiosConfig';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'

const mapStateToProps = (state) => ({
    token: state
  })

class ApplicationDetail extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          application: this.props.route.params.application,
          type : -1,
          id: '',
          not_exist: -1,
      }
  }
  reject = async() => {
    await axios.delete('/counsels/' + this.state.application.id + '/?counsel_date_id=' + this.state.not_exist,
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }
    })
    .then((res) => {
      alert("반려 완료!")
      this.props.navigation.push('Apply')
    })
    .catch(err=>console.log(err))
  }   

  submission = async () => {
    const data = {
      client: this.state.application.client_email,
    }
    await axios.post('/counsels/date/', data, 
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }
    })
    .then((res) => {
      this.setState({
        id: res.data.id
      })
    })
    .catch(err => console.log(err))
    
    await axios.delete('/counsels/' + this.state.application.id + '/?counsel_date_id='+this.state.id, 
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }
    })
    .then((res) => {
      alert("승인 완료!")
      this.props.navigation.push('Apply')
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>신청서 상세 정보</Text>
        <View style={styles.list_head}>
          <View>
            <Image 
            style={styles.user}
            source={{uri: this.state.application.client_image === null ? 
            'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' : 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + this.state.application.client_image}}/>
            <Text style={styles.username}>{this.state.application.client_username}</Text>
          </View>
          <View style={styles.head_text}>
            <Text style={styles.profile}>전공 : {this.state.application.major}</Text>
            <Text style={styles.profile}>학번 : {this.state.application.student_number}</Text>
            <Text style={styles.profile}>전화번호 : {this.state.application.phone_number}</Text>
            <Text style={styles.profile}>하고 싶은 말 : {this.state.application.content}</Text>
            <Text style={styles.profile}>수업 시간표</Text>
          </View>
        </View>
        <View style={styles.list_body}>
          <Image
            style={{height: hp('40%'), width: wp('90%'), marginVertical: hp('2%'), resizeMode:'contain'}} 
            source={{uri: this.state.application.time_table}}/>
        </View>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={styles.submission}
            onPress={()=>{
              this.submission()
            }}>
            <Text style={{color:'white', fontSize:18, fontFamily:'netmarbleB'}}>상담 승인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submission}
            onPress={()=>{
              this.reject()
            }}>
            <Text style={{color:'white', fontSize:18, fontFamily:'netmarbleB'}}>상담 반려</Text>
          </TouchableOpacity>
        </View>
      </View>  
    )
  }
}
export default connect(mapStateToProps)(ApplicationDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  profile:{
    marginLeft:wp('5%'), 
    marginBottom:hp('1.5%'),
    fontSize: 15, 
    fontFamily:'netmarbleL'
  },
  user:{
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: 200,
    borderWidth:2,
    borderColor:'rgba(114,174,148,0.9)',
  },
  username:{
    paddingTop:hp('1%'),
    marginLeft:wp('7%'),
    fontSize: 17, 
    fontFamily:'netmarbleB',
    paddingBottom:hp('2%')
  },
  list_body: {
    flexDirection:'column',
    alignItems:'center',
  },
  list_head:{
    flexDirection:'row',
    paddingTop:hp('2%'),
    paddingLeft: wp('5%'),
    backgroundColor:'#FAFAFA'
  },
  head_text:{
    flexDirection:'column', 
    marginTop:hp('1.7%'),
    width:wp('60%'),
  },
  submission:{    
    borderRadius: 5,
    height: hp('6%'), 
    backgroundColor:'rgba(114,174,148,0.5)',
    alignItems:'center', 
    justifyContent:'center',
    width: wp('40%'),
    marginHorizontal:wp('5%'),
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color: 'white',
    backgroundColor: 'rgba(114,174,148,0.9)',
  }
});