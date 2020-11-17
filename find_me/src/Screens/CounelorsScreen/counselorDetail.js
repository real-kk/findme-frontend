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
              <ScrollView>
                <Text>{this.state.counselor.username} 상담사</Text>
                <Text>{this.state.counselor.introduce}</Text>
                <Text>이메일: {this.state.counselor.email}</Text>
                <Text>상담 후기</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('CounselingRequest', {
                      counselorEmail: this.state.counselor.email
                    })
                  }}>
                  <View style={styles.list}>
                    <Text style={styles.apply}>상담 신청하기</Text>
                  </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselorDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    justifyContent: 'center'
  },
  list: {
    borderRadius: 2,
    padding: '5%',
    marginVertical: '3%',
    justifyContent: 'center',
    width: wp('30%'),
    height: hp('5%'),
    backgroundColor: '#19ce60'
  },
  apply: {
    color: '#ffffff'
  },
  username: {
    fontSize: 20,
  }
})
