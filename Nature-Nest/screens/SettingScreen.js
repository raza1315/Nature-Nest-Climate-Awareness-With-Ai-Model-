import { View, Text, TouchableOpacity, Vibration, ScrollView, Image, TextInput ,Linking} from 'react-native'
import React, { useState, useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { Entypo, Feather } from '@expo/vector-icons';

const SettingScreen = () => {
  const [flag1, setflag1] = useState(false);
  const [flag2, setflag2] = useState(false);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [reload, setReload] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState(null);
  const focus = useIsFocused();
  const serverUrl = process.env.EXPO_PUBLIC_URL;
  const handlePress = () => {
    Vibration.vibrate(50);
    setIsEditing(!isEditing);
  };
  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const handleSubmit = async () => {
    setIsEditing(!isEditing);
    const id = await AsyncStorage.getItem('userId');
    console.log(name);
    if (name) {
      axios.post(`${serverUrl}/updateScore/${id}/name`, { name: name }).then(() => {
        console.log("sent to Server");
        setTimeout(() => {
          setReload(!reload)
        }, 20)
      }).catch((err) => { console.log("Error in sending Name : ", err); });
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const res = await axios.get(`${serverUrl}/${id}`);
        if (res.status === 200) {
          setData(res?.data);
          const totalScore = res.data.airScore + res.data.carbonScore + res.data.earthScore + res.data.seaScore;
          setTotal(totalScore);
        }
      } catch (err) {
        console.log("Error in retrieving the data : ", err);
      }
    }
    setTimeout(() => {

      getData();
    }, 20)
  }, [focus, reload]);
  console.log(data);
  console.log(total);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "black", paddingTop: hp("7.5%"), paddingBottom: 90, gap: 10 }}>
        <Text style={{ fontSize: hp("3.5%"), color: "white", fontWeight: 600, marginHorizontal: "auto", marginBottom: hp("1.5%") }}>Settings</Text>
        {/*Name Editor and Avatar*/}
        <View style={{ width: wp("90%"), minHeight: hp("20%"), borderRadius: 23, marginHorizontal: "auto", flexDirection: "column", backgroundColor: "rgba(255,255,255,0.26)", gap: 12, paddingHorizontal: "3%", paddingVertical: 10 }}>
          <Text style={{ width: "100%", textAlign: "center", fontSize: hp("2.9%"), color: "white", fontWeight: 500, }}>Profile</Text>
          <View style={{ width: "100%", height: "1.2%", backgroundColor: "black", }}></View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ width: 65, height: 65, backgroundColor: "white", borderRadius: 20, overflow: "hidden", borderWidth: 2, borderColor: "white", opacity: 0.9 }}>
              <Image source={require("../assets/gamer.jpg")} style={{ resizeMode: "cover", height: "100%", width: "100%" }} />
            </View>
            <View gap={4} style={{ justifyContent: "center", }}>
              <Text style={{ fontSize: hp("2.4%"), color: "white", fontWeight: 500 }}>Name</Text>
              <View style={{ gap: 7, flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: hp("2.4%"), color: "white", fontWeight: 500 }}>{data?.name}</Text>
                <TouchableOpacity activeOpacity={0.45} onPress={handlePress}>
                  <Feather name="edit" size={hp("2.6%")} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: "auto", gap: 5, marginRight: 5 }}>
              <Text style={{ fontSize: hp("2.4%"), color: "white", fontWeight: 500, textAlign: "center" }}>Score : {total * 100}</Text>
              <Text style={{ fontSize: hp("2.4%"), color: "white", fontWeight: 500, textAlign: "center" }}>Level  : {total < 5 ? "1" : total >= 5 && total <= 11 ? "2" : total >= 12 && total <= 15 ? "3" : "4"}</Text>
              <Text style={{ fontSize: hp("1.9%"), textAlign: "center", color: "orange", fontWeight: 500 }}>{total < 5 ? "Rookie" : total >= 5 && total <= 11 ? "Adept" : total >= 12 && total <= 15 ? "Expert" : "Master"}</Text>
            </View>
          </View>
          {isEditing && (
            <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", alignItems: "center" }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginTop: 10,
                  color: 'white',
                  flex: 1,
                  padding: 6, marginTop: -1,
                  borderRadius: 10
                }}
                onChangeText={text => setName(text)}
                placeholder="Type here"
                placeholderTextColor="gray"
                autoFocus
              />
              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.45} style={{ paddingVertical: 8, paddingHorizontal: 10, backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>
                <Text style={{ color: "white", fontSize: hp("2.4%") }}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {/* ABOUT SECTION */}
        {flag1 ?
          <View style={{ width: wp("90%"), minHeight: hp("50%"), marginHorizontal: "auto", borderRadius: 23, backgroundColor: "rgba(255,255,255,0.26)", paddingHorizontal: "5%", }}>
            <View style={{ flexDirection: "row", height: hp("9.5%"), alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: hp("2.9%"), color: "white", fontWeight: 500 }}>About</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => { Vibration.vibrate(50); setflag1(!flag1) }}>
                <Entypo name="chevron-up" size={hp("3.5%")} color="white" />
              </TouchableOpacity>
            </View>
            <View gap={7}>
              <Text style={{ fontSize: hp("2.2%"), color: "rgba(255,255,255,0.84)", fontWeight: 400 }}>Nature Nest is a climate awareness app designed to educate and engage users on environmental issues through news, games, and interactive features.</Text>
              <View style={{ width: "100%", height: 1.6, backgroundColor: "black", }}></View>
              <Text style={{ fontSize: hp("2.4%"), color: "white", fontWeight: 500 }}>Key Features :</Text>

              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>Live Temperature and Weather</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>Real-time updates on current temperature , wind speed and humidity index</Text>
              <View style={{ width: "100%", height: 1.6, backgroundColor: "black", }}></View>

              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>Climate News</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>Latest news and articles on climate change and environmental policies</Text>
              <View style={{ width: "100%", height: 1.6, backgroundColor: "black", }}></View>

              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>Climate Games</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>Four categories (Planet, Air, Sea, Carbon) with progressive levels and rewards</Text>
              <View style={{ width: "100%", height: 1.6, backgroundColor: "black", }}></View>

              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>ClimaBuddy ChatBot</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginBottom: 10, marginHorizontal: 4 }}>Virtual assistant for climate-related questions and app guidance</Text>

            </View>
          </View>
          :
          <View style={{ width: wp("90%"), height: hp("9.5%"), marginHorizontal: "auto", borderRadius: 23, backgroundColor: "rgba(255,255,255,0.26)", paddingHorizontal: "5%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: hp("2.9%"), color: "white", fontWeight: 500 }}>About</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { Vibration.vibrate(50); setflag1(!flag1) }}>
              <Entypo name="chevron-down" size={hp("3.5%")} color="white" />
            </TouchableOpacity>
          </View>}
        {/* TEAM SECTION*/}
        {flag2 ?
          <View style={{ width: wp("90%"), minHeight: hp("50%"), marginHorizontal: "auto", borderRadius: 23, backgroundColor: "rgba(255,255,255,0.26)", paddingHorizontal: "5%", }}>
            <View style={{ flexDirection: "row", height: hp("9.5%"), alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: hp("2.9%"), color: "white", fontWeight: 500 }}>Team</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={() => { Vibration.vibrate(50); setflag2(!flag2) }}>
                <Entypo name="chevron-up" size={hp("3.5%")} color="white" />
              </TouchableOpacity>
            </View>
            <View gap={7}>
              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>Raza Rizvi</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>Worked On FrontEnd And BackEnd</Text>
              <TouchableOpacity onPress={()=>openLink("https://www.linkedin.com/in/razarizvi-js")} activeOpacity={0.45} style={{flexDirection:"row",marginBottom:10}}>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -2, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>LinkedIn :  <Text style={{ fontSize: hp("2.2%"), marginTop: -2, color: "orange",textDecorationLine:"underline", fontWeight: 400, marginHorizontal: 4 }}>www.linkedin.com/in/razarizvi-js</Text></Text>
              </TouchableOpacity>
              <View style={{ width: "100%", height: 1.6, backgroundColor: "black", }}></View>

              <Text style={{ fontSize: hp("2.2%"), color: "orange", fontWeight: 500, marginHorizontal: 4 }}>Zeba</Text>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -4, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginBottom: 10, marginHorizontal: 4 }}>Worked On FrontEnd And ChatBot</Text>
              <TouchableOpacity onPress={()=>openLink("https://www.linkedin.com/in/zeba-k-ba96a5292/")} activeOpacity={0.45} style={{flexDirection:"row",marginBottom:10}}>
              <Text style={{ fontSize: hp("2.2%"), marginTop: -2, color: "rgba(255,255,255,0.84)", fontWeight: 400, marginHorizontal: 4 }}>LinkedIn :  <Text style={{ fontSize: hp("2.2%"), marginTop: -2, color: "orange",textDecorationLine:"underline", fontWeight: 400, marginHorizontal: 4 }}>www.linkedin.com/in/zeba-k-ba96a5292/</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={{ width: wp("90%"), height: hp("9.5%"), marginHorizontal: "auto", borderRadius: 23, backgroundColor: "rgba(255,255,255,0.26)", paddingHorizontal: "5%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: hp("2.9%"), color: "white", fontWeight: 500 }}>Team</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => { Vibration.vibrate(50); setflag2(!flag2) }}>
              <Entypo name="chevron-down" size={hp("3.5%")} color="white" />
            </TouchableOpacity>
          </View>}
      </View>
    </ScrollView>
  )
}

export default SettingScreen