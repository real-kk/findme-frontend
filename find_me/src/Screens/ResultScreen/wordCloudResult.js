import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
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
            if(typeof data == 'string'){
                this.setState({
                wordcloud: data,
                loading_wordcloud: false,
                })
            }
            else{
                this.setState({
                    wordcloud: data.image,
                    loading_wordcloud: false,
                })
            }
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
                    <Text style={styles.introduce}>워드 클라우드를 통해 평소에 일기에서 본인이 많이 사용하는 단어들을 확인할 수 있습니다</Text>
                    <Image
                        style={{width: wp('100%'), height: hp('55%')}}
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
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
        backgroundColor: 'white'
    },
    result:{
        alignItems:'center',
        justifyContent:'center',
        
    },
    introduce: {
        marginTop:hp('4%'),
        marginBottom:hp('2%'),
        width: wp('88%'),
        marginLeft: wp('6%'),
        borderRadius: 5,
        height:hp('10%'),
        fontSize: 18,
        fontFamily:'netmarbleL',
        textAlign:'center',
        color: 'gray'
    }
});

