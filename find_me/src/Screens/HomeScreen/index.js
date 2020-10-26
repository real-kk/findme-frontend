/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, Screen,FlatList, TextInput, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig';

  class HomeScreen extends React.Component {
      constructor(){
          super();
          this.state={
              datas: [
                  {key:'0', data:'감정일기 작성'},
                //   {key:'1', data:'bbb'},
                //   {key:'2', data:'ccc'},
                ],
          }
      }

      _onPress = () => {
          this.props.navigation.push('Diary')
      }

      render() {
        return (
            <View style={styles.container}>
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
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },
    list: {
        borderWidth: 1,
        borderRadius: 8,
        padding:40,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

