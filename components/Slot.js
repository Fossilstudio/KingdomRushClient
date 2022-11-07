/*
 * @Date: 2022-08-25 17:32:54
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-09-26 01:10:54
 * @FilePath: /kingdomRush/client/components/Slot.js
 */
import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground,} from 'react-native';
import { Link } from "@react-navigation/native";

function Slot(props) {
  return(
    <View>
      <Link to={{screen:'Map',params:{id:props.index}}} style={styles.slot}>
        <ImageBackground source={require('../assets/slot.png')} resizeMode="stretch">
          <Text style={[styles.slotText,{padding:5,fontSize:18}]}>Slot {props.index+1}</Text>
          <View style={{
              display:"flex", 
              flexDirection:'row',
              justifyContent:'center',
              }}>
            <View style={{
              display:"flex", 
              flexDirection:'row',
              alignItems:'center',
              }}>
              <Image source={require('../assets/slot-campaign.png')}/>
              <Text style={styles.slotText}>{props.data.campaign}/130</Text>
            </View>
            <View style={{
              display:"flex", 
              flexDirection:'row',
              alignItems:'center',
              }}>
              <Image source={require('../assets/slot-heroic.png')}/>
              <Text style={styles.slotText}>{props.data.heroic}</Text>
            </View>
            <View style={{
              display:"flex", 
              flexDirection:'row',
              alignItems:'center',
              }}>
              <Image source={require('../assets/slot-iron.png')}/>
              <Text style={styles.slotText}>{props.data.iron}</Text>
            </View>
          </View>
        </ImageBackground>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  slot: {
    width:200,
    height:64,
    marginBottom:16
  },
  slotText: {
    textAlign:'center',
    color:'#fff',
    paddingRight:15,
  }
})

export default Slot