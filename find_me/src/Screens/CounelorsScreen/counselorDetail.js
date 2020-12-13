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
  requestLogout: () => dispatch(requestLogout())
})

class CounselorDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counselor: this.props.route.params.counselor.fields
    }
  }

  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.result}>상담사 프로필</Text>
          <View style={styles.list}>
            <Image
            style={styles.image}
            source={{
              uri: this.state.counselor.image === ''
                ? 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' : 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + this.state.counselor.image
            }}/>
            <View style={styles.list_side}>
              <Text style={styles.username}>{this.state.counselor.username} 상담사</Text>
              <Text style={styles.email}>{this.state.counselor.email}</Text>
              <Text style={styles.introduce}>{this.state.counselor.introduce}</Text>
            </View>
          </View>
          <View style={styles.list_introduce}>
            <Text style={styles.title}>약력</Text>
            <Text style={styles.career}>{this.state.counselor.career}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CounselingRequest', {
                counselorEmail: this.state.counselor.email
              })
            }}>
            <View style={styles.apply}>
              <Text style={{ color: 'white', fontSize: 18, fontFamily: 'netmarbleB' }}>상담 신청하기</Text>
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
    marginTop: hp('3%'),
    flexDirection: 'column'
  },
  list_introduce: {
    marginTop: wp('4%'),
    width: wp('95%'),
    height: hp('44%'),
    flexDirection: 'column'
  },
  title: {
    marginLeft: wp('5%'),
    fontFamily: 'netmarbleL',
    fontSize: 22
  },
  apply: {
    marginLeft: wp('5%'),
    width: wp('90%'),
    borderRadius: 5,
    height: hp('6%'),
    backgroundColor: 'rgba(114,174,148,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: wp('40%'),
    height: hp('20%'),
    marginLeft: wp('5%'),
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'rgba(114,174,148,0.9)'
  },
  username: {
    marginLeft: wp('7%'),
    fontSize: 19,
    color: 'black',
    marginBottom: hp('2%'),
    width: wp('40%'),
    fontFamily: 'netmarbleM'
  },
  career: {
    marginLeft: wp('5%'),
    fontSize: 15,
    marginTop: hp('2%'),
    borderRadius: 5,
    backgroundColor: '#fafafa',
    height: hp('35%'),
    fontFamily: 'netmarbleL',
    padding: '5%'
  },
  introduce: {
    marginLeft: wp('7%'),
    fontSize: 15,
    width: wp('40%'),
    fontFamily: 'netmarbleL'
  },
  email: {
    marginLeft: wp('7%'),
    fontSize: 13,
    fontFamily: 'netmarbleL',
    marginBottom: hp('2%'),
    width: wp('40%'),
    color: 'gray'
  },
  result: {
    fontSize: 23,
    paddingLeft: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    fontFamily: 'netmarbleB',
    color: 'white',
    backgroundColor: 'rgba(114,174,148,0.9)',
    marginBottom: hp('2%')
  }
})
