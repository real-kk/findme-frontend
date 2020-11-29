import React from 'react';
import { StyleSheet,  View,  Text, Image, ActivityIndicator } from 'react-native';
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
          console.log(this.state.graph)
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
          <Image
            style={{width: wp('100%') , height: hp('55%')}}
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

