/*
 * @Date: 2022-10-15 00:07:39
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-15 02:43:23
 * @FilePath: /kingdomRush/client/components/Tower.js
 */
import React,{useState} from "react";
import {StyleSheet, View, TouchableOpacity, Image,} from "react-native";

function Tower(props) {
  const towerData = props.towerData
  const towerName = towerData.name
  const range = (towerData.range)?towerData.range:0
  const [showRange, setShowRange] = useState(false)
  const tower =()=>{
    switch (towerName) {
      case 'Archer Tower': return require('../assets/towers/archer.png')
      case 'Mage Tower': return require('../assets/towers/mage.png')
      case 'Militia Barracks': return require('../assets/towers/militia.png')
      case 'Dwarven Bombard': return require('../assets/towers/bombard.png')
      default: return require('../assets/towers/archer.png')
    }
  }

  const onPressInHandler =()=>{
    setShowRange(true)
  }

  const onPressOutHandler = ()=>{
    setShowRange(false)
  }

  return(
    <View style={[styles.container,{display:(props.settleDisplay==='block')?'none':'block'}]}>
      <View style={
        [styles.range,{
          display: showRange?'block':'none' ,
          top:-range/2+35,
          left:-range/2+40,
          width:range,
          height:range,
        }]}></View>
      <TouchableOpacity onPressIn={onPressInHandler} onPressOut={onPressOutHandler} style={styles.tower}>
        <Image 
          source={tower()}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  },
  range: {
    position:'absolute',
    backgroundColor:'rgba(0,255,255,0.1)',
    borderWidth:1,
    borderRadius:'100%',
  },
  tower:{
    position:'absolute'
  }
})

export default Tower