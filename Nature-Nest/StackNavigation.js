import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import News from './screens/News';
import NewsScreen from './screens/NewsScreen';
import GameScreen from './screens/GameScreen';
import ComicScreen from './screens/ComicScreen';
import ClimateScreen from './screens/ClimateScreen';
import QuestionsScreen from './screens/QuestionsScreen';
import SettingScreen from './screens/SettingScreen';
import ClimaBuddy from "./screens/ClimaBuddy";
import { FontAwesome6 } from '@expo/vector-icons';
import RecycleRush from './screens/RecycleRush';
import Classifier from './screens/Classifier';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} name="NewsScreen" component={NewsScreen} />
        <Stack.Screen options={{ headerShown: false, animation: "slide_from_bottom" }} name="MainTabs" component={StackNavigation2} />
        <Stack.Screen options={{ headerShown: false, animation: "fade" }} name="Climate" component={ClimateScreen} />
        <Stack.Screen options={{
          headerShown: false, animation: "slide_from_bottom"
        }} name="Ques" component={QuestionsScreen} />
        <Stack.Screen options={{
          headerShown: false, animation: "slide_from_bottom"
        }} name="RecycleRush" component={RecycleRush} />
        <Stack.Screen options={{ animation: "fade" }} name="Comic" component={ComicScreen} />
        <Stack.Screen options={{
          headerShown: false, animation: "slide_from_right"
        }} name="Classifier" component={Classifier} />
        <Stack.Screen options={{ animation: "slide_from_bottom" }} name="ClimaBuddy" component={ClimaBuddy} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const StackNavigation2 = () => {
  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{ tabBarShowLabel: false, tabBarStyle: { position: "absolute", left: 24.5, right: 24.5, bottom: 13, height: 60, borderRadius: 18.6, elevation: 5, shadowColor: "rgba(0,0,0,0.85)", backgroundColor: "rgba(255,255,255,0.97)", elevation: 4, shadowOffset: { width: 0, height: 0 }, shadowColor: "black", shadowOpacity: 0.45, shadowRadius: 3, paddingBottom: 0 } }}>
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <Entypo name="home" size={focused ? 32 : 24} color={focused ? "#16247d" : "grey"} />
              {focused ? null : <Text style={{ fontSize: 12, color: focused ? "#16247d" : "grey" }}>Home</Text>}
            </View>
          )
        }
      }} name="Home" component={HomeScreen} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <Entypo name="newsletter" size={focused ? 32 : 24} color={focused ? "#16247d" : "grey"} />
              {focused ? null : <Text style={{ fontSize: 12, color: focused ? "#16247d" : "grey" }}>News</Text>}
            </View>
          )
        }
      }} name="News" component={News} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <Entypo name="game-controller" size={focused ? 32 : 24} color={focused ? "#16247d" : "grey"} />
              {focused ? null : <Text style={{ fontSize: 12, color: focused ? "#16247d" : "grey" }}>Quiz</Text>}
            </View>
          )
        }
      }} name="GameScreen" component={GameScreen} />
      <Tab.Screen options={{
        headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <FontAwesome6 name="gear" size={focused ? 32 : 24} color={focused ? "#16247d" : "grey"} />
              {focused ? null : <Text style={{ fontSize: 12, color: focused ? "#16247d" : "grey" }}>Settings</Text>}
            </View>
          )
        }
      }} name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}


export default StackNavigation;
