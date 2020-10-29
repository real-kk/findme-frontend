//임시에요
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class AllResult extends React.Component {
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
            console.log(this.state.graph)
        })
        .catch(err=>console.log(err))
    }

    componentDidMount(){
        this.getWordCloud();
        this.getGraph();
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
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: this.state.graph ? this.state.graph : null}}
                    />
                </View>
                }
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllResult)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
    },

});

