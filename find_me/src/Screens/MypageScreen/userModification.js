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
import ImagePicker from 'react-native-image-picker';

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})

class userModificationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        image: this.props.route.params.image,
        introduce: this.props.route.params.introduce,
        username: this.props.route.params.name,
    }
  }

  addImage = () => {
    ImagePicker.launchImageLibrary({}, res => {
        this.setState({
            image: res.uri
        })
    })
  }

  submission = async() => {
    const data =new FormData();
    const time = new Date();
    var date = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    var hours = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();

    data.append('username', this.state.username)
    data.append('user_type', this.props.route.params.user_type)
    data.append('email', this.props.route.params.email)
    data.append('image', {
      uri: this.state.image,
      type: 'image/png',
      name: `${year}-${month}-${date}_${hours}${min}${sec}.jpg`
    })
    data.append('introduce', this.state.introduce)
    await axios.put(`/users/${this.props.route.params.id}/`, data,
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
          this.props.navigation.push('Mypage')
      })
      .catch(err=>console.log(err))
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>회원정보 수정</Text>
        <Image
          source={{uri: this.state.image}}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.get_image}
          onPress={()=>{this.addImage()}}>
          <Text style={{ color: 'rgba(114,174,148,0.5)', fontSize: 15, fontFamily:'netmarbleB'}}>사진 가져오기</Text>
        </TouchableOpacity>
        <Text style={styles.id}>{this.props.route.params.email}</Text>
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>이름 : </Text>
        <TextInput style={styles.title}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder="ex) 홍길동"
          value={this.state.username}
          onChangeText={(text) => {
            this.setState({username: text})             
        }}/>
        </View>
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>자기소개 : </Text>
        <TextInput style={styles.introduce}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder="자신을 한 줄로 소개해주세요"
          value={this.state.introduce}
          onChangeText={(text) => {
            this.setState({introduce: text})             
        }}/>
        </View>
        
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleM'}}>연결된 상담사 : </Text>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>{this.props.route.params.link_man}</Text>
        </View>
        <TouchableOpacity
          onPress = {()=> {
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

export default connect(mapStateToProps, mapDispatchToProps)(userModificationScreen)
