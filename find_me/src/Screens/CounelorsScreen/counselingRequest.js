/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class CounselorDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            major: '',
            student_number: '',
            phone_number: '',
            time_table: '',
            content: '',
            counselorEmail: this.props.route.params.counselorEmail
        }
       
    }
    addImage = () => {
        ImagePicker.launchImageLibrary({}, res => {
            this.setState({
                time_table: res.uri
            })
        })
    }

    submission = async () => {
        const data = {
            counselor: this.state.counselorEmail,
            major: this.state.major,
            student_number: this.state.student_number,
            phone_number: this.state.phone_number,
            content: this.state.content,
            time_table: this.state.time_table,
        }
        console.log(data)
        await axios.post('/counsels/', data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
            alert("제출이 완료되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
            <ScrollView>
                <TextInput style={{borderWidth:2, marginBottom: 5}}
                            placeholder="전공"
                            value={this.state.major}
                            onChangeText={(text) => {
                                this.setState({major: text})             
                            }}
                />
                <TextInput style={{borderWidth:2, marginBottom: 5}}
                            placeholder="학번"
                            value={this.state.student_number}
                            onChangeText={(text) => {
                                this.setState({student_number: text})             
                            }}
                />
                <TextInput style={{borderWidth:2, marginBottom: 5}}
                            placeholder="전화번호"
                            value={this.state.phone_number}
                            onChangeText={(text) => {
                                this.setState({phone_number: text})             
                            }}
                />
                <TouchableOpacity
                    style={{borderWidth: 2, marginBottom: 5}}
                        onPress={()=>{
                            this.addImage()
                        }}
                >
                    <Text>시간표 가져오기</Text>
                </TouchableOpacity>
                <Image
                    source={{uri: this.state.time_table ? this.state.time_table : null}}
                    style={{width: 300, height:  400}}
                />
                <TextInput style={{borderWidth:2, marginBottom: 5, paddingBottom : 100}}
                            placeholder="하고싶은 말"
                            value={this.state.content}
                            onChangeText={(text) => {
                                this.setState({content: text})             
                            }}
                />

                <TouchableOpacity
                    style={{borderWidth: 2}}
                        onPress={()=>{
                            // if(this.state.major != '' && this.state.phone_number != '' && this.state.student_number != ''){
                            //     alert('상담 신청이 완료되었습니다.')
                            //     this.props.navigation.navigate('Home')
                            // }
                            // else{
                            //     alert('입력되지 않은 부분이 있습니다.')
                            // }
                            this.submission();
                        }}
                >
                    <Text>제출하기</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselorDetail)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});


