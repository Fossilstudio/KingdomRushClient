/*
 * @Date: 2022-10-18 00:12:58
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-23 02:47:15
 * @FilePath: /kingdomRush/client/components/Enemy.js
 */
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import SpriteSheet from "rn-sprite-sheet";

import getDistance from "../functions/getDistance";

function Enemy({ name, id, speed, pathway }) {
  const enemyRef = useRef(null);
  const maxHp = 100;
  const [hp, setHp] = useState(maxHp);
  const [location, setLocation] = useState({ });
  const [nextWayPointId, setNextWayPointID] = useState(1);
  const [nextWayPoint, setNextWayPoint] = useState({});
  const pathwayLength = pathway.length
  const [distance, setDistance] = useState(100);
  const ref = useRef()
  const [active, setActive] = useState(false)

  // use ref to store the newest value of these variable
  ref.current = {distance, nextWayPointId, nextWayPoint, active}

  const url = () => {
    switch (name) {
      case "Goblin":
        return require("../assets/enemies/goblin.png");
      case "Orc":
        return require("../assets/enemies/orc.png");
      default:
        return require("../assets/enemies/goblin.png");
    }
  };

  function initalEnemyAnimate() {
    enemyRef.current.play({
      type: "walk",
      fps: 6,
      loop: "loop",
      resetAfterFinish: false,
    });
  }

  function reachEnd() {
    console.log('hp-1')
    console.log('remove this enemy')
  }

  function move() {
    let enemyTimeID
    let spawnTimeoutID
    if (ref.current.active) {
      enemyTimeID = setTimeout(()=>{
        const currentPosition = [location.left, location.top]
        setDistance(getDistance(currentPosition,ref.current.nextWayPoint))
  
        if (ref.current.distance < 1) {
          setNextWayPointID(prev=>prev+1)
          if (ref.current.nextWayPointId>=pathwayLength) {
            reachEnd()
          }else {
            setNextWayPoint([
              pathway[ref.current.nextWayPointId]['pathway_left'],
              pathway[ref.current.nextWayPointId]['pathway_top']
            ])
          }
        }else {
          const lengthX = nextWayPoint[0] - currentPosition[0]
          const lengthY = nextWayPoint[1] - currentPosition[1]
          
          const step = Math.round(ref.current.distance/speed)
    
          const top = location.top + (lengthY / step)
          const left = location.left+ (lengthX / step)
          setLocation({top,left})
        }
      },100)
      
      return ()=>{ clearTimeout(enemyTimeID); }
    } else {
      spawnTimeoutID = setTimeout(() => {
        setActive(true)
      }, 3000*(id+1)*Math.random());
      return ()=>{ clearTimeout(spawnTimeoutID)}
    }
  }

  useEffect(()=>{
    setLocation({
      top: pathway[0]['pathway_top'],
      left: pathway[0]['pathway_left'] 
    })
    setNextWayPoint(
      [pathway[1]['pathway_left'], pathway[1]['pathway_top']]
    )
  },[pathway])

  useEffect(()=>{
    move()
  },[location,nextWayPoint,active])

  useEffect(()=>{
    let spawnTimeoutID = setTimeout(() => {
      initalEnemyAnimate()
    }, 3000 * (id+1) * Math.random()); // 3000 => interval for each enemy
    
    return () => {
      clearTimeout(spawnTimeoutID);
    };
  },[])
  
  return (
    <View
      style={[
        styles.constainer,
        {
          top: location.top,
          left: location.left,
        },
      ]}
    >
      <View
        style={[
          styles.hp,
          {
            backgroundColor: `'rgb(${255 * (1 - hp / maxHp)},${
              255 * (hp / maxHp)
            },0)'`,
            width: (10 * hp) / maxHp,
          },
        ]}
      ></View>
      <SpriteSheet
        ref={enemyRef}
        source={url()}
        columns={8}
        rows={8}
        animations={{
          walk: [0, 1, 2, 3, 4, 5],
          up: [6, 7, 8, 9, 10, 11],
          down: [12, 13, 14, 15, 16, 17],
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  constainer: {
    position: "absolute",
    alignItems: "center",
  },
  hp: {
    height: 2,
    marginBottom: -5,
  },
});

export default Enemy;
