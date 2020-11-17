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

class CounselingRequest2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time_table: '',
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
      const photo = new FormData();
      photo.append('time_table', {
          uri: this.state.time_table,
          type: 'image/png',
          name: 'time_table.jpg'
      })

      console.log(this.props.route.params.Apply_data)
      await axios.post('/counsels/', this.props.route.params.Apply_data, 
          { headers: {
              'Authorization' : `Token ${this.props.token.auth.token}`,
          }
      })
      .then((res) => {
          console.log("1")
          this.setState({
              id: res.data[1]
          })
          console.log("2")
          axios.post(`/counsels/photo/${this.state.id}/` , photo, 
              { headers: {
                  'Authorization' : `Token ${this.props.token.auth.token}`,
                  'content-type': 'multipart/form-data'
              }
          })
          .then((res) => {
              console.log(res)
              alert("제출이 완료되었습니다.")
              this.props.navigation.navigate('Counselors')
          })
          .catch(err => {
              console.log(err)
          })
      })
      .catch(err => console.log(err))
    }

    render() {
      return (
          <View style={styles.container}>
            <ScrollView>
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
                <TouchableOpacity
                    style={{borderWidth: 2}}
                        onPress={()=>{
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
export default connect(mapStateToProps, mapDispatchToProps)(CounselingRequest2)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});
