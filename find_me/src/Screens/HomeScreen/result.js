/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, Button, TextInput } from 'react-native';


class ResultScreen extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.Test}>UserScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Test:{
        marginTop: 10
    }
});

export default ResultScreen;
