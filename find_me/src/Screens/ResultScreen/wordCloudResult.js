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
           visible: false,
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
                <View styles={styles.result}>
                    <Text style={styles.introduce}>워드 클라우드는 ~~을 토대로 만들어졌습니다</Text>
                    <Image
                        style={{width: wp('100%'), height: hp('50%') ,borderRadius: 400/ 2}}
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
        alignItems:'center',    
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

