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
  ActivityIndicator,
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


class QuestionList extends React.Component {
  constructor(){
    super();
    this.state = {
      questionList: '',
      loading_question: true,
    }
  }

  getQuestion = async () => {
    await axios.get('/tasks/questions_counselor?client=' + this.props.route.params.email, 
    { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
    }})
    .then(({data})=>{
        console.log(data)
        this.setState({
          questionList: data,
          loading_question: false
        })
    })
    .catch(err => console.log(err))
  }
  
  
  componentDidMount(){
    this.getQuestion()
  }

  next = async (id) => {
    console.log(id)
    await axios.get(`/tasks/process_videos/${id}/`,
    { headers: {
      'Authorization' : `Token ${this.props.token.auth.token}`
    }}) 
    .then(({data})=>{
      console.log(data)
      this.props.navigation.navigate('VideoAnalysis', {
          questionID: id,
          uri: data
      })
    })
  }


  render () {
    return (
        <View style={styles.container}>
          {(this.state.loading_wordcloud == true || this.state.loading_graph == true) ?
                <ActivityIndicator
                    size = "large"
                    color = "green"
                /> :
              <View>
                <Text>질문 리스트</Text>
                <FlatList
                    data={this.state.questionList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                   this.next(item.id)
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

              <TouchableOpacity
              onPress={()=>{
                this.props.navigation.navigate('CounselorVideoGraph', {
                  email: this.props.route.params.email
                })
              }}
            >
              <View>
                <Text>그래프로 확인하기</Text>
              </View>
            </TouchableOpacity>
                </View>
           }
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
