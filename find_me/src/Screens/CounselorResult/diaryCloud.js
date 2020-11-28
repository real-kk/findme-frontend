import React from 'react';
import { StyleSheet,  Text, View, ActivityIndicator, Image } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class ClientWordCloudResult extends React.Component {
    constructor(){
        super();
        this.state={
           wordcloud: '',
           loading_wordcloud: true,
        }
    }

    getWordCloud = async () => {
        await axios.get('/whole_content?client=' + this.props.route.params.email,
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            console.log(data + '!!!!')
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
                    <Text>워드 클라우드</Text>
                    <Image
                        style={{width: 400, height: 400}}
                        source={{uri: this.state.wordcloud ? this.state.wordcloud : null}}
                    />
                </View>
                }
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientWordCloudResult)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },

});

