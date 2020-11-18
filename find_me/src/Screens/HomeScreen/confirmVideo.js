/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, TouchableHighlight, Linking, ActivityIndicator} from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import Video from 'react-native-video';

const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  class ConfirmVideo extends React.Component {
    constructor() {
        super();
        this.state= {
        }
    }

    submission = async (videoUri) => {
      const data = new FormData();
        data.append("video", {
          name: "video-upload.mp4",
          type: "video/mp4",
          uri: videoUri
        });
        const time = new Date();
        var date = time.getDate(); //Current Date
        var month = time.getMonth() + 1; //Current Month
        var year = time.getFullYear(); //Current Year
        var hours = time.getHours(); //Current Hours
        var min = time.getMinutes(); //Current Minutes
        var sec = time.getSeconds(); //Current Seconds

        await axios.post(`/tasks/videos/${this.props.route.params.questionID}/${year}-${month}-${date}_${hours}${min}${sec}/`, data, 
            { headers: {
                'Authorization' : `Token ${this.props.token.auth.token}`,
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res)
            alert("제출되었습니다.")
            this.props.navigation.navigate('Home')
        })
        .catch(function (error) {
          if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
          }
          else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }

    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={()=>{
                this.submission(this.props.route.params.videoUri)
              }}
            >
              <View style={styles.submission}>
                <Text>제출하기</Text>
              </View>
            </TouchableOpacity>

            <Video source={{uri: this.props.route.params.videoUri}}
              controls
              paused
              resizeMode='cover'
              playWhenInactive={true}
              style={styles.backgroundVideo} 
            />
          </View>
        );
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmVideo)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '10%',
        justifyContent: 'center',
        backgroundColor: '#fffff0'
      },
      backgroundVideo: {
        flex:1,
        width: '100%',
      },
      submission: {
        marginTop: 30,
        alignItems:'center',
        justifyContent: 'center'
      }
      
});

