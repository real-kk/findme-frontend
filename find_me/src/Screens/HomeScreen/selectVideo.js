/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import React from 'react';
import CameraRoll from "@react-native-community/cameraroll";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';


const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})


class SelectVideo extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            <Text>TTTT</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectVideo)


