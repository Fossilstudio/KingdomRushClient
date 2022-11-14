/*
 * @Date: 2022-11-08 00:19:14
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-11-08 00:19:34
 * @FilePath: /client/functions/getDistance.js
 */
function getDistance(start,end) {
  let x = Math.abs(end[0]-start[0]);
  let y = Math.abs(end[1]-start[1]);
  return Math.sqrt(x*x+y*y);
}

export default getDistance