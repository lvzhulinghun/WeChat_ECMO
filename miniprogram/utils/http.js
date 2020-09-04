import { hostUrl } from '../config/config.js';
// import { Token } from './token.js';
let app = getApp()
// const tokenClass = new Token();
class Http {
  request({ url, data = {openId:wx.getStorageSync('openId')}, method = 'get' }) {

    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    })
  }
  _request(url, resolve, reject, data = {}, method = 'get') {
    const token = wx.getStorageSync('token') ? wx.getStorageSync('token') : '';
    const that = this;
    wx.request({
      url: hostUrl + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        token: token,
      },
      method,
      dataType: 'json',
      responseType: 'text',
      success(res) {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          if(res.data.code == "10000"){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
              mask: true
          })
            wx.reLaunch({
              url: '../login/login',
            })
          }else if(res.data.code == "10001"){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000,
              mask: true
              })
              wx.reLaunch({
                url: '../index/index',
              })
          }else{
            resolve(res.data);
          }
        } else {
          reject();
        }

      },
      fail(res) {
        reject();
      },
    })
  }
}
export { Http }