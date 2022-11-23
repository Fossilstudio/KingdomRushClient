/*
 * @Date: 2022-10-17 03:29:26
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-23 00:52:00
 * @FilePath: /kingdomRush/client/components/Enemies.js
 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Enemy from "./Enemy";

function Enemies({mapID,pathway,stageInfo}) {
  // TODO get enemies from database
  const [wave, setWave] = useState(1)
  const [enemiesPerWaveList,setEnemiesPerWaveList] = useState([])

  useEffect(()=>{
    stageInfo.map(item=>{
      if (item.stage_wave_id === wave) {
        for (let index = 0; index < item.stage_enemy_amount; index++) {
          setEnemiesPerWaveList(
            prevState=>[...prevState,<Enemy key={item.stage_enemy_name+index} name={item.stage_enemy_name} id={index} speed={1} />]
          )
        }
      }
    })
  },[stageInfo])

  return (
    <View style={styles.container}>
      { enemiesPerWaveList }
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