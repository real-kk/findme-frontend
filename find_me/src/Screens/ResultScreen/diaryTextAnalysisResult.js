/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View,  ActivityIndicator, Image } from 'react-native';
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
          {(this.state.loading_wordcloud == true || this.state.loading_graph == true) ?
              <ActivityIndicator
                  size = "large"
                  color = "green"
              /> :
              <View style={styles.result}>
                <Text style={styles.introduce}>그래프는 ~~을 토대로 만들어졌습니다</Text>
                  <Image
                      style={{width: wp('100%'), height: hp('50%')}}
                      source={{uri: this.state.graph ? this.state.graph : null}}
                  />
              </View>
          }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diarytextanalysis)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'white'
    },
    result:{
      alignItems:'center',
      justifyContent:'center',
    },
    introduce: {
      marginVertical:hp('3%'),
      width: wp('88%'),
      padding: '5%',
      backgroundColor:'#f2f2f2',
      borderRadius: 5,
      height:hp('10%'),
  }
});

