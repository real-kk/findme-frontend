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


class QuestionList extends React.Component {
  constructor(){
    super();
    this.state = {
      questionList: '',
      loading_question: true,
    }
  }

  getQuestion = async () => {
    await axios.get('/tasks/questions_counselor?client=' + this.props.email, 
    { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
    }})
    .then(({data})=>{
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
    await axios.get(`/tasks/process_videos/${id}/`,
    { headers: {
      'Authorization' : `Token ${this.props.token.auth.token}`
    }}) 
    .then(({data})=>{
      this.props.navigation.navigate('VideoResult', {
        questionID: id,
        uri: data,
        email: this.props.email
      })
    })
    .catch(err=>console.log(err))
  }


  render () {
    return (
      <View style={styles.container}>
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
                <Text style={styles.title}>{'질문 : ' + item.question}</Text>
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
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'#FAFAFA'
  },
  list: {
    borderWidth: 0.1,
    borderRadius: 4,
    padding: '5%',
    marginVertical : '3%',
    justifyContent: 'center',
    width: wp('98%'),
    height: hp('15%'),
    backgroundColor: 'white',
  },
  title:{
    marginLeft: '1%',
    marginBottom: '8%',
    fontFamily: 'netmarbleM',
    fontSize: 18,
  },
  content:{
    marginLeft: '1%',
    color: 'gray',
    fontSize: 13,
    fontFamily: 'netmarbleL',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
