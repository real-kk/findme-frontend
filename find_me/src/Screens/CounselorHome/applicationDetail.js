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
            type : -1
        }
    }
    reject = async() => {
        await axios.delete('/counsels/' + this.state.application.id + '/', 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
            alert("반려 완료!")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }   

    submission = async () => {
        const data = {
            client: this.state.application.client_email,
        }
        console.log(data)
        await axios.post('/counsels/date/', data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))

        await axios.delete('/counsels/' + this.state.application.id + '/', 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            
            alert("승인 완료!")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
                <View style={styles.list_head}>
                <Image 
                style={styles.user}
                source={{uri: this.state.application.client_image === null ? 
                'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' : 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + this.state.application.client_image}}/>
                <View style={styles.head_text}>
                <Text style={styles.username}>이름 : {this.state.application.client_username}</Text>
                <Text style={styles.introduce}> {this.state.application.content}</Text>
                </View>
                </View>
                <View style={styles.list_body}>
                <Text>전공 : {this.state.application.major}</Text>
                <Text>학번 : {this.state.application.student_number}</Text>
                <Text>전화번호 : {this.state.application.phone_number}</Text>
               
                <Text>시간표 이미지 </Text>
                <Image
                    style={{height: wp('80%'), width: '100%'}} 
                    source={{uri: this.state.application.time_table}}/>
                </View>
                <TouchableOpacity
                   style={styles.apply}
                            onPress={()=>{
                               this.submission()
                            }}
                            
                        >
                    <Text>상담 승인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.apply}
                            onPress={()=>{
                              this.reject()
                            }}
                            
                        >
                    <Text>상담 반려</Text>
                </TouchableOpacity>
        </View>
        
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        backgroundColor: '#FAFAFA'
      },
      user:{
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 200,
      },
      list_body: {
        padding: '1%',
        width: wp('100%'),
        height: hp('65%'),
        backgroundColor:'white',
        flexDirection:'column',
      },
      list_head:{
        flexDirection:'row',
        alignItems: 'center',
        height:hp('10%'),
        backgroundColor:'white',
      },
      head_text:{
        flexDirection:'column',  
      },
      apply: {
        width: wp('100%'),
        borderRadius: 2,
        height: hp('5%'), 
        backgroundColor:'#AAF0D1', 
        alignItems:'center', 
        justifyContent:'center',
      },
      username: {
        marginLeft: wp('3%'),
        fontSize: 19,
        color: 'black',
        fontWeight: '700',
      },
      introduce: {
        marginLeft: wp('2%'),
        fontSize: 15,
        color: 'gray',
      },
});
