/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
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

class CounselorDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/prop-types
      counselor: this.props.route.params.counselor.fields
    }
  }

  render () {
    return (
        <View style={styles.container}>
          <Text>상담사 프로필</Text>
          <View style={styles.list}>
            <Icon name="person-circle" size={50} style={styles.image}></Icon>
            <View style={styles.list_side}>
              <Text style={styles.username}>{this.state.counselor.username} 상담사</Text>
              <Text style={styles.introduce}>{this.state.counselor.introduce}</Text>
              <Text style={styles.review}>상담 후기</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => { 
              this.props.navigation.navigate('CounselingRequest', {
                counselorEmail: this.state.counselor.email
              })
            }}>
            <View style={styles.apply}>
              <Text>상담 신청하기</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselorDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
    backgroundColor: '#FAFAFA'
  },
  list: {
    padding: '5%',
    marginVertical: '2%',
    width: wp('98%'),
    height: hp('70%'),
    backgroundColor:'#FAFAFA',
    flexDirection:'row',
  },
  list_side:{
    flexDirection:'column',
    alignItems: 'flex-start',
  },
  apply: {
    width: wp('90%'),
    borderRadius: 2,
    height: hp('6%'), 
    backgroundColor:'#AAF0D1', 
    alignItems:'center', 
    justifyContent:'center',
  },
  username: {
    marginLeft: wp('10%'),
    fontSize: 19,
    color: 'black',
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
  introduce: {
    marginLeft: wp('10%'),
    fontSize: 15,
    color: 'gray',
    marginBottom: hp('2%')
  },
  email: {
    marginLeft: wp('10%'),
    fontSize: 14
  },
  review: {
    marginLeft: wp('10%'),
    fontSize: 14
  }
})
