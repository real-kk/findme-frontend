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

import diarytextanalysisResultScreen from './ResultScreen/diarytextanalysisResult';
import dailyanalysisResultScreen from './ResultScreen/dailyanalysisResult';
import videoAnalysisResultScreen from './ResultScreen/videoanalysisResult';
import diaryListScreen from './ResultScreen/diaryList';
import diaryResultScreen from './ResultScreen/diaryResult';
import CounselorDetailScreen from './CounelorsScreen/counselordetail';
import CounselingRequestScreen from './CounelorsScreen/counselingRequest';
import AllResultScreen from './ResultScreen/allResult';


import {
  getUserData,
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
          component={diarytextanalysisResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DiaryResult"
          component={diaryResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DailyAnalysis"
          component={dailyanalysisResultScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoAnalysis"
          component={videoAnalysisResultScreen}
        />
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="AllResult"
          component={AllResultScreen}
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
      </Stack.Navigator>
    )
  }


  function TabStack(){
    return(
        <Tab.Navigator 
         
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

class StackScreen extends React.Component {
  constructor(props) {
    super(props)
    // Get token when app starts, if token not exists, go to login page
    getUserData("userToken")
      .then((data) => {
        if (!data) {
          this.props.storeUserData({ token: null })
          return
        }
        this.props.storeUserData({ token: data })
        this.setState({ isLoggedin: data })
      })
      .catch((err) => {
        alert("Failed to login : ", err)
      })
  }

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
                    name="TabStack" 
                    component={TabStack}
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
