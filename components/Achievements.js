/*
 * @Date: 2022-08-27 22:44:58
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-05 02:33:23
 * @FilePath: /KingdomRush/Client/components/Achievements.js
 */
import React from "react";
import {StyleSheet, View, Image, TouchableOpacity } from "react-native";

function Achievements() {
  const handleClickAchiev = () => {
    console.log('handle click achiev')
  }

  return(
    <View>
      <TouchableOpacity onPress={handleClickAchiev}>
        <Image style={styles.icon} source={require('../assets/map-achievements.png')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  icon:{
    width:44,
    height:44
  }
})


export default Achievements