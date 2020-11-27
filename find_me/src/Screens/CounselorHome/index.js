/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, Platform, StatusBar, ImageBackground, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
class CounselorHome extends React.Component {
    constructor(){
        super();
        
        this.state={
            datas: [
                {key:'0', data:'영상 질문 등록', icon: require('../../../images/camera.png'),
                explain:'내담자에게 궁금한 것을 물어보세요'},
                {key:'1', data:'상담 녹음 및 파일 변환', icon:require('../../../images/record.png'),
                explain:'상담 녹음 내용을 확인하세요'}
            ],
            data: [
                {key:'0', data:'상담 신청 확인', 
                icon: require('../../../images/coffee.png'), explain:'상담 신청 리스트를 확인하세요'}
            ]
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
                <ImageBackground source={require('../../../images/back.png')} style={styles.image}>
                <Text style = {styles.logo}>FIND ME</Text>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.97} 
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('Apply')
                                    }
                                }}
                            >
                                <View style={styles.diary}>
                                    <Image source={item.icon} style={styles.icon}/>   
                                    <Text style={styles.list_text}>{item.data}</Text>
                                    <Text style={styles.explain}>{item.explain}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
                
                <Text style={styles.activity}>다른 활동</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('ClientList')
                                    }
                                    else if(item.key === '1'){
                                        this.props.navigation.push('STT')
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Image source={item.icon} style={styles.smallIcon}/>
                                    <View>
                                    <Text style={styles.smallText}>{item.data}</Text>
                                    <Text style={styles.explain}>{item.explain}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </ImageBackground>
            </View>
        )
    }
}
export default CounselorHome

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    image: {
        flex: 1,
        width:wp('100%'),
        height:hp('100%'),
        justifyContent: "center"
    },
    profile : {
        width:wp('100%'),
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:hp('5%'),
    },
    logo:{
        marginTop:hp('4%'),
        fontSize:30, 
        color:'#fff', 
        textAlign:'center',
        fontFamily:'netmarbleB'
    },
    icon:{
        width: wp('60%'),
        height: '50%',
        resizeMode:'contain' ,
    },
    smallIcon:{
        marginHorizontal:wp('5%'),
        width: 40,
        height: 60,
    },
    diary:{
        alignItems:'center',
        justifyContent:'center',
        width: wp('80%'),
        height: hp('36%'),
        marginLeft: wp('10%'),
        marginTop: hp('10%'),
        borderRadius: 20,
        backgroundColor:"#fafafa"
    },
    activity:{
        marginLeft: wp('10%'),
        fontSize: 25,
        fontFamily:'netmarbleM'
    },
    list: {
        height:hp('11%'),
        flexDirection:'row',
        alignItems: 'center',
        width: wp('80%'),
        marginLeft: wp('10%'),
        marginTop: hp('3%'),
        borderRadius: 20,
        backgroundColor:"#fafafa"
    },
    list_text: {
        paddingTop: hp('2%'),
        fontSize: 25,
        fontFamily:'netmarbleM'
    },
    smallText:{
        fontSize: 18,
        fontFamily:'netmarbleM'
        
    },
    explain:{
        paddingTop: hp('1%'),
        color: 'gray',
        fontSize: 14,
        flexDirection:'column',
        fontFamily:'netmarbleL'
    }
});

