/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
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

// getWordCloud = async () => {
//     const data = await axios.post('/whole_content/', {},
//     { headers: {
//         'Authorization' : `Token ${this.props.token.auth.token}`
//     }})
//     return data
// }

class WordCloudResult extends React.Component {
    constructor(){
        super();
        this.state={
           wordcloud: '',
           loading_wordcloud: true,
        }
    }

    getWordCloud = async () => {
        await axios.post('/whole_content/', {},
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({
                wordcloud: data.image,
                loading_wordcloud: false,
            })
        })
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        this.props.navigation.addListener('tabPress', e => {
            this.getWordCloud()
        })
        this.getWordCloud()
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
                    size = "small"
                    color = "green"
                /> :
                <View>
                    <Image
                        style={{width: wp('100%'), height: hp('58%')}}
                        source={{uri: this.state.wordcloud ? this.state.wordcloud : null}}
                    />
                </View>
            }
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordCloudResult)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white'
    },

});

