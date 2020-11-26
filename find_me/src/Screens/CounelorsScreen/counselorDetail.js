/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const mapStateToProps = (state) => ({
  token: state
})

const mapDispatchToProps = (dispatch) => ({
  // eslint-disable-next-line no-undef
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
          <Text style={styles.result}>상담사 프로필</Text>
          <View style={styles.list}>
            <Image
            source={require('../../../images/camera.png')}
            style={styles.image}/>
            <View style={styles.list_side}>
              <Text style={styles.username}>{this.state.counselor.username} 상담사</Text>
              <Text style={styles.email}>{this.state.counselor.email}</Text>
            </View>
          </View>
          <View style={styles.list_introduce}>
            <Text style={styles.title}>약력</Text>
            <Text style={styles.introduce}>{this.state.counselor.introduce}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line react/prop-types
              this.props.navigation.navigate('CounselingRequest', {
                counselorEmail: this.state.counselor.email
              })
            }}>
            <View style={styles.apply}>
              <Text style={{ color: 'white', fontSize: 18 }}>상담 신청하기</Text>
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
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  list: {
    marginVertical: '2%',
    width: wp('98%'),
    flexDirection: 'row'
  },
  list_side: {
    marginVertical: '2%',
    flexDirection: 'column'
  },
  list_introduce: {
    marginVertical: '2%',
    width: wp('98%'),
    height: hp('46%'),
    flexDirection: 'column'
  },
  title: {
    marginLeft: wp('5%'),
    fontFamily: 'netmarbleL',
    fontSize: 19
  },
  apply: {
    marginLeft: wp('5%'),
    width: wp('92%'),
    borderRadius: 50,
    height: hp('6%'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: wp('40%'),
    height: hp('20%'),
    resizeMode: 'stretch',
    marginLeft: wp('5%'),
    borderRadius: 200
  },
  username: {
    marginLeft: wp('10%'),
    fontSize: 19,
    color: 'black',
    marginBottom: hp('2%'),
    fontFamily: 'netmarbleL'
  },
  introduce: {
    marginLeft: wp('5%'),
    fontSize: 15,
    color: 'gray',
    marginBottom: hp('2%'),
    fontFamily: 'netmarbleR'
  },
  email: {
    marginLeft: wp('10%'),
    fontSize: 14,
    fontFamily: 'netmarbleL'
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color:'white',
    backgroundColor:'rgba(114,174,148,0.9)',
  }
})
