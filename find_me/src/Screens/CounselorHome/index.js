/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';


  class CounselorHome extends React.Component {
      constructor(){
          super();
        //   this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
          this.state={
              datas: [
                  {key:'0', data:'상담신청 확인'},
                  {key:'1', data:'영상 질문 등록'},
                  {key:'2', data:'상담 녹음 파일 변환'},
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
          this.props.navigation.push('Apply')
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
                                        this.props.navigation.push('Apply')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('ClientList')
                                    }
                                    else if(item.key === '2'){
                                        this.props.navigation.push('STT')
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
export default CounselorHome

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

