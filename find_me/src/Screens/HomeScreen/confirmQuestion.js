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
import Icon from 'react-native-vector-icons/Ionicons'
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
    this._ismounted = true
    
    if (this._isMounted) {
      this.setState({isLoading: false})
    }
  }

  componentWillUnmount(){
    this._ismounted = false
  }
  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.result}>질문 리스트</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.questionList}
            renderItem={({item, index})=>{
              return(
                <TouchableOpacity
                  activeOpacity={0.95} 
                  onPress = {()=> {
                    this.props.navigation.navigate('RecordVideo', {
                    questionID: this.state.questionList[index].id
                    })
                  }}
                >
                  <View style={styles.list}>
                    <Icon name="person-circle" size={40} style={styles.image}></Icon>
                    <View style={styles.list_side}>
                      <Text style={styles.title}>{'상담사 : ' + item.counselor_username}</Text>
                      <Text style={styles.text}>{'질문 : ' + item.question}</Text>
                    </View>
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
    justifyContent:'center',
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  list: {
    paddingHorizontal: '5%',
    paddingVertical: hp('1.5%'),
    marginTop : hp('1.5%'),
    marginBottom : hp('1%'),
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
  list_side:{
    flexDirection:'column',
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color:'white',
    backgroundColor:'rgba(114,174,148,0.9)',
  },
  title:{
    marginLeft: wp('10%'),
    paddingTop: hp('1%'),
    fontSize: 17,
    color: 'black',
    fontFamily:'netmarbleL'
  },
  text: {
    paddingTop: hp('1%'),
    marginLeft: wp('10%'),
    fontSize: 14,
    color:'gray',
    fontFamily:'netmarbleL'
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(confirmQuestion)
