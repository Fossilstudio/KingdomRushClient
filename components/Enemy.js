/*
 * @Date: 2022-10-18 00:12:58
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-14 02:50:44
 * @FilePath: /client/components/Enemy.js
 */
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { waypath } from "../localData/waypath";
import SpriteSheet from "rn-sprite-sheet";

import getDistance from "../functions/getDistance";


function Enemy({ name, id, speed }) {
  const enemyRef = useRef(null);
  const maxHp = 100;
  const [hp, setHp] = useState(maxHp);
  const [location, setLocation] = useState({ top: 100, left: 100 });
  const [nextWayPointId, setNextWayPointID] = useState(0);
  const [nextWayPoint, setNextWayPoint] = useState(
    waypath.stage1[nextWayPointId]
  );
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

  /* useEffect(()=>{
    initalEnemyAnimate()
  },[]) */

  function move() {
    let enemyTimeID
    let spawnTimeoutID
    console.log(ref.current.active)
    if (ref.current.active) {
      enemyTimeID = setTimeout(()=>{
        const currentPosition = [location.left, location.top]
        setDistance(getDistance(currentPosition,ref.current.nextWayPoint))
  
        if (ref.current.distance < 1) {
          setNextWayPointID(prev=>prev+1)
          setNextWayPoint(waypath.stage1[ref.current.nextWayPointId])
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
      }, 3000*id*Math.random());
      return ()=>{ clearTimeout(spawnTimeoutID)}
    }
  }

  useEffect(()=>{
    move()
  },[location,nextWayPoint,active])

  useEffect(()=>{
    let spawnTimeoutID = setTimeout(() => {
      initalEnemyAnimate()
    }, 3000 * id * Math.random()); // 3000 => interval for each enemy
    
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




/* 
function enemyMove(prevState) {
  const currentPosition = [prevState.left, prevState.top];
  const length = getDistance(currentPosition, nextWayPoint);

  if (length < 1) {
    setNextWayPointID((prev) => prev + 1);
    return { top: prevState.top, left: prevState.left };
  } else {
    const lengthX = nextWayPoint[0] - currentPosition[0];
    const lengthY = nextWayPoint[1] - currentPosition[1];

    const step = Math.round(length / speed);
    const top = prevState.top + lengthY / step;
    const left = prevState.left + lengthX / step;
    return { top: top, left: left };
  }
}

useEffect(() => {
  console.log(distance);
  setNextWayPoint(waypath.stage1[nextWayPointId])
}, [nextWayPointId, nextWayPoint, distance]);

// Spawn enemy inside setTimeout

// enemy walk in another useEffect

function enemySpawn() {
  initalEnemyAnimate();
  timeoutID = setTimeout(() => {
    enemyWalk()
  }, 3000 * id * Math.random()); // 3000 => interval for each enemy
}

function enemyWalk() {
  intervalID = setInterval(() => {
    setLocation((prevState) => {
      const currentPosition = [prevState.left, prevState.top];
      const newDistance = getDistance(currentPosition, nextWayPoint);
      setDistance(newDistance);
      const updatedValues = enemyMove(prevState);
      if (newDistance < 1) {
        setNextWayPointID(updater)
        console.log(nextWayPointId)
      }
      return { ...prevState, ...updatedValues };
    });
  }, 100);
}

function updater() {
  return nextWayPointId+1
}

useEffect(() => {
  enemySpawn();

  return () => {
    clearInterval(intervalID);
    clearTimeout(timeoutID);
  };
}, []);
 */