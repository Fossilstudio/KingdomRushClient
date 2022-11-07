/*
 * @Date: 2022-08-25 14:22:27
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-26 01:10:45
 * @FilePath: /kingdomRush/client/components/Slots.js
 */
import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Button} from 'react-native';
import Slot from "./Slot";

function Slots(props) {
  const slots = {
    slot0:{
      campaign:props.userData.campaign,
      heroic:props.userData.heroic,
      iron:props.userData.iron,
    },
    slot1:{
      campaign:null,
      heroic:null,
      iron:null,
    },
    slot2:{
      campaign:null,
      heroic:null,
      iron:null,
    },
  }


  const $slots = []
  for (let index = 0; index < 3; index++) {
    $slots.push(
      <Slot data={slots['slot'+index]} index={index} key={index}/>
      )
  }


  return(
    <View style={[styles.Container, {display: props.display}]}>
      <View>
        <ImageBackground 
          source={require('../assets/slot-background.png')} 
          resizeMode="conatin" 
          style={styles.slotContainer}>
          {$slots}
          <View style={styles.closeBtn}>
            <Button
              onPress={props.handleSlotsClose}
              title="Close"
              color="#fff"
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container:{
    position:'absolute',
    top:30,
  },
  slotContainer: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'center',
    width:326,
    height:305,
  },
  closeBtn: {
    textAlign:'center',
    paddingBottom:2,
    width:150,
  },
})

export default Slots