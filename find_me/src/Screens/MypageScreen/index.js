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
            datas: [
                {key:'0', data:'회원 정보 수정', icon:'account-circle-outline'},
                {key:'1', data:'상담 신청 내역 조회', icon:'grease-pencil'},
                {key:'2', data:'로그아웃', icon:'logout-variant'},
            ],
        }
    }

    _onclickLogout = () => {
        this.props.requestLogout()
        this.props.navigation.navigate('Login')
        alert("로그아웃 되었다.")
    }

    render() {
      return (
          <View style={styles.container}>
                <View style={styles.profile}>
                    <View style = {styles.profile_image}>
                    <Image 
                    style={styles.user}
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}}/>
                    <Text style={{fontSize:20, paddingTop:hp('2%'), fontWeight:'bold'}}>이름</Text>
                    </View>
                    <View style = {styles.profile_text}>
                        <Text style={{fontSize:16, marginBottom:hp('1%')}}>이메일</Text>
                        <Text style={{fontSize:16, marginBottom:hp('1%')}}>연결된 상담사</Text>
                        <Text style={{fontSize:16 }}>자기 소개</Text>
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
                                        this.props.navigation.push('userModification')
                                    }
                                    else if(item.key === '1'){

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
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  profile : {
    width:wp('100%'),
    height:hp('40%'),
    backgroundColor:'rgba(114,174,148,0.9)',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:wp('10%'),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  user:{
    width:wp('20%'),
    height:hp('10%'),
    borderRadius:200
  },
  profile_text:{
    paddingLeft:wp('10%'),
    fontSize:20,
  },
  profile_image:{
    flexDirection: 'column',
    alignItems:'center',
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


