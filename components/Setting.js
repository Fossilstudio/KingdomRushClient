/*
 * @Date: 2022-08-24 23:46:53
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-08-25 15:00:10
 * @FilePath: /KingdomRush/Client/components/Setting.js
 */
import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';

function Setting(props) {
  const [music, setmusic] = useState(false)
  const toggleMusic = ()=>{
    setmusic(music?false:true)
  }
  const [sound, setSound] = useState(false)
  const toggleSound = ()=>{
    setSound(sound?false:true)
  }
  return(
    <View style={{
      display: props.display,
      position:'absolute',
      width:'100%',
      height:'100%',
      }}>
      <View style={styles.settingPanel}>
        <Image 
          source={require('../assets/setting-background.png')} 
          style={styles.settingBackground} />
        <View style={styles.icons}>
          <TouchableOpacity onPress={toggleMusic}>
            <Image style={styles.icon} source={require('../assets/setting-panel-music.png')} />
            <Image style={[styles.iconDisable,{display:music?'flex':'none'}]} source={require('../assets/setting-panel-disable.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSound}>
            <Image style={styles.icon} source={require('../assets/setting-panel-sound.png')} />
            <Image style={[styles.iconDisable,{display:sound?'flex':'none'}]} source={require('../assets/setting-panel-disable.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleSettingClose}>
            <Image style={styles.icon} source={require('../assets/setting-panel-achievements.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleSettingClose}>
            <Image style={styles.icon} source={require('../assets/setting-panel-fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleSettingClose}>
            <Image style={styles.icon} source={require('../assets/setting-panel-game.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.handleSettingClose}>
            <Image style={styles.icon} source={require('../assets/setting-panel-help.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.closeContainer} onPress={props.handleSettingClose}>
          <Image style={styles.closeButton} source={require('../assets/close.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  settingPanel:{
    marginLeft:'auto',
    marginRight:'auto',
    width:400,
  },
  settingBackground: {
    width:400,
    height:360,
  },
  closeContainer: {
    position:'absolute',
    top:50,
    left:320,
  },
  closeButton:{
    width:44,
    height:44,
  },
  icons: {
    display: 'flex',
    position: 'absolute',
    top:100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  icon: {
    width:88,
    height:88,
    margin: 10,
  },
  iconDisable:{
    position:'absolute',
    top:64,
    left:64,
    width:32,
    height:32
  }
});

export default Setting