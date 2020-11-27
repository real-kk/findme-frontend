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
        image: '',
        introduce: '',
        username:'',
        career:'',
    }
  }

  addImage = () => {
    ImagePicker.launchImageLibrary({}, res => {
        console.log(res.uri)
        this.setState({
            image: res.uri
        })
        console.log(res.uri)
    })
  }

  submission = async() => {
    const data =new FormData();
    const time = new Date();
    var date = time.getDate(); //Current Date
    var month = time.getMonth() + 1; //Current Month
    var year = time.getFullYear(); //Current Year
    var hours = time.getHours(); //Current Hours
    var min = time.getMinutes(); //Current Minutes
    var sec = time.getSeconds(); //Current Seconds
    
    data.append('username', this.props.route.params.username)
    data.append('user_type', this.props.route.params.user_type)
    data.append('email', this.props.route.params.email)
    data.append('image', {
      uri: this.state.image,
      type: 'image/png',
      name: `${year}-${month}-${date}_${hours}${min}${sec}.jpg`
    })
    data.append('introduce', this.state.introduce)
    data.append('career',this.state.career)
    console.log(this.props.route.params.id)
    console.log(data._parts)
    await axios.put(`/users/${this.props.route.params.id}/`, data,
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
          console.log(res)
          this.props.navigation.push('CounselorMypage')
      })
      .catch(err=>console.log(err))
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>회원정보 수정</Text>
        <Text>프로필 사진</Text>
        <Image
          source={{uri: this.state.image ? this.state.image : this.props.route.params.image}}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.get_image}
          onPress={()=>{this.addImage()}}>
          <Text style={{ color: 'white', fontSize: 12, fontFamily:'netmarbleL'}}>사진 가져오기</Text>
        </TouchableOpacity>
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>이름 : </Text>
        <TextInput style={styles.title}
          underlineColorAndroid={'white'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.route.params.name}
          placeholderTextColor='black'
          value={this.state.content}
          onChangeText={(text) => {
            this.setState({username: text})             
        }}/>
        </View>
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>자기소개 : </Text>
        <TextInput style={styles.title}
          underlineColorAndroid={'white'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.route.params.introduce}
          placeholderTextColor='black'
          value={this.state.content}
          onChangeText={(text) => {
            this.setState({introduce: text})             
        }}/>
        </View>
        <View style={styles.input}>
        <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>약력 : </Text>
        <TextInput style={styles.title}
          underlineColorAndroid={'white'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={this.props.route.params.career}
          placeholderTextColor='black'
          value={this.state.content}
          onChangeText={(text) => {
            this.setState({career: text})             
        }}/>
        </View>
             
        <TouchableOpacity
          onPress = {()=> {
            this.submission();
          }}
        >
          <Text>수정 완료</Text>
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
    marginTop: hp('2%'),
  },
  title: {
    borderRadius: 5,
    width:wp('50%'),
    fontSize:18,
  },
  get_image: {
    width: wp('30%'),
    borderRadius: 5,
    height: hp('3'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image : {
    marginLeft: wp('20%'),
    width:wp('60%'),
    marginBottom:hp('3%'),
    height:hp('30%'),
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(userModificationScreen)
