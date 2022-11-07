/*
 * @Date: 2022-10-17 03:29:26
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-07 01:38:16
 * @FilePath: /kingdomRush/client/components/Enemies.js
 */
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Enemy from "./Enemy";
import { enemies } from "../localData/enemies";

function Enemies() {

  return (
    <View style={styles.container}>
      {
        enemies.stage1.map(wave=>{
          return <Wave key={wave.wave_id} 
          waveId={wave.wave_id} 
          enemies={wave.enemies}/>
        })
      }
    </View>
  )
}

// A wave of enemies
function Wave(props) {
  const waveId = props.waveId
  const enemiesPerWave = Object.entries(props.enemies)
  const enemiesPerWaveList = []

  console.log(enemiesPerWave)

  e/* nemiesPerWave.map((enemiesPerGroup)=>{
    const amount = enemiesPerGroup[1]
    const name = enemiesPerGroup[0]

    for (let index = 0; index < amount; index++) {
      enemiesPerWaveList.push(
        <Enemy key={waveId+name+index} name={name} id={index} waveId={waveId}/>)
  }}) */


  return(
    <View>
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