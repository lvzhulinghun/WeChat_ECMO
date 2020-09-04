//index.js
//获取应用实例
const app = getApp()
import { getHomeDataList } from '../../api/api.js'
import requestUrl from '../../utils/util.js'
Page({
  data: {
    icons: {
      MK004: "wait.png",
      MK003: "start.png",
      MK002: "material.png",
      MK001: "warning.png",
      MK005: "login.jpg",
    },
    list: [
  ],
  loginInfo:{
    title:'您还未授权登陆',
    content:'请先授权再进行操作',
    // logName:'Gayhub',
    logImage:'../../images/wxIndex.jpg',
  }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  redirectDetail(e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.list[index];
    if (item.moduleCode === "MK002") {
      this.redirectMaterial('/pages/detail/material');
    }else if(item.moduleCode == "MK001"){
      this.redirectMaterial('/pages/warn/warn');
    }
    if (item.moduleCode === "MK003") { 
      this.redirectMaterial('/pages/startstage/startView');
    }
    if (item.moduleCode === "MK004") { 
      
    }
    if(item.moduleCode == "MK005"){
        let userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo);
        let dialogComponent = this.selectComponent('.wxc-dialog');
        if (!userInfo) {
          console.info("show dialog")
          dialogComponent && dialogComponent.show();
        } else {
          //表示已经授权
          dialogComponent && dialogComponent.hide();
          wx.reLaunch({
            url: '/pages/login/login',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},   
          })
        }
    }
  },
  redirectMaterial(url) {
    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function (options) {
    getHomeDataList().then(res => {
      if(res.code == "500"){
        wx.navigateTo({
          url: '../index/index',
        })
      }
      // this.list = res.obj
      this.setData({
        list: res.obj
      })
    }).catch(error => {
      console.log(error);
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onConfirm(e) { // 点击允许
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
    if (e.detail.detail.userInfo) {//点击了“允许”按钮，
      let userInfo = e.detail.detail.userInfo
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                if (res.code) {
                    requestUrl.requestUrl({
                        url: "/Ecmo/wx/wxminiLogin.htm",
                        params: {
                            code: res.code,
                            nick: userInfo.nickName,//微信昵称
                            avatarUrl: userInfo.avatarUrl,//微信头像
                            province: userInfo.province,//用户注册的省
                            city: userInfo.city//用户注册的市
                        }
                    }).then((res) => {
                        wx.setStorageSync('openId', res.data.obj.openid);
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
        wx.setStorageSync('userInfo', userInfo) // 存储用户信息
    } else {
        wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序其他相关操作，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
                if (res.confirm) {
                }
            }
        })
    }

  },
  onCancel() { // 点击拒绝
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
  }
})
