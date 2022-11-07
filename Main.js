/*
 * @Date: 2022-08-26 22:22:30
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-07 02:15:32
 * @FilePath: /kingdomRush/client/Main.js
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { StatusBar } from 'expo-status-bar';

import Setting from "./components/Setting";
import Slots from "./components/Slots";
import Login from "./components/Login";
import { StyleSheet, View, ImageBackground, Image , TouchableOpacity, Text, Animated, Easing} from 'react-native';

function Main() {
  const [settingDisplay, setSettingDisplay] = useState('none')
  const [slotsDisplay, setSlotsDisplay] = useState('none')
  const [overlay, setOverlay] = useState('none')
  const [startDisplay, setStartDispay] = useState('none')
  const [loginDisplay, setLoginDisplay] = useState('block')
  const [message, setMessage] = useState('')

  let userData = useSelector((state)=>state.player)

  // add animation
  let messageTranslateHolder = new Animated.Value(0)
  const translateY = messageTranslateHolder.interpolate({
    inputRange:[0,1],
    outputRange:[0,100]
  })

  // Do animation : value = 1 forward, value = 0  backward
  function messagePopup(value) {
    Animated.timing(messageTranslateHolder,{
      toValue:value,
      duration:600,
      easing: Easing.bounce,
      useNativeDriver:true,
    }).start()
  }


  const handleSettingPress = () => {
    setSettingDisplay('block')
    setOverlay('block')
  }


  const handleSettingClose= () => {
    setSettingDisplay('none')
    setOverlay('none')
  }

  const handleStartPress = () => {
    setOverlay('block')
    setSlotsDisplay('block')
  }

  const handleSlotsClose =()=>{
    setOverlay('none')
    setSlotsDisplay('none')
  }

  const handleCreditsPress = ()=>{
    console.log('handleCreditsPress')
  }

  const loginSuccess = () =>{
    setLoginDisplay('none')
    setStartDispay('block')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background.jpg')} 
        resizeMode="cover"
        style={styles.background}
      >
        <Animated.View style={[styles.message,{transform:[{translateY:translateY}]}]}>
          <ImageBackground source={require("./assets/message.png")} resizeMode='contain' style={{height:100}}>
            <Text style={{color:'#fff',textAlign:'center',paddingTop:55}}>
              {message}
            </Text>
          </ImageBackground>
        </Animated.View>
        <View style={styles.menu}>
          <Image source={require('./assets/banner.png')} style={{
            width:286,height:196
          }}/>
          <Login loginDisplay = {loginDisplay} loginSuccess = {loginSuccess} setMessage={setMessage} messagePopup={messagePopup}/>
          <TouchableOpacity
            style={{display:startDisplay}}
            onPress={handleStartPress}
            activeOpacity = {0.8}>
            <Image source={require('./assets/start.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{display:startDisplay}}
            onPress={handleCreditsPress}>
            <Image data-test={'test'} source={require('./assets/credits.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={handleSettingPress}
          activeOpacity = {0.8}
          style={styles.settingButton}>
          <Image style={styles.settingImg} source={require('./assets/setting.png')}/>
        </TouchableOpacity>
        <Text>{userData.campaign}</Text>
      </ImageBackground>
      <View style={[styles.overlay,{display:overlay}]}></View>
      <Setting display={settingDisplay} handleSettingClose={handleSettingClose}/>
      <Slots display={slotsDisplay} handleSlotsClose={handleSlotsClose} userData={userData}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  menu: {
    display:'flex',
    alignItems: 'center',
  },
  settingButton: {
    position:'absolute',
    top:20,
    left:30,
  },
  settingImg:{
    width:44,
    height:44,
  },
  overlay:{
    position:'absolute',
    width: '100%',
    height: '100%',
    backgroundColor:'rgba(0,0,0,0.8)'
  },
  message:{
    position:'absolute',
    top:-100,
    left:0,
    right:0,
    zIndex:2
  },

});

export default Main