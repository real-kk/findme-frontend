/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from '../../axiosConfig'
import { connect } from 'react-redux'
import React from 'react'
import Video from 'react-native-video'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})


class VideoAnalysisResult extends React.Component {
  constructor(){
    super();
  }

  download = () => {
    Linking.openURL(this.props.route.params.uri)

  }
  
  render () {
    return (
        <View style={styles.container}>
            <TouchableOpacity
              onPress={()=>{
                this.download()
              }}
            >
              <View style={styles.store}>
                <Text style={{fontSize:50}}>재생</Text>
              </View>
            </TouchableOpacity>

            <Video source={{uri: this.props.route.params.uri}}
              controls
              paused
              resizeMode='cover'
              playWhenInactive={true}
              style={styles.backgroundVideo} 
            />
        </View>
    )
  }
}

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
      store: {
          alignItems: 'center',
          marginTop: 50,
          justifyContent: 'center',
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoAnalysisResult)
