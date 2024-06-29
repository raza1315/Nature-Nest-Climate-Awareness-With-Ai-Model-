import { View, Text, Image, ScrollView, TouchableOpacity, Vibration } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const QuesSection = ({ name, path, count, setCount }) => {
  const [data, setData] = useState({});
  const [choices, setChoices] = useState([]);
  const [image, setImage] = useState('');
  const [result, setResult] = useState(false);
  const [flag, setFlag] = useState(null);
  const [switch1, setSwitch1] = useState(true);
  const serverUrl=process.env.EXPO_PUBLIC_URL;
  const scoreRef = useRef(0);
  const imageMap = {
    air: {
      1: require("../quizData/QuizImages/air/air1.jpg"),
      2: require("../quizData/QuizImages/air/air2.jpg"),
      3: require("../quizData/QuizImages/air/air3.jpg"),
      4: require("../quizData/QuizImages/air/air4.jpg"),
      5: require("../quizData/QuizImages/air/air5.jpg"),
    },
    earth: {
      1: require("../quizData/QuizImages/earth/earth1.jpg"),
      2: require("../quizData/QuizImages/earth/earth2.jpg"),
      3: require("../quizData/QuizImages/earth/earth3.jpg"),
      4: require("../quizData/QuizImages/earth/earth4.jpg"),
      5: require("../quizData/QuizImages/earth/earth5.jpg"),
    },
    sea: {
      1: require("../quizData/QuizImages/sea/sea1.jpg"),
      2: require("../quizData/QuizImages/sea/sea2.jpg"),
      3: require("../quizData/QuizImages/sea/sea3.jpg"),
      4: require("../quizData/QuizImages/sea/sea4.jpg"),
      5: require("../quizData/QuizImages/sea/sea5.jpg"),
    },
    carbon: {
      1: require("../quizData/QuizImages/carbon/carbon1.jpg"),
      2: require("../quizData/QuizImages/carbon/carbon2.jpg"),
      3: require("../quizData/QuizImages/carbon/carbon3.jpg"),
      4: require("../quizData/QuizImages/carbon/carbon4.jpg"),
      5: require("../quizData/QuizImages/carbon/carbon5.jpg"),
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(path[name].questions);
        setChoices(data[count]?.choices);
        setImage(imageMap[name][count + 1])
      }
      catch (err) {
        console.log("error occuredd while fetching : ", err);
      }
    }
    fetchData();
  }, [count, data]);

  useEffect(() => {
    if (flag) {
      scoreRef.current += 1;
    }
    console.log(" score: ", scoreRef.current);
  }, [switch1]);

  useEffect(() => {
    return async () => {
      console.log("last score was: " + scoreRef.current);
      const userId = await AsyncStorage.getItem('userId');
      axios.post(`${serverUrl}/updateScore/${userId}`, { score: scoreRef.current, name: name }).then(() => {
        console.log("score sent to DB successfully");
      }).catch((err) => {
        console.log("error in sending the score :", err);
      })
    }
  }, [])


  const handlePress = (flag) => {
    Vibration.vibrate(50);
    setResult(true);
    setFlag(flag);
    setSwitch1(!switch1);
  }
  const nextbtn = () => {
    Vibration.vibrate(50);
    setCount(count + 1);
    setResult(false)
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, backgroundColor: "white", paddingVertical: "2.5%" }}>
      <Image source={image} style={{ width: "95%", height: hp("30%"), marginHorizontal: "auto", resizeMode: "cover", borderRadius: 14, marginBottom: "5%", overflow: 'hidden' }} />
      <Text style={{ fontSize: hp("2.3%"), fontWeight: 600, width: "86%", marginHorizontal: "auto", marginBottom: "7%" }}>{data[count]?.Q}</Text>
      <View style={{ flex: 1, flexDirection: "column", gap: 10, width: "90%", marginHorizontal: "auto" }}>
        {result ?
          <View style={{ width: "90%", marginHorizontal: "auto", gap: 17, }}>
            {
              flag ?
                <Text style={{ color: "rgba(138,43,226,0.8)", fontWeight: "bold", fontSize: hp("2.3%") }}>You Are Correct !</Text>
                :
                <Text style={{ color: "rgba(138,43,226,0.8)", fontWeight: "bold", fontSize: hp("2.3%") }}>You Are Incorrect !</Text>
            }
            <Text style={{ fontWeight: 500, fontSize: hp("2%") }}>{data[count]["sol"]}</Text>
            <TouchableOpacity onPress={nextbtn} activeOpacity={0.5} style={{ marginHorizontal: "auto", width: "38%", paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "rgba(138,43,226,0.65)", borderRadius: 14 }}>
              <Text style={{ textAlign: "center", color: "white", fontWeight: 500, fontSize: hp("2.35%") }}>Next</Text>
            </TouchableOpacity>
          </View>
          :
          choices?.map((items, index) => {
            return (
              <TouchableOpacity onPress={() => handlePress(items["flag"])} activeOpacity={0.31} key={index} style={{ flexWrap: "wrap", borderRadius: 14, borderColor: "rgba(138,43,226,0.4)", borderWidth: 1.08, flexDirection: "row", gap: 10, paddingVertical: 13, paddingHorizontal: 12, overflow: 'hidden', }}>
                <Text style={{ fontWeight: 600, fontSize: hp("2%") }}>{String.fromCharCode(65 + index)}.</Text>
                <Text style={{ fontWeight: 600, fontSize: hp("2%"), }}>{items?.["option"]}</Text>
              </TouchableOpacity>
            )
          })

        }
      </View>
    </ScrollView>
  )
}

export default QuesSection