import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState,useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from"react-native-animatable"
const Result = ({name}) => {
  const [score, setScore] = useState(null);
  const navigation = useNavigation();
  const serverUrl=process.env.EXPO_PUBLIC_URL;

  useEffect(()=>{
    setTimeout(()=>{
      fetchData();
    },50)
  },[])

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    axios.get(`${serverUrl}/${userId}`).then((res) => {
      console.log(res.data);
      const totalScore = res.data[name+"Score"]
      setScore(totalScore);
    }).catch((err) => {
      console.log("error in getting the Score :", err);
    })
  }
  return (
    <Animatable.View animation="fadeIn" duration={1000} style={{ flex: 1 }}>
      <Image source={require("../assets/resBG.jpg")} style={{ opacity: 0.5 }} />

      <LottieView
        autoPlay
        style={{
          width: 360,
          height: 600,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
        source={require("../assets/party.json")}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          top: hp("30%"),
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp("5.3%"),
            textAlign: "center",
            marginBottom: 10,
            color: "white",
            fontWeight: 600,
          }}
        >
          Score: {score}/5
        </Text>
        <Text style={{ fontSize: hp("3.3%"), color: "white", fontWeight: 500 }}>
          {score > 2 ? "Kudos to You!!!" : "Keep Practicing!!!"}
        </Text>
        <Text
          style={{
            fontSize: hp("3.1%"),
            color: "white",
            textAlign: "center",
            padding: hp("1.7%"),
            margin: wp("1.2%"),
          }}
        >
          {score > 2
            ? "Well done! I see you've a great knowlege about climate."
            : "Good effort! Practice makes perfect."}
        </Text>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("GameScreen")}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 14,
              marginHorizontal: "auto",
              width: "28%",
              paddingHorizontal: 1,
              paddingVertical: 1,
            }}  
          >
            <Text
              style={{
                fontSize: hp("3.1%"),
                color: "rgba(138,43,226,0.65)",
                textAlign: "center",
                padding: 6,
                margin: wp("1.2%"),
                fontWeight: 500,
              }}
            >
              Done
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export default Result;
