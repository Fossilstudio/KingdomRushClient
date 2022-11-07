/*
 * @Date: 2022-08-25 23:44:49
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-09 01:30:11
 * @FilePath: /kingdomRush/client/Map.js
 */
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import MapSetting from "./components/MapSetting";
import BattleFlag from "./components/BattleFlag";
import Achievements from "./components/Achievements";
import {position} from "./localData/flagsPosition"

import { useSelector, useDispatch } from "react-redux";
import { increment } from "./redux/reducers/goldSlice";

function Map() {
  const dispatch = useDispatch()
  const gold = useSelector((state)=>state.gold.value)
  const userData = useSelector((state)=>state.player)

  const buyGold = ()=>{
    dispatch(increment())
  }

  const stars = userData.campaign+userData.heroic+userData.iron

  return(
    <View style={styles.container}>
      <ImageBackground source={require('./assets/map.jpeg')} resizeMode="stretch" style={styles.background}>
        <View style={styles.menuLeft}>
          <MapSetting />
          <Achievements />
        </View>
        <View style={styles.menuRight}>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('./assets/hero-room.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('./assets/upgrades.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('./assets/encyclopedia.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.assets}>
          <View style={styles.asset}>
            <Image style={styles.icon} source={require('./assets/diamond.png')} />
            <Text style={styles.assertsText}>{gold}</Text>
            <TouchableOpacity onPress={buyGold}>
              <Image style={styles.icon} source={require('./assets/buy.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.asset}>
            <Image style={styles.icon} source={require('./assets/map-star.png')} />
            <Text style={styles.assertsText}>{stars}/130</Text>
          </View>
        </View>
        <BattleFlag position={position} userData={userData}/>
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
  menuLeft: {
    position: 'absolute',
    left:20,
    bottom:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
  },
  menuRight: {
    position: 'absolute',
    right:20,
    bottom:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
  },
  assets: {
    position: 'absolute',
    right:20,
    Top:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  asset:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:50,
    marginTop:5,
  },
  assertsText: {
    textAlign:'center',
    width:140,
    height:40,
    backgroundColor:'rgba(0,0,0,0.5)',
    color:'#fff',
    fontSize:24,
  },
  icon:{
    width:44,
    height:44
  },
  iconRight: {
    width:55,
    height:55,
    marginLeft:10,
  }
})

export default Map