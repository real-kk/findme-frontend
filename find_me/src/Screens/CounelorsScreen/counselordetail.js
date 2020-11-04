/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class CounselorDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counselor: this.props.route.params.counselor.fields
        }
    }
    
    render() {
      return (
          <View style={styles.container}>
              <ScrollView>
                <Text>상담사 정보</Text>
                <Text>이메일: {this.state.counselor.email}</Text>
                <Text>이름: {this.state.counselor.username}</Text>
                <Text>소개: </Text>
                <Text>상담 후기</Text>
                
                {/* 후기 리스트 쭉~~ */}

                <TouchableOpacity
                    style={{borderWidth: 2}}
                            onPress={()=>{
                                this.props.navigation.navigate('CounselingRequest',{
                                    counselorEmail: this.state.counselor.email
                                })
                            }}
                            
                        >
                        <Text>상담 신청하기</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
      )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounselorDetail)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
    },
});


