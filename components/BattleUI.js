/*
 * @Date: 2022-09-27 13:24:57
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-24 01:00:26
 * @FilePath: /kingdomRush/client/components/BattleUI.js
 */
import React, { useState, } from "react";
import {StyleSheet, View, TouchableOpacity, Image, Text,Dimensions, ImageBackground} from "react-native";
import { useNavigation } from '@react-navigation/native';

function BattleUI(props) {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [pausePanel,setPausePanel] = useState('none')

  const navigation = useNavigation();

  const pauseHandle = () => {
    pausePanel == 'block'? setPausePanel('none'):setPausePanel('block')
  }

  const quit = ()=>{
    navigation.goBack()
  }

  return(
    <View style={styles.container}>
      
      <View style={styles.topLeftUI}>
        <View style={styles.info}>
          <View style={styles.hp}>
            <Image source={require('../assets/heal-point.png')} />
            {/* TODO: get max hp from database */}
            <Text style={styles.text}>{props.hp}</Text>
          </View>
          <View style={styles.hp}>
            <Image source={require('../assets/gold.png')} />
            <Text style={styles.text}>{props.gold}</Text>
          </View>
        </View>
        <View style={styles.wave}>
          <Image source={require('../assets/skull.png')} />
          <Text style={styles.text}>WAVE 0/{props.waves}</Text>
        </View>
        {/* // TODO: Hero */}
        {/* <View style={styles.hero}>
          <Image source={require('../assets/heros/hero1.png')}/>
          <View style={styles.heroHp}/>
          <View style={styles.heroExp}/>
        </View> */}
      </View>
      <View style={styles.topRightUI}>
        <TouchableOpacity onPress={pauseHandle}>
          <Image source={require('../assets/pause.png')} style={{
            width:54,
            height:54,
          }}/>
        </TouchableOpacity>
      </View>
      <View style={[styles.bottomLeftUI,{top:windowHeight*0.78}]}>
        <Image source={require('../assets/spell-frame-close.png')}/>
        <Image source={require('../assets/spell-frame-close.png')}/>
      </View>
      <View style={[styles.bottomRightUI,{top:windowHeight*0.78}]}>
        <Image source={require('../assets/spell-frame-close.png')}/>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'center',
        top:-10,
        left:-10,
        display:pausePanel,
        height:windowHeight,
        width:windowWidth,
        backgroundColor:'rgba(0,0,0,0.5)'
      }}>
      <ImageBackground 
        source={require('../assets/setting-background.png')} 
        resizeMode='stretch'
        style={{
          height:300,
          width:400,
        }}
      >
        <TouchableOpacity onPress={pauseHandle}>
          <Image style={styles.closeButton} source={require('../assets/close.png')}/>
        </TouchableOpacity>
        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'flex-end',
          marginTop:80
        }}>
          <TouchableOpacity>
            <Image style={styles.settingIcon} source={require('../assets/setting-panel-music.png')}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.settingIcon} source={require('../assets/setting-panel-sound.png')}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.settingIcon} source={require('../assets/setting-panel-help.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{
          flexDirection:'row',
          justifyContent:'center',
          paddingTop:20
        }}>
          {/* use navigation.replace to refesh the page */}
          <TouchableOpacity onPress={()=>navigation.replace('Battle',{id:props.id-1})}>
            <Image style={styles.settingButton} source={require('../assets/restart.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={quit}>
            <Image style={styles.settingButton} source={require('../assets/quit.png')}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>  
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    margin:10,
    zIndex:99,
  },
  topLeftUI:{
    position:'absolute',
  },
  topRightUI:{
    position:'absolute',
    left:'90%'
  },
  bottomLeftUI:{
    position:'absolute',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems: 'center',
  },
  bottomRightUI:{
    position:'absolute',
    left:'90%',
  },
  info: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  hp:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  wave:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  hero:{
    marginStart:5,
  },
  heroHp:{
    position:'absolute',
    top:50,
    left:2,
    height:3,
    width:48,
    backgroundColor:'green',
  },
  heroExp:{
    position:'absolute',
    top:54,
    left:2,
    height:3,
    width:48,
    backgroundColor:'white',
  },
  text: {
    color:'#fff',
    backgroundColor:'rgba(0,0,0,0.5)',
    paddingStart:10,
    paddingEnd:10,
    marginStart:-10
  },
  settingIcon:{
    width:88,
    height:88,
    margin: 10,
  },
  settingButton:{
    margin:10,
  },
  closeButton:{
    width:44,
    height:44,
    position:'absolute',
    top:40,
    right:15,
  },
})
export default BattleUI