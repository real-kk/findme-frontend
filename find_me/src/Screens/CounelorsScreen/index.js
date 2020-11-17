/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
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
            <Text>상담사 리스트</Text>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.counselorList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
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
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#FAFAFA'
    },
    list: {
        padding: '5%',
        marginVertical : '2%',
        width: wp('98%'),
        height: hp('15%'),
        backgroundColor:'white',
        flexDirection:'row',
    },
    image:{
        paddingTop: hp('1%'),
    },
    list_side:{
        flexDirection:'column',
        alignItems: 'flex-start',
    },
    title:{
        marginLeft: wp('10%'),
        fontSize: 17,
        color: 'black',
        fontWeight: '900',
    },
    text: {
        paddingTop: hp('1%'),
        marginLeft: wp('10%'),
        fontSize: 15,
        color:'gray',
    }
});
