import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
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

class CounselingRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            major: '',
            student_number: '',
            phone_number: '',
            content: '',
            counselorEmail: this.props.route.params.counselorEmail,
            isFocused: false
        }
       
    }
    handleFocus = event => {
        this.setState({isFocused : true})
        if(this.props.onFocus){
            this.props.onFocus(event)
        }
    }

    handleBlur = event => {
        this.setState({isFocused: false})
        if(this.props.onBlur){
            this.props.onBlur(event)
        }
    }
    next = async () => {
        const data = {
            counselor: this.state.counselorEmail,
            major: this.state.major,
            student_number: this.state.student_number,
            phone_number: this.state.phone_number,
            content: this.state.content,
        }
        console.log(data)
        this.props.navigation.navigate('CounselingRequest2', {
            Apply_data: data
        })
    }

    render() {
      return (
          <View style={styles.container}>
            <Text style={styles.result}>상담신청서 작성</Text>
            <View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>전공 : </Text>
                <TextInput style={styles.title}
                value={this.state.major}
                placeholder="ex) 소프트웨어학과"
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={(text) => {
                    this.setState({major: text})             
                }}
                />
                </View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>학번 : </Text>
                <TextInput style={styles.title}
                placeholder="ex) 201400000"
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.student_number}
                onChangeText={(text) => {
                    this.setState({student_number: text})             
                }}
                />
                </View>
                <View style={styles.input}>
                <Text style={{fontSize: 18 , fontFamily: 'netmarbleL'}}>전화번호 : </Text>
                <TextInput style={styles.title}
                placeholder="ex) 010-1234-5678"
                underlineColorAndroid={'white'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                value={this.state.phone_number}
                onChangeText={(text) => {
                    this.setState({phone_number: text})             
                }}
                />
                </View>
                <Text style={styles.text_title}>하고싶은 말</Text>
                <TextInput style={styles.text}
                multiline={true}
                placeholder="상담사님께 하고 싶은 말을 적어주세요"
                value={this.state.content}
                onChangeText={(text) => {
                    this.setState({content: text})             
                }}
                />

                <TouchableOpacity
                    onPress={()=>{
                        this.next();
                    }}
                >
                <View style={styles.apply}>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily:'netmarbleB' }}>다음 페이지</Text>
                </View>
                </TouchableOpacity>
            
            </View>
        </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselingRequest)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
    },
    input:{
        flexDirection: "row",
        alignItems:'center',
        marginLeft: wp('5%'),
        marginTop: hp('2%'),
    },
    text: {
        borderRadius: 20,
        borderColor:'rgba(114,174,148,0.5)',
        borderWidth:2,
        backgroundColor:'#fafafa',
        marginTop: hp('3%'),
        marginBottom: hp('5%'),
        marginHorizontal: wp('5%'),
        paddingLeft:wp('5%'),
        height:hp('32%'),
    },
    title: {
        borderRadius: 5,
        width:wp('50%'),
    },
    text_title: {
        alignItems:'center',
        marginLeft: wp('5%'),
        marginTop: hp('3%'),
        fontSize: 18 ,
        fontFamily: 'netmarbleL'
    },
    result: {
        fontSize: 23,
        paddingLeft: wp('5%'),
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        fontFamily: 'netmarbleB',
        color:'white',
        backgroundColor:'rgba(114,174,148,0.9)',
    },
    apply: {
        marginLeft: wp('5%'),
        width: wp('90%'),
        borderRadius: 5,
        height: hp('6%'),
        backgroundColor: 'rgba(114,174,148,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    }
});