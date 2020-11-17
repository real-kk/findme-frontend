/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import ResultScreen from './ResultScreen'
import MypageScreen from './MypageScreen'

import CounselorsScreen from './CounelorsScreen'

import CounselorHome from './CounselorHome'
import CounselorApplyScreen from './CounselorHome/apply'
import CounselorVideoScreen from './CounselorHome/clientList'
import STTScreen from './CounselorHome/STT'
import QuestionRegisterScreen from './CounselorHome/questionRegister'


import Signup from './LoginScreen/SignUp'
import DiaryScreen from './HomeScreen/diary'
import DailyScreen from './HomeScreen/daily'
import recordVideo from './HomeScreen/recordVideo'
import confirmQuestion from './HomeScreen/confirmQuestion'
import confirmVideo from './HomeScreen/confirmVideo'

import CounselorResult from './CounselorResult'
import ResultHome from './CounselorResult/result'
import TextResult from './CounselorResult/diaryText'
import CloudResult from './CounselorResult/diaryCloud'


import diaryTextAnalysisResultScreen from './ResultScreen/diaryTextAnalysisResult'
import dailyAnalysisResultScreen from './ResultScreen/dailyAnalysisResult'
import questionListScreen from './ResultScreen/questionList'
import diaryListScreen from './ResultScreen/diaryList'
import diaryDetailScreen from './ResultScreen/diaryDetail'
import videoAnalysisResultScreen from './ResultScreen/videoAnalysisResult'

import CounselorDetailScreen from './CounelorsScreen/counselorDetail'
import CounselingRequestScreen from './CounelorsScreen/counselingRequest'
import CounselingRequestScreen2 from './CounelorsScreen/counselingRequest2'
import userModificationScreen from './MypageScreen/userModification'
import applicationFormModificationScreen from './MypageScreen/applicationFormModification'
import ApplicationDetailScreen from './CounselorHome/ApplicationDetail'


import {
  storeUserData
} from '../Store/actions/AuthAction'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => ({
  token: state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  storeUserData: (data) => dispatch(storeUserData(data))
})

const AuthStack =
  function AuthStack () {
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
function CounselorHomeStack () {
  return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={CounselorHome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Apply"
          component={CounselorApplyScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ApplicationDetail"
          component={ApplicationDetailScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ClientList"
          component={CounselorVideoScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="STT"
          component={STTScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="QuestionRegister"
          component={QuestionRegisterScreen}
        />
      </Stack.Navigator>
  )
}
function HomeStack () {
  return (
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
          name="RecordVideo"
          component={recordVideo}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmQuestion"
          component={confirmQuestion}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ConfirmVideo"
          component={confirmVideo}
        />
      </Stack.Navigator>
  )
}

function CounselorResultStack () {
  return (
      <Stack.Navigator>

        <Stack.Screen
          options={{ headerShown: false }}
          name="Result"
          component={CounselorResult}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="ResultHome"
          component={ResultHome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TextResult"
          component={TextResult}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="WordCloudResult"
          component={CloudResult}
        />
      </Stack.Navigator>
  )
}

function ResultStack () {
  const navigation = useNavigation()
  return (
      <Stack.Navigator>
         <Stack.Screen
          options={{ headerShown: false }}
          name="Result"
          component={ResultScreen}
          navigation={navigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DiaryList"
          component={diaryListScreen}
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
          name="QuestionList"
          component={questionListScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoAnalysisResult"
          component={videoAnalysisResultScreen}
        />
      </Stack.Navigator>
  )
}

function CounselorsStack () {
  return (
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="CounselingRequest2"
          component={CounselingRequestScreen2}
        />
      </Stack.Navigator>
  )
}

function MypageStack () {
  const navigation = useNavigation()
  return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Mypage"
          component={MypageScreen}
          navigation={navigation}
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

function UserStack ({ navigation, route, userType }) {
  if (route.params) {
    console.log('screen userType: ' + route.params.userType)
  }
  return (
      <Stack.Navigator>
      {route.params.userType === '0' ? (
        <Stack.Screen
            options={{ headerShown: false }}
            name="Client"
            component={ClientStack}
        />
      ) : (
        <Stack.Screen
            options={{ headerShown: false }}
            name="Counselor"
            component={CounselorStack}
        />
      )}
    </Stack.Navigator>
  )
}

function CounselorStack () {
  return (
        <Tab.Navigator
          navigationOptions = {({ navigation }) => ({
            tabBarOnPress: (scene, jumpToIndex) => {
              jumpToIndex(scene.index)
            }
          })}

          screenOptions={({ route }) => ({
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ focused, color, size }) => {
              let icon = '▲'
              if (route.name === 'Home') {
                icon = <Icon name="ios-home" size={30} />
              } else if (route.name === 'Result') {
                icon = <Icon name="ios-search" size={30} />
              }
              return <Text style={{ color: focused && '#FF6787' || '#FEFEFE', marginTop: 5 }}>{icon}</Text>
            }

          })}
          >
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={CounselorHomeStack}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Result"
            component={CounselorResultStack}
          />
          <Tab.Screen
            options={{ headerShown: false }}
            name="Mypage"
            component={MypageStack}
          />
        </Tab.Navigator>

  )
}

function ClientStack () {
  return (
        <Tab.Navigator
        tabBarOptions={{
          style: {
            borderColor: 'white',
            backgroundColor: 'white'
          }
        }}
        screenOptions={({ route }) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ focused, color, size }) => {
            let icon = '▲'
            if (route.name === 'Home') {
              icon = <Icon name="ios-home" size={25} />
            } else if (route.name === 'Result') {
              icon = <Icon name="ios-bar-chart-sharp" size={25} />
            } else if (route.name === 'Mypage') {
              icon = <Icon name="md-ellipsis-horizontal" size={25} />
            } else if (route.name === 'Counselors') {
              icon = <Icon name = "ios-people" size={25}/>
            }
            return <Text style={{ color: focused && '#FF6787' || 'gray', marginTop: 5 }}>{icon}</Text>
          }})
        }>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeStack}
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
  // eslint-disable-next-line no-useless-constructor
  constructor (props) {
    super(props)
  }

  render () {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={AuthStack}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="User"
                  component={UserStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StackScreen)
