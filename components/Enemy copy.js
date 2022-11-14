/*
 * @Date: 2022-10-18 00:12:58
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-08 02:27:02
 * @FilePath: /client/components/Enemy.js
 */
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { waypath } from "../localData/waypath";
import SpriteSheet from 'rn-sprite-sheet';
import useInterval from '../hooks/useInterval'

import getDistance from "../functions/getDistance";

function Enemy({name, id, speed}) {
  const enemyRef = useRef(null);
  const maxHp = 100 
  const [hp,setHp] = useState(maxHp)
  const [location, setLocation] = useState({top:100, left:100})
  let intervalID
  const [nextWayPointId,setNextWayPointID] = useState(0)
  const [nextWayPoint, setNextWayPoint] = useState(waypath.stage1[nextWayPointId])

  const url =()=>{
    switch (name) {
      case 'Goblin': return require('../assets/enemies/goblin.png')
      case 'Orc': return require('../assets/enemies/orc.png')
      default: return require('../assets/enemies/goblin.png')
    }
  }

  function initalEnemyAnimate() {
    enemyRef.current.play({
      type:'walk',
      fps:6,
      loop:'loop',
      resetAfterFinish:false,
    })
  }

  function enemyMove(prevState) {
    const currentPosition = [prevState.left, prevState.top]
    const length = getDistance(currentPosition,nextWayPoint)

    if (length<1) {
      setNextWayPointID(prev=>prev+1)
      console.log(nextWayPointId,nextWayPoint)
    } else {
      const lengthX = nextWayPoint[0] - currentPosition[0]
      const lengthY = nextWayPoint[1] - currentPosition[1]
      
      const step = Math.round(length/speed)
      const top = prevState.top + (lengthY / step)
      const left = prevState.left+ (lengthX / step)
      return {'top':(top), 'left':(left)}
    }
  }

  useEffect(()=>{
    console.log(nextWayPointId,nextWayPoint)
  },[nextWayPointId,nextWayPoint])

  useEffect(()=>{
    initalEnemyAnimate()
    const timeoutID = setTimeout(() => {
      intervalID = setInterval(() => {
        setLocation(prevState=>{
          const updatedValues = enemyMove(prevState)
          return {...prevState, ...updatedValues}
        });
      }, 100);
    }, 3000*id*Math.random()); // 3000 => interval for each enemy
    return () => {
      clearInterval(intervalID); 
      clearTimeout(timeoutID);
    };
  },[])


  return(
    <View style={[
      styles.constainer,{
        top:location.top,
        left:location.left,
      }
    ]}>
      <View style={[
        styles.hp,{
          backgroundColor:`'rgb(${255*(1-hp/maxHp)},${255*(hp/maxHp)},0)'`,
          width:10*hp/maxHp,
        }]}></View>
      <SpriteSheet
        ref={enemyRef}
        source={url()}
        columns = {8}
        rows = {8}
        animations={{
          walk: [0,1,2,3,4,5],
          up:   [6,7,8,9,10,11],
          down: [12,13,14,15,16,17]
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  constainer:{
    position:'absolute',
    alignItems:'center'
  },
  hp:{
    height:2,
    marginBottom:-5,
  }
})

export default Enemy