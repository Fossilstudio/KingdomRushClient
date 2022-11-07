/*
 * @Date: 2022-08-27 22:10:42
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-05 02:38:29
 * @FilePath: /KingdomRush/Client/components/MapSetting.js
 */
import React, { useState } from "react";
import {StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";

function MapSetting() {
  const [menuDisplay, setMenuDisplay] = useState('none')

  return(
    <View style={styles.container}>
      <View style={[styles.background,{display:menuDisplay}]}>
        <Link to={{ screen: 'Main' }}>
          <Image style={styles.icon} source={require('../assets/map-setting-home.png')} />
        </Link>
        <Image style={styles.icon} source={require('../assets/map-setting-sound.png')} />
        <Image style={styles.icon} source={require('../assets/map-setting-music.png')} />
      </View>
      <TouchableOpacity onPress={()=> (menuDisplay==='none') ? setMenuDisplay('block'):setMenuDisplay('none') }>
        <Image style={styles.icon} source={require('../assets/setting.png')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    marginRight:5
  },
  background: {
    backgroundColor:'rgba(0,0,0,0.5)',
    borderRadius:10
  },
  icon:{
    width:44,
    height:44
  }
})

export default MapSetting