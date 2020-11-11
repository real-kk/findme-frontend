import React from 'react';
import { StyleSheet,  View, Text, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import axios from '../../axiosConfig'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })


class CounselorApplyScreen extends React.Component {
    constructor(){
        super();
        this.state = {
          applicationList: [],
      }
    }

    getApplicationList = async () => {
        await axios.get('/counsels/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({applicationList: data})
        })
      
    }

    componentDidMount(){
        this.getApplicationList()
      }

    render() {
        return (
            <View style={styles.container}>
                <Text>상담사 신청 리스트</Text>
                <FlatList
                    data={this.state.applicationList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('ApplicationDetail', {
                                        application : this.state.applicationList[index]
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Text>신청자 : {item.client_username}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorApplyScreen);

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
        marginTop : '10%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
