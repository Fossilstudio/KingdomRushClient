/*
 * @Date: 2022-09-27 10:40:20
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-21 01:17:17
 * @FilePath: /kingdomRush/client/components/BattleField.js
 */
import React, {useEffect, useState} from "react";
import {StyleSheet, View, ImageBackground, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BattleUI from "./BattleUI";
import BuildTowerUI from "./BuildTowerUI";
import Enemies from "./Enemies";
import {background} from "../localData/battleBackground"
import { map, settle, pathway, stage } from '../actions/map'

function BattleField(props) {
  const id = props.route.params.id+1
  const stageId= 'stage'+id
  let $settlePlaces = []
  const [settlePlaces, setSettlePlaces] = useState(settlePlaces)
  const [settleDisable,setSettleDisable] = useState(false)
  const [gold,setGold] = useState(200)
  const [hp, setHp] = useState(0)
  const [waves, setWaves] = useState(0)
  const [mapInfo, setMapInfo] = useState({})
  const [pathwayArray, setPathwayArray] = useState([])
  const [stageInfo, setStageInfo] = useState([])

  const toggleDisabled = ()=>{
    if (settleDisable) {
      setSettleDisable(false)
    }else {setSettleDisable(true)}
  }

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

  function getMap() {
    map(id)
    .then((mapData)=>{
      setMapInfo(mapData.data)
      setGold(mapData.data['map_initGold'])
      setHp(mapData.data['map_max_hp'])
      setWaves(mapData.data['map_max_waves'])
    })
    .catch((err)=>{console.error(err);})
  }

  function getPathway() {
    pathway(id)
    .then((pathwayData)=>{
      setPathwayArray(pathwayData.data)
    }).catch((err)=>{console.error(err);})
  }

  function getStage() {
    stage(id)
    .then((stageData)=>{
      setStageInfo(stageData.data)
    }).catch((err)=>{console.error(err);})
  }

  useEffect(()=>{
    // get map info and init gold hp and waves
    getMap()
    // get pathway array
    getPathway()
    // get stage infomation
    getStage()
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

  
  const $pathway = []
  pathwayArray.forEach(path => {
    $pathway.push(
    <Text key={path['pathway_id']} style={{
      position:'absolute',
      top:path['pathway_top'],
      left:path['pathway_left'],
    }}>{path['pathway_id']}</Text>
    )
  });


  return (
    <View style={styles.container}>
      {/* The image name in require has to be known statically. */}
      <ImageBackground source={background[stageId]} resizeMode="stretch" style={styles.background}>
        { $pathway }
        {/* Settle Places */}
        {settlePlaces}
        {/* ADD UI */}
        <BattleUI gold={gold} hp={hp} waves={waves} id={id}/>
        {/* Add Canvas */}
        <Enemies mapID={id} pathway={pathwayArray} stageInfo={stageInfo}/>
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