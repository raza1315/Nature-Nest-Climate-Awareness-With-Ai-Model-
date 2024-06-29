import { View, Text, ScrollView, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import NewsSection from '../components/NewsSection'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from "react-native-animatable"
const News = () => {
    const [newzArray, setNewzArray] = useState([]);
    useEffect(() => {
        const fetchNewz = async () => {
            try {
                const newsCache = await AsyncStorage.getItem("news");
                if (newsCache) {
                    const data = JSON.parse(newsCache);
                    setNewzArray(data?.articles);
                    await AsyncStorage.removeItem("news")
                    setTimeout(async () => {
                        const res = await axios.get(`https://newsapi.org/v2/everything?q=Climate Awareness programme&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`);
                        await AsyncStorage.setItem("news", JSON.stringify(res.data));
                        setNewzArray(res.data?.articles);
                        console.log("updated!");
                    }, 2000)
                }
                else {
                    const res = await axios.get(`https://newsapi.org/v2/everything?q=Climate Awareness programme&apiKey=${process.env.EXPO_PUBLIC_API_KEY}`);
                    await AsyncStorage.setItem("news", JSON.stringify(res.data));
                    setNewzArray(res.data.articles);
                }
            } catch (err) {
                if (err.response) {
                    console.log(`Server responded with error status: ${err.response.status}`);
                    console.log(`Error data:`, err.response.data);
                } else if (err.request) {
                    console.log('No response received from server');
                } else {
                    console.log('Error while setting up the request:', err.message);
                }
                console.log(`Error in fetching the Newz: ${err}`);
            }
        }
        fetchNewz();
    }, []);
    return (
        <ImageBackground style={{ flex: 1 }} source={require("../assets/NewsBackgroundImage.jpg")} blurRadius={1} >
            <View style={{ flex: 1, paddingTop: "10%" }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 75, marginTop: 9, marginHorizontal: "auto", width: "88%", }}>
                    <Animatable.Image animation="zoomIn" duration={1300} source={require("../assets/saveClimate.jpg")} style={{ resizeMode: "cover", height: 225, width: "100%", borderRadius: 15, borderWidth: 1.7, borderColor: "rgba(0,255,0,0.3)", }} />
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text style={{ fontWeight: 500, fontSize: 33, marginTop: 15 }}>--- Latest News ---</Text>
                        <Text style={{ color: "rgba(0,0,0,0.4)", fontWeight: 500, fontSize: 13.5, marginLeft: 0, marginTop: 1.5 }}>From All Over The World</Text>
                    </View>
                    {newzArray.map((newsItem, index) => {
                        return (newsItem.title != "[Removed]" && newsItem.urlToImage != null ?
                            <View style={{ marginTop: 20, }} key={index}>
                                <NewsSection title={newsItem.title} image={newsItem.urlToImage} description={newsItem.description} source={newsItem.source.name} />
                            </View> : null
                        )
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

export default News
