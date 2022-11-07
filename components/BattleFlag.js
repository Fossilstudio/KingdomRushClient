/*
 * @Date: 2022-08-27 22:44:58
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-04 01:49:27
 * @FilePath: /kingdomRush/client/components/BattleFlag.js
 */
import React from "react";
import {StyleSheet, View, Image } from "react-native";
import { Link } from "@react-navigation/native";

function BattleFlag(props) {
  const campaign = props.userData.campaign
  
  const $flags = []

  for (let index = 0; index <= campaign; index++) {
    const url = (index!=campaign)? require('../assets/flag-occupied.png') : require('../assets/flag-attack.png')
    const occupied = (index!=campaign)? 'blcok':'none'
    const tipDis = (campaign===0)? 'block':'none'

    $flags.push(
      <View key={index} style={[styles.container, {top:props.position['stage'+index].y, left:props.position['stage'+index].x}]}>
        <Link to={{screen:'Battle',params:{id:index}}} style={styles.flagContainer}>
          <Image style={{display:tipDis}} source={require('../assets/start-here.png')} />
            <View style={styles.flag}>
              <Image source={url} />
              <Image style={{display:occupied}} source={require('../assets/slot-campaign.png')} />
            </View>
        </Link>
      </View>
    )
  }
  return(
    <View>
      {$flags}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    height:100,
  },
  flagContainer: {
    display:'flex',
    alignItems: 'center',
  },
  flag:{
    display:'flex',
    alignItems: 'center',
  }
})


export default BattleFlag