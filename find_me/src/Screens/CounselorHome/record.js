import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import { connect } from 'react-redux'
import axios from '../../axiosConfig'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Fontisto'
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class STT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      audioFile: '',
      recording: false,
      loaded: false,
      paused: true
    }
    this.audioRecorderPlayer = new AudioRecorderPlayer()
    this.audioRecorderPlayer.setSubscriptionDuration(0.09)
  }

  async componentDidMount() {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav'
    };
    
    AudioRecord.init(options);
    AudioRecord.on('data', data => {
      const chunk = Buffer.from(data, 'base64')
    });
  }

  onStartRecord = async() => {
    this.setState({ audioFile: '', recording: true, loaded: false })
    AudioRecord.start()
      
    await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      })
      return;
    })
  };

  onStopRecord = async () => {
    if (!this.state.recording) return
    let audioFile = await AudioRecord.stop()
    await this.audioRecorderPlayer.stopRecorder()
    this.setState({ audioFile, recording: false })
  }

  onSubmission = async() => {
    const data = new FormData()
    data.append("voice", {
      uri: 'file://' + this.state.audioFile,
      name: "test.wav",
      type: "audio/wav"
    })
    await axios.post('/voices/', data, 
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`,
        'content-type': 'multipart/form-data'
        }
      })
    .then(res=>{
      alert("메일로 전송되었습니다.")
      this.props.navigation.navigate('Home')
    })
    .catch(err=>console.log(err))
  }

  render() {  
    return (
      <View style={styles.container}>
        <Text style={styles.result}>상담 녹음 및 파일 변환</Text>
        <Text style={styles.introduce}>상담 내용을 녹음한 뒤 변환하기 버튼을 누르면 텍스트로 변환된 결과가 등록된 이메일로 전송됩니다!</Text>
        <View style={styles.timer}>
        <Icon name="mic" size={100} color='rgba(114,174,148,0.9)'/>
        <Text style={styles.time}>{this.state.recordTime}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.onStartRecord();
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>RECORD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.onStopRecord();
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>STOP</Text>
        </TouchableOpacity>
              
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.onSubmission();
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>변환하기</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(STT);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  introduce: {
    marginTop:hp('4%'),
    width: wp('90%'),
    marginLeft: wp('5%'),
    borderRadius: 5,
    height:hp('10%'),
    fontSize: 18,
    fontFamily:'netmarbleL',
    textAlign:'center',
    color: 'gray'
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color:'white',
    backgroundColor:'rgba(114,174,148,0.9)',
  },
  timer: {
    borderColor:'gray',
    borderRadius:200,
    alignItems:'center',
    justifyContent:'center',
    width:wp('70%'),
    height:hp('35%'),
    borderWidth: 3,
    marginHorizontal:wp('14%'),
    marginTop: hp('4%'),
    marginBottom: hp('8%')
  },
  time:{
    textAlign:'center',
    fontSize:35,
    color: 'rgba(114,174,148,0.9)',
    marginTop:hp('2%'),
  },
  button: {
    width: wp('26%'),
    height : hp('13%'),
    marginLeft: wp('5.5%'),
    borderRadius: 100,
    backgroundColor:'rgba(114,174,148,0.5)', 
    alignItems:'center', 
    justifyContent:'center'
  }
});