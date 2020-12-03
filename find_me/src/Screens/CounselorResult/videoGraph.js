/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Image } from 'react-native';
import axios from '../../axiosConfig';
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
          this.state={
            graph: '',
            name: '',
          }
      }

      confirmGraph = async() => {
          await axios.get(`/tasks/sentiment_graphs?client=${this.props.route.params.email}`,
          { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
            }})
            .then(({data})=>{
                this.setState({
                    name: data.client_username,
                    graph: data.image,
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
                <View>
                    <Image
                        style={{width: wp('100%'), height: hp('58%')}}
                        source={{uri: this.state.graph ? this.state.graph : null}}
                    />
                </View>
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

