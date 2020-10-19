/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


class ExperienceStart extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.text}>
                        Find Me는 맞춤형 상담 프로그램을 체함하기 위한 어플입니다.
                        일주일 간 감정일기를 작성하면서 나를 분석할 수 있고 이후 상담을
                        진행할 수 있습니다.
                    </Text>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            //데이터 검사 후 로그인 페이지 넘어가기
                            this.props.navigation.navigate('ExperienceMain')
                        }}>
                        <Text style={styles.buttonTitle}>시작하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#2ACAB9',
        justifyContent:'center',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    titlecontainer: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    button: {
        backgroundColor: "#569CDA",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
      },
      buttonTitle: {
          color: 'white'
      },
      text: {
          fontSize: 18
      }
});

export default ExperienceStart;
