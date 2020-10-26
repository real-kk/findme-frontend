/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction';

const mapStateToProps = (state) => ({
    token: state
  })
  
  const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

  
  class TabUserScreen extends React.Component {
      _onclickLogout = () => {
          console.log("gfg")
          this.props.requestLogout()
          console.log("pass")
          alert("로그아웃 되었다.")
      }

      render() {
        return (
            <View>
                <Text>NNNNNNNNNN</Text>
                <Text>NNNNNNNNNN</Text>
                <Text>NNNNNNNNNN</Text>
                <Text>NNNNNNNNNN</Text>
                <Text>NNNNNNNNNN</Text>
               <TouchableOpacity 
                        onPress={ this._onclickLogout.bind(this)}>
                    <Text>로그아웃</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabUserScreen)

const styles = StyleSheet.create({

});

