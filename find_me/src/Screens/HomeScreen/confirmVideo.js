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
    }

    submission = async (videoUri) => {
      const data = new FormData();
        data.append("video", {
          name: "video-upload.mp4",
          type: "video/mp4",
          uri: videoUri
        });

        await axios.post(`/tasks/videos/${this.props.route.params.questionID}/`, data, 
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
        .catch(err => console.log(err))
    }

    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity
              onPress={()=>{
                this.submission(this.props.route.params.videoUri)
              }}
            >
              <View style={styles.list}>
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
      
});

