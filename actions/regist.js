/*
 * @Date: 2022-09-10 23:04:14
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-07 01:13:35
 * @FilePath: /kingdomRush/client/actions/regist.js
 */
import axios from 'axios'

export const regist = (userData)=>{
  return axios.post('http://192.53.121.16:6060/api/users',userData)
}