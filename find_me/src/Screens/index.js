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
import STTScreen from './CounselorHome/record'
import QuestionRegisterScreen from './CounselorHome/questionRegister'

import Signup from './LoginScreen/SignUp'
import DiaryScreen from './HomeScreen/diary'
import recordVideo from './HomeScreen/recordVideo'
import confirmQuestion from './HomeScreen/confirmQuestion'
import confirmVideo from './HomeScreen/confirmVideo'

import CounselorResult from './CounselorResult'
import ResultHome from './CounselorResult/result'
import TextResult from './CounselorResult/diaryText'
import CloudResult from './CounselorResult/diaryCloud'
import Video from './CounselorResult/videoResult'
import CounselorVideoGraph from './CounselorResult/videoGraph'
import CounselorQuestionList from './CounselorResult/questionList'

import CounselorMypageScreen from './CounselorMypage'
import userModification2Screen from './CounselorMypage/userModification'
import clientListScreen from './CounselorMypage/clientList'
import clientDetailScreen from './CounselorMypage/clientDetail'
import passwordModification2Screen from './CounselorMypage/passwordModification'

import diaryTextAnalysisResultScreen from './ResultScreen/diaryTextAnalysisResult'
import questionListScreen from './ResultScreen/questionList'
import diaryListScreen from './ResultScreen/diaryList'
import diaryDetailScreen from './ResultScreen/diaryDetail'

import videoResultScreen from './ResultScreen/videoResult'

import CounselorDetailScreen from './CounelorsScreen/counselorDetail'
import CounselingRequestScreen from './CounelorsScreen/counselingRequest'
import CounselingRequestScreen2 from './CounelorsScreen/counselingRequest2'
import userModificationScreen from './MypageScreen/userModification'
import applicationFormModificationScreen from './MypageScreen/applicationFormModification'
import applicationFormModification2Screen from './MypageScreen/applicationFormModification2'
import passwordModificationScreen from './MypageScreen/passwordModification'

import ApplicationDetailScreen from './CounselorHome/applicationDetail'

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

function AuthStack (route) {
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="CounselorQuestionList"
          component={CounselorQuestionList}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoResult"
          component={Video}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CounselorVideoGraph"
          component={CounselorVideoGraph}
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
          name="QuestionList"
          component={questionListScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoResult"
          component={videoResultScreen}
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="passwordModification"
          component={passwordModificationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="applicationFormModification2"
          component={applicationFormModification2Screen}
        />
      </Stack.Navigator>
  )
}

function CounselorMypageStack () {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="CounselorMypage"
        component={CounselorMypageScreen}
        navigation={navigation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="userModification"
        component={userModification2Screen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="clientList"
        component={clientListScreen}
      />
       <Stack.Screen
        options={{ headerShown: false }}
        name="clientDetail"
        component={ clientDetailScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="passwordModification"
        component={passwordModification2Screen}
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
            tabBarIcon: ({ focused, color, size }) => {
              let icon = '▲'
              if (route.name === 'Home') {
                icon = <Icon name="ios-home" size={25} />
              } else if (route.name === 'Result') {
                icon = <Icon name="ios-bar-chart-sharp" size={25} />
              } else if (route.name === 'Mypage') {
                icon = <Icon name="md-ellipsis-horizontal" size={25} />
              }
              return <Text style={{ color: focused && 'rgba(114,174,148,0.9)' || 'gray', marginTop: 5 }}>{icon}</Text>
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
            component={CounselorMypageStack}
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
          tabBarIcon: ({ focused, color, size }) => {
            let icon = '▲'
            if (route.name === 'Home') {
              icon = <Icon name="ios-home" size={25} />
            } else if (route.name === 'Result') {
              icon = <Icon name="ios-bar-chart-sharp" size={25} />
            } else if (route.name === 'Mypage') {
              icon = <Icon name="ios-person" size={25} />
            }
            return <Text style={{ color: focused && 'rgba(114,174,148,0.9)' || 'gray', marginTop: 5 }}>{icon}</Text>
          }
        })
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
          name="Mypage"
          component={MypageStack}
        />
      </Tab.Navigator>

  )
}

class StackScreen extends React.Component {
  
 
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
