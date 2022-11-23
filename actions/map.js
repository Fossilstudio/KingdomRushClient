/*
 * @Date: 2022-10-11 00:50:06
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-23 01:24:10
 * @FilePath: /kingdomRush/client/actions/map.js
 */
import axios from 'axios'

export const map = (mapID)=>{
  // return axios.get('http://192.53.121.16:6060/api/maps',{params:{mapID:mapID}})
  return axios.get('http://localhost:6060/api/maps',{params:{mapID:mapID}})
}

export const settle = (mapID)=>{
  return axios.get('http://localhost:6060/api/maps/settle',{params:{mapID:mapID}})
}

export const pathway = (mapID)=>{
  return axios.get('http://localhost:6060/api/maps/pathway',{params:{mapID:mapID}})
}

export const stage = (mapID)=>{
  return axios.get('http://localhost:6060/api/maps/stage',{params:{mapID:mapID}})
}