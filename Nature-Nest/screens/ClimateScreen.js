import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const ClimateScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flexGrow: 1 }}>
      <TouchableOpacity
          onPress={()=>{navigation.navigate("Home")}}
            style={{
              position: "absolute",
              top: 50,
              left: 20,
              backgroundColor: "green",
              padding: 10,
              borderRadius: 5,
              zIndex: 1, borderRadius: 25, backgroundColor: "transparent", borderColor: "white", borderWidth: 1
            }}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ backgroundColor: "black" }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>

          <Image style={{ width: 400, height: 720, marginTop: 40 }} source={require("../assets/climate/img1.jpeg")} />
          <Image style={{ width: 400, height: 700 }} source={require("../assets/climate/img2.jpeg")} />
          <Image style={{ width: 400, height: 700 }} source={require("../assets/climate/img3.jpeg")} />
          <Image style={{ width: 350, height: 700 }} source={require("../assets/climate/img4.jpeg")} />
          <Image style={{ width: 350, height: 720, marginHorizontal: "2%" }} source={require("../assets/climate/img5.jpeg")} />
          <Image style={{ width: 360, height: 195 }} source={require("../assets/climate/img6.jpeg")} />
          <Image style={{ width: 400, height: 730 }} source={require("../assets/climate/img7.jpeg")} />
          <Image style={{ width: 400, height: 730 }} source={require("../assets/climate/img8.jpeg")} />
          <Image style={{ width: 400, height: 700, marginRight: -10, marginLeft: -12 }} source={require("../assets/climate/img9.jpeg")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ClimateScreen;
