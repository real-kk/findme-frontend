/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
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

class RecordVideo extends React.Component {
  constructor () {
    super()
    this.state = {
      uri: '',
      recording: ''
    }
  }

  async startRecording () {
    this.setState({ recording: true })
    const { uri } = await this.camera.recordAsync()
    this.setState({ recording: false, processing: true })

    this.props.navigation.navigate('ConfirmVideo', {
      questionID: this.props.route.params.questionID,
      videoUri: uri
    })
    this.setState({ processing: false })
  }

  async stopRecording () {
    await this.camera.stopRecording()
  }

  render () {
    const { recording, processing } = this.state

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.record}
      >
        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}> RECORD </Text>
      </TouchableOpacity>
    )

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.record}
        >
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}> STOP </Text>
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
            <Text style={styles.result}>영상 녹화</Text>
            <RNCamera
              ref={ref => {
                this.camera = ref
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.on}
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
export default connect(mapStateToProps, mapDispatchToProps)(RecordVideo)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  record: {
    marginVertical: hp('3%'),
    width: wp('50%'),
    height: hp('6%'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color: 'white',
    backgroundColor: 'rgba(114,174,148,0.9)'
  }
})
