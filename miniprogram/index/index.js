import requestUrl from '../utils/util.js'
import { hostUrl } from '../config/config.js';

Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function (options) {
    },
    bindGetUserInfo: function (e) {//点击的“拒绝”或者“允许
        if (e.detail.userInfo) {//点击了“允许”按钮，
            var that = this;
            // requestUrl.requestUrl({//将用户信息传给后台数据库
            //     url: "/Ecmo/wx/wxUserInfo.htm",
            //     params: {
            //         token: wx.getStorageSync('token'),
            //         // openId: globalOpenId,//用户的唯一标识
            //         nick: e.detail.userInfo.nickName,//微信昵称
            //         avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
            //         province: e.detail.userInfo.province,//用户注册的省
            //         city: e.detail.userInfo.city//用户注册的市
            //     }
            // }).then((data) => {
            // 这一步我设置的是当进入tabBar页面（除了首页)获取授权后会停留在当前界面；而进入到某个详情页面也就是除了tabBar页面授权之后会返回上一页。
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if (res.code) {
                        requestUrl.requestUrl({
                            url: "/Ecmo/wx/wxminiLogin.htm",
                            params: {
                                code: res.code,
                                nick: e.detail.userInfo.nickName,//微信昵称
                                avatarUrl: e.detail.userInfo.avatarUrl,//微信头像
                                province: e.detail.userInfo.province,//用户注册的省
                                city: e.detail.userInfo.city//用户注册的市
                            }
                        }).then((res) => {
                            wx.setStorageSync('openId', res.data.obj.openid);
                            // wx.setStorageSync('token', res.data.data.token);
                            //跳转到员工登录
                            // wx.navigateTo({ 
                            //     url: '/pages/detail/web-view?url='+hostUrl+'/Ecmo/login@'+res.data.obj.openid+'.htm',
                            //     success: function(res) {
                            //         console.info("员工登录成功："+res)
                            //     },
                            //     fail: function(res) {},
                            //     complete: function(res) {},
                            // })
                            wx.reLaunch({
                              url: '/pages/login/login',
                              success: function(res) {},
                              fail: function(res) {},
                              complete: function(res) {},   
                            })
                        }).catch((errorMsg) => {
                            console.log(errorMsg)
                        })
                    }
                }
            })
            
            // }).catch((errorMsg) => {
            //     console.log(errorMsg)
            // })
            wx.setStorageSync('userInfo', e.detail.userInfo) // 存储用户信息
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                    }
                }
            })
        }
    }
})
