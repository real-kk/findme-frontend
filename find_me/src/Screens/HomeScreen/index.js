import React from 'react'
import {
  Platform, StatusBar, ImageBackground, StyleSheet, 
  View, Text, Image, FlatList, TouchableOpacity
} from 'react-native'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

class HomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      datas: [
        {
          key: '0',
          data: '상담 신청',
          icon: require('../../../images/coffee.png'),
          explain: '전문가에게 상담을 신청하세요'
        },
        {
          key: '1',
          data: '영상 촬영',
          icon: require('../../../images/camera.png'),
          explain: '질문 답변 영상을 촬영주세요'
        }
      ],
      data: [
        {
          key: '0',
          data: '일기 쓰기',
          icon: 'form',
          explain: '오늘의 감정을 글로 나타내 보세요' + '\n' + '일기는 하루에 한 번 작성 가능합니다'
        }
      ]
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../images/back.png')} style={styles.image}>
          <Text style={styles.logo}>FIND ME</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            renderItem={({ item }) => {
            return (
              <TouchableOpacity
              activeOpacity={0.97}
              onPress={() => {
              if (item.key === '0') {
                this.props.navigation.navigate('Diary')
              }
            }}>
                <View style={styles.diary}>
                  <Image source={require('../../../images/moon.png')} style={styles.icon}/>
                    <Text style={styles.list_text}>{item.data}</Text>
                    <Text style={styles.explain}>{item.explain}</Text>
                </View>
              </TouchableOpacity>
            )
          }}/>

          <Text style={styles.activity}>다른 활동</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.datas}
            renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (item.key === '0') {
                    this.props.navigation.push('Counselors')
                  } else if (item.key === '1') {
                    this.props.navigation.push('ConfirmQuestion')
                  }
            }}>
                <View style={styles.list}>
                  <Image source={item.icon} style={styles.smallIcon}/>
                  <View>
                    <Text style={styles.smallText}>{item.data}</Text>
                    <Text style={styles.explain}>{item.explain}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/>

        </ImageBackground>
      </View>
    )
  }
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight
  },
  image: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'center'
  },
  profile: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: hp('5%')
  },
  logo: {
    marginTop: hp('4%'),
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'netmarbleB'
  },
  icon: {
    width: wp('60%'),
    height: '50%',
    resizeMode: 'contain'
  },
  smallIcon: {
    marginHorizontal: wp('5%'),
    width: 40,
    height: 60
  },
  diary: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('80%'),
    height: hp('36%'),
    marginLeft: wp('10%'),
    marginTop: hp('10%'),
    borderRadius: 20,
    backgroundColor: '#fafafa'
  },
  activity: {
    marginLeft: wp('10%'),
    fontSize: 25,
    fontFamily: 'netmarbleM'
  },
  list: {
    height: hp('11%'),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    marginLeft: wp('10%'),
    marginTop: hp('3%'),
    borderRadius: 20,
    backgroundColor: '#fafafa'
  },
  list_text: {
    paddingTop: hp('2%'),
    fontSize: 25,
    fontFamily: 'netmarbleM'
  },
  smallText: {
    fontSize: 18,
    fontFamily: 'netmarbleM'
  },
  explain: {
    paddingTop: hp('1%'),
    color: 'gray',
    fontSize: 14,
    flexDirection: 'column',
    fontFamily: 'netmarbleL',
    textAlign: 'center'
  }
})
