
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import axios from '../../axiosConfig'
import { RNCamera } from 'react-native-camera'

class VideoScreen extends React.Component {
  constructor () {
    super()

    this.state = {
      ratio: '16:9',
      uri: ''
    }
  }

  async startRecording () {
    this.setState({ recording: true })
    // default to mp4 for android as codec is not set
    const { uri, codec = 'mp4' } = await this.camera.recordAsync()
    console.log(uri)
  }

  async stopRecording () {
    await this.camera.stopRecording()
    this.setState({ recording: false })
    console.log(this.state.recording)
  }

  render () {
    const { recording, processing } = this.state

    let button = (
        <TouchableOpacity
          onPress={this.startRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> RECORD </Text>
        </TouchableOpacity>
    )

    if (recording) {
      button = (
          <TouchableOpacity
            onPress={this.stopRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> STOP </Text>
          </TouchableOpacity>
      )
    }

    if (processing) {
      button = (
          <View style={styles.capture}>
            <ActivityIndicator animating size={18} />
          </View>
      )
    }

    return (
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref
            }}
            ratio={this.state.ratio}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
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
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}
          >
            {button}
          </View>
        </View>
    )
  }
}
export default VideoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})
