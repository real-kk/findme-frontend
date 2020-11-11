/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Dimensions, StyleSheet,  View, Text, Image, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
import axios from '../../axiosConfig';

  class VideoScreen extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
              datas: [
                  {key:'0', data:'동영상 촬영하기'},
                  {key:'1', data:'갤러리에서 가져오기'},
                ],
          }
      }

    //   componentDidMount(){
    //       foreUpdateHandler = () =>{
    //           this.forceUpdate();
    //       };
    //       foreUpdateHandler();
    //   }

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
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('RecordVideo')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('SelectVideo')
                                    }
                                }}
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
export default VideoScreen

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

