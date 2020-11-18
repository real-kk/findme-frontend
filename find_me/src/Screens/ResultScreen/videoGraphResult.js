/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, Image, ActivityIndicator} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';
import Icon from 'react-native-vector-icons/AntDesign'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
  
  const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })


  class videoGraphResult extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
            graph: '',
            name: '',
            loading_graph: true,
          }
      }

      confirmGraph = async() => {
          await axios.post('/tasks/sentiment_graphs/', {},
          { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
            }})
            .then(({data})=>{
                console.log(data)
                this.setState({
                    name: data.client_username,
                    graph: data.image,
                    loading_wordcloud: false,
                })  
            })
            .catch(err=>console.log(err))
      }

      componentDidMount(){
        this.props.navigation.addListener('tabPress', e => {
            this.confirmGraph()
        })
        this.confirmGraph();
        this._ismounted = true
      }

      componentWillUnmount(){
        this._ismounted = false
    }

      render() {
        return (
            <View style={styles.container}>
                {/* {(this.state.loading_graph == true) ?
                <ActivityIndicator
                    size = "small"
                    color = "green"
                /> :
                <View> */}
                    <Image
                        style={{width: wp('100%'), height: hp('58%')}}
                        source={{uri: this.state.graph ? this.state.graph : null}}
                    />
                {/* </View>
            } */}
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(videoGraphResult)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
});

