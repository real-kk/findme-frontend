/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class MypageScreen extends React.Component {
    constructor(){
      super();
    //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.state={
          datas: [
              {key:'0', data:'회원 정보 수정'},
              {key:'1', data:'상담 신청서 수정'},
              {key:'2', data:'상담 신청 현황 확인'},
            ],
      }
    }

    _onclickLogout = () => {
        this.props.requestLogout()
        this.props.navigation.navigate('Login');
        alert("로그아웃 되었다.")
    }
    render() {
      return (
          <View style={styles.container}>
                <Text style = {styles.logo}>Home</Text>
                <FlatList
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('userModification')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('applicationFormModification')
                                    }
                                    else if(item.key === '2'){
                                        // this.props.navigation.push('Video')
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Text>{item.data}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

                            <TouchableOpacity
                                onPress={()=> {
                                    this._onclickLogout();
                                }}
                            >
                                <View>
                                    <Text>로그아웃</Text>
                                </View>
                            </TouchableOpacity>
            </View>
      )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: '10%',
    justifyContent:'center',
    backgroundColor : '#fffff0',
  },
  list: {
      borderWidth: 2,
      borderRadius: 8,
      padding:20,
      marginTop : '25%',
      marginHorizontal : '20%',
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen)
