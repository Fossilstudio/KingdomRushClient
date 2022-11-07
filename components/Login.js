/*
 * @Date: 2022-09-17 00:25:14
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-07 02:13:40
 * @FilePath: /kingdomRush/client/components/Login.js
 */
import React, { useState } from "react";
import { StyleSheet, View, Image, TextInput, ImageBackground, TouchableOpacity,Text} from 'react-native';
import { useDispatch } from "react-redux";
import { login } from "../actions/login";
import { regist } from "../actions/regist";
import { initialPlayer} from "../redux/reducers/playerSlice"

function Login(props) {
  const [name, onChangeName] = useState(null)
  const [password, onChangePassword] = useState(null)
  const userData = {name,password}
  const dispatch = useDispatch()
  
  const handleLogin = ()=>{
    login(userData)
    .then((user)=>{
        // inital user data in the redux store
        dispatch(initialPlayer(user.data))
        props.loginSuccess()
        props.messagePopup(0)
      })
      .catch(()=>{
        props.setMessage('password is incorrect')
        props.messagePopup(1)
      }
      )
  }

  const handleRegist = ()=>{
    regist(userData)
      .then(()=>{console.log('register success')})
      .catch((error)=>{console.log(error.response.data)})
  }

  return(
    <View style={{
      display:props.loginDisplay
    }}>
      <View style={styles.inputs}>
        <ImageBackground source={require("../assets/blank-button.png")} resizeMode='contain' >
          <TextInput
            style={styles.login}
            onChangeText={onChangeName}
            placeholder='User Name'
            placeholderTextColor='white' // can't see placeholder without placeholderTextColor
            autoCapitalize="none"
            value={name}
            />
        </ImageBackground>
        <ImageBackground source={require("../assets/blank-button.png")} resizeMode='contain' >
          <TextInput
            style={styles.login}
            onChangeText={onChangePassword}
            placeholder='Password'
            placeholderTextColor='white' // can't see placeholder without placeholderTextColor
            autoCapitalize="none"
            secureTextEntry='true'
            value={password}
            />
        </ImageBackground>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleLogin}>
          <Image source={require('../assets/login.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegist}>
          <Image source={require('../assets/regist.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    width:181,
    height:55,
    color:'#fff',
    paddingLeft:30,
  },
  buttons:{
    display:"flex",
    flexDirection:'row'
  },
  inputs:{
    display:'flex',
    alignItems:'center'
  }

})

export default Login