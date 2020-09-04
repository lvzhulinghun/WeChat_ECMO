import { Http } from '../utils/http.js';
const http = new Http();
console.log(Http)
export function getHomeDataList() {
  const url = '/Ecmo/smallPro/queryIndexModuleList.htm';
  const method = 'post';
  return http.request({ url, method });
}
export function getMaterialList() {
  const url = '/Ecmo/smallPro/queryMachineList.htm';
  const method = 'post';
  return http.request({ url, method });
}