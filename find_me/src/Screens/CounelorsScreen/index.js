/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

  const mapStateToProps = (state) => ({
    token: state
  })

    const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  class CounselorsScreen extends React.Component {
      constructor(){
          super();
          this.state = {
            counselorList: [],
        }
      }

      getCounselorList = async () => {
          const data = await axios.get('/users/?user_type=1', 
          { headers: {
              'Authorization' : `Token ${this.props.token.auth.token}`
          }})
          .then(({data})=>{
              this.setState({counselorList: data.users})
          })
      }


      componentDidMount(){
          this.getCounselorList()
        }
        
    render() {
      return (
        <View style={styles.container}>
            <Text>리스트</Text>
            <FlatList
                    data={this.state.counselorList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('CounselorDetail', {
                                        counselor: this.state.counselorList[index]
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Text>{item.fields.realname} | {item.fields.email}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorsScreen);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
        padding:20,
        marginTop : '25%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
