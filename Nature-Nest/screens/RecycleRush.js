import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, PanResponder, ScrollView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import LottieView from 'lottie-react-native';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import dataList from './RecycleRush/data';

const RecycleRush = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [iter, setIter] = useState(0);
    const score = useRef(0);
    const [greenOpen, setGreenOpen] = useState(false);
    const [blueOpen, setBlueOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showTick, setShowTick] = useState(false);
    const [showCross, setShowCross] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    const rotateValue = useRef(new Animated.Value(0)).current;
    const blueBinOpen = useRef(null);
    const blueBinClose = useRef(null);
    const greenBinOpen = useRef(null);
    const greenBinClose = useRef(null);
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        startRotationAnimation();
        const randomSort = (array) => {
            return array.sort(() => Math.random() - 0.5000);
        };
        const shuffledData = randomSort(dataList);
        setData(shuffledData);
    }, []);
    useEffect(() => {
        let bgSound;
        const loadSound = async () => {
            try {
                bgSound = new Audio.Sound();
                await bgSound.loadAsync(require("../assets/sound.wav"));
                await bgSound.setIsLoopingAsync(true);
                await bgSound.playAsync();
            } catch (error) {
                console.error("Failed to load and play the sound", error);
            }
        };

        loadSound();
        // Cleanup on component unmount
        return () => {
            if (bgSound) {
                bgSound.unloadAsync();
            }
        };
    }, []);
    const tryAgain = () => {
        if (iter >= 9) {
            setPlayAgain(true);
            setIter(0);
        }
        return;
    }

    const startRotationAnimation = () => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            })
        ).start();
    };

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
            if (gesture.dy > 280 && gesture.dx > 60) {
                if (blueBinClose.current && blueBinOpen.current) {
                    blueBinClose.current.setNativeProps({ opacity: 0 });
                    blueBinOpen.current.setNativeProps({ opacity: 1 });
                }
            } else if (gesture.dy > 280 && gesture.dx < -52) {
                if (greenBinClose.current && greenBinOpen.current) {
                    greenBinClose.current.setNativeProps({ opacity: 0 });
                    greenBinOpen.current.setNativeProps({ opacity: 1 });
                }
            }
            else {
                blueBinClose.current.setNativeProps({ opacity: 1 });
                blueBinOpen.current.setNativeProps({ opacity: 0 });
                greenBinClose.current.setNativeProps({ opacity: 1 });
                greenBinOpen.current.setNativeProps({ opacity: 0 });
            }
            Animated.event(
                [
                    null,
                    {
                        dy: pan.y,
                        dx: pan.x,
                    },
                ],
                { useNativeDriver: false }
            )(e, gesture);
        },
        onPanResponderRelease: (e, gesture) => {
            if (gesture.dy > 280 && gesture.dx > 60) {
                if (data[iter]?.bin == "blue") {
                    setShowTick(true);
                    score.current += 1;
                    setTimeout(() => { setShowTick(false) }, 740);
                }
                else {
                    setShowCross(true);
                    setTimeout(() => { setShowCross(false) }, 740);
                }
                if (blueBinClose.current && blueBinOpen.current) {
                    setTimeout(() => {
                        blueBinClose.current.setNativeProps({ opacity: 1 });
                        blueBinOpen.current.setNativeProps({ opacity: 0 });
                    }, 470)
                    setTimeout(() => {
                        setIter(prev => prev + 1);
                        tryAgain();

                    }, 780)
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 460,
                        useNativeDriver: true
                    }).start();
                }
            } else if (gesture.dy > 280 && gesture.dx < -52) {
                if (data[iter]?.bin == "green") {
                    setShowTick(true);
                    score.current += 1;
                    setTimeout(() => { setShowTick(false) }, 740);
                }
                else {
                    setShowCross(true);
                    setTimeout(() => { setShowCross(false) }, 740);
                }
                if (greenBinClose.current && greenBinOpen.current) {
                    setTimeout(() => {
                        greenBinClose.current.setNativeProps({ opacity: 1 });
                        greenBinOpen.current.setNativeProps({ opacity: 0 });
                    }, 470);
                    setTimeout(() => {
                        setIter(prev => prev + 1);
                        tryAgain();
                    }, 780)
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 460,
                        useNativeDriver: true
                    }).start();
                }
            }
            else {
                Animated.spring(
                    pan,
                    {
                        toValue: { x: 0, y: 0 },
                        friction: 3,
                        tension: 15,
                        useNativeDriver: true,
                    }
                ).start();
            }
            setTimeout(() => {

                Animated.spring(
                    pan,
                    {
                        toValue: { x: 0, y: 0 },
                        friction: 3,
                        tension: 15,
                        useNativeDriver: true,
                    }
                ).start();
            }, 500);
            setTimeout(() => {
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true
                }).start();
            }, 800)
        }
    });

    const scale = pan.y.interpolate({
        inputRange: [-200, 0, 350],
        outputRange: [0.4, 1, 0.4],
        extrapolate: 'clamp'
    });

    return (
        <View style={{ flex: 1 }}>
            {/* Game Name*/}
            <Text style={{ color: "white", fontSize: hp("3.5%"), fontWeight: 500, position: "absolute", top: hp("6.7%"), alignSelf: "center", textShadowRadius: 5, textShadowColor: "white", zIndex: 98 }}>Recycle-Rush</Text>
            {/* Info View */}
            {showInfo && <BlurView intensity={30} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", backgroundColor: "blueviolet", zIndex: 100, gap: 10 }} >
                <Text style={{ color: "white", fontSize: hp("3.5%"), fontWeight: 500, textShadowRadius: 6, textShadowColor: "white", marginBottom: -10 }}>How To Play</Text>
                <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 500, textShadowRadius: 6, textShadowColor: "white", }}>Recycle Rush ♻️</Text>
                <View style={{ width: "85%", height: "63%", backgroundColor: "white", borderRadius: 10, overflow: "hidden" }}>
                    {/* Content */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, padding: 15, gap: 15 }}>
                        <View style={{ gap: 5 }}>
                            <Text style={{ color: "#4cbb17", fontSize: hp("3.5%"), fontWeight: 500, textDecorationColor: "#4cbb17", textDecorationLine: "underline" }}>Green Bin:</Text>
                            <View style={{ flexDirection: "row", alignSelf: "center", gap: 3 }}>
                                <Image source={require("../assets/Recycle/closeGreenBin.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
                                <Image source={require("../assets/Recycle/openGreenBin.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>The green bin is designated for organic waste, which includes materials that can decompose naturally and be used for composting.</Text>
                        </View>
                        <View style={{ gap: 5 }}>
                            <Text style={{ color: "rgba(0,100,255,1)", fontSize: hp("3.5%"), fontWeight: 500, textDecorationColor: "#4cbb17", textDecorationLine: "underline" }}>Blue Bin:</Text>
                            <View style={{ flexDirection: "row", alignSelf: "center", gap: 3 }}>
                                <Image source={require("../assets/Recycle/closeBlueBin.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
                                <Image source={require("../assets/Recycle/openBlueBin.png")} style={{ height: 70, width: 70, resizeMode: "contain" }} />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>The blue bin is intended for recyclable materials, which can be processed and reused to make new products.</Text>
                        </View>
                        <View style={{ gap: 7 }}>
                            <Text style={{ color: "orange", fontSize: hp("3.5%"), fontWeight: 500, textDecorationColor: "orange", textDecorationLine: "underline" }}>How To Play:</Text>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }} >1. An item with its image appears in the center.</Text>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>2. Hold and drag the item to the appropriate bin.</Text>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>3. Receive Feedback: Get immediate feedback on whether your choice was correct.</Text>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>4. Earn points for correct placements.</Text>
                            <Text style={{ fontWeight: 400, fontSize: hp("2.5%") }}>5. Use feedback to improve your sorting skills.</Text>
                        </View>
                    </ScrollView>
                </View>
            </BlurView>}
            {/* Score Board*/}
            {playAgain && <BlurView intensity={30} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", backgroundColor: "blueviolet", zIndex: 97, gap: 10 }} >
                <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 600, textShadowRadius: 3, textShadowColor: "white", }}>Score Board</Text>
                <View style={{ width: "85%", height: "57%", alignItems: "center", paddingVertical: "27%", paddingHorizontal: 10, backgroundColor: "white", borderRadius: 10, gap: 5, overflow: "hidden", position: "relative" }}>
                    {/* Content */}
                    <Image source={require("../assets/resBG.jpg")} style={{ position: "absolute", opacity: 1 }} />
                    <LottieView
                        autoPlay
                        style={{
                            width: 360,
                            height: 600,
                            position: "absolute",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0.85
                        }}
                        source={require("../assets/party.json")}
                    />
                    <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 600 }}>Your Score:</Text>
                    <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 600 }}>{score.current}/10</Text>
                    <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 600 }}>Play Again?</Text>
                    <View style={{ flexDirection: "row", marginTop: hp("6%"), gap: 20 }}>
                        <TouchableOpacity onPress={() => { setPlayAgain(false); score.current = 0; }} activeOpacity={0.8} style={{ paddingVertical: 10, paddingHorizontal: 22, backgroundColor: "white", borderRadius: 13 }}>
                            <Text style={{ color: "#4cbb17", fontSize: hp("4%"), fontWeight: 600 }}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("GameScreen")} activeOpacity={0.8} style={{ paddingVertical: 10, paddingHorizontal: 25, backgroundColor: "white", borderRadius: 13 }}>
                            <Text style={{ color: "#e3242b", fontSize: hp("4%"), fontWeight: 600 }}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>}
            {/* Correct or Incorrect */}
            {/* Correct */}
            {showTick && <Animatable.View animation={"bounceIn"} style={{ height: 70, width: "60%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "white", gap: 15, position: "absolute", top: "50%", zIndex: 97, alignSelf: "center", borderRadius: 15 }}>
                <Text style={{ fontSize: 18 }}>Correct</Text>
                <Image style={{ width: 50, height: 50 }} source={require("../assets/Recycle/tick.png")} />
                <Text style={{ fontSize: 18 }}>+1</Text>
            </Animatable.View>}
            {/* Incorrect */}
            {showCross && <Animatable.View animation={"bounceIn"} style={{ height: 70, width: "60%", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "white", gap: 15, position: "absolute", top: "50%", zIndex: 97, alignSelf: "center", borderRadius: 15 }}>
                <Text style={{ fontSize: 18 }}>Incorrect</Text>
                <Image style={{ width: 50, height: 50 }} source={require("../assets/Recycle/cross.png")} />
                <Text style={{ fontSize: 18 }}>+0</Text>
            </Animatable.View>}
            {/* Back Button */}
            <TouchableOpacity activeOpacity={0.71} onPress={() => { navigation.navigate("GameScreen") }} style={{ width: 50, height: 50, position: "absolute", backgroundColor: "rgba(255,255,255,0.97)", borderRadius: 50, alignItems: "center", justifyContent: 'center', left: wp("3.2%"), top: hp("6.3%"), zIndex: 100 }}>
                <Ionicons name="arrow-back-outline" size={30} color="rgba(0,0,0,0.9)" />
            </TouchableOpacity>
            {/* Information Button */}
            <TouchableOpacity onPress={() => setShowInfo(!showInfo)} activeOpacity={0.7} style={{ width: 38, height: 38, justifyContent: "center", alignItems: "center", position: "absolute", right: wp("3.5%"), top: hp("6.6%"), borderRadius: 10, zIndex: 100, backgroundColor: "white" }}>
                {showInfo ? <Entypo name="cross" style={{ fontSize: hp("4%") }} color="black" /> : <Ionicons style={{ fontSize: hp("4%") }} name="information-sharp" color="black" />}
            </TouchableOpacity>
            {/* main */}
            <ImageBackground source={require("../assets/quizScreen.jpg")} style={{ flex: 1, position: "relative", paddingTop: hp("6.3%"), paddingBottom: hp("2%") }}>
                {/* Item Name */}
                <Text style={{ color: "white", fontSize: hp("4%"), fontWeight: 500, textAlign: "center", textShadowColor: "rgba(255,255,255,0.7)", textShadowRadius: 8, textShadowOffset: { height: 1.5, width: 1.5 }, marginTop: hp("7%"), marginBottom: 5 }}>{data[iter]?.name}</Text>
                {/* Movable Image */}
                <Animated.View {...panResponder.panHandlers} style={{
                    transform: [
                        { translateX: pan.x },
                        { translateY: pan.y },
                        { scale }
                    ],
                    height: 200, width: 210, justifyContent: "center", alignItems: "center", marginHorizontal: "auto", borderRadius: 7, overflow: "hidden", zIndex: 90
                }}>
                    <Animated.View style={{
                        position: 'absolute',
                        height: "150%",
                        width: "150%",
                        opacity: opacity,
                        transform: [{ rotate: rotateInterpolate }]
                    }}>
                        <LinearGradient
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: "100%",
                                width: "100%",
                            }}
                            colors={['#3acfd5', "rgba(255,255,255,0.6)", "rgba(255,255,255,0.6)", "#3a4ed5", 'rgba(100,0,255,0.71)']}
                        />
                    </Animated.View>
                    <Animated.Image style={{ width: "93.5%", height: "93.5%", resizeMode: "cover", borderRadius: 5, opacity: opacity, backgroundColor: "white" }} source={data[iter]?.image} />
                </Animated.View>
                {/* Score */}
                <Text style={{ color: "white", fontSize: hp("3%"), fontWeight: 500, textAlign: "center", marginTop: 8, textShadowRadius: 5, textShadowColor: "rgba(255,255,255,0.8)", zIndex: 6 }}>Score: {score.current}/10</Text>
                {/* Dustbins */}
                {/* Blue Dust Bin */}
                <Animated.Image ref={blueBinOpen} source={require("../assets/Recycle/openBlueBin.png")} style={{ height: 250, width: 150, position: "absolute", bottom: 10, right: 20, transform: [{ rotateY: "180deg" }, { scale: 1.08 }], opacity: blueOpen ? 1 : 0 }} />
                <Animated.Image ref={blueBinClose} source={require("../assets/Recycle/closeBlueBin.png")} style={{ height: 250, width: 150, position: "absolute", bottom: 10, right: 20, transform: [{ rotateY: "180deg" }], opacity: blueOpen ? 0 : 1 }} />
                {/* Green Dust Bin */}
                <Image ref={greenBinOpen} source={require("../assets/Recycle/openGreenBin.png")} style={{ height: 250, width: 150, position: "absolute", opacity: greenOpen ? 1 : 0, bottom: 10, left: 20, transform: [{ scale: 1.08 }] }} />
                <Image ref={greenBinClose} source={require("../assets/Recycle/closeGreenBin.png")} style={{ height: 250, width: 150, position: "absolute", bottom: 10, left: 20, opacity: greenOpen ? 0 : 1 }} />
            </ImageBackground>
        </View>
    );
}

export default RecycleRush;
