import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import { connect } from 'react-redux'
import axios from '../../axiosConfig'
import AudioRecorderPlayer, { 
    AVEncoderAudioQualityIOSType,
    AVEncodingOption, 
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType, 
} from 'react-native-audio-recorder-player';

import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

// const audioRecorderPlayer = new AudioRecorderPlayer();

class STT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoggingIn: false,
          recordSecs: 0,
          recordTime: '00:00:00',
          currentPositionSec: 0,
          currentDurationSec: 0,
          playTime: '00:00:00',
          duration: '00:00:00',
          recordFlag: false,
          recordfile: '',

          //임시
          audioFile: '',
          recording: false,
          loaded: false,
          paused: true
        };
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
      }
///////////////////////////////////////////////////////////
      async componentDidMount() {
        const options = {
          sampleRate: 16000,
          channels: 1,
          bitsPerSample: 16,
          wavFile: 'test.wav'
        };
    
        AudioRecord.init(options);
    
        AudioRecord.on('data', data => {
          const chunk = Buffer.from(data, 'base64');
          // console.log('chunk size', chunk.byteLength);
          // do something with audio chunk
        });
      }

      onStartRecord = async() => {
        console.log('start record');
        this.setState({ audioFile: '', recording: true, loaded: false });
        AudioRecord.start();
        
        await this.audioRecorderPlayer.startRecorder();
        this.audioRecorderPlayer.addRecordBackListener((e) => {
          this.setState({
            recordSecs: e.current_position,
            recordTime: this.audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
          });
          return;
        });
      };

      onStopRecord = async () => {
        if (!this.state.recording) return;
        console.log('stop record');
        let audioFile = await AudioRecord.stop();
        await this.audioRecorderPlayer.stopRecorder();
        console.log(audioFile);
        this.setState({ audioFile, recording: false });
      };
/////////////////////////////////////////////////////////////
      // onStartRecord = async () => {
      //     const path = Platform.select({
      //         android: 'sdcard/voice.wav'
      //       })
      //       const audioSet = {
      //           AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      //           AudioSourceAndroid: AudioSourceAndroidType.MIC,
      //           AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      //           AVNumberOfChannelsKeyIOS: 2,
      //           AVFormatIDKeyIOS: AVEncodingOption.aac,
      //       };
      //     const uri = await this.audioRecorderPlayer.startRecorder();
      //     this.audioRecorderPlayer.addRecordBackListener((e) => {
      //     this.setState({
      //       recordSecs: e.current_position,
      //       recordTime: this.audioRecorderPlayer.mmssss(
      //         Math.floor(e.current_position),
      //       ),
      //     });
      //     return;
      //   });
      //   console.log(uri)  
      // };
      
      // onStopRecord = async () => {
      //   const result = await this.audioRecorderPlayer.stopRecorder();
      //   this.setState({
      //       recordfile: result
      //     });
      //     console.log(this.state.recordfile)
      // };
      
      // onResetRecord = async() => {
      //   this.audioRecorderPlayer.removeRecordBackListener();
      //   this.setState({
      //     recordSecs: 0,
      //     recordTime: '00:00:00',
      //   });
      // }

      onSubmission = async() => {
        const data = new FormData();
        data.append("voice", {
          uri: 'file://' + this.state.audioFile,
          name: "test.wav",
          type: "audio/wav"
        })
        console.log(data._parts)
        await axios.post('/voices/', data, 
          { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`,
            'content-type': 'multipart/form-data'
            }
        })
        .then(res=>{
          console.log(res)
          alert("메일로 전송되었습니다.")
          this.props.navigation.navigate('Home')
        })
        .catch(err=>console.log(err))
      }

      // onStartPlay = async () => {
      //   console.log('onStartPlay');
      //   const path = Platform.select({
      //       android: 'sdcard/voice.wav',
      //       ios: 'voice.wav',
      //   })
      //   const msg = await this.audioRecorderPlayer.startPlayer(path);
      //   console.log(msg);
      //   this.audioRecorderPlayer.addPlayBackListener((e) => {
      //     if (e.current_position === e.duration) {
      //       console.log('finished');
      //       this.audioRecorderPlayer.stopPlayer();
      //     }
      //     this.setState({
      //       currentPositionSec: e.current_position,
      //       currentDurationSec: e.duration,
      //       playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      //       duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      //     });
      //     return;
      //   });
      // };
      
    //   onStopPlay = async () => {
    //     console.log('onStopPlay');
    //     this.audioRecorderPlayer.stopPlayer().catch((err)=>{console.log(err)});
    //     this.audioRecorderPlayer.removePlayBackListener();
    //   };



    render() {  
        return (
            <View style={styles.container}>
                <Text>STT</Text>
                <Text>{this.state.recordTime}</Text>
                <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                            this.onStartRecord();
                          }}
                  >
                      <Text>RECORD</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                            this.onStopRecord();
                          }}
                  >
                      <Text>STOP</Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                            this.onResetRecord();
                          }}
                  >
                      <Text>초기화</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                            this.onStartPlay();
                         }}
                  >
                      <Text>듣기</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                          style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center'}}
                          onPress={()=>{
                            this.onSubmission();
                         }}
                  >
                      <Text>변환하기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(STT);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
        padding:20,
        marginTop : '10%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});