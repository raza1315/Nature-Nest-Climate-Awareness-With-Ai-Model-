import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const NewsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { description, image, source, title } = route.params;
    return (
        <ImageBackground style={{ flex: 1 }} source={require("../assets/NewsBackgroundImage2.jpg")} blurRadius={10}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ position: "absolute", top: "5.5%", left: "4.5%", zIndex: 2, width: 50, height: 50, backgroundColor: "rgba(0,0,0,0.4)", opacity: 0.9, borderRadius: 23, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" }} onPress={() => { navigation.navigate("News") }}>
                    <Ionicons name="arrow-back" size={36} color="rgba(255,255,255,1)" />
                </TouchableOpacity>
                <Image source={{ uri: image }} style={{ width: "95%", height: "40%", resizeMode: "cover", borderRadius: 30, marginHorizontal: "auto", marginTop: "10%", borderWidth: 1, borderColor: "rgba(255,255,255,0.35)" }} />
                <View style={{ width: "88%", flex: 1, backgroundColor: "white", marginHorizontal: "auto", borderTopRightRadius: 30, borderTopLeftRadius: 30, marginTop: "-16%", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 15, borderWidth: 0.4, borderColor: "rgba(0,0,0,0.1)" }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 18 }}>
                        <Text style={{ fontSize: 28, fontWeight: "bold", }}>{title}</Text>
                        <Text style={{ color: "red", fontSize: 16, fontWeight: 400, alignSelf: "flex-start" }}> Source : {source}</Text>
                        <View style={{ width: "100%", height: 0.6, backgroundColor: "rgba(0,0,0,0.2)", marginVertical: -7 }}></View>
                        <Text style={{ color: "rgba(0,0,0,0.5)", fontSize: 20, fontWeight: 400, }}>{description}</Text>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>

    )
}

export default NewsScreen