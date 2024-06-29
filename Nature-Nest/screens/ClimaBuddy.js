import { View, Text, ScrollView, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';


const ClimaBuddy = () => {
    const navigation = useNavigation();
    const [promptVal, setPromptVal] = useState("");
    const [sent, setSent] = useState(false);
    const [reply, setReply] = useState("Hey I am ClimaBuddy Your Assistant , How May I Help You ?");
    const handleSend = () => {
        setSent(true);
        setTimeout(() => {
            setPromptVal('');
        }, 10);
    }
    useEffect(() => {
        navigation.setOptions({
            headerTitle: "", headerBackground: () => (
                <ImageBackground
                    source={require("../assets/bot.jpg")}
                    style={{ height: '100%' }}
                />
            ), headerLeft: () => {
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('MainTabs') }}>
                            <Ionicons name="arrow-back-sharp" size={27} color="rgba(0,0,0,0.6)" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 23, color: "rgba(0,0,0,0.6)", fontWeight: 500 }}>ClimaBuddy</Text>
                    </View>
                )
            }
        })
    }, [])

    useEffect(() => {
        const aiReply = async () => {
            try {
                if (sent) {
                    const apiKey = process.env.EXPO_PUBLIC_GEMINI;
                    const genAI = new GoogleGenerativeAI(apiKey);
                    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                    const prompt = `"You are Climate Bot. You can only respond to climate-related questions (water, air, planet, weather) in plain text. Do not use any asterisks (**) in your replies. Emojis are allowed where appropriate. For non-climate-related questions, respond with 'I am a Climate Expert'."`;
                    const result = await model.generateContent(promptVal + prompt);
                    const response = await result.response;
                    const text = response.text();
                    setReply(text);
                    console.log(text);
                    setSent(false)
                }
            }
            catch (err) {
                console.log("Error in generating reply : ", err);
            }
        }
        aiReply();
    }, [sent])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }} source={require("../assets/bot.jpg")} >
                <View style={{ flex: 1, flex: 1, paddingTop: hp("2%"), paddingBottom: hp("2.6%"), paddingHorizontal: wp("3.8%"), gap: 10 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: "rgba(0,0,0,0.075)", borderRadius: 12.3, overflow: "hidden", paddingVertical: 15, paddingHorizontal: 20 }}>
                        <View style={{ gap: 10 }}>
                            <Text style={{ textAlign: "center", color: "white", fontWeight: 500, fontSize: hp("2.5%") }}>{reply}</Text>
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, }}>
                        <TextInput value={promptVal} onChangeText={(text) => { setPromptVal(text) }} style={{ flex: 1, color: "black", backgroundColor: "white", fontSize: hp("2.3%"), borderRadius: 15, borderWidth: 1, borderColor: "rgba(0,0,0,0.2)", paddingHorizontal: 12, paddingVertical: 10 }} placeholder='Search Climate News' />
                        <TouchableOpacity onPress={handleSend} activeOpacity={0.5} style={{ paddingHorizontal: 10, paddingVertical: 10, borderRadius: 14, backgroundColor: "rgba(0,0,0,0.1)", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: "rgba(0,0,0,0.6)", fontSize: hp("2.35%"), fontWeight: 500 }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    )
}
export default ClimaBuddy