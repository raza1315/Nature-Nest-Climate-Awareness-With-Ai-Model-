import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const NewsSection = ({ title, description, image, source }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>{Vibration.vibrate(70); navigation.navigate("NewsScreen",{source,description,image,title})}}>
            <View style={{ height: 130, paddingLeft: 12, flexDirection: "row", backgroundColor: "rgba(255, 255, 255, 0.35)", borderRadius: 30, overflow: "hidden", alignItems: "center",borderRightWidth:2.5,borderBottomWidth:2.5,borderColor:"rgba(0,0,0,0.045)",}}>
                <View style={{ width: 110, height: 110, borderWidth: 0.5, borderColor: "lightgrey", borderRadius: 30, overflow: "hidden" }}>
                    <ImageBackground source={require("../assets/newsImage.jpg")} style={{ width: "100%", height: "100%" }}>
                        <Image source={{ uri: image }} style={{ resizeMode: "cover", width: "100%", height: "100%" }} />
                    </ImageBackground>
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: "rgba(255, 0, 0, 0.6)", marginBottom: 5 }}>Title:</Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={{ fontSize: 14, fontWeight: "bold", marginRight: 20, marginBottom: 3.6 }}>{title}</Text>
                    <Text numberOfLines={2} style={{ fontSize: 13, fontWeight: "bold", color: "rgba(0,0,0,0.4)", marginRight: 15 }}>Source : {source} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default NewsSection;
