import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from 'expo-image-manipulator';

const ActionButtons = ({ imgUri, setImgUri, setLabels, classification, setClassification, setRecycleRes, setClassificationObject, clearData }) => {

  // access image library function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      clearData();
      setImgUri(result.assets[0].uri);
    }
  };

  // access camera function 
  const TakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      clearData();
      setImgUri(result.assets[0].uri)
    }
  };

  // object detection function
  const objectDetection = async () => {
    try {
      if (!imgUri) {
        Alert.alert("Please Select Image !");
        return;
      }

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imgUri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64ImageData = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("Object identification started!");

      const payload = base64ImageData;

      const apiUrl = 'https://classify.roboflow.com/waste-detection-by-zeba-raza/1';
      const apiKey = 'IwVnfxOdlhCWun2xlzcU';

      const response = await axios.post(`${apiUrl}?api_key=${apiKey}`, payload);
      setClassification(response.data?.predicted_classes);
      setClassificationObject(response.data?.predictions);
      console.log("Object model response: ", response.data);
    } catch (err) {
      console.error("Error in detecting the object: ", err);
      console.log("Response data: ", err.response?.data);
      console.log("Response status: ", err.response?.status);
      console.log("Response headers: ", err.response?.headers);
    }
  };

  // Label Analyze function using google vision api
  const analyzeImage = async () => {
    try {
      if (!imgUri) {
        Alert.alert("Please Select Image !");
        return;
      }

      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imgUri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const base64ImageData = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const apiKey = "AIzaSyB63SI7z22ZHaSMDk-D6n64paLYCIj3f4s";
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 6 }],
          },
        ],
      };
      const response = await axios.post(apiUrl, requestData);
      setLabels(response.data.responses[0].labelAnnotations);
      console.log("response: ", response.data.responses[0]);

    } catch (err) {
      console.log("error in analyzing the image: ", err);
      Alert.alert("error in analyzing the image, please try again later");
    }
  };

  // Recycle button function
  const recycle = () => {
    if (!imgUri) {
      Alert.alert("Please Select Image !");
      return;
    }
    console.log(classification);
    if (!classification) {
      Alert.alert("Identify The Image First");
      return;
    }
    if (classification == "Aerosols") {
      setRecycleRes("Can Be Recyclable");
    }
    else if (classification == "Cardboard") {
      setRecycleRes("Recyclable");
    }
    else if (classification == "Clothes") {
      setRecycleRes("Recyclable");
    }
    else if (classification == "Glass bottle") {
      setRecycleRes("Recyclable");
    }
    else if (classification == "Metal") {
      setRecycleRes("Recyclable");
    }
    else if (classification == "Organic") {
      setRecycleRes("Non-Recyclable");
    }
    else if (classification == "Paper") {
      setRecycleRes("Recyclable");
    }
    else if (classification == "Plastic") {
      setRecycleRes("Recyclable");
    }
    else {
      setRecycleRes("Can't identify the class , Try other image");
    }
  }

  return (
    <View style={styles.container}>
      {/* Label */}
      <TouchableOpacity style={styles.btn} onPress={analyzeImage}>
        <Text style={styles.btnText}>Label</Text>
      </TouchableOpacity>
      {/* Gallery */}
      <TouchableOpacity
        onPress={pickImage}
      >
        <Entypo name="images" size={36} color="white" />
      </TouchableOpacity>
      {/* Camera */}
      <TouchableOpacity style={styles.cam} activeOpacity={0.75} onPress={TakePhoto}>
        <MaterialIcons name="camera" size={32} color="darkorange" />
      </TouchableOpacity>
      {/* Recycle */}
      <TouchableOpacity onPress={recycle}>
        <FontAwesome5 name="recycle" size={36} color="white" />
      </TouchableOpacity>
      {/* Classify Object */}
      <TouchableOpacity style={styles.btn} onPress={objectDetection}>
        <Text style={styles.btnText}>Identify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: hp("8%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 15,
    borderRadius: 18,
    backgroundColor: "orange",
    zIndex: 5,
  },
  cam: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    backgroundColor: "white",
    borderColor: "orange",
    borderWidth: 2,
    transform: [{ translateY: hp("-3.5%") }],
  },
  btn: {
    width: 65,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  btnText: {
    color: "darkorange",
    fontSize: 16,
    fontWeight: "500",
  },
});
