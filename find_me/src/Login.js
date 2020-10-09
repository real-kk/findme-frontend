/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet,  View, Text, Image, Button} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';


class GoogleSignins extends React.Component {
    constructor(props){
        super(props)
        this.state={
            userInfo: null,
            name:'',
            email:'',
            photo:'',
            loginSuccess: false,
        }
    }
    componentDidMount(){
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '875592756134-un7o31gtgb7euai184pdfbd59gu708cj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
          });
          this._isSignedIn();
    }
    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({
              userInfo: userInfo,
              name:userInfo.user.name,
              email:userInfo.user.email,
              photo:userInfo.user.photo,
              loginSuccess: true,
          });
        console.log({userInfo})
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log({error})
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            console.log({error})
            // some other error happened
          }
        }
      };

      _getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          console.log('User Info --> ', userInfo);
          this.setState({ userInfo: userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          } else {
            alert("Something went wrong. Unable to get user's info");
            console.log("Something went wrong. Unable to get user's info");
          }
        }
      };

      _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            //Get the User details as user is already signed in
            this._getCurrentUserInfo();
        } 
        else {
            //alert("Please Login");
            console.log('Please Login');
        }
      };

      _signOut = async () => {
        //Remove user session from the device.
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ userInfo: null }); // Remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };

      render(){
              return (
                <View style={styles.mainView}>
                    {this.state.loginSuccess ? 
                         <View>
                             <Button
                                title = "시작하기"
                                onPress={()=> {
                                    console.log(this.state.name)
                                    this.props.navigation.navigate('Main', {
                                        userName: this.state.name,
                                        userEmail: this.state.email
                                    })
                                }}
                            />
                            {/* <Text>{this.state.name}</Text>
                            <Text>{this.state.email}</Text>
                            <Image source={{uri:this.state.photo}} style={{height: 40, width: 40}}/> */}
                        </View> :
                        <GoogleSigninButton
                            style={styles.googleloginBtn}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                            disabled={this.state.isSigninInProgress}
                        />
                    }
                </View>
              )
      }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems:'center', 
        justifyContent: 'center'
    },
    googleloginBtn: {
        width: 192, 
        height: 48,
        marginTop: 400
    }
});

export default GoogleSignins;
