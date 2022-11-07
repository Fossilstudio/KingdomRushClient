/*
 * @Date: 2022-10-03 00:55:56
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-17 00:08:03
 * @FilePath: /kingdomRush/client/components/BuildTowerUI.js
 */
import React,{useState} from "react";
import {StyleSheet, View, ImageBackground, TouchableOpacity, Image, Dimensions} from "react-native";
import Tower from "./Tower";
import { getTowerData } from "../actions/tower";

function BuildTowerUI(props) {
  const gold = props.gold
  const [buildTowerUIDisplay, setBuildTowerDisplay] = useState('none')
  const [mask, setMask] = useState('none')
  const [settleDisplay, setSettleDisplay] = useState('block')
  const [towerName, setTowerName] = useState('archer')
  const [archerValid,   setArcherValid] = useState(true)
  const [mageValid,     setMageValid] = useState(true)
  const [militiaValid,  setMilitiaValid] = useState(true)
  const [bombardValid,  setBombardValid] = useState(true)
  const [towerData, setTowerData] = useState({})

  /* 
   * click settle place popup the building UI
   * turn on the mask witch is used to cancel the building.
   * when a building UI is available then disable all the settled place
   * if the gold is not enough the tower cannot be built
   */
  const settlePlaceClick = () => {
    isTowerValid()
    setBuildTowerDisplay('block')
    setMask('block')
    props.setDisabled()
  }

  const isTowerValid = () => {
    if (gold>=75) {
      setArcherValid(false)
      setMilitiaValid(false)
    }
    if (gold>=90) {
      setMageValid(false)
    }
    if (gold>=112) {
      setBombardValid(false)
    }
  }

  const cost = (towerName)=>{
    switch (towerName) {
      case 'Archer Tower':  props.buildCost(70)
        break
      case 'Mage Tower':    props.buildCost(90)
        break
      case 'Militia Barracks': props.buildCost(70)
        break
      case 'Dwarven Bombard': props.buildCost(112)
        break
      default:        console.log('build error')
    }
  }

  /* 
   * turn off the mask and building UI
   * set all settled places are available
   */
  const cancelBuild =()=>{
    setBuildTowerDisplay('none')
    setMask('none')
    props.setDisabled()
  }

  // TODO get tower's data from server
  const build = (towerName) => {
    setTowerName(towerName)
    cost(towerName)
    getTowerData(towerName)
      .then((towerData)=>{
        setTowerData(towerData.data)
      })
      .catch((err)=>{console.log(err)})
    setSettleDisplay('none')
    cancelBuild()
  }

  return (
    <View>
      <View >
        <TouchableOpacity style={[
          styles.mask,
          {
            display:mask,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
          }
          ]} onPress={cancelBuild}/>
      </View>
      <View style={[styles.settle,{top:props.element[1],left:props.element[0]}]}>
        <View style={styles.settlePlace}>
          <TouchableOpacity 
            onPress={settlePlaceClick} 
            disabled={props.disabled} 
            style={{display:settleDisplay}}>
            <Image source={require('../assets/settle-place.png')} />
          </TouchableOpacity>
          <Tower settleDisplay={settleDisplay} towerData={towerData}/>
        </View>
        <View style={[styles.build, {display:buildTowerUIDisplay}]}>
          <ImageBackground style={styles.buildBackground} source={require('../assets/settle-background.png')} resizeMode='contain' />
          <View style={{position:'absolute'}}>
            <TouchableOpacity style={styles.archer}
              onPress={()=>build('Archer Tower')} 
              disabled={archerValid}>
              <Image source={require('../assets/archer.png')} opacity={(archerValid)?0.5:1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.militia} 
              onPress={()=>build('Militia Barracks')}
              disabled={militiaValid}>
              <Image source={require('../assets/militia.png')} opacity={(militiaValid)?0.5:1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dwarven} 
              onPress={()=>build('Dwarven Bombard')}
              disabled={bombardValid}>
              <Image source={require('../assets/dwarven.png')} opacity={(bombardValid)?0.5:1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mage} 
              onPress={()=>build('Mage Tower')}
              disabled={mageValid}>
              <Image source={require('../assets/mage.png')}    opacity={(mageValid)?0.5:1}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  settle: {
    position:'absolute',
  },
  settlePlace:{
    position:'absolute',
  },
  mask: {
    position:'absolute',
  },
  build:{
    position:'absolute',
  },
  buildBackground: {
    width:114,
    height:114,
    top:-40,
    left:-6,
  },
  archer: {
    position:'absolute',
    top:-40,
    left:-10,
  },
  militia: {
    position:'absolute',
    top:-40,
    left:70,
  },
  mage: {
    position:'absolute',
    top:40,
    left:-10,
  },
  dwarven: {
    position:'absolute',
    top:40,
    left:70,
  }
})

export default BuildTowerUI