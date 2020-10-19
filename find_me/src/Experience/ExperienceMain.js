/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';

class ExperienceMain extends React.Component {
    render() {
        return (
            <View>
                <View>
                    <Text>
                        MAIN PAGE
                    </Text>
                </View>
                <View>
                    {/* <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                            //데이터 검사 후 로그인 페이지 넘어가기
                            // this.props.navigation.navigate('Main')
                        }}>
                        <Text style={styles.buttonTitle}>시작하기</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default ExperienceMain;
