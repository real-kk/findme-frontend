import React from 'react';
import { StyleSheet, Text, View, Modal,  ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from '../../axiosConfig';
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

class Diarytextanalysis extends React.Component {
    constructor(){
        super();
        this.state={
          graph:'',
          modal: false,
          loading_graph: true,
       }
    }
    
    getGraph = async () => {
      await axios.post('/linegraph/', {},
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then(({data})=>{
          this.setState({
              graph: data.line_graph,
              loading_graph: false,
          })
      })
      .catch(err=>console.log(err))
  }

  componentDidMount(){
    this.props.navigation.addListener('tabPress', e => {
      this.getGraph()
    })
    this.getGraph()
    this._ismounted = true
  }

  componentWillUnmount(){
    this._ismounted = false
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.introduce}>감정 그래프를 통해 작성한 감정일기마다 
          나타나는 감정 점수의 변화를 알 수 있습니다
          </Text>
          <TouchableOpacity
            onPress={()=>{
              this.setState({modal: true})
            }}
          >
            <Text style={styles.tutorial}>자세히</Text>
          </TouchableOpacity>   
          <Modal
            transparent={true}
            visible = {this.state.modal}
            overlayBackground={'rgba(0, 0, 0, 0.75)'}
            closeOnTouchOutside={true}
            animationType={'fade'}
          >
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 1.0)', marginTop: hp('10%'), alignItems:'center'}}>
                        <Text style={{marginTop: hp('3%'), fontSize:20,fontFamily:'netmarbleM'}}>감정 분석 그래프 읽는 방법</Text>
                        <Image  style={{width: wp('100%'), height: hp('50%'), resizeMode:'contain'}}
                         source={require('../../../images/graph2.png')} />
                    </View>
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 1.0)',}}>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 그래프의 가로 축은 최근 7개의 일기를 나타냅니다.</Text>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 그래프의 세로 축은 단어로부터 매긴 감정 점수를 나타내며 -1부터 1까지의 값을 가집니다.</Text>
                        <Text style={{fontSize:15,fontFamily:'netmarbleL', paddingHorizontal: wp('5%')}}>* 감정점수가 -1에 가까울수록 부정적인 감정을 나타내고 1에 가까울수록 긍정적인 감정을 나타냅니다.</Text>

                    </View> 
                    <View style={{alignItems:'center', backgroundColor: 'rgba(255, 255, 255, 1.0)', paddingVertical: hp('5%')}}>
                      <TouchableOpacity
                        onPress={()=>{
                          this.setState({
                            modal: false,
                          })
                        }}
                      >
                        <Text style={styles.close}>닫기</Text>
                      </TouchableOpacity>  
                    </View>
          </Modal>
        </View>
        <Image
          style={{width: wp('100%') , height: hp('55%')}}
          source={{uri: this.state.graph ? this.state.graph : null}}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diarytextanalysis)

const styles = StyleSheet.create({
    container : {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
      backgroundColor:'white'
    },
    
    introduce: {
      width: wp('70%'),
      marginVertical: hp('2%'),
      marginLeft: wp('5%'),
      borderRadius: 5,
      fontSize: 18,
      fontFamily:'netmarbleL',
      color: 'gray'
    },
    tutorial:{
      fontSize: 15,
      marginTop: hp('2.8%'),
      fontFamily: 'netmarbleB',
      color:'white',
      borderRadius: 5,
      width: wp('17%'),
      backgroundColor: 'rgba(114,174,148,0.5)',
      textAlignVertical:'center',
      height:hp('4%'),
      paddingTop:hp('0.2%'),
      borderColor:'white',
      textAlign:'center',
      marginLeft: wp('3%'),
    },
    close:{ 
      color: 'white', 
      fontFamily: 'netmarbleB',
      borderRadius: 5,
      textAlign:'center',
      width:wp('50%'),
      fontSize: 18,
      textAlignVertical:'center',
      height:hp('6%'),
      justifyContent:'center',
      backgroundColor: 'rgba(114,174,148,0.5)',
  }
});
