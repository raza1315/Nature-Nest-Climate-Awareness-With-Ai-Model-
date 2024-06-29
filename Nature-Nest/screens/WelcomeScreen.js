import { View, Text, Animated, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Animatable from "react-native-animatable"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"

const WelcomeScreen = () => {
  const focus = useIsFocused();
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const serverUrl = process.env.EXPO_PUBLIC_URL;
  const handlePress = () => {
    navigation.navigate("MainTabs");
    Vibration.vibrate(80);
  }

  const letterAnimations = Array.from("Save Nature").map((letter, index) => (
    <Animated.Text
      key={index}
      style={{
        ...styles.letter,
        opacity: new Animated.Value(0),
        transform: [
          {
            translateY: new Animated.Value(-10)
          }
        ]
      }}
    >
      {letter}
    </Animated.Text>
  ));

  useEffect(() => {
    const animations = letterAnimations.map((animatedLetter, index) => {
      return Animated.sequence([
        Animated.delay(index * 100),
        Animated.parallel([
          Animated.timing(animatedLetter.props.style.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(animatedLetter.props.style.transform[0].translateY, {
            toValue: 0,
            duration: 170,
            useNativeDriver: true
          })
        ])
      ]);
    });

    Animated.stagger(100, animations).start();
    const fetchId = async () => {
      let id = await AsyncStorage.getItem('userId');
      if (!id) {
        id = Date.now().toString();
        await AsyncStorage.setItem('userId', id);
      }
      setUserId(id);
      console.log(userId);

    }
    fetchId();
    setTimeout(() => {
      axios.post(`${serverUrl}/createUser`, { userId: userId }).then(() => {
        console.log("sent successfully3");
      }).catch((err) => {
        console.log("error sending async storage token data ", err);
        console.log(serverUrl,userId);

      })
    }, 30)

    // AsyncStorage.clear();
  }, [focus, userId]);

  return (
    <View style={styles.container}>
      <Animatable.Text animation={focus ? "bounceInLeft" : null} duration={2100} style={{ fontSize: 41, fontWeight: 500, marginBottom: 40, color: "rgba(255,255,255,0.85)" }}>Nature Nest</Animatable.Text>
      <Animatable.View animation={focus ? "bounceIn" : null} duration={2800} style={styles.animationContainer}>
        <LottieView
          autoPlay
          style={styles.animation}
          source={require('../assets/natureScreen.json')}
        />
      </Animatable.View>
      <View style={styles.textContainer}>
        {focus ? letterAnimations : <></>}
      </View>
      {<Animatable.View animation={focus ? "bounceInUp" : null} duration={2700} style={{ marginVertical: 20, position: "absolute", bottom: "7.1%", }}>
        <TouchableOpacity
          onPress={handlePress}
          style={{ backgroundColor: "rgba(255,255,255,0.3)", paddingLeft: 20, paddingRight: 17, paddingBottom: 12, paddingTop: 5, borderRadius: 40, justifyContent: "center", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "rgba(0,0,0,0.7)", fontWeight: "400", fontSize: 30.5 }}>Get Started </Text>
        </TouchableOpacity>
      </Animatable.View>}
      <Animatable.Image animation={focus ? "bounceInRight" : null} duration={2100} source={require("../assets/frameTree.png")} style={{ resizeMode: "cover", height: 220, width: 390, position: "absolute", top: "-3%", right: "-3.4%", opacity: 0.8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#028a0f",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  animationContainer: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 115,
    marginBottom: 20,
  },
  animation: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flexDirection: 'row',
  },
  letter: {
    marginHorizontal: 10,
    fontSize: 42,
    color: "rgba(255,255,255,0.85)",
    fontWeight: 500,
    marginHorizontal: 2,
  },
});

export default WelcomeScreen;
