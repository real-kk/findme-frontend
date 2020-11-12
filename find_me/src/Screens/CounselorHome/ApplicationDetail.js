import React from 'react';
import { StyleSheet,  View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class ApplicationDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            application: this.props.route.params.application,
            type : -1
        }
    }
    reject = async() => {
        await axios.delete('/counsels/' + this.state.application.id + '/', 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
            alert("반려 완료!")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    submission = async () => {
        const data = {
            client: this.state.application.client_email,
        }
        console.log(data)
        await axios.post('/counsels/date/', data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))

        await axios.delete('/counsels/' + this.state.application.id + '/', 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            
            alert("승인 완료!")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.application.time_table)
      return (
          <View style={styles.container}>
              <ScrollView>
                <Text>내담자 정보</Text>
                
                <Text>이름 : {this.state.application.client_username}</Text>
                <Text>전공 : {this.state.application.major}</Text>
                <Text>학번 : {this.state.application.student_number}</Text>
                <Text>전화번호 : {this.state.application.phone_number}</Text>
                <Text>하고 싶은 말 :  {this.state.application.content}</Text>
                <Image source={{uri: this.state.application.time_table,}}/>
                <TouchableOpacity
                    style={{borderWidth: 1}}
                            onPress={()=>{
                               this.submission()
                            }}
                            
                        >
                        <Text>상담 승인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{borderWidth: 2}}
                            onPress={()=>{
                              this.reject()
                            }}
                            
                        >
                        <Text>상담 반려</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});
