/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import axios from '../../axiosConfig';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  class RecordVideo extends React.Component {
    constructor() {
        super();
          this.state={
            // ratio: '16:9',
            uri:'',
            recording: '',
            video: '',
            recordOptions: {
                mute: false,
                maxDuration: 5,
                quality: RNCamera.Constants.VideoQuality['288p'],
              },
          }
    }

    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({ recording: false, processing: true });
        // const type = `video/${codec}`;
        
        // const data = new FormData();
        // data.append("video", {
        //   name: "video-upload",
        //   type,
        //   uri
        // });


        // this.submission(data);
        // console.log(data._parts[0][1].uri)
        this.props.navigation.navigate('ConfirmVideo', {
          questionID: this.props.route.params.questionID,
          videoUri: uri
        })
        this.setState({ processing: false });

    }

    // submission = async (data) => {

    //     await axios.post('/tasks/videos/', data, 
    //         { headers: {
    //             'Authorization' : `Token ${this.props.token.auth.token}`,
    //             'content-type': 'multipart/form-data'
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res)
    //         alert("제출되었습니다.")
    //         this.props.navigation.navigate('SelectVideo')
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }

    async stopRecording() {
      await this.camera.stopRecording();
    }

    render() {
        const { recording, processing } = this.state;
    
        let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
    
        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }
    
        if (processing) {
          button = (
            <View style={styles.capture}>
              <ActivityIndicator animating size={18} />
            </View>
          );
        }
    
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
            //   ratio={this.state.ratio}
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.on}
            //   permissionDialogTitle={"Permission to use camera"}
            //   permissionDialogMessage={
            //     "We need your permission to use your camera phone"
            //   }
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel'
              }}
            />
            <View
              style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
            >
              {button}
            </View>
          </View>
        );
      }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordVideo)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
});

