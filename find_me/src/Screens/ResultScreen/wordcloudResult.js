/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, Button } from 'react-native';
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
                loading_wordcloud: false
            })
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
                        style={{width: 400, height: 400}}
                        source={{uri: this.state.wordcloud ? this.state.wordcloud : null}}
                    />
                </View>
            }

            <Button title = "갱신하기"  onPress={() => this.getWordCloud()}>
                   
            </Button>
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

