/*
 * @Date: 1985-10-26 04:15:00
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-10-11 00:04:28
 * @FilePath: /kingdomRush/client/App.js
 */
import React from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from "./redux/store";
import { Provider } from "react-redux";

import Main from "./Main";
import Map from "./Map"
import Battle from "./components/BattleField"


const Stack = createNativeStackNavigator();

export default function App() {
  // Orientation Lock Landscape
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Main" component={Main}/>
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Battle" component={Battle} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}