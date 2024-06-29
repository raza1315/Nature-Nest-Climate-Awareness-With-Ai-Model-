import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

const quotes = [
  "Earth needs us now.",
  "Protect our planet.",
  "Climate action required.",
  "Change starts now.",
  "Every action counts.",
  "Nature needs you.",
  "Act for future.",
  "Care for Earth.",
  "Protect Earth now.",
  "Time to act.",
  "Be eco-friendly.",
  "Green choices matter.",
  "Reduce, reuse, recycle.",
  "Earth is worth it.",
  "Protect nature's beauty.",
];
const TypingEffect = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIndex(0);
      setDisplayedText("");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index < currentQuote.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentQuote[index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, currentQuote]);

  return (
    <Text
      style={{
        fontWeight: 600,
        color: "rgba(140,210,0,1)",
        textShadowColor: "rgba(0,0,0,0.43)",
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 3,
        fontSize: hp("2.6%"),
      }}
    >
      {displayedText}
    </Text>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loc, setLoc] = useState("New Delhi");
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const dashData = async () => {
      const apiKey = process.env.EXPO_PUBLIC_WEATHER;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=${apiKey}`
      );
      console.log(res.data);
      setDashboardData(res.data);
    };
    dashData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, gap: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../assets/hsbg.jpg")}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, gap: 10, paddingBottom: 82 }}>
          {/* header */}
          <View
            style={{
              minHeight: hp("15%"),
              width: wp("100%"),
              backgroundColor: "transparent",
              paddingTop: "9%",
              overflow: "hidden"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: wp("3.2%"),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "White",
                  width: wp("100%"),
                  fontSize: hp("3.8%"),
                  fontWeight: 500,
                  color: "white",
                  position: "absolute",
                }}
              >
                Nature-Nest
              </Text>
              {/* chatbot */}
              <TouchableOpacity activeOpacity={0.74} onPress={() => { navigation.navigate("ClimaBuddy") }}>
                <View>
                  <LottieView
                    autoPlay
                    style={{
                      width: 190,
                      height: 110,
                      position: "absolute",
                      top: "35%",
                      left: "54%",
                      transform: [{ translateX: 208 }, { translateY: -55 }],
                    }}
                    source={require("../assets/botlot.json")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* dashboard */}
          <View
            style={{
              height: hp("30%"),
              width: wp("92%"),
              backgroundColor: "#7F4F24",
              marginHorizontal: "auto",
              borderRadius: 14.3,
              justifyContent: "center",
              alignItems: "center",
              padding: 18,
              flexDirection: "column",
            }}
          >
            <Text style={{ marginBottom: 15, color: "white", fontSize: hp("4%") }}>
              India,
              <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                {dashboardData?.name}
              </Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View style={{ alignItems: "center", alignItems: "center" }}>
                <Image
                  style={{
                    height: hp("5%"),
                    width: hp("5%"),
                    marginVertical: hp("1%"), marginHorizontal: hp("4%")
                  }}
                  source={require("../assets/dashboard/sun.png")}
                />
                <Text style={{ color: "white", fontWeight: "bold", fontSize: hp("2.5%"), marginHorizontal: hp("2.5%") }}>
                  {dashboardData?.main.temp}°C
                </Text>
                <Text style={{ color: "white", fontSize: hp("2.1%"), fontWeight: 500 }}>
                  Max Temp: {dashboardData?.main.temp_max}°C
                </Text>
                <Text style={{ color: "white", fontSize: hp("2.1%"), fontWeight: 500 }}>
                  Min Temp: {dashboardData?.main.temp_min}°C
                </Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center", }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: hp("1%"),
                  }}
                >
                  <Image
                    style={{
                      height: hp("3%"),
                      width: hp("3%"),
                      marginRight: 5,
                    }}
                    source={require("../assets/dashboard/wind.png")}
                  />
                  <Text style={{ color: "white", fontSize: hp("2.5%"), fontWeight: "bold" }}>
                    {dashboardData?.wind.speed} km/h
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: hp("1%"),
                  }}
                >
                  <Image style={{
                    height: hp("3%"),
                    width: hp("3%"),
                    marginRight: 10,
                  }} source={require("../assets/dashboard/drop.png")} />
                  <Text style={{ color: "white", fontSize: hp("2.5%"), fontWeight: "bold" }}>
                    {dashboardData?.main.humidity}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* quote */}
          <ImageBackground
            source={require("../assets/QuoteBg.jpg")}
            style={{
              height: hp("15%"),
              width: wp("92%"),
              marginHorizontal: "auto",
              backgroundColor: "#936639",
              borderRadius: 13,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 6,
              paddingHorizontal: "2%",
            }}
          >
            <MaterialCommunityIcons
              name="format-quote-open"
              size={30}
              color="rgba(140,200,0,1)"
              style={{ position: "absolute", left: 26, top: 15 }}
            />
            <Text
              style={{
                color: "white",
                fontWeight: 500,
                marginHorizontal: "auto",
                fontSize: hp("2.5%"),
                paddingHorizontal: "10%",
              }}
              numberOfLines={3}
            >
              <View style={{}}>
                <TypingEffect />
              </View>
            </Text>
          </ImageBackground>
          {/* container of news and quiz */}
          <View
            style={{
              width: wp("92%"),
              marginHorizontal: "auto",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* news */}
            <TouchableOpacity
              activeOpacity={0.74}
              onPress={() => {
                navigation.navigate("News");
              }}
            >
              <View
                style={{
                  height: hp("23%"),
                  width: wp("44.8%"),
                  backgroundColor: "pink",
                  borderRadius: 24,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  backgroundColor: "#b6ad90",
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    width: 200,
                    height: 120,
                    marginBottom: -8,
                  }}
                  source={require("../assets/earth.json")}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: 14,
                    paddingHorizontal: 5,
                    alignSelf: "center",
                  }}
                >
                  Uncover climate{" "}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 500,
                    fontSize: 14,
                    paddingHorizontal: 5,
                    paddingBottom: 10,
                    alignSelf: "center",
                  }}
                >
                  insights 🌍🔍{" "}
                </Text>
              </View>
            </TouchableOpacity>
            {/* quiz */}
            <TouchableOpacity
              activeOpacity={0.74}
              onPress={() => navigation.navigate("GameScreen")}
            >
              <View
                style={{
                  height: hp("19%"),
                  width: wp("42.8%"),
                  backgroundColor: "#A68A64",
                  borderRadius: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    width: 200,
                    height: 75,
                  }}
                  source={require("../assets/quiz.json")}
                />
                <Text style={{ fontSize: 18, color: "white", fontWeight: 500 }}>
                  Take a quiz
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Ai Model */}
          <View
            style={{
              minHeight: hp("20%"),
              width: wp("86%"),
              backgroundColor: "#4CAF50",
              marginHorizontal: "auto",
              justifyContent: "center",
              alignItems: "center",
              padding: "2%",
              flexDirection: "column",
              position: "relative"
            }}
          >
            <FontAwesome style={{ position: "absolute", top: -20, right: -12, transform: [{ rotate: "30deg" }], zIndex: 3 }} name="star" size={55} color="yellow" />
            <View style={{ width: "105%", height: "110%", position: "absolute", overflow: "hidden" }}>
              <Image style={{ width: "100%", height: "100%", resizeMode: "cover", zIndex: -1, borderRadius: 14 }} source={require("../assets/nature.gif")} />
            </View>
            <Text style={{
              color: "white",
              fontWeight: "bold",
              fontSize: hp("2.3%"),
              marginBottom: -3,
            }}>
              TRY OUR

            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: hp("3%"),
                marginBottom: 10,
                textAlign: "center"
              }}
            >
              Waste Segregation AI Model
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#2E7D32",
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("Classifier")}
            >
              <Text style={{ color: "white", fontWeight: 500 }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
          {/* text */}
          <View
            style={{
              width: wp("92%"),
              marginHorizontal: "auto",
              paddingVertical: 5,
              marginTop: 1,
              marginBottom: -1.5,
            }}
          >
            <Text
              style={{
                color: "white",
                textShadowColor: "rgba(0,0,0,0.45)",
                textShadowOffset: { width: 1.5, height: 1.5 },
                textShadowRadius: 1,
                fontSize: hp("2.4%"),
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              WHY CLIMATE CHANGE MATTERS
            </Text>
          </View>
          {/* climate */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              navigation.navigate("Climate");
            }}
          >
            <View
              style={{
                height: hp("13%"),
                width: wp("92%"),
                marginHorizontal: "auto",
              }}
            >
              <Image
                resizeMode="cover"
                source={require("../assets/pollution.jpeg")}
                style={{ width: "100%", height: "100%", borderRadius: 14 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "white",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  marginHorizontal: "auto",
                  top: 26,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 10,
                }}
              >
                The Story of Climate Change
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  textAlign: "center",
                  position: "absolute",
                  bottom: 20,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 10,
                }}
              >
                Our Space Oasis is over-heating
              </Text>
            </View>
          </TouchableOpacity>
          {/* comic */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              navigation.navigate("Comic");
            }}
          >
            <View
              style={{
                height: hp("13%"),
                width: wp("92%"),
                marginHorizontal: "auto",
              }}
            >
              <Image
                source={require("../assets/earth1.jpeg")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 14,
                  opacity: 0.88,
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: "white",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  marginHorizontal: "auto",
                  top: 30,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 10,
                }}
              >
                A Comic of Worldly Proportions
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  textAlign: "center",
                  position: "absolute",
                  bottom: 16,
                  left: 0,
                  right: 0,
                  paddingHorizontal: 10,
                }}
              >
                We can make a difference together
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: wp("92%"),
              marginHorizontal: "auto",
              paddingVertical: 5,
              marginTop: 1,
              marginBottom: -1.5,
            }}
          >
            <Text
              style={{
                color: "white",
                textShadowColor: "rgba(0,0,0,0.55)",
                textShadowOffset: { width: 1.5, height: 1.5 },
                textShadowRadius: 1,
                fontSize: hp("2.4%"),
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              TAKE HELP FROM ClimaBuddy
            </Text>
          </View>
          {/* bot */}
          <TouchableOpacity
            activeOpacity={0.75} onPress={() => { navigation.navigate("ClimaBuddy") }}
          >
            <View
              style={{
                height: hp("13%"),
                width: wp("92%"),
                marginHorizontal: "auto", position: "relative"
              }}
            >
              <Image
                source={require("../assets/bot1.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 14,
                  opacity: 0.88,
                }}
              />
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 140,
                  position: "absolute",
                  top: "40%",
                  left: "50%",
                  transform: [{ translateX: -100 }, { translateY: -60 }],
                }}
                source={require("../assets/botlot.json")}
              />

            </View>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default HomeScreen;
