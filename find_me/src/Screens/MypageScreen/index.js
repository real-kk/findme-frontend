/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Platform, StatusBar, Image, StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from '../../axiosConfig'
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

class MypageScreen extends React.Component {
    constructor(){
        super();
        this.state={
            id: '',
            name: '',
            email: '',
            link_man: '',
            user_type: '',
            introduce: '',
            image: '',
            datas: [
                {key:'0', data:'회원 정보 수정', icon:'account-circle-outline'},
                {key:'1', data:'상담 신청서 수정', icon:'grease-pencil'},
                {key:'2', data:'로그아웃', icon:'logout-variant'},
            ],
        }
    }

    _onclickLogout = () => {
        this.props.requestLogout()
        this.props.navigation.navigate('Login')
        alert("로그아웃 되었다.")
    }

    componentDidMount(){
      axios.get('/users/selfinfos/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
        this.setState({
          id: res.data.id,
          name: res.data.username === null ? 'None' : res.data.username,
          email: res.data.email,
          user_type: res.data.user_type,
          image: res.data.image === "" ? 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' 
          :'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + res.data.image,
          introduce: res.data.introduce === '' ? 'None!' : res.data.introduce
        })
        console.log(res.data)
      })
      .catch(err=>console.log(err))

      axios.get('/counsels/date/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
        this.setState({
          link_man: res.data[0].counselor_username === undefined ? '없음' : res.data[0].counselor_username
        })
        console.log(this.state.link_man)
      })
      .catch(err=>console.log(err))

      // axios.get('/counsels/',
      // { headers: {
      //   'Authorization' : `Token ${this.props.token.auth.token}`
      // }})
      // .then((res)=>{
      //   console.log("신청서")
      //   console.log(res)
      // })
      // .catch(err=>console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
                <Text style={styles.logo}>FIND ME</Text>
                <View style={styles.profile}>
                    <View style = {styles.profile_image}>
                    <Image 
                    style={styles.user}
                    source={{uri: this.state.image ? this.state.image : null}}/>
                    <Text style={{ fontSize:18, paddingTop:hp('1.5%'), fontFamily:'netmarbleB', textAlign:'center'}}>{this.state.name}</Text>
                    </View>
                    <View style = {styles.profile_text}>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>이메일</Text>
                        <Text style={{fontSize:16, marginBottom:hp('1%'), fontFamily:'netmarbleL', color:'white'}}>{this.state.email}</Text>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>연결된 상담사</Text>
                        <Text style={{fontSize:16, marginBottom:hp('1%'), fontFamily:'netmarbleL', color:'white'}}>{this.state.link_man}</Text>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>자기 소개</Text>
                        <Text style={{fontSize:16, fontFamily:'netmarbleL', color:'white'}}>{this.state.introduce}</Text>
                    </View>
                    <View style={styles.circle}  />
                </View>
                
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('userModification', {
                                          id: this.state.id,
                                          email: this.state.email,
                                          name: this.state.name,
                                          user_type: this.state.user_type,
                                          image: this.state.image,
                                          introduce: this.state.introduce,
                                          link_man: this.state.link_man,
                                        })
                                    }
                                    else if(item.key === '1'){
                                      this.props.navigation.push('applicationFormModification', {
                                        link_man: this.state.link_man,
                                        name: this.state.name,
                                      })
                                    }
                                    else if(item.key === '2'){
                                        this._onclickLogout();
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Icon name= {item.icon} size={30} color='rgba(114,174,148,0.9)'/>   
                                    <Text style={styles.text}>{item.data}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen)

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  logo:{
    paddingTop: hp('4%'),
    fontSize:30, 
    color:'#fff', 
    textAlign:'center',
    fontFamily:'netmarbleB',
    backgroundColor:'rgba(114,174,148,0.9)',
    width:wp('100%'),
  },
  profile : {
    width:wp('100%'),
    height:hp('32%'),
    backgroundColor:'rgba(114,174,148,0.9)',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:wp('5%'),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom:hp('2%'),
  },
  profile_image:{
    marginLeft:wp('1%'),
  },
  user:{
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: 200,
    borderWidth:2,
    borderColor:'white'

  },
  profile_text:{
    marginTop:hp('1%'),
    paddingLeft:wp('10%'),
    fontSize:20,
  },
  
  list: {
    width: wp('100%'),
    height: hp('10%'),
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:wp('9%'),
  },
  
  text: {
      marginLeft: 5,
      fontSize: 20,
      paddingLeft:wp('5%'),
      color:'gray'
  },

});


