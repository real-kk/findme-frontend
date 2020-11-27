import React from 'react';
import { Image, Platform, StatusBar, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import axios from '../../axiosConfig'
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


class CounselorApplyScreen extends React.Component {
    constructor(){
        super();
        this.state = {
          applicationList: [],
      }
    }

    getApplicationList = async () => {
        await axios.get('/counsels/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({applicationList: data})
            console.log(data)
        })
    }

    componentDidMount(){
        this.getApplicationList()
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>상담 신청 리스트</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.applicationList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.95} 
                                onPress = {()=> {
                                    this.props.navigation.navigate('ApplicationDetail', {
                                        application : this.state.applicationList[index]
                                    })
                                }}
                            >
                               <View style={styles.list}>
                                    <Image 
                                    style={styles.user}
                                    source={{uri: item.client_image === null ? 
                                    'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/noimage.png' : 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + item.client_image}}/>
                                    <View style={styles.list_side}>
                                    <Text style={styles.title}>신청자 : {item.client_username}</Text>
                                    <Text style={styles.text}>{item.client_introduce}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorApplyScreen);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    user:{
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 200,
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
