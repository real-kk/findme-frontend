/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from '../../axiosConfig'
import { connect } from 'react-redux'
import React from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  requestLogout: () => dispatch(requestLogout())
})


class confirmQuestion extends React.Component {
  constructor(){
    super();
    this.state = {
      questionList: '',
    }
  }

  getQuestion = async () => {
    await axios.get('/tasks/questions/', 
    { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
    }})
    .then(({data})=>{
        console.log(data[0].id)
        this.setState({questionList: data})
    })
  }
  
  
  componentDidMount(){
    this.getQuestion()
  }

  render () {
    return (
        <View style={styles.container}>
            <Text>질문 리스트</Text>
                <FlatList
                    data={this.state.questionList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('RecordVideo', {
                                        questionID: this.state.questionList[index].id
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Text>{'이름 : ' + item.counselor_username}</Text>
                                    <Text>{'질문 : ' + item.question}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(key, index) => index.toString()}
                />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent:'center'
},
list: {
    borderWidth: 2,
    borderRadius: 8,
    padding:20,
    marginTop : '10%',
    marginHorizontal : '20%',
    justifyContent: 'center',
    alignItems: 'center',
},
})

export default connect(mapStateToProps, mapDispatchToProps)(confirmQuestion)
