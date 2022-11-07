/*
 * @Date: 2022-10-11 00:50:06
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-07 01:14:17
 * @FilePath: /kingdomRush/client/actions/map.js
 */
import axios from 'axios'

export const map = (mapID)=>{
  return axios.get('http://192.53.121.16:6060/api/maps',{params:{mapID:mapID}})
}

export const settle = (mapID)=>{
  return axios.get('http://192.53.121.16:6060/api/maps/settle',{params:{mapID:mapID}})
}