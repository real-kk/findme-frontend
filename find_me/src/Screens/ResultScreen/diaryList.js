/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
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

class DiaryResultList extends React.Component {
    constructor(){
        super();
        this.state = {
            diaryList: [],
            refreshing : false,
            isloading: true,
            pageNum: 1,
            isLoading: false
        }       

    }

    getDiaryList = async () => {
        axios.get('/diaries/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({diaryList: data})
            return data;
        })
        .catch(err=>{
            console.log(err)   
        })
    }

    componentDidMount(){
        this.props.navigation.addListener('tabPress', e => {
            this.getDiaryList()
        })
        this.getDiaryList()
        this._ismounted = true

        if (this._isMounted) {
            this.setState({isLoading: false})
        }
    }
    
    componentWillUnmount(){
        this._ismounted = false
    }

    handleRefresh = async() => {
        this.setState({
            diaryList: this.getDiaryList(),
            pageNum: 1,
            isLoading: false
        }) 
    }

    render() {
      return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.diaryList}
                renderItem={({item, index})=>{
                    return(
                        <TouchableOpacity
                            onPress = {()=> {
                                this.props.navigation.navigate('DiaryDetail', {
                                    diary: this.state.diaryList[index]
                                })
                            }}>
                            <View style={styles.list}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.content}>{item.create_date}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(key, index) => index.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResultList);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#FAFAFA'
    },
    list: {
        borderWidth: 0.1,
        borderRadius: 4,
        padding: '5%',
        marginVertical : '3%',
        justifyContent: 'center',
        width: wp('98%'),
        height: hp('15%'),
        backgroundColor: 'white',
    },
    title:{
        marginLeft: '1%',
        marginBottom: '8%',
        fontSize: 18,
    },
    content:{
        marginLeft: '1%',
        color: 'gray',
        fontSize: 10
    }
});
