/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, Image, FlatList, TextInput, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig';

  class HomeScreen extends React.Component {
      constructor(){
          super();
          this.state={
              datas: [
                  {key:'0', data:'감정일기 작성'},
                  {key:'1', data:'일일활동 기록'},
                  {key:'2', data:'영상 촬영'},
                ],
          }
      }

      _onPress = () => {
          this.props.navigation.push('Diary')
      }

      render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.logo}>Home</Text>
                <FlatList
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> this._onPress()}
                            >
                                <View style={styles.list}>
                                    <Text>{item.data}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}
export default HomeScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: '10%',
        justifyContent:'center',
        backgroundColor : '#fffff0',
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
    logo : {
       textAlign : 'center'
    }
});

