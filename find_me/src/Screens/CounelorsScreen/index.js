import React from 'react';
import { Image, Platform, StatusBar, StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'

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
        this._ismounted = true

        if (this._isMounted) {
            this.setState({isLoading: false})
        }
    }

    componentWillUnmount(){
        this._ismounted = false
    }
        
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.result}>상담사 리스트</Text>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.counselorList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                activeOpacity={0.95} 
                                onPress = {()=> {
                                    this.props.navigation.navigate('CounselorDetail', {
                                        counselor: this.state.counselorList[index]
                                    })
                                }}
                            >
                            <View style={styles.list}>
                                <Image 
                                    style={styles.user}
                                    source={{uri: item.fields.image === "" ? 
                                    'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' : 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + item.fields.image}}/>
                                <View style={styles.list_side}>
                                    <Text style={styles.title}>{item.fields.username + ' 상담사'}</Text>
                                    <Text style={styles.text}>{item.fields.introduce}</Text>
                                </View>
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
        justifyContent:'center',
        paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    },
    user:{
        marginTop: hp('2.3%'),
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 200,
        borderWidth:2,
        borderColor:'rgba(114,174,148,0.9)',
        alignItems:'center',
        justifyContent:'center',
    },
    list: {
        paddingHorizontal: '5%',
        marginTop : hp('1.5%'),
        marginBottom : hp('1.5%'),
        height: hp('15%'),
        width: wp('90%'),
        marginLeft: wp('5%'),
        backgroundColor:'#fafafa',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 7,
        flexDirection:'row',
        elevation: 5,
    },
    image:{
        justifyContent:'center',
        paddingTop: hp('1%'),
    },
    list_side:{
        flexDirection:'column',
        marginTop: hp('1.5%'),
    },
    title:{
        marginLeft: wp('10%'),
        paddingTop: hp('1%'),
        width: wp('55%'),
        fontSize: 17,
        color: 'black',
        fontFamily:'netmarbleM'
    },
    text: {
        width: wp('55%'),
        paddingTop: hp('1%'),
        marginLeft: wp('10%'),
        fontSize: 14,
        color:'gray',
        fontFamily:'netmarbleL'
    },
    result: {
        fontSize: 23,
        paddingLeft: wp('5%'),
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        fontFamily: 'netmarbleB',
        color:'white',
        backgroundColor:'rgba(114,174,148,0.9)',
    }
});
