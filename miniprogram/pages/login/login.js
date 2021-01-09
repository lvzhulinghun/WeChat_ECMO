// pages/login/login.js
import requestUrl from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNo:'',
    password:'',

  },
  renderHtml() {
    this.setData({
      renderedByHtml: true
    })
  },
  //登陆
  loginformSubmit :function(e){
      const userNo = e.detail.value.userNo
      const password = e.detail.value.password
      if(userNo == null || userNo == ''){
        wx.showToast({
          title: '请输入员工工号',
          icon: 'none',//当icon：'none'时，没有图标 只有文字
          duration: 800
        })
        return
      }
      if(password == null || password == ''){
        wx.showToast({
          title: '请输入密码',
          icon: 'none',//当icon：'none'时，没有图标 只有文字
          duration: 700
        })
        return
      }

      requestUrl.requestUrl({//将用户信息传给后台数据库
        url: "/Ecmo/subLogin.htm",
        params: {
            openId: wx.getStorageSync('openId'),
            userNo:userNo,
            password:password
        }
    }).then((data) => {
        if("200" == data.data.code){
          console.info(data)
          const name = data.data.obj.userName
          wx.setStorageSync('openId', data.data.obj.wxOpenId);
          wx.showToast({
            title: '欢迎:'+name+'登陆成功',
            icon: 'none',//当icon：'none'时，没有图标 只有文字
            duration: 700
          })
          setTimeout(this.visitor,700)
          // 注意
        }else{
          const errmsg = data.data.message
          wx.showToast({
            title: errmsg,
            icon: 'none',//当icon：'none'时，没有图标 只有文字
            duration: 2000
          })
        }
    }).catch((errorMsg) => {
      console.error(errorMsg)
    })

  },
  visitor:function(e){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})