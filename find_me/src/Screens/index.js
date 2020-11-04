/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react"
import { Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons"


import LoginScreen from "./LoginScreen";
import HomeScreen from './HomeScreen';
import ResultScreen from './ResultScreen';
import MypageScreen from './MypageScreen';
import VideoScreen from './HomeScreen/video';
import CounselorsScreen from './CounelorsScreen';
import TopBar from './ResultScreen';

import Signup from "./LoginScreen/SignUp";
import DiaryScreen from './HomeScreen/diary';
import DailyScreen from './HomeScreen/daily';

import diaryTextAnalysisResultScreen from './ResultScreen/diaryTextAnalysisResult';
import dailyAnalysisResultScreen from './ResultScreen/dailyAnalysisResult';
import videoAnalysisResultScreen from './ResultScreen/videoAnalysisResult';
import diaryListScreen from './ResultScreen/diaryList';
import diaryDetailScreen from './ResultScreen/diaryDetail';
import CounselorDetailScreen from './CounelorsScreen/counselorDetail';
import CounselingRequestScreen from './CounelorsScreen/counselingRequest';
import userModificationScreen from './MypageScreen/userModification';
import applicationFormModificationScreen from './MypageScreen/applicationFormModification';

import axios from '../axiosConfig';

import {
  getUserData,
  readStorage,
  storeUserData,
} from "../Store/actions/AuthAction"
;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => ({
    token: state.auth.token,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    storeUserData: (data) => dispatch(storeUserData(data)),
  })
  
  const AuthStack = 
  function AuthStack() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />
      </Stack.Navigator>
    )
  }

  function HomeStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Diary"
          component={DiaryScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Daily"
          component={DailyScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Video"
          component={VideoScreen}
        />
      </Stack.Navigator>
    )
  }

  function ResultStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="TopBar"
          component={TopBar}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DiaryList"
          component={diaryListScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Result"
          component={ResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DiaryTextAnalysis"
          component={diaryTextAnalysisResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DiaryDetail"
          component={diaryDetailScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DailyAnalysis"
          component={dailyAnalysisResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoAnalysis"
          component={videoAnalysisResultScreen}
        />        
      </Stack.Navigator>
    )
  }

  function CounselorsStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Counselors"
          component={CounselorsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CounselorDetail"
          component={CounselorDetailScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CounselingRequest"
          component={CounselingRequestScreen}
        />
      </Stack.Navigator>
    )
  }

  function MypageStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Mypage"
          component={MypageScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="userModification"
          component={userModificationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="applicationFormModification"
          component={applicationFormModificationScreen}
        />
      </Stack.Navigator>
    )
  }

  function UserStack(){
    console.log(userType + ' in userstack')
    return(
      <Stack.Navigator>
      {userType === '0' ? (
        <Stack.Screen
            options={{headerShown: false}}  
            name="Client" 
            component={TabStack}
        />
      ) : (
        <Stack.Screen
            options={{headerShown: false}}  
            name="Counselor" 
            component={CounselorStack}
        />
      )}
    </Stack.Navigator>
    )
  }

  function CounselorStack(){
    return(
        <Tab.Navigator 
          navigationOptions = {({navigation}) => ({
            tabBarOnPress : (scene, jumpToIndex) => {
              console.log('onPress', scene.route);
              jumpToIndex(scene.index)
            }
          })}
            
          screenOptions={({ route }) => ({
          tabBarIcon: ({focused, color, size}) => {
              let icon = "▲"

              if (route.name === 'Home') {
                icon = <Icon name="ios-person" size={30} />
              } else if (route.name === 'Result') {
                icon = <Icon name="ios-search" size={30} />
              } 
              return <Text style={{ color: focused && "#FF6787" || "#FEFEFE", marginTop: 5 }}>{icon}</Text>
            }
            
          })}
          >
          <Tab.Screen 
            options={{ headerShown: false }} 
            name="Home"
            component={HomeStack}
            listeners={({navigation}) =>({
              tabPress: e => {
                navigation.navigate('Home', {refresh : true})
              },
            })}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Result"
            component={ResultStack}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Mypage"
            component={MypageStack}
          />
        </Tab.Navigator>
      
    )
  }

  function TabStack(){
    return(
        <Tab.Navigator 
          navigationOptions = {({navigation}) => ({
            tabBarOnPress : (scene, jumpToIndex) => {
              console.log('onPress', scene.route);
              jumpToIndex(scene.index)
            }
          })}
            
          screenOptions={({ route }) => ({
          tabBarIcon: ({focused, color, size}) => {
              let icon = "▲"

              if (route.name === 'Home') {
                icon = <Icon name="ios-person" size={30} />
              } else if (route.name === 'Result') {
                icon = <Icon name="ios-search" size={30} />
              } 
              return <Text style={{ color: focused && "#FF6787" || "#FEFEFE", marginTop: 5 }}>{icon}</Text>
            }
            
          })}
          >
          <Tab.Screen 
            options={{ headerShown: false }} 
            name="Home"
            component={HomeStack}
            listeners={({navigation}) =>({
              tabPress: e => {
                navigation.navigate('Home', {refresh : true})
              },
            })}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Result"
            component={ResultStack}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Counselors"
            component={CounselorsStack}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Mypage"
            component={MypageStack}
          />
        </Tab.Navigator>
      
    )
  }

var userType

class StackScreen extends React.Component {
  constructor(props) {
    super(props)
    getUserData()
      .then((data) => {
        let user = JSON.parse(data)
        let userToken = user[0][1];
        userType = user[1][1];

        console.log("유저타입:: "+userType, "유저토큰:: "+userToken)
        if (!data) {
          this.props.storeUserData({ token: null })
          return
        }
        this.props.storeUserData({ token: userToken })
        this.setState({ isLoggedin: userToken })
      })
      .catch((err) => {
        alert("Failed to login : ", err)
      })

      // this.getUserType()
    }

    // getUserType = async () => {
    //   axios.get('/users/type/', 
    //   { headers: {
    //     'Authorization' : `Token ${this.props.token}`
    //   }})
    //   .then((res)=>{
    //     console.log(res)
    //     // console.log('user type is : ' + data["user_type"])
    //     // this.setState({user_type: data["user_type"]})
    //     // console.log(this.state.user_type)
        
    //   })
    //   .catch((err)=>{
    //     console.log(err)
    //   })
    // }
    
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
              {this.props.token === null ? (
                <Stack.Screen
                    options={{headerShown: false}}  
                    name="Login" 
                    component={AuthStack}
                />
              ) : (
                <Stack.Screen
                    options={{headerShown: false}}  
                    name="User" 
                    component={UserStack}
                />
              )}
            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StackScreen)
