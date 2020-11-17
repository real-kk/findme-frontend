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
                            this.next();
                        }}
                >
                    <Text>다음 페이지</Text>
                </TouchableOpacity>
            </ScrollView>

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
        backgroundColor : '#fffff0',
    },
});