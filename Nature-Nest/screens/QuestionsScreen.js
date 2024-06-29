import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, {  useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"
import QuesSection from '../components/QuesSection';
import Result from '../components/Result';

const QuestionsScreen = ({ route }) => {
  const { name } = route.params;
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const path = {
    carbon: require("../quizData/carbon.json"),
    earth: require("../quizData/earth.json"),
    sea: require("../quizData/sea.json"),
    air: require("../quizData/air.json"),
  }

  return (
    <ImageBackground style={{ flex: 1 }} source={require("../assets/quizScreen.jpg")} >
      <View style={{ flex: 1, paddingTop: hp("6.3%"), paddingBottom: hp("2%") }}>

        <View style={{ width: wp('92%'), marginHorizontal: "auto", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginBottom: hp("2.4%") }}>
          <TouchableOpacity activeOpacity={0.71} onPress={() => { navigation.navigate("GameScreen") }} style={{ width: 50, height: 50, backgroundColor: "rgba(255,255,255,0.97)", borderRadius: 50, alignItems: "center", justifyContent: 'center', justifyContent: "center", }}>
            <Ionicons name="arrow-back-outline" size={30} color="rgba(0,0,0,0.9)" />
          </TouchableOpacity>
          {
            count > 4 ?
              <Text style={{ fontSize: hp("3%"), color: "white", }}>Score Board</Text>
              :
              <Text style={{ fontSize: hp("3%"), color: "white", }}>Question {count + 1}/5</Text>
          }
          <View style={{ width: 50, height: 50, borderRadius: 50, }}></View>
        </View>

        <View style={{ height: "89%", width: wp('92%'), marginHorizontal: "auto", borderRadius: 17.2, overflow: "hidden" }}>
          {count > 4 ?
            <Result name={name} />
            :
            <QuesSection count={count} setCount={setCount} path={path} name={name} />
          }
        </View>

      </View>
    </ImageBackground >
  )
}

export default QuestionsScreen
