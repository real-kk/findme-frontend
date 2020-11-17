/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import axios from '../../axiosConfig'
import { connect } from 'react-redux'
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

class DiaryResult extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.date}>
              {this.props.route.params.diary.create_date}
            </Text>
            <Text style={styles.text}>
              {this.props.route.params.diary.content}
            </Text>
            </ScrollView>
            <TouchableOpacity
                style={styles.submission}
            >
                <Text>삭제하기</Text>
            </TouchableOpacity>
        </View>    
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResult)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA'
  },
  date: {
    borderRadius: 2,
    marginTop: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    width: wp('100%'),
    marginHorizontal: wp('2%'),
    backgroundColor: '#FAFAFA',
    color: 'gray'
  },

  text: {
    borderWidth: 0.1,
    borderRadius: 5,
    padding: wp('5%'),
    height: hp('50%'),
    marginTop: hp('3%'),
    backgroundColor: 'white',
    marginRight: wp('6%'),
    marginLeft: wp('2%'),
    fontWeight: '900',
    fontSize: 15,
  },

  submission:{
    marginVertical: hp('2%'),
    width: wp('50%'),
    borderRadius: 2,
    height: hp('6%'), 
    backgroundColor:'#AAF0D1', 
    alignItems:'center', 
    justifyContent:'center',
  }
})
