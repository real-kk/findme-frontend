import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
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
        })
    }

    componentDidMount(){
        this.getApplicationList()
      }

    render() {
        return (
            <View style={styles.container}>
                <Text>상담사 신청 리스트</Text>
                <FlatList
                    data={this.state.applicationList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('ApplicationDetail', {
                                        application : this.state.applicationList[index]
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Icon name="person-circle" size={40} style={styles.image}></Icon>
                                    <View style={styles.list_side}>
                                    <Text style={styles.title}>신청자 : {item.client_username}</Text>
                                    <Text style={styles.text}>{item.content}</Text>
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
        fontWeight: '700',
    },
    text: {
        paddingTop: hp('1%'),
        marginLeft: wp('10%'),
        fontSize: 15,
        color:'gray',
    }
});
