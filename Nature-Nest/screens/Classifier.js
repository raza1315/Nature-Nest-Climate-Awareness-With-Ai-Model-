import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Image, Animated, ScrollView, TouchableOpacity, Vibration, Platform, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ActionButtons from '../components/ActionButtons';
import { Entypo } from '@expo/vector-icons';

const Classifier = () => {
    const navigation = useNavigation();
    const [imgUri, setImgUri] = useState("");
    const [classification, setClassification] = useState(null);
    const [classificationObject, setClassificationObject] = useState(null);
    const [labels, setLabels] = useState([]);
    const [recycleRes, setRecycleRes] = useState(null);
    const [identifyFlag, setIdentifyFlag] = useState(true);
    const [labelFlag, setLabelFlag] = useState(false);
    const [recycleFlag, setRecycleFlag] = useState(false);
    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const startRotationAnimation = () => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 5500,
                useNativeDriver: true,
            })
        ).start();
    };

    useEffect(() => {
        startRotationAnimation();
    }, []);

    // option buttons Functions :
    // clear
    const clearData = () => {
        setClassification(null);
        setRecycleRes(null);
        setLabels([]);
    }

    return (
        <SafeAreaProvider>
            <StatusBar translucent={true} barStyle="light-content" backgroundColor="transparent" />
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {/* model name and back button */}
                    <View style={{ width: "100%", justifyContent: "center", position: 'relative' }}>
                        <Text style={styles.heading}>Waste-Classifier</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Home");
                            if (Platform.OS == "android") {
                                Vibration.vibrate(50);
                            }
                            else {
                                Vibration.vibrate(10);
                            }
                        }} activeOpacity={0.7} style={{ position: "absolute", left: 10 }}>
                            <Ionicons name="arrow-back-sharp" size={32} color="darkorange" />
                        </TouchableOpacity>
                    </View>
                    {/* Input Tag */}
                    <View style={styles.inpTag}>
                        <Text style={styles.inpTagText}>Input</Text>
                    </View>
                    {/* Image Input */}
                    <View style={styles.imgContainer}>
                        <Animated.View style={{ ...styles.gradientContainer, transform: [{ rotate: rotateInterpolate }] }}>
                            <LinearGradient
                                style={{ ...styles.gradient }}
                                colors={["white", "white", "white", "orange", "orange", "white", "white", "white"]}
                            />
                        </Animated.View>
                        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 4.5, backgroundColor: "white" }}>
                            {imgUri == "" ?
                                <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
                                    <Text style={{ color: "grey", fontSize: 17 }}>Choose or Capture Image </Text>
                                    <Entypo name="image" size={28} color="grey" />
                                </View>
                                :
                                <Image style={styles.img} source={{ uri: imgUri }} />}
                        </View>
                    </View>
                    {/* Output Tag */}
                    <View style={{ ...styles.inpTag, marginTop: 10 }}>
                        <Text style={styles.inpTagText}>Output</Text>
                    </View>
                    {/* Output Area */}
                    <View style={styles.scrollContainer}>
                        <View style={styles.options}>
                            <TouchableOpacity style={{ ...styles.optionsBtn, backgroundColor: identifyFlag ? "rgba(0,0,0,0.25)" : "transparent" }} onPress={() => {
                                setLabelFlag(false);
                                setRecycleFlag(false);
                                setIdentifyFlag(true);
                            }}>
                                <Text style={{ color: identifyFlag ? "white" : "grey", fontWeight: 400, fontSize: 14 }}>Identify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.optionsBtn, backgroundColor: labelFlag ? "rgba(0,0,0,0.25)" : "transparent" }} onPress={() => {
                                setRecycleFlag(false);
                                setIdentifyFlag(false);
                                setLabelFlag(true);
                            }}>
                                <Text style={{ color: labelFlag ? "white" : "grey", fontWeight: 400, fontSize: 14 }}>Labels</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.optionsBtn, backgroundColor: recycleFlag? "rgba(0,0,0,0.25)" : "transparent" }} onPress={() => {
                                setLabelFlag(false);
                                setIdentifyFlag(false);
                                setRecycleFlag(true);
                            }}>
                                <Text style={{ color: recycleFlag ? "white" : "green", fontWeight: 400, fontSize: 14 }}>Recycle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...styles.optionsBtn, borderRightWidth: 0 }} onPress={() => { setImgUri(""); clearData() }}>
                                <Text style={{ color: "red", fontWeight: 400, fontSize: 14 }}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrolling}>
                            {/* identify object */}
                            {identifyFlag && imgUri && classification && labelFlag == false && recycleFlag == false &&
                                <View >
                                    <Text style={{ fontSize: 25, color: "grey", textAlign: "center" }}>Predicted Class</Text>
                                    <Text style={{ fontSize: 30, color: "orange", textAlign: "center" }}>{classification != "" ? classification : "Cannot Classify"}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 25, color: "grey", textAlign: "center", marginBottom: 2 }}>Confidence</Text>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Aerosols:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Aerosols.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Plastic:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Plastic.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Metal:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Metal.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Paper:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Paper.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Organic:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Organic.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Cardboard:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Cardboard.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Clothes:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.Clothes.confidence}</Text>
                                    <View style={{ width: "88%", height: 0.8, marginVertical: 5, alignSelf: "center", backgroundColor: "grey" }}></View>
                                    <Text style={{ fontSize: 22, color: "grey", textAlign: "center", }}>Glass Bottle:</Text>
                                    <Text style={{ fontSize: 18, color: "grey", textAlign: "center", }}>{classificationObject?.["Glass bottle"].confidence}</Text>

                                </View>
                            }
                            {/* recycle object */}
                            {recycleFlag && imgUri && recycleRes && labelFlag == false && identifyFlag == false &&
                                <>
                                    <Text style={{ color: "grey", fontSize: 25, textAlign: "center", }}>The item is:</Text>
                                    <Text style={{ color: recycleRes == "Recyclable" ? "green" : recycleRes == "Non-Recyclable" ? "red" : "orange", fontSize: 35, textAlign: "center", }}> {recycleRes}</Text>
                                </>
                            }
                            {/* label object */}
                            {labelFlag && imgUri && labels != "" && identifyFlag == false && recycleFlag == false && (
                                <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 25, fontWeight: 500, textAlign: "center" }}>Labels By Google Vision Api:</Text>
                                    {labels.map((item, index) => (
                                        <Text style={{ color: 'grey', fontSize: 18, fontWeight: 400, marginTop: 5 }} key={index}>{item.description}</Text>
                                    ))}
                                </View>
                            )}
                            {/* if no image */}
                            {labelFlag && labels == "" && <Text style={{ color: "grey", fontSize: 20, textAlign: "center", }}>Press Label Button To Get Labels</Text>}
                            {identifyFlag && !classification && <Text style={{ color: "grey", fontSize: 20, textAlign: "center", }}>Press Identify Button To Get Classes</Text>}
                            {recycleFlag && !recycleRes && <Text style={{ color: "grey", fontSize: 20, textAlign: "center", }}>Press Recycle Icon </Text>}
                        </ScrollView>
                    </View>
                    {/* All the Action Buttons */}
                    <ActionButtons imgUri={imgUri} setImgUri={setImgUri} classification={classification} setClassification={setClassification} setLabels={setLabels} setRecycleRes={setRecycleRes} setClassificationObject={setClassificationObject} clearData={clearData} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        gap: 5,
        backgroundColor: "transparent",
    },
    heading: {
        color: "darkorange",
        fontSize: hp("4%"),
        fontWeight: "500",
        alignSelf: "center"
    },
    inpTag: {
        height: 32,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange",
        marginLeft: "4%",
        marginBottom: 1,
        marginTop: 10,
    },
    inpTagText: {
        color: "white",
        fontSize: 16,
        fontWeight: "400",
    },
    imgContainer: {
        width: "85%",
        height: 200,
        alignSelf: "center",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        padding: 4,
        overflow: "hidden",
    },
    img: {
        height: "93%",
        width: "93%",
        resizeMode: "cover",
        borderRadius: 4.5,
        backgroundColor: "white",
        zIndex: 2
    },
    gradientContainer: {
        width: "200%",
        height: "205%",
        left: "-50%",
        top: "-50%",
        borderRadius: 5,
        transform: [{ translateX: 0 }, { translateY: 0 }],
        position: "absolute",

    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    scrollContainer: {
        width: "100%",
        height: "39%",
        overflow: "hidden"
    },
    scrolling: {
        flexGrow: 1,
        width: "85%",
        alignSelf: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 1.5,
        backgroundColor: "rgba(0,0,0,0.04)",
    },
    options: {
        height: 25,
        width: "85%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 0,
        marginHorizontal: "auto",
        backgroundColor: 'lightgrey'
    },
    optionsBtn: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "grey"
    },
    outputText: {
        color: "black",
        fontSize: 18,
        fontWeight: "400"
    },
    outputHeading: {
        color: "black",
        fontSize: 22,
        fontWeight: "500"
    },
});

export default Classifier;
