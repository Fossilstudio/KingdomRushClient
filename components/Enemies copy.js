/*
 * @Date: 2022-10-17 03:29:26
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-19 02:13:48
 * @FilePath: /kingdomRush/client/components/Enemies.js
 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Enemy from "./Enemy";
import { enemies } from "../localData/enemies";

function Enemies({mapID,pathway,stageInfo}) {
  // TODO get enemies from database
  const [currentWave, setCurrentWave] = useState(enemies['stage'+mapID][0])

  const enemiesAmount = currentWave.enemies
  const enemiesPerWaveList = []
  let id = 0

  useEffect(()=>{
    console.log(stageInfo[0])
    
  },[stageInfo])

  useEffect(()=>{

  })
  
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