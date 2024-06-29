import { View, Text, ScrollView,Image, ImageBackground, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const ComicScreen = () => {
  const navigation= useNavigation();
  useEffect(()=>{
navigation.setOptions({
  headerTitle:"", headerBackground: () => (
    <ImageBackground
      source={ require("../assets/comhdbg.jpg")}
      style={{ height: '100%' }}
    />
  ),headerLeft:()=>{
    return (
      <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",gap:10}}>
        <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Ionicons name="arrow-back-sharp" size={27} color="darkgreen" />
        </TouchableOpacity>
        <Text style={{fontSize:23,color:"darkgreen",fontWeight:500}}>Comic</Text>
        </View>
    )
  }
})
  },[])
  return (
    <ImageBackground style={{flex:1}} source={require("../assets/bg.jpg")} >

    <View style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{}}>
        <View style={{alignItems:"center",justifyContent:"center"}}>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic1.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic2.jpeg")}/>
            <Image style={{height:480,width:350,padding:7,margin:2,opacity:0.85}} source={require("../assets/comic/comic3.jpeg")}/>
            <Image style={{height:450,width:350,padding:5,margin:7,opacity:0.85}} source={require("../assets/comic/comic4.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic5.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic6.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic7.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic8.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic9.jpeg")}/>
            <Image style={{height:450,width:350,padding:7,margin:7,opacity:0.85}} source={require("../assets/comic/comic10.jpeg")}/>
        </View>
      </ScrollView>
    </View>
    </ImageBackground>
  );
};

export default ComicScreen;
