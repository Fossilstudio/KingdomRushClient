/*
 * @Date: 2022-10-17 03:29:26
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-13 01:14:10
 * @FilePath: /client/components/Enemies.js
 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Enemy from "./Enemy";
import { enemies } from "../localData/enemies";

function Enemies() {

  // TODO get enemies from database
  const currentWave = enemies.stage1[0]

  const enemiesAmount = currentWave.enemies
  const enemiesPerWaveList = []
  let id = 0
  
  for (const enemyGroup in enemiesAmount) {
    const length = enemiesAmount[enemyGroup]
    for (let index = 0; index < length; index++) {
      enemiesPerWaveList.push(
        // TODO get speed from database
        <Enemy key={id} name={enemyGroup} id={id++} speed={2} />
      )
    }
  }

  return (
    <View style={styles.container}>
      {enemiesPerWaveList}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
  }
})


export default Enemies