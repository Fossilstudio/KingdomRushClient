/*
 * @Date: 2022-10-11 00:50:06
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-07 01:14:23
 * @FilePath: /kingdomRush/client/actions/tower.js
 */
import axios from 'axios'

export const getTowerData = (towerName)=>{
  return axios.get('http://192.53.121.16:6060/api/towers',{params:{towerName:towerName}})
}