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
import counselorDetail from '../CounelorsScreen/counselorDetail'

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
      refreshing : false,
      isloading: true,
      pageNum: 1,
      isLoading: false
    }
  }

  getQuestion = async () => {
    await axios.get('/tasks/questions/', 
    { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
    }})
    .then(({data})=>{
        console.log(data[0].id)
        if(this._ismounted){
        this.setState({questionList: data})
        }
    })
    .catch(err=>{
      console.log(err)   
    })
  }
  
  componentDidMount(){
    this.props.navigation.addListener('tabPress', e => {
      this.getQuestion()
    })
    this.getQuestion()
    this._ismounted = true

    if (this._isMounted) {
        this.setState({isLoading: false})
    }
  }
  componentWillUnmount(){
    this._ismounted = false
  }

  handleRefresh = async() => {
    this.setState({
        diaryList: this.getQuestion(),
        pageNum: 1,
        isLoading: false
    }) 
  }

  // next = async (id) => {
  //   this.props.navigation.navigate('VideoResult', {
  //     questionID: id
  //   })
  // }
  resultConfirm = async (id) => {
    console.log(`/tasks/process_videos/${id}/`)
    await axios.get(`/tasks/process_videos/${id}/`,
    { headers: {
      'Authorization' : `Token ${this.props.token.auth.token}`
    }}) 
    .then(({data})=>{
      console.log(data)
      this.props.navigation.navigate('VideoAnalysisResult', {
        questionID: id,
        uri: data
      })
    })
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
                  // this.next(item.id)
                  this.resultConfirm(item.id)
                }}
              >
                <View style={styles.list}>
                  <Text style={styles.title}>{item.question}</Text>
                  <Text style={styles.content}>{item.counselor_username + ' 상담사'}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(key, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
            <TouchableOpacity
              onPress={()=>{
                this.props.navigation.navigate('VideoGraphResult')
              }}
            >
              <View>
                <Text>그래프로 확인하기</Text>
              </View>
            </TouchableOpacity>
        
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)

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
    fontSize: 18,
  },
  content:{
    marginLeft: '1%',
    color: 'gray',
    fontSize: 13,
  }
})


