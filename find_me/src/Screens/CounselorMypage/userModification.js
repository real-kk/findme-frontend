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

    data.append('name', this.props.route.params.name)
    data.append('user_type', this.props.route.params.user_type)
    data.append('email', this.props.route.params.email)
    const time = new Date();
    var date = time.getDate(); //Current Date
    var month = time.getMonth() + 1; //Current Month
    var year = time.getFullYear(); //Current Year
    var hours = time.getHours(); //Current Hours
    var min = time.getMinutes(); //Current Minutes
    var sec = time.getSeconds(); //Current Seconds

    data.append('image', {
      uri: this.state.image,
      type: 'image/png',
      name: `${year}-${month}-${date}_${hours}${min}${sec}.jpg`
    })
    data.append('introduce', this.state.introduce)
    console.log(this.props.route.params.id)
    console.log(data._parts)
    await axios.put(`/users/${this.props.route.params.id}/`, data,
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
          console.log(res)
          this.props.navigation.push('Mypage')
      })
      .catch(err=>console.log(err))
  }
  render () {
    return (
          <View style={styles.container}>
             <Text>회원정보 수정</Text>
             <Text>이름: {this.props.route.params.name}</Text>
             <Text>이메일: {this.props.route.params.email}</Text>
             <TouchableOpacity
                    style={styles.get_image}
                    onPress={()=>{this.addImage()}}>
                    <Text style={{ color: 'white', fontSize: 14 }}>사진 가져오기</Text>
              </TouchableOpacity>
              <Image
                    source={{uri: this.state.image ? this.state.image : null}}
                    style={styles.image}
              />
              <TextInput style={styles.input}
                            placeholder= "약력 작성"
                            value={this.state.introduce}
                            onChangeText={(text) => {
                                this.setState({introduce: text})             
                            }}
              />
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
    alignItems: 'center',
    justifyContent: 'center'
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
  image : {
    resizeMode:'contain',
    width:wp('90%'),
    marginLeft:wp('5%'),
    marginBottom:hp('3%'),
    height:hp('55%'),
},
})

export default connect(mapStateToProps, mapDispatchToProps)(userModificationScreen)
