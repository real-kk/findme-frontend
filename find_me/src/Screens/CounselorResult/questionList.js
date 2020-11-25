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
      this.props.navigation.navigate('VideoResult', {
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
                <Text style={styles.result}>질문 리스트</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.questionList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                   this.next(item.id)
                                }}
                            >
                                <View style={styles.list}>
                                    <Text style={styles.title}>{'이름 : ' + item.counselor_username}</Text>
                                    <Text style={styles.text}>{'질문 : ' + item.question}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(key, index) => index.toString()}
                />
                </View>
           }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop: '10%',
    justifyContent:'center',
    backgroundColor:'white',
  },
  list: {
    paddingHorizontal: '5%',
    paddingVertical: hp('1%'),
    marginVertical : hp('1%'),
    height: hp('16%'),
    width: wp('90%'),
    marginLeft: wp('5%'),
    backgroundColor:'#fafafa',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 7,
    flexDirection:'row',
    elevation: 5,
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    fontWeight: 'bold'
  },
  title:{
    marginLeft: wp('10%'),
    fontSize: 17,
    color: 'black',
    fontWeight: '700',
  },
  text: {
    paddingTop: hp('1%'),
    marginLeft: wp('10%'),
    fontSize: 15,
    color:'gray',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
