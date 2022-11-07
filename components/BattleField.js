/*
 * @Date: 2022-09-27 10:40:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-24 03:16:08
 * @FilePath: /kingdomRush/client/components/BattleField.js
 */
import React, {useEffect, useState} from "react";
import {StyleSheet, View, ImageBackground} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BattleUI from "./BattleUI";
import BuildTowerUI from "./BuildTowerUI";
import Enemies from "./Enemies";
import {background} from "../localData/battleBackground"
import { map, settle } from '../actions/map'

function BattleField(props) {
  const id = props.route.params.id+1
  const stageId= 'stage'+id
  let $settlePlaces = []
  const [settlePlaces, setSettlePlaces] = useState(settlePlaces)
  const [settleDisable,setSettleDisable] = useState(false)
  const [gold,setGold] = useState(200)
  const [hp, setHp] = useState(0)
  const [waves, setWaves] = useState(0)

  const toggleDisabled = ()=>{
    if (settleDisable) {
      setSettleDisable(false)
    }else {setSettleDisable(true)}
  }

  /* AsyncStorage.setItem('gold',gold.toString())
    .then(()=>{console.log('store')}) */
  const storeData = () => {
    try {
      const jsonValue = JSON.stringify(gold)
      AsyncStorage.setItem('gold', jsonValue)
    } 
    catch (e) {
      // saving error
    }
  }

  const buildCost = (value)=>{
    setGold(gold-value)
  }

  useEffect(()=>{
    storeData()
  }
  ,[gold])

  useEffect(()=>{
    // init gold hp and waves
    map(id)
    .then((mapData)=>{
      setGold(mapData.data.initGold)
      setHp(mapData.data.hp)
      setWaves(mapData.data.waves)
    })
    .catch((err)=>{console.log(err)})
  },[])

  useEffect(()=>{
    // init settle places
    settle(id)
      .then((settleData)=>{
        settleData.data.map((data)=>{
          $settlePlaces.push(
            <BuildTowerUI key={data.settleID} element={[data.xCoordinate, data.yCoordinate]} 
              disabled={settleDisable} 
              setDisabled={toggleDisabled} 
              gold={gold} 
              buildCost={buildCost}/>)
        })
        setSettlePlaces($settlePlaces)
      })
      .catch((err)=>{console.log(err)})

  },[settleDisable])

  return (
    <View style={styles.container}>
      {/* The image name in require has to be known statically. */}
      <ImageBackground source={background[stageId]} resizeMode="stretch" style={styles.background}>
        {/* Settle Places */}
        {settlePlaces}
        {/* ADD UI */}
        <BattleUI gold={gold} hp={hp} waves={waves} id={id}/>
        {/* Add Canvas */}
        <Enemies />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'stretch',
  },
  background: {
    height:'100%',
    width:'100%'
  },
  settle: {
    position:'absolute',
  },
  mask:{
    height:'100%',
    width:'100%',
    zIndex:2,
  }
})

export default BattleField