//封装请求
import { hostUrl } from '../config/config.js';
const server = hostUrl;//正式域名 必须为https
const requestUrl = ({url, params, success, method = "post"}) => {
    wx.showLoading({
        title: '加载中',
    });
    let headerPost = {'content-type': 'application/x-www-form-urlencoded'}
    let headerGet = {'content-Type': 'application/json'}
    return new Promise((resolve, reject) => {
        wx.request({
            url: server + url,
            method: method,
            data: params,
            header: method = 'post' ? headerPost : headerGet,
            success: (res) => {
                wx.hideLoading();
                if (res['statusCode'] == 200) {
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
                          resolve(res)//异步成功之后执行的函数
                      }
                } else {
                    wx.showToast({
                        title: res.data.msg || '请求出错',
                        icon: 'none',
                        duration: 2000,
                        mask: true
                    })
                    reject(res.ErrorMsg);
                }
            },
            fail: (res) => {
                wx.hideLoading();
                wx.showToast({
                    title: res.data.msg || '',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                })
                reject('网络出错');
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}
module.exports = {
    requestUrl: requestUrl
}
