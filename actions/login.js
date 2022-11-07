/*
 * @Date: 2022-09-10 23:04:14
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-07 00:58:14
 * @FilePath: /kingdomRush/client/actions/login.js
 */
import axios from 'axios'

export const login = (userData)=>{
  // return axios.get('http://localhost:6060/api/users',{params:userData})
  return axios.get('http://192.53.121.16:6060/api/users',{params:userData})

}
