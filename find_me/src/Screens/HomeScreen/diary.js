/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class DiaryScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            diaryTitle: '',
            diaryContent: '',
        }
    }
    
    submission = async () => {
        const data = {
            title: this.state.diaryTitle,
            content: this.state.diaryContent
        }

        await axios.post('/diaries/', data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`
            }
        })
        .then((res) => {
            console.log(res)
            this.state.diaryTitle = ''
            this.state.diaryContent = ''
            alert("제출이 완료되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
              <Text>Diary</Text>
              <TextInput
                style={styles.diaryname}
                placeholder="제목"
                value={this.state.diaryTitle}
                onChangeText={(text) => {
                this.setState({diaryTitle: text})             
                }}
              />
              <TextInput
                style={styles.diarytext}
                placeholder="감정일기를 작성하세요."
                value={this.state.diaryContent}
                onChangeText={(text) => {
                this.setState({diaryContent: text})             
                }}
              />
              <TouchableOpacity
                        style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                        onPress={()=>{
                            this.submission();
                        }}
                >
                    <Text>제출</Text>
                </TouchableOpacity>
          </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
    diaryname:{
        borderWidth: 1,
        marginBottom : 10,
        marginHorizontal: 10,
    },
    diarytext: {
        borderWidth: 1,
        paddingBottom : 300,
        marginHorizontal: 10,
    }
});


