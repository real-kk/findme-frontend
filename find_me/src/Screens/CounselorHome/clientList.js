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

class CounselorVideo extends React.Component {
    constructor(){
        super();
        this.state = {
          clientList: [],
      }
    }

    getClientList = async () => {
        await axios.get('/counsels/date/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({clientList: data})
        })
      
    }

    componentDidMount(){
        this.getClientList()
      }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>상담중인 내담자 목록</Text>
                <FlatList
                    data={this.state.clientList}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                onPress = {()=> {
                                    this.props.navigation.navigate('QuestionRegister', {
                                        client: this.state.clientList[index]
                                    })
                                }}
                            >
                                <View style={styles.list}>
                                    <Text>{'이름 : ' + item.client_username}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CounselorVideo);

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
