/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
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
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor:'white',
    },
    list: {
        paddingHorizontal: '5%',
        paddingVertical: hp('1%'),
        marginVertical : hp('1%'),
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
    },
    list_side:{
        flexDirection:'column',
    },
    title:{
        marginLeft: wp('10%'),
        fontSize: 17,
        color: 'black',
        fontWeight: '700',
    },
    text: {
        paddingTop: hp('1%'),
        marginLeft: wp('10%'),
        fontSize: 15,
        color:'gray',
    },
    result: {
        fontSize: 23,
        paddingLeft: wp('5%'),
        marginTop: hp('3%'),
        marginBottom: hp('2%'),
        fontWeight: 'bold'
    }
});
