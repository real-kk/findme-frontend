/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native'
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

class CounselorMypage extends React.Component {
    constructor(){
        super();
        this.state={
            datas: [
                {key:'0', data:'회원 정보 수정', icon:'account-circle-outline'},
                {key:'1', data:'내 후기 확인', icon:'grease-pencil'},
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
                <Text style = {styles.logo}>마이페이지</Text>
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
                                    <Icon name= {item.icon} size={20}/>   
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorMypage)

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FAFAFA',
 
  },
  list: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: '5%',
    marginTop : hp('10%'),
    flexDirection:'row',
    width: wp('60%'),
    height: hp('10%'),
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
      marginLeft: 5,
      fontSize: 20,
  }
});

