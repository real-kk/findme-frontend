/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, ActivityIndicator, Image } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

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
           graph:'',
           loading_wordcloud: true,
           loading_graph: true,
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
                loading_wordcloud: false
            })
            console.log(this.state.worldcloud)
        })
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        this.getWordCloud();
    }


    render() {
      return (
        <View style={styles.container}>
            {(this.state.loading_wordcloud == true || this.state.loading_graph == true) ?
                <ActivityIndicator
                    size = "large"
                    color = "green"
                /> :
                <View>
                    <Image
                        style={{width: 200, height: 200}}
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
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },

});

