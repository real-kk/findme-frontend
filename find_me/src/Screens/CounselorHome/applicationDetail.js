import React from 'react';
import { StyleSheet,  View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Ionicons'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
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
      console.log('/counsels/' + this.state.application.id + '/?counsel_date_id=' + this.state.not_exist)
        await axios.delete('/counsels/' + this.state.application.id + '/?counsel_date_id=' + this.state.not_exist,
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
            alert("반려 완료!")
            this.props.navigation.push('Home')
        })
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
        // .catch(err => console.log(err))
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
            console.log(res.data.id)
            this.setState({
              id: res.data.id
            })
        })
        .catch(err => console.log(err))
        console.log("$$")
        await axios.delete('/counsels/' + this.state.application.id + '/?counsel_date_id='+this.state.id, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            
            alert("승인 완료!")
            this.props.navigation.push('Home')
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
                    style={{height: hp('40%'), width: wp('80%'), marginVertical: hp('2%')}} 
                    source={{uri: this.state.application.time_table}}/>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                  style={styles.submission}
                    onPress={()=>{
                    this.submission()
                  }}  
                >
                  <Text style={{color:'white', fontSize:18, fontFamily:'netmarbleB'}}>상담 승인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submission}
                    onPress={()=>{
                      this.reject()
                    }}
                >
                  <Text style={{color:'white', fontSize:18, fontFamily:'netmarbleB'}}>상담 반려</Text>
                </TouchableOpacity>
              </View>
        </View>
        
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  profile:{
    marginLeft:wp('5%'), 
    marginBottom:hp('1.5%'),
    fontSize: 17, 
    fontFamily:'netmarbleM'
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
    marginLeft:wp('9.5%'),
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