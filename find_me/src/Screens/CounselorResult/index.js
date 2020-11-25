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

class CounselorResult extends React.Component {
    constructor(){
        super();
        this.state = {
          clientList: [],
      }
    }

    getClientList = async () => {
        await axios.get('/counsels/date/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({clientList: data})
        })
      
    }

    componentDidMount(){
        this.getClientList()
      }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>상담중인 내담자 목록</Text>
                <FlatList
                    data={this.state.clientList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('ResultHome', {
                                        client: this.state.clientList[index]
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Icon name="person-outline" size={40} style={styles.image}></Icon>
                                    <View style={styles.list_side}>
                                    <Text style={styles.title}>{item.client_username}</Text>
                                    <Text style={styles.text}>{item.client_email}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorResult);

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
    list_side:{
        flexDirection:'column',
        alignItems: 'flex-start',
    },
    image:{
        paddingTop: hp('1%'),
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
        fontSize: 14,
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
