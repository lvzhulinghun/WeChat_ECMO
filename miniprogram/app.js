import requestUrl from './utils/util.js'
App({
    openId:"",
    onLoad: function (options) {

        app.getSettings()  // 进入页面就调用此方法
      },
    onLaunch: function () {

        this.checkout()
    },
    //检验code
    checkout: function () {
        wx.checkSession({
            success: function() {
            },
            fail: function() { 
            }
        })
    },
    //检验授权的方法
    getSettings:function () {
        let that = this
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
                    wx.getUserInfo({
                        success: (res) => {
                        }
                    })
                } else {//未授权，跳到授权页面
                    wx.redirectTo({
                        url: '../authorize/authorize',//授权页面
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: "",//用户信息
        openId: "",//登录用户的唯一标识
        appid: '',//appid
        AppSecret: '',//secret秘钥
        token: ''
    },
    onHide: function () {//小程序退出时触发的事件

    }
})
