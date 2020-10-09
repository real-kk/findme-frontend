/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, Button } from 'react-native';

class MainScreen extends React.Component {
    render() {
        const {params} = this.props.route;
        const userName = params ? params.userName : null;
        const userEmail = params ? params.userEmail : null;

        return (
            <View>
                <Text>UserName: {JSON.stringify(userName)}</Text>
                <Text>UserEmail: {JSON.stringify(userEmail)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default MainScreen;
