/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Platform, StatusBar, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
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

  class CounselorsScreen extends React.Component {
      constructor(){
          super();
          this.state = {
            counselorList: [],
        }
      }

      getCounselorList = async () => {
          const data = await axios.get('/users/?user_type=1', 
          { headers: {
              'Authorization' : `Token ${this.props.token.auth.token}`
          }})
          .then(({data})=>{
              this.setState({counselorList: data.users})
          })
      }


    componentDidMount(){
        this.getCounselorList()
        this._ismounted = true

        if (this._isMounted) {
            this.setState({isLoading: false})
        }
    }

    componentWillUnmount(){
        this._ismounted = false
    }
        
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.result}>상담사 리스트</Text>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.counselorList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.95} 
                                onPress = {()=> {
                                    this.props.navigation.navigate('CounselorDetail', {
                                        counselor: this.state.counselorList[index]
                                    })
                                }}
                            >
                            <View style={styles.list}>
                                <Icon name="person-circle" size={40} style={styles.image}></Icon>
                                <View style={styles.list_side}>
                                <Text style={styles.title}>{item.fields.username + ' 상담사'}</Text>
                                <Text style={styles.text}>{item.fields.introduce}</Text>
                                </View>
                            </View>
                               
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(key, index) => index.toString()}
            />
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CounselorsScreen);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    list: {
        paddingHorizontal: '5%',
        paddingVertical: hp('2%'),
        marginTop : hp('1.5%'),
        marginBottom : hp('1.5%'),
        height: hp('16%'),
        width: wp('90%'),
        marginLeft: wp('5%'),
        backgroundColor:'#fafafa',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 7,
        flexDirection:'row',
        elevation: 5,
    },
    image:{
        justifyContent:'center',
        paddingTop: hp('1%'),
    },
    list_side:{
        flexDirection:'column',
    },
    title:{
        marginLeft: wp('10%'),
        paddingTop: hp('1%'),
        fontSize: 17,
        color: 'black',
        fontFamily:'netmarbleL'
    },
    text: {
        paddingTop: hp('1%'),
        marginLeft: wp('10%'),
        fontSize: 14,
        color:'gray',
        fontFamily:'netmarbleL'
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
});
