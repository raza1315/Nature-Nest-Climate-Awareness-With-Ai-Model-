import { View, Text, ImageBackground, Image, TouchableOpacity, Vibration, ScrollView, Dimensions, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Animatable from "react-native-animatable"
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const GameScreen = () => {
  const navigation = useNavigation();
  const focus = useIsFocused();
  const [showAvatars, setShowAvatars] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [playerName, setPlayerName] = useState('You');
  const [air, setAir] = useState(null);
  const [carbon, setCarbon] = useState(null);
  const [earth, setEarth] = useState(null);
  const [sea, setSea] = useState(null);
  const [total, setTotal] = useState(null);
  const [rotateValue] = useState(new Animated.Value(0));
  const serverUrl = process.env.EXPO_PUBLIC_URL;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    startRotationAnimation();
  }, []);
  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 5500,
        useNativeDriver: true,
      })
    ).start();
  };
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const transformStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };
  useEffect(() => {
    if (focus) {
      setShowQuestions(false)
      setTimeout(() => {
        fetchData();
      }, 60)
      console.log("GameScreen");
    }
  }, [focus])

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    axios.get(`${serverUrl}/${userId}`).then((res) => {
      setPlayerName(res.data.name);
      setAir(res.data.airScore);
      setEarth(res.data.earthScore);
      setSea(res.data.seaScore);
      setCarbon(res.data.carbonScore);
      const totalScore = res.data.airScore + res.data.carbonScore + res.data.earthScore + res.data.seaScore;
      setTotal(totalScore);
    }).catch((err) => {
      console.log("error in getting the user id :", err);
    })
  }

  return (
    <Animatable.View animation={showQuestions ? "fadeOut" : "fadeIn"} duration={660} style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require("../assets/quizScreen.jpg")} >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
          <View style={{ marginTop: "10%", width: "92%", paddingVertical: 7, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginHorizontal: "auto" }}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <View style={{ width: 55, height: 55, backgroundColor: "white", borderRadius: 50, overflow: "hidden", borderWidth: 2, borderColor: "white" }}>
                <Image source={require("../assets/gamer.jpg")} style={{ resizeMode: "cover", height: "100%", width: "100%" }} />
              </View>
              <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5 }}>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: -5 }}>{playerName}</Text>
                <View style={{ borderRadius: 30, overflow: "hidden" }}>
                  <Text style={{ color: "white", fontSize: 15, fontWeight: 500, paddingHorizontal: 8, paddingVertical: 3.5, backgroundColor: "rgba(255,255,255,0.73)", }}>{total < 5 ? "Rookie" : total >= 5 && total <= 11 ? "Adept" : total >= 12 && total <= 15 ? "Expert" : "Master"}</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "space-around", alignItems: 'center', gap: 15, paddingVertical: 4, paddingRight: 15, paddingLeft: 6, borderRadius: 40 }}>
              <View style={{ width: 50, height: 50, backgroundColor: "orange", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                <Feather name="zap" size={31} color="white" />
              </View>
              <Text
                style={{ fontWeight: 600, fontSize: 18 }}>{total * 100}</Text>
            </View>
          </View>
          <View>
          </View>
          {/* 2nd component */}
          {showAvatars ?
            <Animatable.View animation={showAvatars ? "bounceIn" : null} duration={2100} style={{ width: "92%", height: "15%", marginTop: 15, marginHorizontal: "auto", backgroundColor: "rgba(255,255,255,0.65)", borderRadius: 20, padding: 6, justifyContent: "center", alignItems: "center", overflow: 'hidden', position: "relative", marginBottom: 8 }}>
              <TouchableOpacity onPress={() => { setShowAvatars(!showAvatars); Vibration.vibrate(50) }} style={{ zIndex: 2, width: 50, height: 50, backgroundColor: "transparent", position: "absolute", top: "0%", left: "0%", borderRadius: 30, justifyContent: "center", alignItems: "center" }}><Entypo name="cross" size={32} color="white" />
              </TouchableOpacity>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ position: "relative", borderRightColor: "white", borderRightWidth: 1 }}>
                  <Text style={{ position: "absolute", alignSelf: "center", fontWeight: 500, color: "white" }}>level 1</Text>
                  <LottieView
                    autoPlay
                    style={{ width: 200, height: "100%", }}
                    source={require('../assets/level/level1.json')}
                  />
                  <Text style={{ position: "absolute", bottom: 0, alignSelf: "center", fontWeight: 500, color: "white" }}>Rookie</Text>
                </View>
                <View style={{ position: "relative", borderRightColor: "white", borderRightWidth: 1 }}>
                  <Text style={{ position: "absolute", alignSelf: "center", fontWeight: 500, color: "white" }}>level 2</Text>
                  <LottieView
                    autoPlay
                    style={{ width: 200, height: "100%", }}
                    source={require('../assets/level/level2.json')}
                  />
                  <Text style={{ position: "absolute", bottom: 0, alignSelf: "center", fontWeight: 500, color: "white" }}>Adept</Text>
                </View>
                <View style={{ position: "relative", borderRightColor: "white", borderRightWidth: 1 }}>
                  <Text style={{ position: "absolute", alignSelf: "center", fontWeight: 500, color: "white" }}>level 3</Text>
                  <LottieView
                    autoPlay
                    style={{ width: 200, height: "100%", }}
                    source={require('../assets/level/level3.json')}
                  />
                  <Text style={{ position: "absolute", bottom: 0, alignSelf: "center", fontWeight: 500, color: "white" }}>Expert</Text>
                </View>
                <View style={{ position: "relative" }}>
                  <Text style={{ position: "absolute", alignSelf: "center", fontWeight: 500, color: "white" }}>level 4</Text>
                  <LottieView
                    autoPlay
                    style={{ width: 200, height: "100%", }}
                    source={require('../assets/level/level4.json')}
                  />
                  <Text style={{ position: "absolute", bottom: 0, alignSelf: "center", fontWeight: 500, color: "white" }}>Master</Text>
                </View>
              </ScrollView>
            </Animatable.View>
            :
            <Animatable.View animation={showAvatars ? null : "fadeIn"} duration={1300} style={{ width: "92%", height: "15%", marginTop: 15, marginHorizontal: "auto", backgroundColor: "rgba(255,255,255,0.65)", borderRadius: 20, flexDirection: "row", padding: 6, justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <TouchableOpacity onPress={() => { Vibration.vibrate(50); setShowAvatars(!showAvatars) }} activeOpacity={0.8} style={{ height: "100%", flex: 3.5, backgroundColor: "rgba(255,255,255,0.4)", borderRadius: 14, overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
                {
                  total < 5 ?
                    <LottieView
                      autoPlay
                      style={{ width: "160%", height: "100%", }}
                      source={require('../assets/level/level1.json')}
                    />
                    :
                    total >= 5 && total <= 11 ?
                      <LottieView
                        autoPlay
                        style={{ width: "160%", height: "130%", }}
                        source={require('../assets/level/level2.json')}
                      />
                      :
                      total >= 12 && total <= 15 ?
                        <LottieView
                          autoPlay
                          style={{ width: "160%", height: "130%", }}
                          source={require('../assets/level/level3.json')}
                        />
                        :
                        <LottieView
                          autoPlay
                          style={{ width: "160%", height: "130%", }}
                          source={require('../assets/level/level4.json')}
                        />
                }
              </TouchableOpacity>
              <View style={{ height: "80%", flex: 4, marginRight: 10, justifyContent: "space-between", }}>
                <Text style={{ fontSize: 23, fontWeight: 500, color: "white", }}>{total < 5 ? "level 1" : total >= 5 && total <= 11 ? "Level 2" : total >= 12 && total <= 15 ? "Level 3" : "Level 4"}</Text>
                <Text style={{ fontSize: 15, fontWeight: 500, color: "white", marginTop: -4, marginBottom: 4 }}>{total}/20 questions</Text>
                <View style={{ width: "100%", height: "10%", borderRadius: 30, borderWidth: 1.7, borderColor: "white", paddingHorizontal: 0.2 }}>
                  <View style={{ width: `${(total) * 5}%`, height: "100%", backgroundColor: "orange", borderRadius: 25 }}></View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 15, fontWeight: 500, color: "white", marginTop: -8 }}>Progress</Text>
                  <Text style={{ fontSize: 15, fontWeight: 500, color: "white", marginTop: -8 }}>{total * 5}%</Text>
                </View>
              </View>
            </Animatable.View>
          }
          {/* 3rd component */}
          <View style={{ flexGrow: 1, width: "92%", marginHorizontal: "auto", padding: 3, marginBottom: showAvatars ? windowHeight / 5 + 70 : windowHeight / 6 + hp("6%") }}>
            <Text style={{
              fontSize: 19, color: "white", fontWeight: 500, alignSelf: "center", marginBottom: 12,
            }}>~ Think Green, Quiz Clean ~</Text>
            <View style={{ flex: 1, }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => { setTimeout(() => { navigation.navigate("Ques", { name: "carbon", }) }, 200); setShowQuestions(true) }} activeOpacity={0.87} style={{ width: "47%", height: hp("35%"), backgroundColor: "white", borderRadius: 20, padding: 4, marginBottom: 8, overflow: "hidden" }}>
                  <View style={{ width: "100%", height: "50%", backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 17, overflow: "hidden", marginBottom: 10 }}>
                    <Image source={require("../assets/QuizCategory/carbon.jpg")} style={{ resizeMode: "cover", width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "rgba(100,0,255,0.5)", fontSize: hp('3%'), marginHorizontal: 6, fontWeight: 600 }}>Carbon</Text>
                  <Text style={{ color: "rgba(0,0,0,0.35)", fontSize: hp("2%"), marginHorizontal: 7, fontWeight: 500, marginTop: 4 }}>Explore Earth's carbon and climate! 🌍🔍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setTimeout(() => { navigation.navigate("Ques", { name: "air" }) }, 200); setShowQuestions(true) }} activeOpacity={0.87} style={{ width: "50.5%", height: hp("29%"), backgroundColor: "white", borderRadius: 20, padding: 4, marginBottom: 8, marginTop: 30, overflow: "hidden" }}>
                  <View style={{ width: "100%", height: "50%", backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 17, overflow: "hidden", marginBottom: 10 }}>
                    <Image source={require("../assets/QuizCategory/airpng.jpg")} style={{ resizeMode: "cover", width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "rgba(100,0,255,0.5)", fontSize: hp('3%'), marginHorizontal: 6, fontWeight: 600 }}>Air</Text>
                  <Text style={{ color: "rgba(0,0,0,0.35)", fontSize: hp('2%'), marginHorizontal: 7, fontWeight: 500, marginTop: 4 }}>Unlock air's mysteries! 🌬️🌍</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => { setTimeout(() => { navigation.navigate("Ques", { name: "sea" }) }, 200); setShowQuestions(true) }} activeOpacity={0.87} style={{ width: "50.5%", height: hp("29%"), backgroundColor: "white", borderRadius: 20, padding: 4, marginTop: 6, overflow: "hidden" }}>
                  <View style={{ width: "100%", height: "50%", backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 17, overflow: "hidden", marginBottom: 10 }}>
                    <Image source={require("../assets/QuizCategory/Sea.jpg")} style={{ resizeMode: "cover", width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "rgba(100,0,255,0.5)", fontSize: hp('3%'), marginHorizontal: 6, fontWeight: 600 }}>Sea change</Text>
                  <Text style={{ color: "rgba(0,0,0,0.35)", fontSize: hp("2%"), marginHorizontal: 7, fontWeight: 500, marginTop: 4 }}>Test your sea level rise smarts! 🌊📝</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setTimeout(() => { navigation.navigate("Ques", { name: "earth" }) }, 200); setShowQuestions(true) }} activeOpacity={0.87} style={{ width: "47%", height: hp("35%"), backgroundColor: "white", borderRadius: 20, padding: 4, marginTop: -15, overflow: "hidden" }}>
                  <View style={{ width: "100%", height: "50%", backgroundColor: "rgba(0,0,0,0.07)", borderRadius: 17, overflow: "hidden", marginBottom: 10 }}>
                    <Image source={require("../assets/QuizCategory/planet.jpg")} style={{ resizeMode: "cover", width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "rgba(100,0,255,0.5)", fontSize: hp('3%'), marginHorizontal: 6, fontWeight: 600 }}>Our home planet</Text>
                  <Text style={{ color: "rgba(0,0,0,0.35)", fontSize: hp('2%'), marginHorizontal: 7, fontWeight: 500, marginTop: 4 }}>Earth: Know Your Home 🌍</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{
              fontSize: 23.5, color: "white", fontWeight: 500, alignSelf: "center", marginTop: 8, textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 1.4, height: 1.4 }, textShadowRadius: 1,
            }}>Recycle Rush</Text>
            <Text style={{ fontSize: 16, color: "white", fontWeight: 500, textAlign: "center", textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 1.4, height: 1.4 }, textShadowRadius: 1, }}>Master waste sorting with fun and educational gameplay</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('RecycleRush'); setShowQuestions(true) }} activeOpacity={0.87} style={{ flex: 1, position: "relative", borderRadius: 20, marginTop: 8.5, marginBottom: 12, overflow: "hidden" }}>
              <Animated.View style={[transformStyle, {
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: "100%",
                width: "100%",
              }]}>
                <LinearGradient
                  style={{
                    position: 'absolute',
                    left: -100,
                    top: -150,
                    height: "400%",
                    width: "200%",
                  }}
                  colors={['rgba(100,0,255,0.71)', 'rgba(100,0,255,0.71)', "rgba(255,255,255,0.6)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.6)"]}
                >
                </LinearGradient>
              </Animated.View>
              <View style={{ height: hp("15%"), width: "100%", marginHorizontal: "auto", borderRadius: 20, borderWidth: 5, borderColor: "rgba(255,255,255,0.5)", overflow: 'hidden', position: "relative" }}>
                <Image style={{ width: "100%", height: "100%", resizeMode: "cover", opacity: 1,borderRadius:15 }} source={require("../assets/Recycle.gif")} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </Animatable.View>

  )
}

export default GameScreen
