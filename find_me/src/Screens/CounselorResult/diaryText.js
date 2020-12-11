import React from 'react';
import { StyleSheet,  View,  Text, Modal, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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

class ClientTextResult extends React.Component {
    constructor(){
        super();
        this.state={
          graph:'',
          modal: false,
          loading_graph: true,
       }
    }
    
    getGraph = async () => {
      await axios.get('/linegraph?client=' + this.props.email,
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
    this.getGraph()
    this._ismounted = true
  }

  componentWillUnmount(){
    this._ismounted = false
  }

  render() {
    return (
      <View style={styles.container}>
        {(this.state.loading_wordcloud == true || this.state.loading_graph == true) ?
        <ActivityIndicator
            size = "large"
            color = "green"
        /> :
        <View style={styles.result}>
          <Text style={styles.introduce}>감정 그래프를 통해 작성한 감정일기마다 나타나는 감정 점수의 변화를 알 수 있습니다</Text>
          <TouchableOpacity
                onPress={()=>{
                    this.setState({modal: true})
                }}
                >
                <View style={{alignItems:'center'}}>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'netmarbleB' }}>?</Text>
                </View>
                </TouchableOpacity>   
                <Modal
                    transparent={true}
                    visible = {this.state.modal}
                    overlayBackground={'rgba(0, 0, 0, 0.75)'}
                    closeOnTouchOutside={true}
                    animationType={'fade'}
                >
                    <View style={{backgroundColor: 'white', marginTop: 30}}>
                        <View style={{backgroundColor:'yellow', margin:50, padding: 40, justifyContent:'center', alignItems:'center'}}>
                            <Text>그래프는 이렇게 읽어야합니다</Text>
                            <Text>여기다가 이미지 추가</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        modal: false,
                                    })
                                }}
                                >
                                <Text style={{ color: 'black', fontSize: 18, fontFamily: 'netmarbleB' }}>close</Text>
                            </TouchableOpacity>  
                        </View>
                    </View>
                </Modal>
          
          <Image
            style={{width: wp('100%') , height: hp('55%'), marginLeft:wp('6%')}}
            source={{uri: this.state.graph ? this.state.graph : null}}
          />
        </View>
        }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientTextResult)

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    backgroundColor:'white'
  },
  result:{
    alignItems:'center',
    justifyContent:'center',
  },
  introduce: {
    marginTop:hp('4%'),
    marginBottom:hp('2%'),
    borderRadius: 5,
    width:wp('80%'),
    fontSize: 18,
    fontFamily:'netmarbleL',
    textAlign:'center',
    color: 'gray',
}
});

