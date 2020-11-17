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


class STT extends React.Component {
    constructor(){
        super();
        this.state = {
          
      }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>상담사 신청 리스트</Text>
              
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(STT);

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
