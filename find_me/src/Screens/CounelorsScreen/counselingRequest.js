import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
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
            counselorEmail: this.props.route.params.counselorEmail
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
            <Text>신청서 작성</Text>
            <View>
                <TextInput style={styles.title}
                placeholder="전공"
                value={this.state.major}
                onChangeText={(text) => {
                    this.setState({major: text})             
                }}
                />
                <TextInput style={styles.title}
                placeholder="학번"
                value={this.state.student_number}
                onChangeText={(text) => {
                    this.setState({student_number: text})             
                }}
                />
                <TextInput style={styles.title}
                placeholder="전화번호"
                value={this.state.phone_number}
                onChangeText={(text) => {
                    this.setState({phone_number: text})             
                }}
                />
                <TextInput style={styles.text}
                multiline={true}
                placeholder="하고싶은 말"
                value={this.state.content}
                onChangeText={(text) => {
                    this.setState({content: text})             
                }}
                />

                <TouchableOpacity
                    style={styles.next}
                    onPress={()=>{
                        this.next();
                    }}
                >
                <Text>다음 페이지</Text>
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
        paddingTop: '10%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor : '#FAFAFA',
    },
    next:{
        marginVertical: hp('1%'),
        width: wp('100%'),
        borderRadius: 5,
        height: hp('6%'), 
        backgroundColor:'#AAF0D1', 
        alignItems:'center', 
        justifyContent:'center',
    },
    text: {
        borderRadius: 5,
        backgroundColor:'white',
        width:wp('100%'),
        height: hp('45%'),
        marginVertical: hp('1%'),
    },
    title: {
        borderRadius: 5,
        backgroundColor: 'white',
        marginVertical: hp('1%'),
        width:wp('100%'),
    },
});